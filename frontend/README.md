# GoCrave Frontend

> A modern, responsive web application for GoCrave food delivery platform built with React and Vite

## About GoCrave Frontend

GoCrave Frontend is a single-page application (SPA) built with **React 19** and **Vite** that provides a seamless user experience for browsing restaurants, ordering food, and tracking deliveries in real-time.

### Key Features

- **Restaurant Discovery**: Browse and search restaurants with maps and filters
- **Menu Browsing**: Dynamic menu with detailed item descriptions and pricing
- **Shopping Cart**: Intuitive cart management with real-time updates
- **Order Tracking**: Real-time order status tracking with live map integration
- **User Authentication**: Secure authentication via Clerk
- **Real-time Updates**: WebSocket integration for live notifications
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **State Management**: Efficient state management with Zustand
- **Animations**: Smooth animations with Framer Motion

## Tech Stack

- **Framework**: React 19
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Authentication**: Clerk
- **State Management**: Zustand
- **HTTP Client**: Axios
- **Routing**: React Router v7
- **Real-time**: Socket.io Client
- **Maps**: Leaflet & React-Leaflet
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Utilities**: CLSX, Tailwind Merge

## Project Structure

```
frontend/
├── src/
│   ├── components/           # Reusable React components
│   ├── pages/                # Page components and layouts
│   ├── services/             # API and utility services
│   ├── store/                # Zustand state management
│   ├── assets/               # Images, icons, and static files
│   ├── App.jsx               # Main app component
│   ├── main.jsx              # Application entry point
│   ├── index.css             # Global styles
│   └── App.css               # App-specific styles
├── public/                   # Static public assets
├── index.html                # HTML template
├── vite.config.js            # Vite configuration
├── eslint.config.js          # ESLint rules
└── package.json              # Dependencies and scripts
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Modern web browser

### Installation

1. **Install dependencies**
   ```bash
   cd frontend
   npm install
   ```

2. **Configure environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Update with your API endpoint and Clerk credentials

3. **Start development server**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173`

### Development Commands

```bash
# Start development server with HMR
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Run ESLint
npm run lint

# Fix ESLint issues
npm run lint -- --fix
```

## Key Components

- **Restaurant Browser**: Display list of restaurants with filtering and search
- **Menu Display**: Show restaurant menu items with categories
- **Cart Manager**: Shopping cart with add/remove/update functionality
- **Order Tracker**: Real-time order status tracking with map view
- **User Profile**: User account and order history management
- **Authentication**: Login/signup flow with Clerk

## State Management

Zustand stores are used for:
- User authentication state
- Shopping cart items
- Current restaurant and menu data
- Order tracking information
- UI state (modals, notifications, etc.)

## API Integration

The frontend communicates with the GoCrave backend API for:

- **Auth**: User authentication and profile management
- **Restaurants**: Fetch restaurant list and details
- **Menus**: Get restaurant menus and items
- **Orders**: Create, update, and track orders
- **Payments**: Process and confirm payments
- **Reviews**: Submit and fetch restaurant reviews

## Real-time Features

Socket.io is configured for:
- Live order status updates
- Delivery tracking
- Real-time notifications
- Live menu availability updates

## Building for Production

```bash
# Create optimized production build
npm run build

# Output is in the dist/ directory
```

The built application can be deployed to any static hosting service:
- Vercel
- Netlify
- Cloudflare Pages
- AWS S3 + CloudFront
- Any CDN or static host

## Environment Variables

Create a `.env.local` file with:
- `VITE_API_BASE_URL` - Backend API endpoint
- `VITE_CLERK_PUBLISHABLE_KEY` - Clerk authentication key
- `VITE_SOCKET_URL` - WebSocket server URL

## Performance

The app includes:
- Code splitting with Vite
- Lazy loading of routes
- Image optimization
- CSS bundling and minification
- Production-ready build optimization

## License

This project is licensed under the MIT License.
