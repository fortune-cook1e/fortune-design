import { FC } from 'react'
import CodeView, { CodeViewProps } from 'react-code-view'

const afterCompile = (code: string) => {
  return code.replace(/import\ [\*\w\,\{\}\ \n]+\ from\ ?[\."'@/\w-]+;/gi, '')
}

const ReactCodeView: FC<CodeViewProps> = props => {
  return <CodeView {...props} theme='dark' afterCompile={afterCompile} />
}

export default ReactCodeView
