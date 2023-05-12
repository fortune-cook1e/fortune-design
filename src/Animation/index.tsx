import Transition, { TransitionProps } from './Transition'

export interface AnimationAPI {
  Transition: React.ComponentType<TransitionProps>
}

const Animation: AnimationAPI = {
  Transition
}

export type { TransitionProps }
export default Animation
