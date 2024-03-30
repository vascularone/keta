import { z } from "zod";

const envSchema = z.object({
  SERVER_HEADER_SELECT: z.string({required_error: 'you did not input header select?'}),
  BACKEND_API_URL: z.string(),
  SECRET_JWT_KEY: z.string(),
  SECRET_BODY_SELECT: z.string()
});

export const envConfig = envSchema.parse(process.env);
