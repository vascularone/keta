import express from 'express';
import cors from 'cors';
import { router } from './routes/routes';
import { json } from 'body-parser';
import { cronRouter } from './crons';

export const createapp = async () => {
  console.log('creating el keto app');
  const app = express();

  app.use(express.json({ limit: '50mb' }));

  app.get('/', (_, res) => {
    res.send('PRIVATO');
  });

  app.set('trust proxy', 1);

  app.use('/api', router);
  app.use('/cron', cronRouter)

  app.use(
    '/api',
    cors({
      origin: ['http://127.0.0.1:3000', 'http//:localhost:3000'],
      credentials: true,
    }),
    json(),
  );
  return app;
};
