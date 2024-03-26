'use client'
import { setCookie } from 'cookies-next'
import { createUser } from '../../requests/users'

export const Test = () => {

  const asdasd = async () => {
    const response = await createUser({ body: { name: 'KRRINOR', surname: "ARESKETA "}})
    setCookie('authorization', response?.data);
  }

  return <div>
    <button onClick={asdasd}>click me</button>
  </div>
}
