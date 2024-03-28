'use client'
import { deleteCookie } from "cookies-next"
import { useRouter } from "next/navigation"
import styles from './header.module.scss'

export const Header = () => {
  const router = useRouter()
  return <div className={styles.header}>
    <button onClick={() => {
      deleteCookie('authorization')
      router.push('/login')
    }}>logout</button>
  </div>
}
