import express from 'express';
import cors from 'cors';
import { cronRouter } from './crons';
import { z } from 'zod'
import { PrismaClient } from '@prisma/client';
import { globalAuth } from './auth';
import { userRoutes } from './routes/user';
import { aresRoutes } from './routes/ares_master';
export const prisma = new PrismaClient()

const envSchema = z.object({
  SERVER_HEADER_SELECT: z.string(),
  SECRET_JWT_KEY: z.string(),
  SECRET_BODY_SELECT: z.string(),
  SECRET_ENCRYPTION_KEY: z.string()
});

export const envConfig = envSchema.parse(process.env);

export const createapp = async () => {
  console.log('creating el keto app');
  const app = express();

  app.use((req, res, next) => {
    console.log(`Request url: ${req.url} / Request headers: ${JSON.stringify(req.headers)}`);
    next();
  });

  app.use(globalAuth)

  app.use(cors({
    origin: ['http://127.0.0.1:3000', 'http://localhost:3000'],
    credentials: true,
  }));

  // app.use(express.json({ limit: '50mb' }));

  app.get('/', (_, res) => {
    res.send('PRIVATO');
  });

  app.set('trust proxy', 1);

  app.use('/api', userRoutes);
  app.use('/cron', cronRouter);
  app.use('/api', aresRoutes)

  return app;
};
