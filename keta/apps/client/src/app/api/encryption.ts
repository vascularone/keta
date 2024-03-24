import type { DecodedSelectParam, Models, PostProperties } from '@shared/types';
import { sign } from 'jsonwebtoken';
import { z } from 'zod';
import CryptoJS from 'crypto-js'

// const envSchema = z.object({
//   SERVER_HEADER_SELECT: z.string({required_error: 'you did not input header select?'}),
//   BACKEND_API_URL: z.string(),
//   SECRET_JWT_KEY: z.string(),
//   SECRET_BODY_SELECT: z.string()
// });

// export const envConfig = envSchema.parse(process.env);

export const generateHeaderJWT = <TModel, KModel extends Models>(variables: DecodedSelectParam<TModel,KModel>) => {
  const jwtPaylod = sign(variables, process.env.SERVER_HEADER_SELECT ?? '', { algorithm: 'HS512' })
  return CryptoJS.AES.encrypt(jwtPaylod, process.env.SERVER_HEADER_SELECT ??'').toString()
};

export const generateAuthJWT = (token: string) => {
  const jwtPaylod = sign(token, process.env.SECRET_JWT_KEY ?? '', { algorithm: 'HS512'})
  return CryptoJS.AES.encrypt(jwtPaylod, process.env.SECRET_JWT_KEY ?? '').toString()
}

export const generateBodyJWT = <T>(bodyParams: PostProperties<T>) => {
  const jwtPaylod = sign(bodyParams, process.env.SECRET_BODY_SELECT ?? '', { algorithm: 'HS512' })
  return CryptoJS.AES.encrypt(jwtPaylod, process.env.SECRET_BODY_SELECT ?? '').toString()
}
