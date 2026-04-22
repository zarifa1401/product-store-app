# Product Store App

A React assignment project that combines Context API + `useReducer`, Redux Toolkit, and React Query in one small e-commerce app.

## Description

This app lets users browse products, open a product details page, switch shared UI settings, and manage a shopping cart.

It was built to demonstrate:

- when to use Context API for lightweight shared app settings
- when to use Redux Toolkit for structured global state
- when to use React Query for remote server data, caching, loading, and error handling

## Features

- Product list fetched from the DummyJSON API
- Loading state while data is being fetched
- Error state when requests fail
- Product details page using a separate React Query key
- Shared settings with Context API + `useReducer`
- Dark mode and light mode
- Grid view and list view
- Selected category stored in shared settings
- Shopping cart built with Redux Toolkit
- Add to cart
- Remove from cart
- Increase quantity
- Decrease quantity
- Clear cart
- Total item count
- Total price
- Search products
- Sort products
- Responsive layout
- Cart persistence in `localStorage`
- Theme/settings persistence in `localStorage`

## State Management Breakdown

### Context API + `useReducer`

Used for app-wide UI settings:

- theme
- product layout
- selected category

### Redux Toolkit

Used for shopping cart state:

- cart items
- quantity updates
- totals
- clear/remove actions

### React Query

Used for API data:

- category list
- product list
- product details
- caching with query keys such as `['products', category]` and `['product', productId]`

## Tools / Libraries Used

- React 19
- Vite 8
- TailwindCSS 4 with `@tailwindcss/vite`
- React Router DOM 6
- Redux Toolkit
- React Redux
- TanStack React Query
- DummyJSON API

## Screenshots

### Product Details Page

![Product details page](./public/details-screenshot.png)

### Cart Page

![Cart page](./public/cart-screenshot.png)

## How to Run

1. Clone the repository.
2. Open the project folder.
3. Install dependencies:

```bash
npm install
```

4. Start the development server:

```bash
npm run dev
```

5. Open the local URL shown by Vite in your browser.

## Build for Production

```bash
npm run build
```

## API

This project uses the [DummyJSON Products API](https://dummyjson.com/docs/products).

## Submission Notes

- GitHub repository: this project folder
- README included
- Screenshots included in the README
