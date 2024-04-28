import { envConfig, prisma } from '../../app';
import { decode, JwtPayload, sign, verify } from 'jsonwebtoken'
import type { DecodedBodyParam, DecodedSelectParam, User } from '@shared/types'
import { Router } from 'express';
import CryptoJS from 'crypto-js';

export const userRoutes = Router()

userRoutes.get('/users', async (request, result) => {
  const selectParam = request.headers.s_p_b as string
  const authorization = request.headers.authorization?.split(' ')[1] ?? '' as string
  if(!selectParam) {
    result.send({ data: null, error: 'No select params were provided'})
    return
  }
  const decryptedAuth = CryptoJS.AES.decrypt(authorization, envConfig.SECRET_JWT_KEY).toString(CryptoJS.enc.Utf8)
  verify(selectParam, envConfig.SERVER_HEADER_SELECT)
const { select, where } = (decode(selectParam) as DecodedSelectParam<User, 'users'>)
const payload = decode(decryptedAuth) as JwtPayload

  if(!select) {
    result.send({ data: null, error: 'No select params were provided'})
    return
  }
  const users = await prisma.users.findMany({
    select,
    where: {...where, id: payload.id}
  })
  result.send({ data: users })
});

userRoutes.get('/user', async (request, result) => {
  const bodyParam = request.headers['b-h'] as string

  verify(bodyParam, envConfig.SECRET_BODY_SELECT)
  const { body } = decode(bodyParam) as DecodedBodyParam<User>

  const user = await prisma.users.update({
    where: {
      id: body?.id
    },
    data: {
      name: body?.name
    }
  })
  result.send({ data: user })
})

userRoutes.post('/register', async (request, result) => {
  const bodyParam = request.headers['b-h'] as string

  verify(bodyParam, envConfig.SECRET_BODY_SELECT)
  const { body } = decode(bodyParam) as DecodedBodyParam<User>
  if(!body?.name || !body.password) return
  const users = await prisma.users.create({
    data: {
      name: body.name,
      password: CryptoJS.AES.encrypt(body.password, envConfig.SECRET_ENCRYPTION_KEY).toString(),
      surname: body.surname ?? ''
    }
  })
  result.send({ data: CryptoJS.AES.encrypt(sign(users, envConfig.SECRET_JWT_KEY, { algorithm: "HS256"}), envConfig.SECRET_JWT_KEY).toString() })
});

userRoutes.post('/login', async (request, result) => {
  const bodyParam = request.headers['b-h'] as string

  verify(bodyParam, envConfig.SECRET_BODY_SELECT)
  const { body } = decode(bodyParam) as DecodedBodyParam<User>
  const entry = await prisma.users.findFirst({
    where: {
      name: body?.name,
    },
    select: {
      id: true,
      name: true,
      password: true
    }
  })

  if(!entry) {
    result.send({ data: "No user found", errorCode: 300 })
    return
  }
  const passwordMatch = CryptoJS.AES.decrypt(entry.password, envConfig.SECRET_ENCRYPTION_KEY).toString(CryptoJS.enc.Utf8) === body?.password
  if(!passwordMatch) {
    result.send({ data: "Password does not match", errorCode: 300 })
    return
  }
  result.send({ data: CryptoJS.AES.encrypt(sign(entry, envConfig.SECRET_JWT_KEY, { algorithm: "HS256"}), envConfig.SECRET_JWT_KEY).toString() })

})
