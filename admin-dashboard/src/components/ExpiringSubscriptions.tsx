import React from 'react'
import { ExclamationTriangleIcon, ClockIcon } from '@heroicons/react/24/outline'

interface ExpiringSubscription {
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

interface ExpiringSubscriptionsProps {
  subscriptions: ExpiringSubscription[]
}

const ExpiringSubscriptions: React.FC<ExpiringSubscriptionsProps> = ({ subscriptions }) => {
  const expiresToday = subscriptions.filter(sub => sub.status === 'expires_today')
  const expiresSoon = subscriptions.filter(sub => sub.status === 'expires_soon')

  if (subscriptions.length === 0) {
    return (
      <div className="card">
        <h3 className="text-lg font-medium text-gray-900 mb-4">الاشتراكات المنتهية</h3>
        <div className="text-center text-gray-500 py-8">
          <p>لا توجد اشتراكات منتهية اليوم أو قريبة من الانتهاء</p>
          <p className="text-sm">سيتم عرض الاشتراكات هنا عند اقتراب موعد انتهائها</p>
        </div>
      </div>
    )
  }

  return (
    <div className="card">
      <h3 className="text-lg font-medium text-gray-900 mb-4">الاشتراكات المنتهية</h3>
      
      {/* Expires Today */}
      {expiresToday.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center mb-3">
            <ExclamationTriangleIcon className="h-5 w-5 text-red-500 mr-2" />
            <h4 className="text-md font-medium text-red-700">تنتهي اليوم ({expiresToday.length})</h4>
          </div>
          <div className="space-y-3">
            {expiresToday.map((subscription) => (
              <div key={subscription.id} className="bg-red-50 border border-red-200 rounded-lg p-3">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-red-900">{subscription.user_name}</p>
                    <p className="text-sm text-red-700">{subscription.user_email}</p>
                    <p className="text-xs text-red-600">خطة: {subscription.plan_type}</p>
                    <p className="text-xs text-red-600">السعر: ${subscription.price}/شهر</p>
                    <p className="text-xs text-red-600">طريقة الدفع: {subscription.payment_method === 'credit_card' ? 'بطاقة ائتمان' : subscription.payment_method === 'bank_transfer' ? 'تحويل بنكي' : subscription.payment_method}</p>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      تنتهي اليوم
                    </span>
                    <p className="text-xs text-red-600 mt-1">{subscription.formatted_end_date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Expires Soon */}
      {expiresSoon.length > 0 && (
        <div>
          <div className="flex items-center mb-3">
            <ClockIcon className="h-5 w-5 text-orange-500 mr-2" />
            <h4 className="text-md font-medium text-orange-700">تنتهي قريباً ({expiresSoon.length})</h4>
          </div>
          <div className="space-y-3">
            {expiresSoon.map((subscription) => (
              <div key={subscription.id} className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-orange-900">{subscription.user_name}</p>
                    <p className="text-sm text-orange-700">{subscription.user_email}</p>
                    <p className="text-xs text-orange-600">خطة: {subscription.plan_type}</p>
                    <p className="text-xs text-orange-600">السعر: ${subscription.price}/شهر</p>
                    <p className="text-xs text-orange-600">طريقة الدفع: {subscription.payment_method === 'credit_card' ? 'بطاقة ائتمان' : subscription.payment_method === 'bank_transfer' ? 'تحويل بنكي' : subscription.payment_method}</p>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                      {subscription.formatted_days}
                    </span>
                    <p className="text-xs text-orange-600 mt-1">{subscription.formatted_end_date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Summary */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex justify-between text-sm text-gray-600">
          <span>إجمالي الاشتراكات المنتهية:</span>
          <span className="font-medium">{subscriptions.length}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-600 mt-1">
          <span>تنتهي اليوم:</span>
          <span className="font-medium text-red-600">{expiresToday.length}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-600 mt-1">
          <span>تنتهي قريباً:</span>
          <span className="font-medium text-orange-600">{expiresSoon.length}</span>
        </div>
      </div>
    </div>
  )
}

export default ExpiringSubscriptions
