import { envConfig, prisma } from '../../app';
import { decode, verify } from 'jsonwebtoken'
import type { DecodedBodyParam, DecodedSelectParam, User } from '@shared/types'
import { Router } from 'express';

const authRoutes = Router()

authRoutes.post('/register', async (request, result) => {
  const selectParam = request.headers.s_p_b as string
  const bodyParam = request.headers['b-h'] as string

  const decryptedBody = CryptoJS.AES.decrypt(bodyParam, envConfig.SECRET_BODY_SELECT).toString(CryptoJS.enc.Utf8)
  verify(decryptedBody, envConfig.SECRET_BODY_SELECT)
  const { body } = decode(decryptedBody) as DecodedBodyParam<User>

  if(!selectParam) {
    result.send({ data: null, error: 'No select params were provided'})
    return
  }
  verify(selectParam, envConfig.SERVER_HEADER_SELECT)
  const { select, where } = (decode(selectParam) as DecodedSelectParam<User, 'users'>)

  if(!select) {
    result.send({ data: null, error: 'No select params were provided'})
    return
  }
  const users = await prisma.users.create({
    //@ts-expect-error FIXME: Type 'SelectParam<User>' is not assignable to type 'usersSelect<DefaultArgs>'.
    select,
    where,
    data: {
      name: body?.name ?? '',
      surname: body?.surname ?? ''
    }
  })
  result.send({ data: users })
});
