import styles from './loading.module.scss'
import Image from 'next/image'

export const Loading = ({width, height}: {width?: number; height?: number}) =>
       <Image src="/keta-reverse-sl-black.svg" alt='no loading' width={width ?? 100} height={height ?? 100} className={styles.loading}/>
