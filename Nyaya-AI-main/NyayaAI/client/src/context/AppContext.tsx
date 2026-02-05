import { createContext, useContext, useState, ReactNode } from 'react'

interface AppState {
  isLoading: boolean
  user: User | null
  searchQuery: string
}

interface User {
  id: string
  name: string
  email: string
}

interface AppContextType extends AppState {
  setIsLoading: (loading: boolean) => void
  setUser: (user: User | null) => void
  setSearchQuery: (query: string) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  const value: AppContextType = {
    isLoading,
    user,
    searchQuery,
    setIsLoading,
    setUser,
    setSearchQuery,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}
