# Vehicle Listing App

## Overview

A Next.js application for listing vehicles with search, filters, sorting, and pagination. Optimized for performance with ImageLoader, SSR, and virtualization.

## Features

- **Structured Codebase**: Configured with ESLint, Prettier, and Husky for code consistency.
- **Routing**: Home, Car List, Car Details (`/cars/:id`), Custom 404.
- **API**: JSON-based with separate endpoints for listing and details, pagination, sorting, and filtering.
- **Functionality**:
  - Dynamic filters with persistence in URL.
  - Optimized image loading with skeletons and opacity transitions.
  - Virtualized list for performance.
  - Dark mode support.
- **UI & UX**: TailwindCSS, responsive design, keyboard navigation.
- **Testing**: Implemented with Vitest.

## Setup

1. Install dependencies:
   ```sh
   npm install
   ```
2. Start the development server:
   ```sh
   npm run dev
   ```
3. Run tests:
   ```sh
   npm run test
   ```

## Notes

- No need for manual lazy loading; Next.js handles it automatically.
- API services are modularized for maintainability.
- Filters and UI components are decoupled for reusability.

---

Built with Next.js & Typescript.
