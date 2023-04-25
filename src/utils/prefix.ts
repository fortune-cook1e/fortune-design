import classNames from 'classnames'

export const globalKey = 'fortune-'
export const getClassNamePrefix = () => {
  return globalKey
}

export const prefix = (pre: string, className: string | string[]): string => {
  if (!pre || !className) return ''

  if (Array.isArray(className)) {
    return classNames(className.filter(name => !!name).map(name => `${pre}-${name}`))
  }

  return `${pre}-${className}`
}
