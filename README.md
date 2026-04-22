# Aster Store

A modern product store app built with React, styled with TailwindCSS 4, and powered by Context API + `useReducer`, Redux Toolkit, and React Query.

## Overview

Aster Store is a calmer, more polished storefront experience where users can:

- browse a curated product collection
- switch between light and dark themes
- change between grid and list layouts
- filter products using simpler storefront categories
- search and sort products
- open product details pages
- manage a shopping cart with live totals

The app uses different state tools for different jobs:

- Context API + `useReducer` for shared UI settings
- Redux Toolkit for cart state
- React Query for product data fetching and caching

## Current Design Direction

This version was redesigned to feel more like a real storefront and less like a classroom demo.

Highlights:

- softer editorial color palette
- cleaner premium typography
- smaller curated product selection on screen
- simpler store-facing category names
- less crowded layout
- compact settings section for personalization

## Features

- Product list fetched from the DummyJSON API
- Product details page
- Loading state while products are being fetched
- Error state if fetching fails
- Cached API data with React Query
- Dark mode / light mode
- Grid view / list view
- Selected category stored in shared settings
- Search products by title, description, or brand
- Sort products by featured, rating, title, or price
- Shopping cart using Redux Toolkit
- Add to cart
- Remove from cart
- Increase quantity
- Decrease quantity
- Clear cart
- Total number of items
- Total price
- Responsive design
- Cart persistence with `localStorage`
- Settings persistence with `localStorage`

## Storefront Categories

Instead of relying on raw API categories in the UI, this version groups products into cleaner storefront categories:

- All
- Beauty
- Tech
- Fashion
- Home
- Lifestyle

These categories are mapped locally from the API product categories to keep the browsing experience simpler and more consistent.

## State Management Breakdown

### Context API + `useReducer`

Used for shared app settings:

- theme
- view mode
- selected storefront category

### Redux Toolkit

Used for shopping cart state:

- cart items
- add/remove actions
- quantity updates
- totals
- clear cart

### React Query

Used for server data:

- fetching all products
- fetching individual product details
- loading state
- error state
- cached query data

Main query keys used:

- `['products']`
- `['product', productId]`

## Tools / Libraries Used

- React 19
- Vite 8
- TailwindCSS 4 with `@tailwindcss/vite`
- React Router DOM 6
- Redux Toolkit
- React Redux
- TanStack React Query
- DummyJSON Products API

## Screenshots

### Home Page

![Home page](./public/home-screenshot.png)

### Product Details Page

![Product details page](./public/details-screenshot.png)

### Cart Page

![Cart page](./public/cart-screenshot.png)


## How to Run

1. Clone the repository
2. Open the project folder
3. Install dependencies

```bash
npm install
```

4. Start the development server

```bash
npm run dev
```

5. Open the local Vite URL in your browser

## Build for Production

```bash
npm run build
```

## API

This project uses the [DummyJSON Products API](https://dummyjson.com/docs/products).

Products are fetched from:

- `/products?limit=0`
- `/products/:id`

