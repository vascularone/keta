import { Router } from 'express';

export const router = Router();

router.get('/', (_, res) => {
  res.send({ message: 'Hello API' });
});

router.get('/this', (_, res) => {
  res.send({ message: 'this happened' });
});
