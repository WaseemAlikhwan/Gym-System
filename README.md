# Gym Management System

A comprehensive gym management system built with Laravel backend and modern frontend technologies.

## Features

### 🔐 Authentication & Authorization
- User registration and login
- Role-based access control (Admin, Coach, Member)
- JWT token authentication
- Password reset functionality

### 📊 Dashboard
- **Admin Dashboard**: Complete system overview with statistics
- **Coach Dashboard**: Member management and progress tracking
- **Member Dashboard**: Personal fitness data and subscription status

### 👥 User Management
- **Admin Features**:
  - Create, update, and delete users
  - Assign coaches to members
  - Bulk member assignment
  - User statistics and analytics
- **Coach Features**:
  - View assigned members
  - Track member progress
  - Create workout and nutrition plans
- **Member Features**:
  - View personal profile
  - Track fitness progress
  - Access assigned plans

### 🏋️ Fitness Management
- Workout plan creation and management
- Nutrition plan tracking
- Fitness data recording
- Attendance tracking
- Progress monitoring

### 💳 Subscription Management
- Membership plans
- Subscription tracking
- Payment integration
- Expiration notifications

### 📈 Analytics & Reporting
- Attendance statistics
- Revenue tracking
- Member progress reports
- Gym status monitoring

## API Endpoints

### Authentication
- `POST /api/login` - User login
- `POST /api/register` - User registration
- `POST /api/logout` - User logout
- `GET /api/profile` - Get user profile
- `PUT /api/profile` - Update user profile

### Dashboard
- `GET /api/dashboard/overview` - Dashboard overview
- `GET /api/dashboard/members` - Members list
- `GET /api/dashboard/coaches` - Coaches list
- `GET /api/dashboard/attendance-stats` - Attendance statistics
- `GET /api/dashboard/subscription-stats` - Subscription statistics
- `GET /api/dashboard/gym-status` - Gym status

### User Management
- `GET /api/users` - Get all users
- `POST /api/users` - Create user
- `GET /api/users/{id}` - Get user details
- `PUT /api/users/{id}` - Update user
- `DELETE /api/users/{id}` - Delete user
- `GET /api/users/coaches/list` - Get coaches list
- `GET /api/users/members/list` - Get members list
- `GET /api/users/stats` - User statistics

### Coach-Member Relationships
- `GET /api/coach-members` - Get relationships
- `POST /api/coach-members/assign` - Assign member to coach
- `PUT /api/coach-members/{id}` - Update relationship
- `DELETE /api/coach-members/{id}` - Remove relationship
- `GET /api/coach-members/coach/{id}/members` - Get coach's members
- `GET /api/coach-members/member/{id}/coach` - Get member's coach
- `GET /api/coach-members/available-coaches` - Get available coaches
- `GET /api/coach-members/unassigned-members` - Get unassigned members
- `POST /api/coach-members/bulk-assign` - Bulk assign members
- `GET /api/coach-members/stats` - Relationship statistics

### Role-Specific Endpoints

#### Admin Routes
- `GET /api/admin/system-stats` - System statistics
- `GET /api/admin/user-management` - User management data
- `GET /api/admin/coach-management` - Coach management data

#### Coach Routes
- `GET /api/coach/my-members` - Coach's members
- `GET /api/coach/my-stats` - Coach's statistics
- `GET /api/coach/member/{id}` - Member details

#### Member Routes
- `GET /api/member/my-coach` - Member's coach
- `GET /api/member/profile` - Member's profile

## Installation

### Prerequisites
- PHP 8.1 or higher
- Composer
- MySQL/PostgreSQL
- Node.js (for frontend)

### Backend Setup

1. **Clone the repository**
```bash
git clone <repository-url>
cd gym-system
```

2. **Install PHP dependencies**
```bash
cd backend
composer install
```

3. **Environment setup**
```bash
cp .env.example .env
php artisan key:generate
```

4. **Configure database**
Edit `.env` file with your database credentials:
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=gym_system
DB_USERNAME=root
DB_PASSWORD=
```

5. **Run migrations and seeders**
```bash
php artisan migrate
php artisan db:seed
```

6. **Start the server**
```bash
php artisan serve
```

### Frontend Setup

1. **Install Node.js dependencies**
```bash
cd admin-dashboard
npm install
```

2. **Configure environment**
Create `.env` file:
```env
VITE_API_URL=http://localhost:8000/api
```

3. **Start development server**
```bash
npm run dev
```

## Database Structure

### Core Tables
- `users` - User accounts and profiles
- `coach_members` - Coach-member relationships
- `subscriptions` - Member subscriptions
- `memberships` - Membership plans
- `attendances` - Gym attendance records
- `fitness_data` - Fitness progress data
- `workout_plans` - Workout plans
- `nutrition_plans` - Nutrition plans
- `gym_status_logs` - Gym status tracking

### Relationships
- Users can have multiple subscriptions
- Coaches can have multiple members
- Members can have multiple fitness records
- Workout and nutrition plans are linked to coaches and members

## API Documentation

For detailed API documentation, see [API_DOCUMENTATION.md](backend/API_DOCUMENTATION.md)

## Testing

### Backend Tests
```bash
cd backend
php artisan test
```

### API Testing
```bash
# Using Postman
1. Import the API collection
2. Set base URL to http://localhost:8000/api
3. Login to get authentication token
4. Use token in Authorization header for protected routes
```

## Deployment

### Production Setup
1. Set environment to production
2. Configure database for production
3. Run migrations
4. Set up web server (Apache/Nginx)
5. Configure SSL certificates
6. Set up backup procedures

### Environment Variables
```env
APP_ENV=production
APP_DEBUG=false
APP_URL=https://your-domain.com

DB_CONNECTION=mysql
DB_HOST=your-db-host
DB_PORT=3306
DB_DATABASE=gym_system
DB_USERNAME=your-username
DB_PASSWORD=your-password

MAIL_MAILER=smtp
MAIL_HOST=your-smtp-host
MAIL_PORT=587
MAIL_USERNAME=your-email
MAIL_PASSWORD=your-password
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=noreply@your-domain.com
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

## Changelog

### Version 1.0.0
- Initial release
- Complete user management system
- Dashboard functionality
- Coach-member relationship management
- Fitness tracking features
- Subscription management
- Comprehensive API documentation
