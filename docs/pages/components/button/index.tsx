/* eslint-disable simple-import-sort/imports */
/* eslint-disable @typescript-eslint/no-require-imports */
import CodeView from 'react-code-view'
import 'react-code-view/styles/react-code-view.css'
import { Button } from 'fortune-design'
import DefaultLayout from '@/components/DefaultLayout'

const ButtonPage = () => {
  return (
    <DefaultLayout>
      <CodeView dependencies={{ Button }}>{require('./button.md')}</CodeView>
    </DefaultLayout>
  )
}

export default ButtonPage
