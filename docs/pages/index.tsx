import { useRouter } from 'next/router'

export default function Home() {
  const router = useRouter()

  const goButton = () => {
    router.push('/components/button')
  }

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <div className='z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex'>
        <h1>This is Fortune-Design</h1>
        <button onClick={goButton}>click</button>
      </div>
    </main>
  )
}
