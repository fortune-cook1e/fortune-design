import { useRouter } from 'next/router'
import { FC, ReactNode } from 'react'

import CustomCodeView, { CustomCodeViewProps } from '../CustomCodeView'
import HeaderNav from '../HeaderNav'
import SideNav from '../SideNav'

interface Props extends CustomCodeViewProps {
  category?: string
  children?: ReactNode
}

const PageContent: FC<Props> = ({ children, category = 'components', dependencies }) => {
  const router = useRouter()
  const pathname = router.pathname
  const id = pathname.match(new RegExp(`\/${category}\/(\\S*)`))?.[1]

  return (
    <div className='w-full min-h-screen'>
      <HeaderNav />
      <div className='flex w-full h-full'>
        <SideNav />

        <div className='w-full p-8'>
          <CustomCodeView
            source={require(`../../pages/components/${id}/index.md`)}
            dependencies={dependencies}
          />
        </div>
      </div>
    </div>
  )
}

export default PageContent
