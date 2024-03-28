'use server'
import type { FetchProperties, FetchState, Models, PostProperties } from "@shared/types";
import { envConfig, generateBodyJWT, generateHeaderJWT } from "./crypto";
import { cookies } from 'next/headers'

export const FETCH = async <T, TModel, KModel extends Models>(endpoint: string, variables: FetchProperties<TModel, KModel>): Promise<FetchState<T>> => {
  const initialState: FetchState<T> = {
    data: undefined,
    loading: true,
    error: null,
  };
  const token = cookies().get('authorization')?.value
  try {
    const options = {
      method: "GET",
      headers: {
        Accept: "application/json",
        s_p_b: await generateHeaderJWT<TModel, KModel>(variables),
        ...(token && {
          'Authorization': `Bearer: ${token}`
        })
      },
    };
    const response = await fetch(`${envConfig.BACKEND_API_URL}/${endpoint}`, options).then((data) => data.json())
    return { data: response.data, loading: false, error: null };
  } catch (error) {
    console.log('there was an error:', error)
    return { ...initialState, error };
  }
}


export const POST = async <T>(endpoint: string, body?: PostProperties<T>) => {
  const token = cookies().get('authorization')?.value
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && {
            'Authorization': `Bearer: ${token}`
          }),
          ...(body && {
            'b-h': await generateBodyJWT<T>(body)
          })
        },
      };
      const response = await fetch(`${envConfig.BACKEND_API_URL}/${endpoint}`, options).then((data) => data.json())
      return response.data
    } catch (error) {
      console.error("Error:", error);
    }

}
