# Fitness Tracker App

## Overview

This is a modern fitness tracking application built as a full-stack web app. The application allows users to track daily fitness metrics including steps, calories burned, and distance walked. It features a sleek, dark-themed mobile-first interface with animated components and real-time data visualization. The app provides daily fitness tracking, weekly statistics, and a user profile system with demo data for immediate interaction.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The frontend is built using React with TypeScript, following a component-based architecture. The app uses Vite as the build tool and development server, providing fast hot module replacement and optimized builds. The UI is constructed with shadcn/ui components built on top of Radix UI primitives, ensuring accessibility and consistent design patterns.

**Key Frontend Decisions:**
- **React with TypeScript**: Chosen for type safety and modern development experience
- **Vite**: Selected over Create React App for faster builds and better development experience
- **shadcn/ui + Radix UI**: Provides accessible, customizable components with consistent design
- **Tailwind CSS**: Enables rapid styling with utility-first approach and custom design tokens
- **Framer Motion**: Adds smooth animations and micro-interactions for better user experience

### State Management & Data Fetching
The application uses TanStack Query (React Query) for server state management, caching, and data synchronization. This eliminates the need for complex client-side state management while providing excellent caching and background refetching capabilities.

**Data Flow Design:**
- API requests are abstracted through custom hooks (`useFitnessData`, `useFitnessDataRange`)
- Centralized query client configuration with custom error handling
- Automatic background refetching disabled to reduce unnecessary server calls
- Query keys structured hierarchically for efficient cache invalidation

### Backend Architecture
The backend follows a RESTful API design using Express.js with TypeScript. The server implements a clean separation between routing, business logic, and data storage through an abstraction layer.

**Backend Structure:**
- **Express.js Server**: Handles HTTP requests, middleware, and routing
- **Storage Abstraction**: `IStorage` interface allows switching between different storage implementations
- **Memory Storage**: Current implementation using in-memory data structures for demo purposes
- **Request Logging**: Custom middleware for API request tracking and debugging

### Database Design
The database schema is defined using Drizzle ORM with PostgreSQL dialect, though the current implementation uses in-memory storage for demo purposes. The schema supports user management and comprehensive fitness data tracking.

**Schema Design:**
- **Users Table**: Basic user authentication with username/password
- **Fitness Data Table**: Daily fitness metrics linked to users with date-based tracking
- **Type Safety**: Zod schemas provide runtime validation and TypeScript types
- **Migration Ready**: Drizzle configuration prepared for PostgreSQL deployment

### Authentication & User Management
Currently implements a simplified demo user system for immediate functionality. The architecture is prepared for full authentication implementation with user sessions and proper security measures.

### Routing & Navigation
Uses Wouter for client-side routing, chosen for its lightweight footprint compared to React Router. The app features a bottom navigation system optimized for mobile interfaces.

**Navigation Structure:**
- Home: Daily fitness tracking with progress visualization
- Stats: Weekly fitness statistics and trends
- Profile: User information and achievements
- 404: Error handling for undefined routes

### UI/UX Design Patterns
The application follows a mobile-first design approach with dark theme as default. Components use consistent spacing, typography, and color schemes defined through CSS custom properties.

**Design Decisions:**
- **Mobile-First**: Optimized for mobile devices with responsive design
- **Dark Theme**: Default dark theme with green accent colors for fitness branding
- **Glassmorphism**: Semi-transparent components with backdrop blur effects
- **Micro-animations**: Framer Motion provides smooth transitions and interactions

## External Dependencies

### Core Framework Dependencies
- **React 18**: Frontend framework with modern features like concurrent rendering
- **TypeScript**: Static type checking for better development experience
- **Vite**: Build tool and development server with fast HMR

### UI & Styling
- **Tailwind CSS**: Utility-first CSS framework for rapid styling
- **shadcn/ui**: Pre-built component library with accessibility features
- **Radix UI**: Unstyled, accessible UI primitives for complex components
- **Framer Motion**: Animation library for smooth transitions and interactions
- **Lucide React**: Icon library with consistent design and tree-shaking

### Data Management
- **TanStack Query (React Query)**: Server state management and caching
- **Drizzle ORM**: Type-safe database ORM with migration support
- **Drizzle Zod**: Integration between Drizzle and Zod for schema validation
- **Zod**: Runtime type validation and schema definition

### Backend Services
- **Express.js**: Web server framework for Node.js
- **Neon Database**: PostgreSQL-compatible serverless database (configured but not currently used)
- **Connect PG Simple**: PostgreSQL session store for Express sessions

### Development Tools
- **ESBuild**: Fast JavaScript bundler for production builds
- **PostCSS**: CSS processing with Autoprefixer for vendor prefixes
- **TSX**: TypeScript execution for development server

### Runtime Dependencies
- **Wouter**: Lightweight client-side routing library
- **Date-fns**: Date utility library for formatting and manipulation
- **Class Variance Authority**: Utility for creating variant-based component APIs
- **clsx**: Utility for conditional CSS class names
- **Nanoid**: Unique ID generation for client-side use cases