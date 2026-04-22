import { useDeferredValue, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchCategories, fetchProducts } from '../api/products'
import { ProductList } from '../components/ProductList'
import { SettingsPanel } from '../components/SettingsPanel'
import { formatCategoryName } from '../lib/formatters'
import { useSettings } from '../context/useSettings'

export function HomePage() {
  const { state } = useSettings()
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('featured')
  const deferredSearchTerm = useDeferredValue(searchTerm)

  const categoriesQuery = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  })

  const productsQuery = useQuery({
    queryKey: ['products', state.category],
    queryFn: () => fetchProducts(state.category),
  })

  const categoryItems = categoriesQuery.data || []
  const searchValue = deferredSearchTerm.trim().toLowerCase()

  const visibleProducts = [...(productsQuery.data || [])]
    .filter((product) => {
      if (!searchValue) {
        return true
      }

      return (
        product.title.toLowerCase().includes(searchValue) ||
        product.description.toLowerCase().includes(searchValue) ||
        product.brand?.toLowerCase().includes(searchValue)
      )
    })
    .sort((left, right) => {
      switch (sortBy) {
        case 'price-asc':
          return left.price - right.price
        case 'price-desc':
          return right.price - left.price
        case 'title':
          return left.title.localeCompare(right.title)
        case 'rating':
          return right.rating - left.rating
        default:
          return right.rating + right.discountPercentage -
            (left.rating + left.discountPercentage)
      }
    })

  const selectedCategoryLabel =
    state.category === 'all' ? 'All products' : formatCategoryName(state.category)

  return (
    <section className="space-y-6">
      <section className="glass-panel px-6 py-8 sm:px-8">
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.45fr)_minmax(320px,0.85fr)] xl:items-end">
          <div className="space-y-5">
            <p className="eyebrow">React Query + Redux Toolkit + Context API</p>
            <div className="space-y-4">
              <h2 className="section-title max-w-3xl">
                Browse products, switch layouts, filter categories, and manage a
                fully working cart in one app.
              </h2>
              <p className="max-w-2xl text-base sm:text-lg">
                This page fetches products from the DummyJSON API with React
                Query, keeps shared preferences in Context + `useReducer`, and
                lets Redux Toolkit manage cart updates across routes.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="metric-card">
                <p className="text-sm uppercase tracking-[0.24em]">
                  Active category
                </p>
                <p className="mt-2 text-xl font-semibold text-[color:var(--text-main)]">
                  {selectedCategoryLabel}
                </p>
              </div>
              <div className="metric-card">
                <p className="text-sm uppercase tracking-[0.24em]">Layout</p>
                <p className="mt-2 text-xl font-semibold text-[color:var(--text-main)]">
                  {state.view === 'grid' ? 'Grid view' : 'List view'}
                </p>
              </div>
              <div className="metric-card">
                <p className="text-sm uppercase tracking-[0.24em]">Theme</p>
                <p className="mt-2 text-xl font-semibold text-[color:var(--text-main)]">
                  {state.theme === 'dark' ? 'Dark mode' : 'Light mode'}
                </p>
              </div>
            </div>
          </div>

          <div className="surface-card space-y-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em]">
                Search products
              </p>
              <p className="mt-2">
                Search locally inside the cached query results for titles,
                descriptions, and brands.
              </p>
            </div>

            <label className="block">
              <span className="sr-only">Search products</span>
              <input
                type="search"
                className="field-input"
                placeholder="Search for phones, furniture, skincare..."
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
              />
            </label>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="metric-card">
                <p className="text-sm uppercase tracking-[0.24em]">Visible</p>
                <p className="mt-2 text-2xl font-bold text-[color:var(--text-main)]">
                  {visibleProducts.length}
                </p>
              </div>
              <div className="metric-card">
                <p className="text-sm uppercase tracking-[0.24em]">Categories</p>
                <p className="mt-2 text-2xl font-bold text-[color:var(--text-main)]">
                  {categoryItems.length || '--'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SettingsPanel
        categories={categoryItems}
        isLoading={categoriesQuery.isPending}
        categoryErrorMessage={
          categoriesQuery.isError ? 'Category list failed to load.' : ''
        }
      />

      <section className="glass-panel px-6 py-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="eyebrow">Product Catalog</p>
            <h2 className="mt-2 text-3xl font-semibold">Available products</h2>
            <p className="mt-2">
              Query key: <code>['products', category]</code>. Cached data is
              reused when you revisit categories and pages.
            </p>
          </div>

          <label className="w-full max-w-xs">
            <span className="mb-2 block text-sm font-semibold uppercase tracking-[0.22em]">
              Sort by
            </span>
            <select
              className="select-input"
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
            >
              <option value="featured">Featured</option>
              <option value="rating">Highest rating</option>
              <option value="price-asc">Price: low to high</option>
              <option value="price-desc">Price: high to low</option>
              <option value="title">Title A-Z</option>
            </select>
          </label>
        </div>

        <div className="mt-6">
          <ProductList
            products={visibleProducts}
            isLoading={productsQuery.isPending}
            isError={productsQuery.isError}
            error={productsQuery.error}
            view={state.view}
          />
        </div>
      </section>
    </section>
  )
}
