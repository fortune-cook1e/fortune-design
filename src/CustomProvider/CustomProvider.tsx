import React, { createContext, FC, ReactNode, useContext, useMemo } from 'react'

export interface CustomProviderProps {
  classPrefix?: string
  children?: ReactNode
}

export const CustomContext = createContext<CustomProviderProps>({})

const CustomProvider: FC<CustomProviderProps> = ({ classPrefix, children }) => {
  const value = useMemo(() => {
    return {
      classPrefix
    }
  }, [])

  return <CustomContext.Provider value={value}>{children}</CustomContext.Provider>
}

export const useCustomContext = () => useContext(CustomContext)

export default CustomProvider
