import { FC } from 'react'

import components from './components.config.json'

const SideNav: FC = () => {
  return (
    <div className='w-200-px bg-slate-800'>
      {components.map(item => {
        return (
          <div key={item.id} className='w-full h-10 leading-10 pl-6 text-blue-500  cursor-pointer'>
            {item.name}
          </div>
        )
      })}
    </div>
  )
}

export default SideNav
