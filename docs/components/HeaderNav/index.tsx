import { useRouter } from 'next/router'
import { FC } from 'react'
import { AiFillHome } from 'react-icons/ai'

const HeaderNav: FC = () => {
  const router = useRouter()

  const goHome = () => {
    router.push('/')
  }

  return (
    <div className='w-full h-16 bg-blue-300 flex items-center px-8'>
      <div
        className='w-12 h-12 flex items-center justify-center rounded-full bg-white text-black font-bold cursor-pointer'
        onClick={goHome}
      >
        <AiFillHome className='text-3xl hover:scale-125 duration-300' />
      </div>
    </div>
  )
}

export default HeaderNav
