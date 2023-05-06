/* eslint-disable simple-import-sort/imports */
/* eslint-disable @typescript-eslint/no-require-imports */
import CodeView from 'react-code-view'
import 'react-code-view/styles/react-code-view.css'

const ButtonPage = () => {
  return (
    <div>
      <CodeView>{require('./example.md')}</CodeView>
    </div>
  )
}

export default ButtonPage
