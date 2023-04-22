import React, { FC, ReactNode } from 'react'

export interface ButtonProps {
  loading?: boolean
  children: ReactNode
}

const Button: FC<ButtonProps> = ({ loading = false, children }) => {
  return (
    <button className='fortune-btn'>
      {loading ? 'loading..' : 'not loading'}-{children}
    </button>
  )
}

export default Button
