'use server'
import { JWTPayload, SignJWT, jwtVerify} from "jose";
import { envConfig } from "./envConfig";
export const signJWT = async (params: JWTPayload, secretKey: string) => {
  return await new SignJWT(params)
      .setProtectedHeader({ alg: 'HS512' })
      .setIssuedAt()
      .sign(new TextEncoder().encode(secretKey))
}

export const verifyJWT = async (jwtPayload: string) => {
  try {
    //@ts-expect-error FIXME: must be Uint8array or KeyLike
    const payload =  (await jwtVerify(jwtPayload, envConfig.SECRET_JWT_KEY)).payload
    return { data: payload }
  } catch(error) {
    console.error(error)
    return { data: null }
  }
}
