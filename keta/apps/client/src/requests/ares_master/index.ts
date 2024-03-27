'use server'
import { revalidateTag, unstable_cache } from "next/cache";
import { FETCH, POST } from "../requests";
import { Ares_Master } from "@shared/types";

export const getAresMasterQuery = unstable_cache(
  async () => {
    return await FETCH<Ares_Master[], Ares_Master, 'ares_master'>('ares_master', { select: { name: true } })
  },
  ['ares_master'],
  {
    tags: ['ares_master']
  }
)

export const createAresMasterEntry = async () => {
  const data = await POST<Ares_Master>('createAres', { body: {
    name: 'hjello'
  }})
  revalidateTag('ares_master')
  return data
}
