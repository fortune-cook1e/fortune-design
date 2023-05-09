import classNames from 'classnames'
import { useCallback } from 'react'

import { useCustomContext } from './../../CustomProvider/CustomProvider'
import { prefix as addPrefix } from './../../utils/prefix'

export type ClassValue = string | number | ClassDictionary | ClassArray | undefined | null | boolean

// This is the only way I found to break circular references between ClassArray and ClassValue
// https://github.com/Microsoft/TypeScript/issues/3496#issuecomment-128553540

export interface ClassArray extends Array<ClassValue> {} // eslint-disable-line @typescript-eslint/no-empty-interface

export interface ClassDictionary {
  [id: string]: any
}

function useClassNames(str: string) {
  const { classPrefix = 'fortune' } = useCustomContext()
  const componentName = addPrefix(classPrefix, str)

  /**
   * @example
   * if str = 'button':
   * prefix('red', { active: true }) => 'fortune-button-red fortune-button-active'
   */
  const prefix = useCallback(
    (...classes: ClassValue[]) => {
      const mergeClasses = classes.length
        ? classNames(...classes)
            .split(' ')
            .map(item => addPrefix(componentName, item))
        : []

      return mergeClasses.filter(cls => cls).join(' ')
    },
    [componentName]
  )

  /**
   * @example
   * if str = 'button':
   * withClassPrefix('red', { active: true }) => 'fortune-button fortune-button-red fortune-button-active'
   */
  const withClassPrefix = useCallback(
    (...classes: ClassValue[]) => {
      const mergeClasses = prefix(classes)
      return mergeClasses ? `${componentName} ${mergeClasses}` : componentName
    },
    [componentName, prefix]
  )

  /**
   * @example
   * rootPrefix('btn') => 'fortune-btn'
   * rootPrefix('btn', { active: true }) => 'fortune-btn fortune-active'
   */
  const rootPrefix = (...classes: ClassValue[]) => {
    const mergeClasses = classes.length
      ? classNames(...classes)
          .split(' ')
          .map(item => addPrefix(classPrefix, item))
      : []

    return mergeClasses.filter(cls => cls).join(' ')
  }

  return {
    withClassPrefix,
    merge: classNames,
    prefix,
    rootPrefix
  }
}

export default useClassNames
