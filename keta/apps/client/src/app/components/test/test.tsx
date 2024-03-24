'use client'
import { tokenStore } from "../../api/token"
import { sign } from 'jsonwebtoken'
import { useGetUsersQuery } from "../../api/users"

export const Test = () => {
  const { token, setToken } = tokenStore.getState()
  try {
    const asd = sign('thistoken', 'ac94510697950aacc9d5a2e495e62674ae96ad01c7db4e3d0f5c8963e4b2968c197e9daf79185e6f', { algorithm: 'HS512' });
    setToken(asd ?? '');
  } catch (error) {
    console.error('Error generating token:', error);
  }
  useGetUsersQuery({
    select: {
      id: true,
      name: true
    }
  }).then((data) => console.log("IS THIS MYDATA?:", data))

    console.log('beg token', token ?? 'asd')
  return <div> did this  </div>
}
