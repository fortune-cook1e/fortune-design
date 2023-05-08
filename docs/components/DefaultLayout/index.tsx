import { FC, ReactNode } from 'react'

import HeaderNav from '../HeaderNav'
import SideNav from '../SideNav'

interface Props {
  children: ReactNode
}

const DefaultLayout: FC<Props> = ({ children }) => {
  return (
    <div className='w-full h-full'>
      <HeaderNav />
      <div className='flex w-full'>
        <SideNav />
        <div className='w-full'>{children}</div>
      </div>
    </div>
  )
}

export default DefaultLayout
