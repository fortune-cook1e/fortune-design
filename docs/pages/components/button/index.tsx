/* eslint-disable simple-import-sort/imports */
/* eslint-disable @typescript-eslint/no-require-imports */
import CodeView from 'react-code-view'
import 'react-code-view/styles/react-code-view.css'
import { Button } from 'fortune-design'
const ButtonPage = () => {
  return (
    <div>
      <CodeView dependencies={{ Button }}>{require('./button.md')}</CodeView>
    </div>
  )
}

export default ButtonPage
