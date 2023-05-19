import { Button, Space } from 'fortune-design'
import { FC, useCallback, useEffect, useState } from 'react'

import { canUseDom } from '@/utils'

import ReactCodeView from './ReactCodeView'
export interface CustomCodeViewProps {
  dependencies?: any
  source?: any
  height?: number
}

const CustomCodeView: FC<CustomCodeViewProps> = ({ dependencies, source, height = 100 }) => {
  const [renderCodeView, setRenderCodeView] = useState(false)

  useEffect(() => {
    // FixBug: fix vercel hydration error
    if (canUseDom) {
      setRenderCodeView(true)
    }
  }, [])

  const setRenderCode = useCallback((code: string) => {
    let deps = [`import React from 'react';`, `import ReactDOM from 'react-dom';`]

    let depsCode = `${deps.join('\n')}\n${code}`
    return depsCode
  }, [])

  const renderPlaceholder = useCallback(() => {
    return (
      <div className='w-8 h-8 text-center leading-8 rounded-lg text-blue-200 bg-slate-300'>
        Code View Placeholder
      </div>
    )
  }, [])

  if (renderCodeView) {
    return (
      <ReactCodeView
        style={{ minHeight: height }}
        beforeCompile={setRenderCode}
        dependencies={dependencies}
      >
        {source}
      </ReactCodeView>
    )
  }

  return renderPlaceholder()
}

export default CustomCodeView
