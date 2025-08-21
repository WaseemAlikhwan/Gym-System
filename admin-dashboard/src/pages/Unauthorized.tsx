import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ShieldExclamationIcon, ArrowLeftIcon } from '@heroicons/react/24/outline'

const Unauthorized: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6 text-center">
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100">
          <ShieldExclamationIcon className="h-8 w-8 text-red-600" />
        </div>
        
        <h1 className="mt-4 text-2xl font-bold text-gray-900">غير مصرح لك</h1>
        <p className="mt-2 text-gray-600">
          عذراً، لا يمكنك الوصول إلى هذه الصفحة. هذه الصفحة مخصصة للمديرين فقط.
        </p>
        
        <div className="mt-6 space-y-3">
          <button
            onClick={() => navigate('/')}
            className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            <ArrowLeftIcon className="h-4 w-4 ml-2" />
            العودة للصفحة الرئيسية
          </button>
          
          <button
            onClick={() => navigate('/login')}
            className="w-full px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            تسجيل الدخول بحساب آخر
          </button>
        </div>
        
        <div className="mt-6 text-sm text-gray-500">
          <p>إذا كنت تعتقد أن هذا خطأ، يرجى التواصل مع إدارة النظام.</p>
        </div>
      </div>
    </div>
  )
}

export default Unauthorized
