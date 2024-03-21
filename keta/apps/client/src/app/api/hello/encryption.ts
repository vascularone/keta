import { sign } from 'jsonwebtoken';
import { z } from 'zod';

const envSchema = z.object({
  SERVER_HEADER_SELECT: z.string(),
});

const envConfig = envSchema.parse(process.env);

export interface SelectParam {
  [key: string]: boolean | SelectParam;
}

export const generateSelectJWT = (obj: SelectParam) => {
  return sign(obj, envConfig.SERVER_HEADER_SELECT, { algorithm: 'HS512' });
};
