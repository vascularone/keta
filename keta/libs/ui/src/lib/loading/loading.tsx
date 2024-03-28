import styles from './loading.module.scss'
import Image from 'next/image'

export const Loading = () => {
  return <Image src="/keta-reverse-sl-black.svg" alt='no loading' width={100} height={100} className={styles.loading}/>
}
