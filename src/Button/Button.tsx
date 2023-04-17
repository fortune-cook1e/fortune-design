import { FC } from 'react'

export interface ButtonProps {
  loading?: boolean
}

const Button: FC<ButtonProps> = ({ loading = false }) => {
  return <button className='fortune-btn'>{loading ? 'loading..' : 'not loading'}</button>
}

export default Button
