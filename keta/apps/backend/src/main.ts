import { createapp } from './app';
import cron from 'node-cron';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

createapp().then((res) => {
  res.listen(port, () => {
    console.log(`keta server rdy at http://localhost:${port}`);
  });
});
