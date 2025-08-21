import api from './api'

export interface LoginData {
  email: string
  password: string
}

export interface User {
  id: number
  name: string
  email: string
  role: string
  phone?: string
  gender?: string
  birth_date?: string
  profile_image?: string
}

export interface AuthResponse {
  status: string
  message: string
  data: {
    user: User
    token: string
    token_type: string
  }
}

export interface ProfileResponse {
  status: string
  message: string
  data: User
}

class AuthApi {
  // تسجيل الدخول
  async login(credentials: LoginData): Promise<AuthResponse> {
    try {
      const response = await api.post('/login', credentials)
      return response.data
    } catch (error: any) {
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message)
      }
      throw new Error('Login failed. Please check your credentials.')
    }
  }

  // تسجيل الخروج
  async logout(): Promise<void> {
    try {
      await api.post('/logout')
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      // إزالة البيانات المحلية حتى لو فشل الطلب
      this.clearLocalAuth()
    }
  }

  // الحصول على الملف الشخصي
  async getProfile(): Promise<User> {
    try {
      const response = await api.get('/profile')
      return response.data.data // Backend returns data in data field
    } catch (error: any) {
      if (error.response?.status === 401) {
        this.clearLocalAuth()
        throw new Error('Session expired. Please login again.')
      }
      throw new Error('Failed to fetch profile')
    }
  }

  // تحديث الملف الشخصي
  async updateProfile(profileData: Partial<User>): Promise<User> {
    try {
      const response = await api.put('/profile', profileData)
      return response.data.data // Backend returns data in data field
    } catch (error: any) {
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message)
      }
      throw new Error('Failed to update profile')
    }
  }

  // التحقق من صحة التوكن
  async validateToken(): Promise<boolean> {
    try {
      const token = localStorage.getItem('auth_token')
      if (!token) return false
      
      await api.get('/profile')
      return true
    } catch (error) {
      return false
    }
  }

  // حفظ بيانات المصادقة محلياً
  saveLocalAuth(token: string, user: User): void {
    localStorage.setItem('auth_token', token)
    localStorage.setItem('user', JSON.stringify(user))
  }

  // إزالة بيانات المصادقة المحلية
  clearLocalAuth(): void {
    localStorage.removeItem('auth_token')
    localStorage.removeItem('user')
  }

  // الحصول على المستخدم المحلي
  getLocalUser(): User | null {
    const userStr = localStorage.getItem('user')
    if (userStr) {
      try {
        return JSON.parse(userStr)
      } catch {
        return null
      }
    }
    return null
  }

  // الحصول على التوكن المحلي
  getLocalToken(): string | null {
    return localStorage.getItem('auth_token')
  }

  // التحقق من تسجيل الدخول
  isAuthenticated(): boolean {
    return !!this.getLocalToken()
  }
}

export default new AuthApi()
