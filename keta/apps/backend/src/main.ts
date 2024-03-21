import { createapp, prisma } from './app';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;


createapp().then((res) => {
  res.listen(port, () => {
    console.log(`keta server rdy at http://localhost:${port}`);
  });
}).then(async () => {
  await prisma.$disconnect()
}).catch(async (error) => {
  console.error(error)
  await prisma.$disconnect()
  process.exit(1)
})
