# Car Bidding Application - Frontend Client

A modern, real-time vehicle auction and bidding platform built with React and TypeScript. Users can browse available vehicles, participate in live bidding sessions, track their bidding history, and manage their profiles. The application features real-time updates via SignalR and a responsive design powered by Mantine UI.

## Core Features

- **Vehicle Catalog**: Browse and filter vehicles by brand, model, color, price range, and status
- **Live Bidding System**: Participate in real-time vehicle auction sessions with instant bid updates
- **User Authentication**: Secure login/registration with role-based access (Admin, Dealer)
- **Real-time Notifications**: SignalR integration for live bidding updates and session changes
- **Bidding Dashboard**: Track active sessions, bid history, and winning auctions
- **User Reports**: Detailed reports on bidding activity and auction history
- **Responsive UI**: Mobile-friendly interface with adaptive layouts

## Tech Stack

### Frontend Framework & Build

- **React 18.3** - UI library with modern hooks
- **TypeScript 5.6** - Type-safe development
- **Vite 6.0** - Fast build tool with Hot Module Replacement (HMR)
- **React Router 7.1** - Client-side routing and navigation

### UI & Styling

- **Mantine 7.15** - Component library with built-in theming
  - Core components, hooks, carousel, dates
  - Mantine React Table for data tables
  - Tabler Icons (3.26) for icon system
- **Embla Carousel** - Carousel/slider functionality
- **CSS Modules** - Scoped styling

### State Management & Data Fetching

- **React Query (TanStack Query 5.62)** - Server state management with caching and refetching
- **Jotai 2.11** - Primitive atom-based state management
- **React Context API** - Authentication state management

### API Integration

- **Axios 1.7.9** - HTTP client with request/response interceptors
- **Base URL**: `https://localhost:6001/api`
- **SignalR 8.0.7** - Real-time communication hub for bidding updates

### Form Handling & Validation

- **React Hook Form 7.54** - Performant form state management
- **Zod 3.24** - TypeScript-first schema validation
- **@hookform/resolvers** - Integration with validation schemas

### Utilities

- **date-fns 4.1** - Date manipulation and formatting
- **dayjs 1.11** - Lightweight date library
- **lodash 4.17** - Utility functions
- **clsx 2.1** - Conditional class names
- **react-hot-toast 2.4** - Toast notifications
- **react-number-format** - Number input formatting
- **Supabase** - Backend database and authentication

### Development

- **ESLint 9.17** - Code quality and linting
- **PostCSS** - CSS processing with Mantine presets
- **@types packages** - TypeScript type definitions

## Architecture & Project Structure

```
src/
├── assets/                 # Static assets
├── common/
│   ├── config.ts          # Configuration
│   └── utils.ts           # Shared utilities
├── components/            # Reusable UI components
│   ├── header/
│   ├── hero-section/
│   ├── feature-section/
│   ├── frequently-asked-section/
│   ├── modals/
│   ├── nav-button/
│   ├── private-routes/    # Route protection
│   └── user-card/
├── constants/
│   ├── endpoint.ts        # API endpoints
│   ├── socket.ts          # SignalR event definitions
│   └── ui.ts              # UI constants
├── features/              # Feature-based modules
│   ├── auth/
│   │   ├── components/    # LoginForm, RegisterForm, AuthProvider
│   │   ├── hooks/         # useAuth
│   │   └── types/         # auth schemas and interfaces
│   ├── car-bidding/
│   │   ├── components/    # CarCard, BiddingUI components
│   │   ├── hooks/         # useBiddingSession, useVehicle
│   │   └── types/         # Bidding, Vehicle, Session interfaces
│   └── user/
│       ├── components/
│       ├── hooks/
│       └── types/         # Report types
├── hooks/
│   └── useFilter.ts       # Custom hook for filter management
├── layouts/
│   ├── RootLayout.tsx     # Public pages layout
│   ├── UserLayout.tsx     # Authenticated dashboard layout
│   └── AdminLayout.tsx    # Admin panel layout
├── libs/
│   ├── theme.ts           # Mantine theme customization
│   ├── interceptor.ts     # Axios interceptors
│   └── error.ts           # Error handling utilities
├── pages/
│   ├── LandingPage.tsx    # Public homepage
│   ├── AuthPage.tsx       # Login/Register
│   ├── CarsPage.tsx       # Vehicle catalog
│   ├── CarDetailsPage.tsx # Vehicle details
│   ├── BiddingSessionPage.tsx     # Active sessions
│   ├── BiddingDetailsPage.tsx     # Session details
│   ├── ReportPage.tsx     # User bidding reports
│   └── errors/            # Error pages
├── services/
│   ├── auth.service.ts    # Authentication API
│   ├── vehicle.service.ts # Vehicle listing and details
│   ├── bidding.service.ts # Bidding operations
│   ├── user.service.ts    # User profile and reports
│   ├── signalr.service.ts # Real-time communication
│   └── local-storage.service.ts   # Client storage
├── types/
│   └── api-response.ts    # Generic API response type
├── App.tsx                # Root component
├── main.tsx               # Application entry point
└── routes.tsx             # Route definitions
```

