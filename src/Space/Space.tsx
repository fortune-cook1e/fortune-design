import React, { Children, CSSProperties, FC, ReactNode } from 'react'

import { WithAsProps } from '../@types/common'
import { useClassNames } from '../hooks'
import SpaceItem from './SpaceItem'

export interface SpaceProps extends WithAsProps {
  /**
   * The direction of the children in the stack.
   */
  direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse'

  /**
   * Define the alignment of the children in the stack on the cross axis
   */
  alignItems?: 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline'

  /**
   *  Define the alignment of the children in the stack on the inline axis
   */
  justifyContent?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around'

  gap?: number | string | (number | string)[]

  divider?: ReactNode

  wrap?: boolean
}

const Space: FC<SpaceProps> = ({
  as: Component = 'div',
  direction,
  alignItems = 'center',
  justifyContent,
  gap,
  wrap,
  divider,
  className,
  style,
  children
}) => {
  const { withClassPrefix, prefix, merge } = useClassNames('space')
  const classes = merge(className, withClassPrefix())

  const flexGap = Array.isArray(gap) ? gap : [gap, gap]
  const itemStyles: CSSProperties = {
    marginRight: flexGap[0],
    marginBottom: flexGap[1]
  }

  const styles = {
    alignItems,
    justifyContent,
    flexDirection: direction,
    flexWrap: wrap ? 'wrap' : undefined,
    gap, // need to check gap attribute compatibility
    ...style
  }

  // remove undefined, null and boolean
  const filterChildren = Children.toArray(children)
  const count = filterChildren.length

  return (
    <Component className={classes} style={styles}>
      {Children.map(filterChildren, (child, index) => {
        const childNode = (
          <SpaceItem key={index} className={prefix('item')} style={itemStyles}>
            {child}
          </SpaceItem>
        )
        return [childNode, index < count - 1 ? divider : null]
      })}
    </Component>
  )
}

export default Space
