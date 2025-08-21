# دليل استخدام Postman مع نظام الجيم APIs

## المقدمة
هذا الدليل يوضح كيفية استخدام Postman لاختبار جميع APIs في نظام إدارة الجيم.

## الملفات المطلوبة
1. **Gym_System_API_Collection.postman_collection.json** - مجموعة APIs
2. **Gym_System_Environment.postman_environment.json** - متغيرات البيئة

## خطوات الإعداد

### 1. استيراد Collection
1. افتح Postman
2. اضغط على **Import** في الأعلى
3. اختر ملف `Gym_System_API_Collection.postman_collection.json`
4. ستظهر مجموعة APIs منظمة في المجلدات

### 2. استيراد Environment
1. اضغط على **Import** مرة أخرى
2. اختر ملف `Gym_System_Environment.postman_environment.json`
3. اختر Environment من القائمة المنسدلة في الأعلى

### 3. تشغيل الخادم
تأكد من تشغيل خادم Laravel:
```bash
cd backend
php artisan serve
```

## كيفية الاستخدام

### الخطوة الأولى: تسجيل الدخول
1. اذهب إلى مجلد **Authentication**
2. اختر **Login**
3. تأكد من أن البيانات التالية موجودة في Body:
```json
{
    "email": "admin@example.com",
    "password": "password123"
}
```
4. اضغط **Send**
5. إذا نجح الطلب، سيتم حفظ token تلقائياً في المتغير `auth_token`

### الخطوة الثانية: اختبار APIs الأخرى
بعد تسجيل الدخول، يمكنك اختبار أي API آخر. سيتم إرسال token تلقائياً في header `Authorization`.

## تنظيم APIs

### 1. Authentication (المصادقة)
- **Login**: تسجيل الدخول والحصول على token
- **Register**: إنشاء حساب جديد
- **Logout**: تسجيل الخروج
- **Get Profile**: الحصول على الملف الشخصي
- **Update Profile**: تحديث الملف الشخصي

### 2. Dashboard (لوحة التحكم)
- **Dashboard Overview**: نظرة عامة على النظام
- **Get Members List**: قائمة الأعضاء
- **Get Coaches List**: قائمة المدربين
- **Attendance Statistics**: إحصائيات الحضور
- **Subscription Statistics**: إحصائيات الاشتراكات
- **Gym Status**: حالة الجيم

### 3. User Management (إدارة المستخدمين)
- **Get All Users**: الحصول على جميع المستخدمين
- **Create User**: إنشاء مستخدم جديد
- **Get User Details**: تفاصيل مستخدم معين
- **Update User**: تحديث بيانات المستخدم
- **Delete User**: حذف مستخدم
- **Get Coaches List**: قائمة المدربين
- **Get Members List**: قائمة الأعضاء
- **Get User Statistics**: إحصائيات المستخدمين
- **Update Profile**: تحديث الملف الشخصي
- **Change Password**: تغيير كلمة المرور

### 4. Coach-Member Relationships (علاقات المدرب-العضو)
- **Get Relationships**: الحصول على جميع العلاقات
- **Assign Member to Coach**: تعيين عضو لمدرب
- **Update Relationship**: تحديث العلاقة
- **Delete Relationship**: حذف العلاقة
- **Get Coach's Members**: أعضاء مدرب معين
- **Get Member's Coach**: مدرب عضو معين
- **Get Available Coaches**: المدربون المتاحون
- **Get Unassigned Members**: الأعضاء غير المعينين
- **Bulk Assign Members**: تعيين مجموعة أعضاء لمدرب
- **Get Relationship Statistics**: إحصائيات العلاقات

### 5. Admin Routes (مسارات المدير)
- **System Statistics**: إحصائيات النظام
- **User Management**: إدارة المستخدمين
- **Coach Management**: إدارة المدربين

### 6. Coach Routes (مسارات المدرب)
- **My Members**: أعضائي
- **My Statistics**: إحصائياتي
- **Member Details**: تفاصيل العضو

### 7. Member Routes (مسارات العضو)
- **My Coach**: مدربي
- **My Profile**: ملفي الشخصي

## أمثلة عملية

### مثال 1: إنشاء مستخدم جديد
1. اذهب إلى **User Management** → **Create User**
2. تأكد من وجود token في header Authorization
3. عدل البيانات في Body حسب الحاجة
4. اضغط **Send**

### مثال 2: تعيين عضو لمدرب
1. اذهب إلى **Coach-Member Relationships** → **Assign Member to Coach**
2. عدل البيانات في Body:
```json
{
    "coach_id": 1,
    "member_id": 5,
    "start_date": "2024-01-01",
    "notes": "تعيين جديد"
}
```
3. اضغط **Send**

### مثال 3: الحصول على إحصائيات
1. اذهب إلى **Dashboard** → **Dashboard Overview**
2. اضغط **Send**
3. ستظهر إحصائيات شاملة للنظام

## المتغيرات المتاحة

### Environment Variables
- `{{base_url}}`: عنوان الخادم (http://localhost:8000)
- `{{auth_token}}`: token المصادقة (يتم حفظه تلقائياً)
- `{{user_id}}`: معرف المستخدم
- `{{coach_id}}`: معرف المدرب
- `{{member_id}}`: معرف العضو

## نصائح مهمة

### 1. ترتيب الاختبار
ابدأ دائماً بـ:
1. Login للحصول على token
2. Register لإنشاء حساب جديد
3. ثم اختبار باقي APIs

### 2. فحص الاستجابات
- تأكد من أن `success: true` في الاستجابة
- افحص رسائل الخطأ إذا فشل الطلب
- احفظ IDs المهمة في متغيرات Environment

### 3. اختبار الأدوار المختلفة
- جرب APIs مختلفة مع مستخدمين بأدوار مختلفة (admin, coach, member)
- تأكد من أن صلاحيات الوصول تعمل بشكل صحيح

### 4. معالجة الأخطاء
- 401: غير مصرح (تحتاج token)
- 403: ممنوع (لا تملك صلاحية)
- 404: غير موجود
- 422: خطأ في التحقق من البيانات

## استكشاف الأخطاء

### مشكلة: لا يمكن الاتصال بالخادم
**الحل**: تأكد من تشغيل `php artisan serve` في مجلد backend

### مشكلة: خطأ 401 Unauthorized
**الحل**: تأكد من تسجيل الدخول أولاً والحصول على token

### مشكلة: خطأ 403 Forbidden
**الحل**: تأكد من أن المستخدم لديه الصلاحيات المطلوبة

### مشكلة: خطأ 422 Validation Error
**الحل**: افحص البيانات المرسلة وتأكد من صحتها

## أمثلة على البيانات

### بيانات تسجيل الدخول
```json
{
    "email": "admin@example.com",
    "password": "password123"
}
```

### بيانات إنشاء مستخدم
```json
{
    "name": "أحمد محمد",
    "email": "ahmed@example.com",
    "password": "password123",
    "password_confirmation": "password123",
    "role": "member",
    "phone": "+966501234567"
}
```

### بيانات تعيين مدرب
```json
{
    "coach_id": 1,
    "member_id": 5,
    "start_date": "2024-01-01",
    "notes": "تعيين جديد للعضو"
}
```

## خاتمة
بهذا الدليل يمكنك اختبار جميع APIs في نظام الجيم بسهولة. تأكد من اتباع الخطوات بالترتيب الصحيح وفحص الاستجابات بعناية.
