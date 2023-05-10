import React, { FC, ReactNode } from 'react'

import { useClassNames } from '../hooks'

export interface ButtonProps {
  loading?: boolean
  className?: string
  style?: React.CSSProperties
  active?: boolean
  onClick?: () => void
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

const Button: FC<ButtonProps> = ({ loading = true, className, active, onClick, children }) => {
  const { withClassPrefix, merge } = useClassNames('btn')

  const classes = merge(className, withClassPrefix({ loading, active }))

  return (
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  )
}

export default Button
