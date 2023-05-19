import React, { FC } from 'react'

import { WithAsProps } from '../@types/common'

export interface SpaceItemProps extends WithAsProps {
  alignSelf?: 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch'
  flex?: React.CSSProperties['flex']
  grow?: React.CSSProperties['flexGrow']
  shrink?: React.CSSProperties['flexShrink']
  basis?: React.CSSProperties['flexBasis']
  order?: React.CSSProperties['order']
}

const SpaceItem: FC<SpaceItemProps> = ({
  className,
  style,
  as: Component = 'div',
  alignSelf,
  flex,
  grow,
  shrink,
  basis,
  order,
  children
}) => {
  return (
    <Component
      className={className}
      style={{
        alignSelf,
        order,
        ...(flex ? { flex } : { flexGrow: grow, flexShrink: shrink, flexBasis: basis }),
        ...style
      }}
    >
      {children}
    </Component>
  )
}

export default SpaceItem
