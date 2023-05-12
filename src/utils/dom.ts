import { RefObject } from 'react'
import { findDOMNode } from 'react-dom'

const canUseDOM = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
)

export type CustomEventListener<T = any> = (evt: T) => void

const getRefTarget = (ref: RefObject<Element> | Element | null | undefined) => {
  return ref && ('current' in ref ? ref.current : ref)
}

export function getDOMNode(elementOrRef) {
  // If elementOrRef is an instance of Position, child is returned. [PositionInstance]
  const element = elementOrRef?.root || elementOrRef?.child || getRefTarget(elementOrRef)

  // Native HTML elements
  if (element?.nodeType && typeof element?.nodeName === 'string') {
    return element
  }

  // If you can't get the native HTML element, you can only get it through findDOMNode.
  // eslint-disable-next-line react/no-find-dom-node
  return findDOMNode(element) as Element
}

/**
 * Bind `target` event `eventName`'s callback `listener`.
 * @param target The DOM element
 * @param eventType The event name
 * @param listener  The event listener
 * @param options   The event options
 * @returns   The event listener
 */
export function on<K extends keyof DocumentEventMap>(
  target: Element | Window | Document | EventTarget,
  eventType: K,
  listener: EventListenerOrEventListenerObject | CustomEventListener,
  options: boolean | AddEventListenerOptions = false
): { off: () => void } {
  target.addEventListener(eventType, listener, options)

  return {
    off() {
      target.removeEventListener(eventType, listener, options)
    }
  }
}

export function getTransitionProperties() {
  if (!canUseDOM) {
    return {}
  }

  const vendorMap = {
    O: e => `o${e.toLowerCase()}`,
    Moz: e => e.toLowerCase(),
    Webkit: e => `webkit${e}`,
    ms: e => `MS${e}`
  }

  const vendors = Object.keys(vendorMap)

  let style: any = document.createElement('div').style

  let tempTransitionEnd
  let tempPrefix = ''

  for (let i = 0; i < vendors.length; i += 1) {
    const vendor = vendors[i]

    if (`${vendor}TransitionProperty` in style) {
      tempPrefix = `-${vendor.toLowerCase()}`
      tempTransitionEnd = vendorMap[vendor]('TransitionEnd')
      break
    }
  }

  if (!tempTransitionEnd && 'transitionProperty' in style) {
    tempTransitionEnd = 'transitionend'
  }

  style = null

  const addPrefix = (name: string) => `${tempPrefix}-${name}`

  return {
    end: tempTransitionEnd,
    backfaceVisibility: addPrefix('backface-visibility'),
    transform: addPrefix('transform'),
    property: addPrefix('transition-property'),
    timing: addPrefix('transition-timing-function'),
    delay: addPrefix('transition-delay'),
    duration: addPrefix('transition-duration')
  }
}
