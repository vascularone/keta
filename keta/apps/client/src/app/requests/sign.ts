import { JWTPayload, SignJWT } from "jose";
export const signJWT = async (params: JWTPayload, secretKey: string) => {
  return await new SignJWT(params)
      .setProtectedHeader({ alg: 'HS512' })
      .setIssuedAt()
      .sign(new TextEncoder().encode(secretKey))
}
