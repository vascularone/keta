'use server'
import type { DecodedSelectParam, Models, PostProperties } from '@shared/types';
import { signJWT } from './jwt';
import { envConfig } from './envConfig';


export const generateHeaderJWT = async <TModel, KModel extends Models>(variables: DecodedSelectParam<TModel,KModel>) => {
  return await signJWT(variables, envConfig.SERVER_HEADER_SELECT)
};

export const generateBodyJWT = async <T>(bodyParams: PostProperties<T>) => {
  return await signJWT(bodyParams, envConfig.SECRET_BODY_SELECT)
}
