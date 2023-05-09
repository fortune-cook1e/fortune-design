import '@/styles/globals.less'
import 'react-code-view/styles/react-code-view.css'

import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
