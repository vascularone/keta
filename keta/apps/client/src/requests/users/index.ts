'use server'
import type { FetchProperties, PostProperties, User } from '@shared/types'
import { FETCH, POST } from '../requests';
import { revalidateTag, unstable_cache } from 'next/cache';

export const useGetUsersQuery = unstable_cache(
  async (variables: FetchProperties<User, 'users'>) => {
    const data =  await FETCH<User[], User, 'users'>('users', variables)
    revalidateTag('users') //DO I ACTUALLY NEED TO REVALIDATE HERE? I DONT KNOW
    return data
  },
  ['users'],
  {
    tags: ['users']
  }
)

export const createUser = async (variables: PostProperties<User>) => {
  const data = await POST<User>('register', variables)
  revalidateTag('users')
  return data
}

export const login = async (variables: PostProperties<User>) => {
  return await POST<User>('login', variables)
}
