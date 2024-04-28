import { DetailedHTMLProps, InputHTMLAttributes, forwardRef } from 'react'
import styles from './input.module.scss'
import React from 'react'

interface P extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  disabled?: boolean
  iconURL?: string
}
const Input = forwardRef<HTMLInputElement, P>(({disabled, iconURL, ...props}: P, ref) => {
  return <input className={styles.input} ref={ref} {...props} disabled={disabled} style={{...(iconURL && {backgroundImage: `url(${iconURL})`, backgroundRepeat: 'no-repeat', backgroundPosition: '2px 3px', backgroundSize: '20px 16px', textIndent: '25px'})}}/>
});

Input.displayName = 'Input';

export { Input };
