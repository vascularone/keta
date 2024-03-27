'use client'
import { setCookie } from 'cookies-next'
import { createUser } from '../../requests/users'
import { useRouter } from 'next/navigation'

export const Test = () => {
  const router = useRouter()
  const asdasd = async () => {
    console.log('hello i was pressed')
    const response = await createUser({ body: { name: 'KRRINOR', surname: "ARESKETA "}})
    setCookie('authorization', response?.data, { expires: new Date(Date.now() + 24 * 60 * 60 * 1000)});
    router.push('/')
  }

  return <div>
    <button onClick={asdasd}>click me</button>
  </div>
}
