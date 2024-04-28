import { ReactNode } from 'react'
import React from 'react'
import styles from './button.module.scss'

export const Button = ({children, onClick, type}: {children: ReactNode, onClick?: () => void, type?: "button" | "submit" | "reset"}) => {
  return <button onClick={onClick} className={styles.button} type={type}>{children}</button>
}
