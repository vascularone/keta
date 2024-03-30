'use server'
import type { DecodedSelectParam, Models, PostProperties } from '@shared/types';
import CryptoJS from 'crypto-js'
import { signJWT } from './jwt';
import { envConfig } from './envConfig';


export const generateHeaderJWT = async <TModel, KModel extends Models>(variables: DecodedSelectParam<TModel,KModel>) => {
  const jwtPaylod = await signJWT(variables, envConfig.SERVER_HEADER_SELECT)
  return CryptoJS.AES.encrypt(jwtPaylod, envConfig.SERVER_HEADER_SELECT).toString()
};

export const generateBodyJWT = async <T>(bodyParams: PostProperties<T>) => {
  const jwtPaylod = await signJWT(bodyParams, envConfig.SECRET_BODY_SELECT)
  return CryptoJS.AES.encrypt(jwtPaylod, envConfig.SECRET_BODY_SELECT).toString()
}

export const decryptAuthHash = (payload: string) => {
  return CryptoJS.AES.decrypt(payload, envConfig.SECRET_JWT_KEY).toString(CryptoJS.enc.Utf8)
}

