import type { DecodedSelectParam, Models, PostProperties } from '@shared/types';
import { z } from 'zod';
import CryptoJS from 'crypto-js'
import { signJWT } from './jwt';

const envSchema = z.object({
  SERVER_HEADER_SELECT: z.string({required_error: 'you did not input header select?'}),
  BACKEND_API_URL: z.string(),
  SECRET_JWT_KEY: z.string(),
  SECRET_BODY_SELECT: z.string()
});

export const envConfig = envSchema.parse(process.env);



export const generateHeaderJWT = async <TModel, KModel extends Models>(variables: DecodedSelectParam<TModel,KModel>) => {
  const jwtPaylod = await signJWT(variables, envConfig.SERVER_HEADER_SELECT)
  return CryptoJS.AES.encrypt(jwtPaylod, envConfig.SERVER_HEADER_SELECT).toString()
};

export const generateAuthJWT = async (token: string) => {
  const jwtPaylod = await signJWT({ token: token}, envConfig.SECRET_JWT_KEY)
  return CryptoJS.AES.encrypt(jwtPaylod, envConfig.SECRET_JWT_KEY).toString()
}

export const generateBodyJWT = async <T>(bodyParams: PostProperties<T>) => {
  const jwtPaylod = await signJWT(bodyParams, envConfig.SECRET_BODY_SELECT)
  return CryptoJS.AES.encrypt(jwtPaylod, envConfig.SECRET_BODY_SELECT).toString()
}

export const decryptAuthHash = (payload: string) => {
  return CryptoJS.AES.decrypt(payload, envConfig.SECRET_JWT_KEY).toString(CryptoJS.enc.Utf8)
}
