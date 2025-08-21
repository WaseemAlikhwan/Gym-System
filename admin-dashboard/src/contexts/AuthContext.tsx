import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import authApi, { User, LoginData } from '../services/authApi'

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  loading: boolean
  isAdmin: boolean
  isCoach: boolean
  isMember: boolean
  login: (credentials: LoginData) => Promise<void>
  logout: () => Promise<void>
  updateUser: (userData: Partial<User>) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkAuthStatus()
  }, [])

  const checkAuthStatus = async () => {
    try {
      const localUser = authApi.getLocalUser()
      if (localUser && authApi.isAuthenticated()) {
        // التحقق من صحة التوكن
        const isValid = await authApi.validateToken()
        if (isValid) {
          setUser(localUser)
        } else {
          authApi.clearLocalAuth()
        }
      }
    } catch (error) {
      console.error('Auth check error:', error)
      authApi.clearLocalAuth()
    } finally {
      setLoading(false)
    }
  }

  const login = async (credentials: LoginData) => {
    try {
      setLoading(true)
      const response = await authApi.login(credentials)
      
      // Backend returns data in data field
      const { user: userData, token } = response.data
      
      // Check if user is admin (dashboard access only)
      if (userData.role !== 'admin') {
        throw new Error('غير مسموح لك بالوصول إلى لوحة التحكم. هذا التطبيق مخصص للإدارة فقط.')
      }
      
      authApi.saveLocalAuth(token, userData)
      setUser(userData)
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    try {
      setLoading(true)
      await authApi.logout()
    } finally {
      setUser(null)
      setLoading(false)
    }
  }

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...userData })
    }
  }

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    loading,
    isAdmin: user?.role === 'admin',
    isCoach: user?.role === 'coach',
    isMember: user?.role === 'member',
    login,
    logout,
    updateUser,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
