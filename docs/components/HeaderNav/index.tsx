import { useRouter } from 'next/router'
import { FC } from 'react'

const HeaderNav: FC = () => {
  const router = useRouter()

  const goHome = () => {
    router.push('/')
  }

  return (
    <div className='w-full h-16 bg-blue-300 flex items-center px-8'>
      <div
        className='w-8 h-8 rounded-full bg-white text-center leading-8 text-black font-bold cursor-pointer hover:scale-125 duration-300'
        onClick={goHome}
      >
        F
      </div>
    </div>
  )
}

export default HeaderNav
