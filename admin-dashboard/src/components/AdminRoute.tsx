import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

interface AdminRouteProps {
  children: React.ReactNode
}

const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const { isAuthenticated, isAdmin, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">جاري التحميل...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    // حفظ المسار الحالي للعودة إليه بعد تسجيل الدخول
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  if (!isAdmin) {
    // إذا كان المستخدم ليس مدير، عرض رسالة خطأ
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="text-red-500 text-6xl mb-4">🚫</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">غير مصرح لك بالوصول</h1>
          <p className="text-gray-600 mb-6">
            هذا Dashboard مخصص للمديرين فقط. المدربين والأعضاء يستخدمون تطبيق الموبايل.
          </p>
          <div className="space-y-3">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-medium text-blue-900 mb-2">للمدربين:</h3>
              <p className="text-sm text-blue-700">استخدم تطبيق الموبايل لإدارة أعضائك وخطط التمارين</p>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-medium text-green-900 mb-2">للأعضاء:</h3>
              <p className="text-sm text-green-700">استخدم تطبيق الموبايل لمتابعة خططك وحضورك</p>
            </div>
          </div>
          <button
            onClick={() => window.location.href = '/login'}
            className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            العودة لتسجيل الدخول
          </button>
        </div>
      </div>
    )
  }

  return <>{children}</>
}

export default AdminRoute
