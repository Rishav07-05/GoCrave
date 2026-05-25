# GoCrave

> A modern, full-stack food delivery platform built with Laravel and React

<div align="center">

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Laravel 13](https://img.shields.io/badge/Laravel-13.8-red.svg)](https://laravel.com)
[![React 19](https://img.shields.io/badge/React-19-blue.svg)](https://react.dev)

</div>

## 🍕 About GoCrave

GoCrave is a comprehensive food delivery platform that connects customers with restaurants. Users can browse restaurants, explore menus, place orders, make payments, track deliveries in real-time, and leave reviews.

The platform is built with a modern architecture featuring:
- **Backend**: Laravel 13 RESTful API
- **Frontend**: React 19 single-page application
- **Real-time**: WebSocket support for live order tracking
- **Database**: Multi-database support (SQLite for development, PostgreSQL for production)

## ✨ Features

### User Features
- 🔐 Secure authentication with Clerk
- 🏪 Browse and search restaurants
- 📍 Location-based restaurant discovery with maps
- 🍽️ Explore detailed menus and item descriptions
- 🛒 Shopping cart management
- 💳 Secure payment processing
- 📦 Real-time order tracking with live maps
- ⭐ Rate and review restaurants
- 💬 Order notification system

### Restaurant Features
- 👨‍💼 Restaurant profile management
- 📋 Menu and menu item management
- 📊 Order management dashboard
- 📈 Performance tracking and analytics

### Administrative Features
- 👥 User management
- 🏢 Restaurant moderation
- 💰 Payment processing
- 📊 Platform analytics

## 🏗️ Project Structure

```
GoCrave/
├── backend/                  # Laravel REST API
│   ├── app/                 # Application code
│   ├── database/            # Migrations, seeders, factories
│   ├── routes/              # API and web routes
│   ├── tests/               # PHPUnit tests
│   └── ...
├── frontend/                # React SPA
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API services
│   │   ├── store/          # Zustand state stores
│   │   └── ...
│   └── ...
└── README.md               # This file
```

## 🚀 Quick Start

### Prerequisites

- **Backend**: PHP 8.3+, Composer, Node.js, npm
- **Frontend**: Node.js 18+, npm
- Optional: PostgreSQL for production database

### Development Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd GoCrave
   ```

2. **Setup Backend**
   ```bash
   cd backend
   cp .env.example .env
   composer run-script setup
   ```

3. **Setup Frontend**
   ```bash
   cd ../frontend
   npm install
   cp .env.example .env.local
   ```

4. **Start Development Servers**

   **Terminal 1 - Backend (from `backend/` directory)**
   ```bash
   composer run dev
   ```
   This starts:
   - Laravel server: http://localhost:8000
   - Queue listener
   - Vite dev server
   - Log viewer

   **Terminal 2 - Frontend (from `frontend/` directory)**
   ```bash
   npm run dev
   ```
   Opens at: http://localhost:5173

5. **Database Setup**
   ```bash
   # Run migrations (done automatically in setup)
   cd backend
   php artisan migrate

   # Seed sample data
   php artisan db:seed --class=RestaurantSeeder
   ```

## 📚 Documentation

- [Backend README](./backend/README.md) - Detailed backend setup and API documentation
- [Frontend README](./frontend/README.md) - Frontend setup and component documentation

## 🛠️ Development

### Backend Development
```bash
cd backend

# Create a new model
php artisan make:model ModelName -m

# Create a new controller
php artisan make:controller ControllerName

# Run tests
composer run test

# Format code
./vendor/bin/pint
```

### Frontend Development
```bash
cd frontend

# Start dev server
npm run dev

# Build for production
npm run build

# Lint code
npm run lint

# Preview production build
npm run preview
```

## 🧪 Testing

### Backend Tests
```bash
cd backend

# Run all tests
composer run test

# Run specific test
php artisan test tests/Feature/OrderTest.php

# Run with coverage
php artisan test --coverage
```

### Frontend Testing
Currently using ESLint for code quality:
```bash
cd frontend
npm run lint
```

## 📦 Deployment

### Backend Deployment
1. Set environment variables in `.env`
2. Run migrations: `php artisan migrate --force`
3. Cache optimizations: `php artisan config:cache`
4. Set up queue workers for background jobs
5. Configure SSL/HTTPS

### Frontend Deployment
1. Build the production bundle: `npm run build`
2. Deploy the `dist/` directory to your hosting service
3. Configure environment variables for the API URL

### Services
- **Backend Hosting**: Any PHP 8.3+ host (Laravel Forge, Hetzner, AWS, DigitalOcean, etc.)
- **Frontend Hosting**: Vercel, Netlify, Cloudflare Pages, AWS S3 + CloudFront, etc.
- **Database**: PostgreSQL on managed services (AWS RDS, DigitalOcean, etc.)

## 🔐 Security

- All API endpoints require authentication
- Payment processing uses secure payment gateways
- Environment variables protect sensitive data
- CSRF protection on all forms
- SQL injection prevention through Eloquent ORM
- XSS protection in React JSX

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. Create a feature branch (`git checkout -b feature/amazing-feature`)
2. Commit changes (`git commit -m 'Add amazing feature'`)
3. Push to the branch (`git push origin feature/amazing-feature`)
4. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📧 Support

For support and questions, please open an issue in the repository.

---

<div align="center">

**Made with ❤️ for food delivery lovers**

</div>
