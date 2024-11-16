"use client"

import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  ReactNode,
} from "react"

type UserAgent = string

type UserAgentContextType = {
  userAgent: UserAgent | undefined
}

type UserAgentProviderProps = {
  children: ReactNode
  userAgent?: UserAgent
}

const UserAgentContext = createContext<UserAgentContextType | undefined>(
  undefined
)

export const useUserAgentContext = (): UserAgentContextType => {
  const context = useContext(UserAgentContext)
  if (context === undefined) {
    throw new Error(
      "useUserAgentContext must be used within a UserAgentProvider"
    )
  }
  return context
}

export const UserAgentProvider: React.FC<UserAgentProviderProps> = ({
  children,
  userAgent: initialUserAgent,
}) => {
  const [userAgent] = useState<UserAgent | undefined>(initialUserAgent)

  const value = useMemo<UserAgentContextType>(
    () => ({
      userAgent,
    }),
    [userAgent]
  )

  return (
    <UserAgentContext.Provider value={value}>
      {children}
    </UserAgentContext.Provider>
  )
}
