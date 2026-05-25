# GoCrave Backend API

> A modern, scalable backend API for the GoCrave food delivery platform built with Laravel 13

## About GoCrave Backend

GoCrave Backend is a RESTful API service built with **Laravel 13** that powers the GoCrave food delivery platform. It handles restaurant management, menu items, user orders, payments, and real-time order tracking.

### Key Features

- **Restaurant Management**: Create and manage restaurants with their profiles
- **Menu Management**: Dynamic menu items with categories and pricing
- **Order Processing**: Complete order lifecycle management
- **Payment Handling**: Secure payment processing and tracking
- **User Reviews**: Customer ratings and reviews for restaurants
- **Real-time Updates**: WebSocket support for live order tracking
- **Database Migrations**: Schema-first development with Laravel migrations
- **RESTful API**: Clean, well-structured API endpoints

## Tech Stack

- **Framework**: Laravel 13.8
- **Language**: PHP 8.3+
- **Database**: SQLite (development) / PostgreSQL (production-ready)
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Task Scheduling**: Laravel Queue
- **Testing**: PHPUnit

## Project Structure

```
backend/
├── app/
│   ├── Http/
│   │   ├── Controllers/      # API endpoints
│   │   └── Middleware/       # Request/response middleware
│   ├── Models/               # Eloquent models
│   │   ├── User.php          # User accounts
│   │   ├── Restaurant.php    # Restaurant profiles
│   │   ├── MenuItem.php      # Menu items
│   │   ├── Order.php         # Orders
│   │   ├── OrderItem.php     # Order line items
│   │   ├── Payment.php       # Payment records
│   │   └── Review.php        # Customer reviews
│   └── Providers/            # Service providers
├── database/
│   ├── migrations/           # Database schema
│   ├── factories/            # Data factories for testing
│   └── seeders/              # Database seeders
├── routes/
│   ├── api.php               # API routes
│   ├── web.php               # Web routes
│   └── console.php           # Artisan commands
├── config/                   # Application configuration
├── tests/                    # Unit and feature tests
└── storage/                  # Logs and application storage
```

## Getting Started

### Prerequisites

- PHP 8.3 or higher
- Composer
- Node.js & npm
- SQLite or PostgreSQL

### Installation

1. **Clone and setup environment**
   ```bash
   cd backend
   cp .env.example .env
   ```

2. **Install dependencies and run setup**
   ```bash
   composer run-script setup
   ```
   This will:
   - Install PHP dependencies
   - Generate application key
   - Run database migrations
   - Install npm packages
   - Build frontend assets

3. **Start development server**
   ```bash
   composer run dev
   ```
   This starts:
   - Laravel server on `http://localhost:8000`
   - Queue listener for background jobs
   - Vite dev server for frontend assets
   - Log viewer (Pail)

### Development Commands

```bash
# Run migrations
php artisan migrate

# Create a new migration
php artisan make:migration create_table_name

# Create a new model
php artisan make:model ModelName

# Create a controller
php artisan make:controller ControllerName

# Run tests
composer run test

# Run code quality checks
./vendor/bin/pint

# Database seeding
php artisan db:seed
php artisan db:seed --class=RestaurantSeeder
```

## API Endpoints

The backend provides RESTful API endpoints for:

- **Users**: Registration, authentication, profile management
- **Restaurants**: Browse, search, and filter restaurants
- **Menu Items**: Get restaurant menus and items
- **Orders**: Create, track, and manage orders
- **Payments**: Process and track payments
- **Reviews**: Submit and retrieve restaurant reviews

## Configuration

Key configuration files:
- `.env` - Environment variables
- `config/app.php` - Application settings
- `config/database.php` - Database configuration
- `config/auth.php` - Authentication settings

## Testing

```bash
# Run all tests
composer run test

# Run specific test file
php artisan test tests/Feature/OrderTest.php

# Run with coverage
php artisan test --coverage
```

## Deployment

The backend is designed to be deployed on modern PHP hosting platforms:

1. Set environment variables in `.env`
2. Run migrations: `php artisan migrate --force`
3. Cache configuration: `php artisan config:cache`
4. Set up queue worker for background jobs

## License

This project is licensed under the MIT License.
