import type { BodyParam, FetchProperties, FetchState, Models, PostProperties } from "@shared/types";
import { generateAuthJWT, generateBodyJWT, generateHeaderJWT } from "./encryption";
import { tokenStore } from './token';

export const FETCH = async <T, TModel, KModel extends Models>(endpoint: string, variables: FetchProperties<TModel, KModel>): Promise<FetchState<T>> => {
  const initialState: FetchState<T> = {
    data: undefined,
    loading: true,
    error: null,
  };
  const { token } = tokenStore.getState()
  try {
    const options = {
      method: "GET",
      headers: {
        Accept: "application/json",
        s_p_b: generateHeaderJWT<TModel, KModel>(variables),
        ...(token && {
          'Authorization': `Bearer: ${generateAuthJWT(token)}`
        })
      },
    };
    const response = await fetch(`${process.env.BACKEND_API_URL}/${endpoint}`, options).then((data) => data.json())

    return { data: response.data, loading: false, error: null };
  } catch (error) {
    console.log('there was an error:', error)
    return { ...initialState, error };
  }
}

export const POST = async <T>(endpoint: string, body?: PostProperties<T>) => {
  const { token } = tokenStore.getState()
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && {
            'Authorization': generateAuthJWT(token)
          }),
          ...(body && {
            'b-h': generateBodyJWT<T>(body)
          })
          // s_p_b: generateHeaderJWT(variables)
        },
      };
      await fetch(`${process.env.BACKEND_API_URL}/${endpoint}`, options)
    } catch (error) {
      console.error("Error:", error);
    }

}
