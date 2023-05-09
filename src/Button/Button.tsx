import React, { FC, ReactNode } from 'react'

import { useClassNames } from '../hooks'

export interface ButtonProps {
  loading?: boolean
  className?: string
  style?: React.CSSProperties
  active?: boolean
  children?: ReactNode
  //
  // onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  // type?: 'button' | 'reset' | 'submit'
  // disabled?: boolean
  // size?: 'large' | 'small' | 'default'
  // htmlType?: 'button' | 'submit' | 'reset'
  // icon?: ReactNode
  // shape?: 'circle' | 'round'
  // block?: boolean
  // danger?: boolean
  // ghost?: boolean
  // href?: string
  // target?: string
  // rel?: string
  // title?: string
}

const Button: FC<ButtonProps> = ({ loading = true, className, active, children }) => {
  const { withClassPrefix, prefix, merge } = useClassNames('btn')

  const classes = merge(className, withClassPrefix({ loading }))

  console.log({ classes })

  return (
    <button className='fortune-btn'>
      {loading ? 'loading..' : 'not loading'}-{children}
    </button>
  )
}

export default Button
