import api from './api'

export interface DashboardStats {
  totalMembers: number
  activeCoaches: number
  todayAttendance: number
  monthlyRevenue: number
  memberGrowth: string
  coachGrowth: string
  attendanceGrowth: string
  revenueGrowth: string
}

export interface WeeklyAttendance {
  name: string
  attendance: number
}

export interface MembershipDistribution {
  name: string
  value: number
}

export interface RecentActivity {
  id: number
  action: string
  user: string
  time: string
  type: 'member' | 'payment' | 'workout' | 'attendance'
}

export interface DashboardData {
  stats: DashboardStats
  weeklyAttendance: WeeklyAttendance[]
  membershipDistribution: MembershipDistribution[]
  recentActivities: RecentActivity[]
  expiringSubscriptions: ExpiringSubscription[]
}

export interface ExpiringSubscription {
  id: number
  user_name: string
  user_email: string
  plan_type: string
  end_date: string
  days_until_expiry: number
  status: 'expires_today' | 'expires_soon'
  formatted_end_date: string
  formatted_days: string
  price: number
  payment_method: string
}

class DashboardApi {
  // الحصول على إحصائيات Dashboard
  async getDashboardStats(): Promise<DashboardData> {
    try {
      const response = await api.get('/test-dashboard') // استخدام route الاختبار
      const data = response.data
      
      // تحويل البيانات إلى الشكل المطلوب
      return {
        stats: {
          totalMembers: data.totalMembers,
          activeCoaches: data.activeCoaches,
          todayAttendance: 0,
          monthlyRevenue: 0,
          memberGrowth: '+100%',
          coachGrowth: '+100%',
          attendanceGrowth: '0%',
          revenueGrowth: '0%',
        },
        weeklyAttendance: [
          { name: 'Mon', attendance: 0 },
          { name: 'Tue', attendance: 0 },
          { name: 'Wed', attendance: 0 },
          { name: 'Thu', attendance: 0 },
          { name: 'Fri', attendance: 0 },
          { name: 'Sat', attendance: 0 },
          { name: 'Sun', attendance: 0 },
        ],
        membershipDistribution: [
          { name: 'Basic', value: 0 },
          { name: 'Premium', value: 0 },
          { name: 'VIP', value: 0 },
        ],
        recentActivities: [
          {
            id: 1,
            action: 'System initialized',
            user: 'System',
            time: 'Just now',
            type: 'member'
          }
        ],
        expiringSubscriptions: data.expiringSubscriptions || [
          {
            id: 1,
            user_name: 'أحمد محمد',
            user_email: 'ahmed@example.com',
            plan_type: 'Premium',
            end_date: new Date().toISOString().split('T')[0],
            days_until_expiry: 0,
            status: 'expires_today',
            formatted_end_date: new Date().toISOString().split('T')[0],
            formatted_days: 'اليوم',
            price: 100,
            payment_method: 'credit_card',
          }
        ],
      }
    } catch (error) {
      console.error('Error fetching dashboard stats:', error)
      throw new Error('فشل في جلب البيانات من قاعدة البيانات')
    }
  }

  // الحصول على إحصائيات الأعضاء
  async getMembersStats(): Promise<{ total: number; growth: string }> {
    try {
      const response = await api.get('/dashboard/members-stats')
      return response.data
    } catch (error) {
      console.error('Error fetching members stats:', error)
      throw new Error('فشل في جلب إحصائيات الأعضاء')
    }
  }

  // الحصول على إحصائيات المدربين
  async getCoachesStats(): Promise<{ total: number; growth: string }> {
    try {
      const response = await api.get('/dashboard/coaches-stats')
      return response.data
    } catch (error) {
      console.error('Error fetching coaches stats:', error)
      throw new Error('فشل في جلب إحصائيات المدربين')
    }
  }

  // الحصول على إحصائيات الحضور
  async getAttendanceStats(): Promise<{ today: number; growth: string }> {
    try {
      const response = await api.get('/dashboard/attendance-stats')
      return response.data
    } catch (error) {
      console.error('Error fetching attendance stats:', error)
      throw new Error('فشل في جلب إحصائيات الحضور')
    }
  }

  // الحصول على إحصائيات الإيرادات
  async getRevenueStats(): Promise<{ monthly: number; growth: string }> {
    try {
      const response = await api.get('/dashboard/revenue-stats')
      return response.data
    } catch (error) {
      console.error('Error fetching revenue stats:', error)
      throw new Error('فشل في جلب إحصائيات الإيرادات')
    }
  }
}

export default new DashboardApi()
