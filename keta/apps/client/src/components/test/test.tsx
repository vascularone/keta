'use client'
import { setCookie, deleteCookie } from 'cookies-next'
import { login } from '../../requests/users'
import { useRouter } from 'next/navigation'
import { Loading } from '../images/loading'
import { useState } from 'react'

export const Test = () => {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const asdasd = async () => {
   try {
    setLoading(true)
    console.log('hello i was pressed')
    const response = await login({ body: { name: 'Rinor', surname: "Kastrati", password: "Unbrokenmaan2_"}})
    console.log('response', response)
    if(response === 'Error')
       {
        console.log('NOT LA RIGHT PASSOWRD MATE')
        return
       }
    setCookie('authorization', response, { expires: new Date(Date.now() + 24 * 60 * 60 * 1000)});
    router.push('/')
   } catch (error) {
    console.error(error)
   } finally {
    setLoading(false)
   }
  }

  return loading ? <Loading /> : <div>
  {/* <Image src="/keta-logo.png" width={200} height={200} alt='no keta'/> */}
  <button onClick={asdasd}>click me</button>
  <button onClick={() => {
    deleteCookie('authorization')
    router.push('/login')
  }}>logout</button>
  <Loading />
</div>
}
