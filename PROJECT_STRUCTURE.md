# Gym System Project Structure

## 📁 Project Organization

```
Gym-System/
├── 📁 backend/                    # Laravel Backend API
│   ├── 📁 app/
│   │   ├── 📁 Console/
│   │   ├── 📁 Exceptions/
│   │   ├── 📁 Http/
│   │   │   ├── 📁 Controllers/
│   │   │   │   ├── 📁 Api/
│   │   │   │   ├── 📁 Auth/
│   │   │   │   └── 📁 Web/
│   │   │   ├── 📁 Middleware/
│   │   │   ├── 📁 Requests/
│   │   │   └── 📁 Resources/
│   │   └── 📁 Models/
│   ├── 📁 config/
│   ├── 📁 database/
│   │   ├── 📁 migrations/
│   │   ├── 📁 seeders/
│   │   └── 📁 factories/
│   ├── 📁 routes/
│   ├── 📁 resources/
│   ├── 📁 storage/
│   ├── 📁 tests/
│   ├── 📁 bootstrap/
│   ├── 📁 public/
│   ├── 📄 composer.json
│   ├── 📄 artisan
│   └── 📄 .env
│
├── 📁 frontend/                   # React/Vue Frontend (Member Portal)
│   ├── 📁 src/
│   │   ├── 📁 components/
│   │   ├── 📁 pages/
│   │   ├── 📁 services/
│   │   ├── 📁 utils/
│   │   └── 📁 assets/
│   ├── 📁 public/
│   ├── 📄 package.json
│   ├── 📄 vite.config.js
│   └── 📄 tailwind.config.js
│
├── 📁 admin-dashboard/            # Admin Dashboard (React/Vue)
│   ├── 📁 src/
│   │   ├── 📁 components/
│   │   ├── 📁 pages/
│   │   ├── 📁 services/
│   │   ├── 📁 utils/
│   │   └── 📁 assets/
│   ├── 📁 public/
│   ├── 📄 package.json
│   ├── 📄 vite.config.js
│   └── 📄 tailwind.config.js
│
├── 📁 mobile-app/                 # Flutter Mobile App
│   ├── 📁 lib/
│   │   ├── 📁 screens/
│   │   ├── 📁 widgets/
│   │   ├── 📁 services/
│   │   ├── 📁 models/
│   │   └── 📁 utils/
│   ├── 📁 assets/
│   ├── 📁 test/
│   ├── 📄 pubspec.yaml
│   └── 📄 README.md
│
├── 📁 docs/                       # Documentation
│   ├── 📄 API_DOCUMENTATION.md
│   ├── 📄 PROJECT_STRUCTURE.md
│   └── 📄 README.md
│
└── 📄 README.md                   # Main Project README
```

## 🏗️ Architecture Overview

### Backend (Laravel)
- **API Controllers**: Handle all API requests
- **Models**: Database models and relationships
- **Migrations**: Database schema
- **Seeders**: Initial data population
- **Middleware**: Authentication, authorization, CORS
- **Resources**: API response formatting

### Frontend (Member Portal)
- **Components**: Reusable UI components
- **Pages**: Main application views
- **Services**: API communication layer
- **Utils**: Helper functions and utilities

### Admin Dashboard
- **Components**: Admin-specific UI components
- **Pages**: Dashboard views and management interfaces
- **Services**: Admin API communication
- **Utils**: Admin-specific utilities

### Mobile App (Flutter)
- **Screens**: App screens and navigation
- **Widgets**: Reusable UI widgets
- **Services**: API communication and local storage
- **Models**: Data models and state management

## 🔄 Recommended Migration Steps

1. **Create new directory structure**
2. **Move existing files to appropriate locations**
3. **Update import paths and configurations**
4. **Test all components after migration**

## 📋 Benefits of This Structure

- ✅ **Clear separation of concerns**
- ✅ **Easier team collaboration**
- ✅ **Better code organization**
- ✅ **Simplified deployment**
- ✅ **Improved maintainability**
- ✅ **Clear documentation structure**

## 🚀 Development Workflow

1. **Backend Development**: Work in `backend/` directory
2. **Frontend Development**: Work in `frontend/` directory
3. **Admin Development**: Work in `admin-dashboard/` directory
4. **Mobile Development**: Work in `mobile-app/` directory
5. **Documentation**: Update files in `docs/` directory

## 📝 Next Steps

1. Create the new directory structure
2. Move existing files to their new locations
3. Update all import paths and configurations
4. Test all applications after migration
5. Update deployment scripts if needed 