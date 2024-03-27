import { JWTPayload, SignJWT, jwtVerify } from "jose";
import { envConfig } from "./crypto";
export const signJWT = async (params: JWTPayload, secretKey: string) => {
  return await new SignJWT(params)
      .setProtectedHeader({ alg: 'HS512' })
      .setIssuedAt()
      .sign(new TextEncoder().encode(secretKey))
}

export const verifyJWT = async (jwtPayload: string) => {
  try {
    //@ts-expect-error must be Uint8array or KeyLike
    const payload =  (await jwtVerify(jwtPayload, envConfig.SECRET_JWT_KEY)).payload
    return { data: payload }
  } catch(error) {
    console.error(error)
    return { data: null }
  }
}
