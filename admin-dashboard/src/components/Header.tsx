import React from 'react'
import { useAuth } from '../contexts/AuthContext'

const Header: React.FC = () => {
  const { user, logout } = useAuth()

  const handleLogout = async () => {
    await logout()
  }

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-gray-900">Gym Admin</h1>
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-500">
              مرحباً، {user?.name || 'Admin'}
            </div>
            <button 
              onClick={handleLogout}
              className="text-sm text-gray-600 hover:text-gray-900 px-3 py-1 rounded-md hover:bg-gray-100"
            >
              تسجيل الخروج
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