## Key Components & Patterns

### Routing Structure

- **Public Routes**: Landing, Auth (Login/Register)
- **Protected Routes**: Dashboard (vehicles, bidding sessions, reports)
- **Error Routes**: Access denied page
- Uses React Router v7 with layout-based routing

### State Management

1. **Authentication (React Context)**
   - Centralized user state with `AuthProvider`
   - Token stored in localStorage
   - Custom `useAuth()` hook for accessing auth state

2. **Server State (React Query)**
   - Automatic caching and deduplication
   - Refetch on mount for fresh data
   - Paginated data handling with `keepPreviousData`

3. **UI State (Jotai)**
   - Primitive atoms for filter and UI state
   - Lightweight alternative to Redux

### API Integration

- **Axios Interceptor Pattern**:
  - Automatically injects Bearer token from localStorage
  - Global error handling for 401, 500, network errors
  - Custom error handler with toast notifications

- **API Response Wrapper**:

  ```typescript
  interface ApiResponse<T> {
    data: T;
    status: number;
    message: string;
    isSuccess: boolean;
  }
  ```

- **Paginated Data**:
  ```typescript
  interface WithMetaData<T> {
    items: T[];
    pageNumber: number;
    pageSize: number;
    totalItems: number;
  }
  ```

### Real-time Communication (SignalR)

- **Event Definitions**: `BiddingEvents` class with bidding-related events:
  - `JoinBiddingSession`, `LeaveBiddingSession`
  - `ReceiveBid`, `SessionListUpdated`
  - Automatic reconnection handling

- **Integration**: `UserLayout` establishes SignalR connection and invalidates React Query cache on updates

### Form Handling

- **Zod Schemas**: Validation schemas for Login and Registration
  - `LoginSchema`: Email + password
  - `RegisterSchema`: Username, email, password confirmation

- **React Hook Form Integration**:
  - Resolver pattern for Zod
  - Field-level validation
  - Custom error messages

### Theming

- Custom Mantine theme with blue-gray color palette
- CSS-in-JS with PostCSS for optimization
- Responsive design breakpoints

## Notable Libraries & Patterns

1. **Error Handling**: Centralized via `handleAxiosError()` with toast notifications
2. **Custom Hooks**: `useAuth()`, `useBiddingSession()`, `useVehicles()`, `useFilter()`
3. **Type Safety**: Strong TypeScript types across services, components, and API responses
4. **Icon System**: Tabler Icons for consistent UI
5. **Responsive Tables**: Mantine React Table with advanced sorting/filtering
6. **Local Storage Service**: Abstracted storage operations
7. **Toast Notifications**: react-hot-toast for user feedback

## Getting Started

### Prerequisites

- Node.js 16+
- Yarn

### Installation

```bash
yarn install
```

### Development

```bash
yarn dev
```

### Build

```bash
yarn build
```

### Lint

```bash
yarn lint
```

### Preview

```bash
yarn preview
```

## Backend Integration

- **API Base URL**: `https://localhost:6001/api`
- **SignalR Hub**: `https://localhost:6001/bidding-hub`
- **Endpoints**: Authenticate, Vehicles, Biddings, Sessions, Users, Reports

This comprehensive structure provides scalability, maintainability, and a clear separation of concerns suitable for a modern real-time auction platform.
