import React, { FC, ReactNode, useCallback } from 'react'

import { WithAsProps } from '../@types/common'
import { useClassNames } from '../hooks'
import Ripple from '../Ripple'

export interface ButtonProps extends WithAsProps {
  loading?: boolean
  className?: string
  style?: React.CSSProperties
  active?: boolean
  disabled?: boolean
  onClick?: () => void
  size?: 'large' | 'small' | 'md'
  type?: 'primary' | 'default'
  children?: ReactNode
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

const Button: FC<ButtonProps> = ({
  loading = false,
  className,
  active,
  onClick,
  disabled = false,
  type = 'default',
  as = 'button',
  size = 'md',
  children
}) => {
  const { withClassPrefix, merge, prefix } = useClassNames('btn')

  const classes = merge(className, withClassPrefix(size, type, { loading, active, disabled }))

  const renderButtonContent = useCallback(() => {
    const spin = <span className={prefix('spin')}></span>
    return (
      <>
        {loading && spin}
        {children}
        <Ripple />
      </>
    )
  }, [loading, children, prefix])

  const Component = as || 'button'
  const componentType = Component === 'button' ? 'button' : undefined
  const role = Component !== 'button' ? 'button' : undefined

  return (
    <Component
      role={role}
      type={componentType}
      onClick={onClick}
      disabled={disabled}
      className={classes}
    >
      {renderButtonContent()}
    </Component>
  )
}

export default Button
