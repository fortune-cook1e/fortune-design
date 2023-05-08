import { useRouter } from 'next/router'

export default function Home() {
  const router = useRouter()

  const goButton = () => {
    router.push('/components/button')
  }

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24 bg-black'>
      <div className='text-cyan-50 pt-32'>
        <h1 className='text-6xl font-bold mb-6'>Fortune-Design</h1>
        <button
          onClick={goButton}
          className='w-100 h-100 bg-blue-400 p-8 rounded-md hover:bg-blue-500 transition-colors duration-300 text-white font-bold text-2xl'
        >
          Components
        </button>
      </div>
    </main>
  )
}
