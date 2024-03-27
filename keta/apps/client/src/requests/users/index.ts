'use server'
import type { FetchProperties, PostProperties, User } from '@shared/types'
import { FETCH, POST } from '../requests';

export const useGetUsersQuery = async (variables: FetchProperties<User, 'users'>) => {
  return await FETCH<User[], User, 'users'>('users', variables)
}

export const createUser = async (variables: PostProperties<User>) => {
  return await POST<User>('register', variables)
}
