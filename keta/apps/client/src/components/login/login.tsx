'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { login } from '../../requests/users'
import { setCookie } from 'cookies-next'
import { useTransition } from 'react'
import { Loading } from '../images/loading'
import styles from './login.module.scss'

export const Login = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter()
  const loginHandler = async (formData: FormData) => {
    startTransition(async () => {
      try {
        const rawData= {
          name: formData.get('name'),
          password: formData.get('password')
        }
        console.log('formData', formData)
        const response = await login({ body: { name: rawData.name, surname: "Kastrati", password: rawData.password}})
        if(response === 'Error')
           {
            console.log('NOT LA RIGHT PASSOWRD MATE')
            return
           }
           setCookie('authorization', response, { expires: new Date(Date.now() + 24 * 60 * 60 * 1000)})
       } catch (error) {
        console.error(error)
       }
       router.push('/')
    })

  }
  if(isPending) return <div className={styles.loader}><Loading /></div>
  return <form action={loginHandler} className={styles.formWrapper}>
    <Image src="/keta-layer-black.svg" width={150} height={150} alt='no keta'/>
    <input type="text" name="username" />
    <input type="password" name="passowrd" />
    <button type='submit'>login</button>
    </form>
}
