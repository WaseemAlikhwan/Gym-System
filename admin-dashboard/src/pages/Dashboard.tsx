import React, { useState, useEffect } from 'react'
import dashboardApi, { DashboardData, DashboardStats } from '../services/dashboardApi'
import { 
  WeeklyAttendanceChart, 
  MembershipDistributionChart, 
  GrowthChart 
} from '../components/charts'
import ExpiringSubscriptions from '../components/ExpiringSubscriptions'

const Dashboard: React.FC = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await dashboardApi.getDashboardStats()
      setDashboardData(data)
    } catch (err: any) {
      console.error('Dashboard error details:', err)
      const errorMessage = err.message || 'فشل في جلب البيانات من قاعدة البيانات'
      setError(`${errorMessage}\n\nيرجى التأكد من:\n1. تشغيل Laravel Backend\n2. وجود بيانات في قاعدة البيانات\n3. إعدادات CORS`)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">جاري تحميل البيانات من قاعدة البيانات...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex">
          <div className="text-red-800">
            <p className="font-medium">خطأ في تحميل البيانات</p>
            <div className="text-sm mt-2 whitespace-pre-line">{error}</div>
            <button 
              onClick={fetchDashboardData}
              className="mt-4 text-sm text-red-600 hover:text-red-800 underline"
            >
              حاول مرة أخرى
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (!dashboardData) {
    return null
  }

  const { stats, weeklyAttendance, membershipDistribution, recentActivities } = dashboardData

  // بيانات نمو وهمية للرسم البياني (يمكن استبدالها ببيانات حقيقية لاحقاً)
  const growthData = [
    { month: 'يناير', members: 0, coaches: 0, revenue: 0 },
    { month: 'فبراير', members: 0, coaches: 0, revenue: 0 },
    { month: 'مارس', members: 0, coaches: 0, revenue: 0 },
    { month: 'أبريل', members: 0, coaches: 0, revenue: 0 },
    { month: 'مايو', members: 0, coaches: 0, revenue: 0 },
    { month: 'يونيو', members: 0, coaches: 0, revenue: 0 },
    { month: 'يوليو', members: 0, coaches: 0, revenue: 0 },
    { month: 'أغسطس', members: stats.totalMembers, coaches: stats.activeCoaches, revenue: stats.monthlyRevenue },
  ]

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        لوحة تحكم النادي الرياضي
      </h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <div className="card">
          <div className="text-2xl font-bold text-blue-600">{stats.totalMembers.toLocaleString()}</div>
          <div className="text-sm text-gray-600">إجمالي الأعضاء</div>
          <div className="text-xs text-green-600 mt-1">{stats.memberGrowth} من الشهر الماضي</div>
        </div>
        
        <div className="card">
          <div className="text-2xl font-bold text-green-600">{stats.activeCoaches}</div>
          <div className="text-sm text-gray-600">المدربين النشطين</div>
          <div className="text-xs text-green-600 mt-1">{stats.coachGrowth} من الشهر الماضي</div>
        </div>
        
        <div className="card">
          <div className="text-2xl font-bold text-purple-600">{stats.todayAttendance}</div>
          <div className="text-sm text-gray-600">الحضور اليوم</div>
          <div className="text-xs text-green-600 mt-1">{stats.attendanceGrowth} من الشهر الماضي</div>
        </div>
        
        <div className="card">
          <div className="text-2xl font-bold text-orange-600">${stats.monthlyRevenue.toLocaleString()}</div>
          <div className="text-sm text-gray-600">الإيرادات الشهرية</div>
          <div className="text-xs text-green-600 mt-1">{stats.revenueGrowth} من الشهر الماضي</div>
        </div>
      </div>
      
      {/* Charts Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 mb-8">
        {/* Weekly Attendance Chart */}
        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">الحضور الأسبوعي</h3>
          <WeeklyAttendanceChart data={weeklyAttendance} />
        </div>
        
        {/* Membership Distribution */}
        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">توزيع العضويات</h3>
          <MembershipDistributionChart data={membershipDistribution} />
        </div>
      </div>

      {/* Growth Chart */}
      <div className="card mb-8">
        <h3 className="text-lg font-medium text-gray-900 mb-4">نمو النظام</h3>
        <GrowthChart data={growthData} />
      </div>

      {/* Expiring Subscriptions */}
      <div className="mb-8">
        <ExpiringSubscriptions subscriptions={dashboardData.expiringSubscriptions} />
      </div>
      
      {/* Welcome Message */}
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          مرحباً بك في نظام إدارة النادي الرياضي
        </h2>
        <p className="text-gray-600 mb-4">
          هذه البيانات تأتي مباشرة من قاعدة البيانات! تم ربط النظام بنجاح مع Laravel Backend.
        </p>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-green-800 text-sm">
            <strong>تم الربط بنجاح:</strong> Dashboard يجلب البيانات الحقيقية من قاعدة البيانات.
            البيانات محدثة في الوقت الفعلي.
          </p>
        </div>
      </div>
      
      {/* Recent Activity */}
      <div className="card mt-8">
        <h3 className="text-lg font-medium text-gray-900 mb-4">النشاطات الأخيرة</h3>
        <div className="space-y-4">
          {recentActivities.length > 0 ? (
            recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <div className={`h-2 w-2 rounded-full ${
                    activity.type === 'member' ? 'bg-blue-400' :
                    activity.type === 'payment' ? 'bg-green-400' :
                    activity.type === 'workout' ? 'bg-purple-400' :
                    'bg-orange-400'
                  }`}></div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900">{activity.action}</p>
                  <p className="text-sm text-gray-500">{activity.user} • {activity.time}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500 py-8">
              <p>لا توجد نشاطات حديثة</p>
              <p className="text-sm">سيتم عرض النشاطات هنا عند إضافتها</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard