import getOffset from 'dom-lib/getOffset'
import on from 'dom-lib/on'
import React, { FC, useCallback, useEffect, useRef, useState } from 'react'

import { Offset, WithAsProps } from '../@types/common'
import Transition from '../Animation/Transition'
import { useClassNames } from '../hooks'

export interface RippleProps extends WithAsProps {
  onMouseDown?: (position: any, event: React.MouseEvent) => void
  className?: string
}

const getPosition = (target: HTMLElement, event: React.MouseEvent) => {
  const offset = getOffset(target) as Offset
  const offsetX = (event.pageX || 0) - offset.left
  const offsetY = (event.pageY || 0) - offset.top

  const radiusX = Math.max(offset.width - offsetX, offsetX)
  const radiusY = Math.max(offset.height - offsetY, offsetY)
  const radius = Math.sqrt(Math.pow(radiusX, 2) + Math.pow(radiusY, 2))

  return {
    width: radius * 2,
    height: radius * 2,
    left: offsetX - radius,
    top: offsetY - radius
  }
}

const Ripple: FC<RippleProps> = props => {
  const { className, onMouseDown, ...rest } = props
  const { merge, prefix, withClassPrefix } = useClassNames('ripple')
  const classes = merge(className, prefix('pond'))
  const triggerRef = useRef<HTMLElement>(null)
  const [rippling, setRippling] = useState(false)
  const [position, setPosition] = useState<React.CSSProperties>()

  const handleRippled = () => {
    setRippling(false)
  }

  const handleMouseDown = useCallback(
    (event: React.MouseEvent) => {
      if (triggerRef.current) {
        const position = getPosition(triggerRef.current, event)
        setRippling(true)
        setPosition(position)
        onMouseDown?.(position, event)
      }
    },
    [onMouseDown]
  )

  useEffect(() => {
    const parentNode = triggerRef.current?.parentNode
    if (parentNode) {
      const mousedownListener = on(parentNode, 'mousedown', handleMouseDown)
      return () => {
        mousedownListener?.off()
      }
    }
  }, [handleMouseDown])

  return (
    <span {...rest} className={classes} ref={triggerRef}>
      <Transition in={rippling} enteringClassName={prefix('rippling')} onEntered={handleRippled}>
        {(props, ref) => {
          const { className, ...transitionRest } = props
          return (
            <span
              {...transitionRest}
              ref={ref}
              className={merge(withClassPrefix(), className)}
              style={position}
            />
          )
        }}
      </Transition>
    </span>
  )
}

export default Ripple
