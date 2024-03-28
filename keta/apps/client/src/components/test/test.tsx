'use client'
import { setCookie, deleteCookie } from 'cookies-next'
import { login } from '../../requests/users'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Loading } from '../images/loading'

export const Test = () => {
  const router = useRouter()
  const asdasd = async () => {
    console.log('hello i was pressed')
    const response = await login({ body: { name: 'Rinor', surname: "Kastrati", password: "Unbrokenmaan2_"}})
    if(response?.data === 'Error')
       return
    setCookie('authorization', response?.data, { expires: new Date(Date.now() + 24 * 60 * 60 * 1000)});
    router.push('/')
  }

  return <div>
    <Loading />
    {/* <Image src="/keta-logo.png" width={200} height={200} alt='no keta'/> */}
    <button onClick={asdasd}>click me</button>
    <button onClick={() => {
      deleteCookie('authorization')
      router.push('/login')
    }}>logout</button>
  </div>
}
