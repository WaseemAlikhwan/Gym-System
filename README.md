# Gym System - نظام إدارة الصالة الرياضية

## نظرة عامة
نظام متكامل لإدارة الصالات الرياضية يتضمن واجهة إدارية للمدربين والمشرفين، ونظام إدارة الأعضاء والاشتراكات، وخطة التمارين والتغذية.

## المميزات
- 🏋️ إدارة الأعضاء والاشتراكات
- 👨‍🏫 نظام إدارة المدربين
- 📊 لوحة تحكم شاملة مع إحصائيات
- 📅 جدولة التمارين والجلسات
- 🥗 خطط التغذية المخصصة
- 💳 نظام إدارة المدفوعات
- 📱 واجهة مستخدم حديثة وسهلة الاستخدام

## التقنيات المستخدمة

### Backend (Laravel 10)
- PHP 8.1+
- Laravel Framework 10
- MySQL Database
- RESTful API
- JWT Authentication
- CORS Support

### Frontend (React + TypeScript)
- React 18
- TypeScript
- Tailwind CSS
- Vite Build Tool
- React Router
- Chart.js for Analytics

## متطلبات النظام
- PHP 8.1 أو أحدث
- Composer
- Node.js 16+ و npm
- MySQL 8.0 أو أحدث
- Git

## التثبيت والتشغيل

### 1. استنساخ المشروع
```bash
git clone <repository-url>
cd Gym-System
```

### 2. إعداد Backend (Laravel)
```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan db:seed
php artisan serve
```

### 3. إعداد Frontend (React)
```bash
cd admin-dashboard
npm install
npm run dev
```

## هيكل المشروع
```
Gym-System/
├── backend/                 # Laravel Backend
│   ├── app/
│   │   ├── Http/Controllers/
│   │   ├── Models/
│   │   └── ...
│   ├── database/
│   ├── routes/
│   └── ...
├── admin-dashboard/         # React Frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── ...
│   ├── package.json
│   └── ...
└── README.md
```

## API Endpoints

### Authentication
- `POST /api/login` - تسجيل الدخول
- `POST /api/logout` - تسجيل الخروج
- `POST /api/register` - إنشاء حساب جديد

### Dashboard
- `GET /api/dashboard/comprehensive-stats` - إحصائيات شاملة
- `GET /api/dashboard/members-stats` - إحصائيات الأعضاء
- `GET /api/dashboard/coaches-stats` - إحصائيات المدربين

### Members
- `GET /api/users/members/list` - قائمة الأعضاء
- `GET /api/users/{id}` - تفاصيل العضو
- `PUT /api/users/{id}` - تحديث بيانات العضو

### Subscriptions
- `GET /api/subscriptions` - قائمة الاشتراكات
- `POST /api/subscriptions` - إنشاء اشتراك جديد
- `GET /api/subscriptions/stats` - إحصائيات الاشتراكات

## المساهمة
نرحب بمساهماتكم! يرجى اتباع الخطوات التالية:
1. Fork المشروع
2. إنشاء branch جديد للميزة
3. Commit التغييرات
4. Push إلى Branch
5. إنشاء Pull Request

## الترخيص
هذا المشروع مرخص تحت رخصة MIT.

## الدعم
إذا واجهت أي مشاكل أو لديك أسئلة، يرجى إنشاء Issue في GitHub.

## المؤلفون
- فريق تطوير Gym System

---
**ملاحظة**: تأكد من تحديث ملف `.env` بالمعلومات الصحيحة لقاعدة البيانات وإعدادات الخادم.
