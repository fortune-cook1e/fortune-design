import { Button } from 'fortune-design'
import { FC, useCallback, useEffect, useState } from 'react'
import CodeView from 'react-code-view'

import { canUseDom } from '@/utils'
const Viewer: FC = () => {
  const [showCodeView, setShowCodeView] = useState(false)

  useEffect(() => {
    // FixBug: vercel Hydration bug
    setShowCodeView(canUseDom)
  }, [])

  const beforeCompile = (code: string) => {
    let deps = [`import React from 'react';`, `import ReactDOM from 'react-dom';`]

    return `${deps.join('\n')}\n${code}`
  }

  const afterCompile = (code: string) => {
    return code.replace(/import\ [\*\w\,\{\}\ \n]+\ from\ ?[\."'@/\w-]+;/gi, '')
  }

  const renderPlaceholder = useCallback(() => {
    return (
      <div className='w-8 h-8 text-center leading-8 rounded-lg text-blue-200 bg-slate-300'>
        Code View Placeholder
      </div>
    )
  }, [])

  if (showCodeView) {
    return (
      <CodeView
        style={{ minHeight: 100 }}
        dependencies={{ Button }}
        beforeCompile={beforeCompile}
        afterCompile={afterCompile}
      >
        {require('../../pages/components/button/index.md')}
      </CodeView>
    )
  }

  return renderPlaceholder()
}

export default Viewer
