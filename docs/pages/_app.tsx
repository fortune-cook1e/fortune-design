import type { AppProps } from 'next/app'
import '../styles/index.less'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
