import { envConfig, prisma } from '../../app';
import { decode, verify } from 'jsonwebtoken'
import type { DecodedBodyParam, DecodedSelectParam, User } from '@shared/types'
import { Router } from 'express';
import CryptoJS from 'crypto-js';
export const userRoutes = Router()

userRoutes.get('/users', async (request, result) => {
  const selectParam = request.headers.s_p_b as string

  if(!selectParam) {
    result.send({ data: null, error: 'No select params were provided'})
    return
  }
  const decryptedSelect = CryptoJS.AES.decrypt(selectParam, envConfig.SERVER_HEADER_SELECT).toString(CryptoJS.enc.Utf8)
  verify(decryptedSelect, envConfig.SERVER_HEADER_SELECT)
const { select, where } = (decode(decryptedSelect) as DecodedSelectParam<User, 'users'>)

  if(!select) {
    result.send({ data: null, error: 'No select params were provided'})
    return
  }
  const users = await prisma.users.findMany({
    //@ts-expect-error FIXME: Type 'SelectParam<User>' is not assignable to type 'usersSelect<DefaultArgs>'.
    select,
    where
  })
  result.send({ data: users })
});

userRoutes.post('/user', async (request, result) => {
  const bodyParam = request.headers['b-h'] as string

  const decryptedBody = CryptoJS.AES.decrypt(bodyParam, envConfig.SECRET_BODY_SELECT).toString(CryptoJS.enc.Utf8)
  verify(decryptedBody, envConfig.SECRET_BODY_SELECT)
  const { body } = decode(decryptedBody) as DecodedBodyParam<User>

  await prisma.users.update({
    where: {
      id: 1
    },
    data: {
      name: 'CHANGED'
    }
  })
})

userRoutes.post('/register', async (request, result) => {
  const selectParam = request.headers.s_p_b as string
  const bodyParam = request.headers['b-h'] as string

  const decryptedBody = CryptoJS.AES.decrypt(bodyParam, envConfig.SECRET_BODY_SELECT).toString(CryptoJS.enc.Utf8)
  verify(decryptedBody, envConfig.SECRET_BODY_SELECT)
  const { body } = decode(decryptedBody) as DecodedBodyParam<User>
  // if(!selectParam) {
  //   result.send({ data: null, error: 'No select params were provided'})
  //   return
  // }
  // const { select, where } = (decode(selectParam) as DecodedSelectParam<User, 'users'>)

  // if(!select) {
  //   result.send({ data: null, error: 'No select params were provided'})
  //   return
  // }
  const users = await prisma.users.create({
    //@ts-expect-error FIXME: Type 'SelectParam<User>' is not assignable to type 'usersSelect<DefaultArgs>'.
    // select,
    // where,
    data: {
      name: body?.name ?? '',
      surname: body?.surname ?? ''
    }
  })
  result.send({ data: users })
});
