import { Router } from "express";
import { prisma } from '../../app';


export const aresRoutes = Router()

aresRoutes.get('/ares_master', async (request, result) => {
  const users = await prisma.ares_master.findMany()
  result.send({ data: users })
});

aresRoutes.post('/createAres', async (request, result) => {
  console.log('i arried here ---------------------------')
  const entry = await prisma.ares_master.create({
    data: {
      name: 'NEW ENTRY'
    },
    select: {
      id: true,
      name: true
    }
  })
  result.send({ data: entry })
})
