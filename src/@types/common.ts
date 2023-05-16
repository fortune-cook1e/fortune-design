export interface AnimationEventProps {
  /** Callback fired before the Modal transitions in */
  onEnter?: (node: HTMLElement) => void

  /** Callback fired as the Modal begins to transition in */
  onEntering?: (node: HTMLElement) => void

  /** Callback fired after the Modal finishes transitioning in */
  onEntered?: (node: HTMLElement) => void

  /** Callback fired right before the Modal transitions out */
  onExit?: (node: HTMLElement) => void

  /** Callback fired as the Modal begins to transition out */
  onExiting?: (node: HTMLElement) => void

  /** Callback fired after the Modal finishes transitioning out */
  onExited?: (node: HTMLElement) => void
}

export interface Offset {
  top: number
  left: number
  width: number
  height: number
}

export interface StandardProps {
  /** Additional classes */
  className?: string

  /** Primary content */
  children?: React.ReactNode

  /** Additional style */
  style?: React.CSSProperties
}

export interface WithAsProps<As extends React.ElementType | string = React.ElementType>
  extends StandardProps {
  /** You can use a custom element for this component */
  as?: As
}
