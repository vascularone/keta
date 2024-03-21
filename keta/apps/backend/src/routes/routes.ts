import { Router } from 'express';
import { prisma } from '../app';
import { Prisma } from '@prisma/client'
import { decode, verify, JwtPayload } from 'jsonwebtoken'
import { z } from 'zod'

export const router = Router();

interface SelectParam {
  [key: string]: boolean | SelectParam
}

interface EncodedSelectParam extends JwtPayload {
  select: SelectParam
}
const envSchema = z.object({
  SERVER_HEADER_SELECT: z.string(),
});

const envConfig = envSchema.parse(process.env);

type DecodedSelectParam = Pick<EncodedSelectParam, 'select'>

router.get('/users', async (request, result) => {
  const selectParam = request.headers.s_p as string
  verify(selectParam, envConfig.SERVER_HEADER_SELECT)
  const select = (decode(selectParam) as DecodedSelectParam).select
  const users = await prisma.users.findMany({
    select,
    // where: whereClause,
  })
  result.send({ data: users })
});

router.get('/user', async (request, result) => {
  const selectParam = request.body.select as SelectParam
  const whereClause = request.body.where as Prisma.usersWhereUniqueInput

  if(!selectParam || (typeof selectParam === 'object' && Object.keys(selectParam).length === 0)) {
    result.status(400).send("No select parameter provided!")
    return
  }

  const users = await prisma.users.findUnique({
    select: selectParam,
    where: whereClause,
  })
  result.send({ data: users})
})

router.get('/this', (_, res) => {
  res.send({ message: 'this happened' });
});
