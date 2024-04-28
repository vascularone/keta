'use client'
import Image from 'next/image'
import styles from './login.module.scss'
import { createRef, useTransition } from 'react'
import { setCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'
import { login } from '../../requests/users'
import { Button, Loading, Input } from '@keta/ui'

export const Login = () => {
  const router = useRouter()
  const [isPending, startTransition] = useTransition();
  const nameInput = createRef<HTMLInputElement>()
  const passwordInput = createRef<HTMLInputElement>()

  const loginHandler = async () => {
    startTransition(async () => {
      try {
        const response = await login({ body: { name: nameInput.current?.value ?? '', surname: "Kastrati", password: passwordInput.current?.value ?? ''}})
        if(response.errorCode && response.errorCode === 300) {
          console.log('NOT LA RIGHT PASSOWRD MATE')
          return
        }
        setCookie('authorization', response.data, { expires: new Date(Date.now() + 24 * 60 * 60 * 1000)})
        router.push('/')
       } catch (error) {
        console.error(error)
       }
    })

  }
  if(isPending) return <div className={styles.loader}><Loading /></div>
  return <form action={loginHandler} className={styles.formWrapper}>
    <div className={styles.logoWrapper}>
     <Image src="/keta-reverse-sl-black.svg" width={250} height={250} alt='no keta' className={styles.logo}/>
     <span className={styles.keta}>keta</span>
    </div>
    <div className={styles.formInputs}>
    <Input ref={nameInput} placeholder='uname' type='text'/>
    <Input ref={passwordInput} placeholder='password' type='password'/>
    <Button type='submit'><span>login</span></Button>
    </div>
    </form>
}
