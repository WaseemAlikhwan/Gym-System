import api from './api'

export interface Coach {
  id: number
  name: string
  email: string
  phone: string
  role: 'coach'
  gender: 'male' | 'female'
  birth_date?: string
  profile_image?: string
  fingerprint_id?: string
  created_at: string
  updated_at: string
  members?: Member[]
  workoutPlans?: WorkoutPlan[]
  nutritionPlans?: NutritionPlan[]
}

export interface Member {
  id: number
  name: string
  email: string
  phone: string
  role: 'member'
  gender: 'male' | 'female'
}

export interface WorkoutPlan {
  id: number
  title: string
  description?: string
  start_date: string
  end_date: string
  created_at: string
}

export interface NutritionPlan {
  id: number
  title: string
  description?: string
  start_date: string
  end_date: string
  created_at: string
}

export interface CoachesResponse {
  success: boolean
  data: {
    data: Coach[]
    current_page: number
    last_page: number
    per_page: number
    total: number
  }
}

export interface CoachStats {
  total_coaches: number
  coaches_by_gender: {
    male: number
    female: number
  }
  total_members_assigned: number
  average_members_per_coach: number
}

class CoachesApi {
  // الحصول على قائمة المدربين
  async getCoaches(params?: {
    search?: string
    gender?: 'male' | 'female'
    page?: number
  }): Promise<CoachesResponse> {
    try {
      const response = await api.get('/users/coaches/list', { params })
      return response.data
    } catch (error: any) {
      console.error('Error fetching coaches:', error)
      throw new Error(error.response?.data?.message || 'فشل في جلب قائمة المدربين')
    }
  }

  // الحصول على مدرب محدد
  async getCoach(id: number): Promise<{ success: boolean; data: Coach }> {
    try {
      const response = await api.get(`/users/${id}`)
      return response.data
    } catch (error: any) {
      console.error('Error fetching coach:', error)
      throw new Error(error.response?.data?.message || 'فشل في جلب بيانات المدرب')
    }
  }

  // إنشاء مدرب جديد
  async createCoach(coachData: Partial<Coach>): Promise<{ success: boolean; message: string; data: Coach }> {
    try {
      const response = await api.post('/users', { ...coachData, role: 'coach' })
      return response.data
    } catch (error: any) {
      console.error('Error creating coach:', error)
      if (error.response?.data?.errors) {
        const errorMessages = Object.values(error.response.data.errors).flat().join(', ')
        throw new Error(errorMessages)
      }
      throw new Error(error.response?.data?.message || 'فشل في إنشاء المدرب')
    }
  }

  // تحديث بيانات المدرب
  async updateCoach(id: number, coachData: Partial<Coach>): Promise<{ success: boolean; message: string; data: Coach }> {
    try {
      const response = await api.put(`/users/${id}`, coachData)
      return response.data
    } catch (error: any) {
      console.error('Error updating coach:', error)
      if (error.response?.data?.errors) {
        const errorMessages = Object.values(error.response.data.errors).flat().join(', ')
        throw new Error(errorMessages)
      }
      throw new Error(error.response?.data?.message || 'فشل في تحديث بيانات المدرب')
    }
  }

  // حذف المدرب
  async deleteCoach(id: number): Promise<{ success: boolean; message: string }> {
    try {
      const response = await api.delete(`/users/${id}`)
      return response.data
    } catch (error: any) {
      console.error('Error deleting coach:', error)
      throw new Error(error.response?.data?.message || 'فشل في حذف المدرب')
    }
  }

  // الحصول على إحصائيات المدربين
  async getStats(): Promise<{ success: boolean; data: CoachStats }> {
    try {
      const response = await api.get('/users/stats')
      return response.data
    } catch (error: any) {
      console.error('Error fetching coach stats:', error)
      throw new Error(error.response?.data?.message || 'فشل في جلب إحصائيات المدربين')
    }
  }

  // الحصول على أعضاء المدرب
  async getCoachMembers(coachId: number): Promise<{ success: boolean; data: Member[] }> {
    try {
      const response = await api.get(`/coach-members/coach/${coachId}/members`)
      return response.data
    } catch (error: any) {
      console.error('Error fetching coach members:', error)
      throw new Error(error.response?.data?.message || 'فشل في جلب أعضاء المدرب')
    }
  }

  // الحصول على خطط التمارين للمدرب
  async getCoachWorkoutPlans(coachId: number): Promise<{ success: boolean; data: WorkoutPlan[] }> {
    try {
      const response = await api.get(`/workout-plans?coach_id=${coachId}`)
      return response.data
    } catch (error: any) {
      console.error('Error fetching coach workout plans:', error)
      throw new Error(error.response?.data?.message || 'فشل في جلب خطط التمارين للمدرب')
    }
  }

  // الحصول على خطط التغذية للمدرب
  async getCoachNutritionPlans(coachId: number): Promise<{ success: boolean; data: NutritionPlan[] }> {
    try {
      const response = await api.get(`/nutrition-plans?coach_id=${coachId}`)
      return response.data
    } catch (error: any) {
      console.error('Error fetching coach nutrition plans:', error)
      throw new Error(error.response?.data?.message || 'فشل في جلب خطط التغذية للمدرب')
    }
  }
}

export default new CoachesApi()
