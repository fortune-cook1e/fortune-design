import '@/styles/globals.less'
import 'react-code-view/styles/react-code-view.css'
import 'fortune-design/styles/index.less'

import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
