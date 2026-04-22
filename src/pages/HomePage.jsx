import { useDeferredValue, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { fetchProducts } from '../api/products'
import { ProductList } from '../components/ProductList'
import { SettingsPanel } from '../components/SettingsPanel'
import { formatCategoryName, formatCurrency } from '../lib/formatters'
import {
  getStoreCategoryLabel,
  matchesStoreCategory,
  storeCategories,
} from '../lib/storeCategories'
import { useSettings } from '../context/useSettings'

export function HomePage() {
  const { state } = useSettings()
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('featured')
  const deferredSearchTerm = useDeferredValue(searchTerm)

  const productsQuery = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  })

  const searchValue = deferredSearchTerm.trim().toLowerCase()
  const displayLimit = state.view === 'grid' ? 6 : 4

  const visibleProducts = [...(productsQuery.data || [])]
    .filter((product) => matchesStoreCategory(product, state.category))
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

  const curatedProducts = visibleProducts.slice(0, displayLimit)
  const featuredProduct = curatedProducts[0]
  const selectedCategoryLabel = getStoreCategoryLabel(state.category)

  return (
    <section className="space-y-6">
      <section className="store-hero glass-panel px-6 py-8 sm:px-8">
        <div className="grid gap-8 xl:grid-cols-[minmax(0,1.15fr)_420px] xl:items-center">
          <div className="space-y-6">
            <p className="eyebrow">New season collection</p>

            <div className="space-y-4">
              <h2 className="display-title max-w-4xl">
                A calmer way to shop modern essentials.
              </h2>
              <p className="max-w-2xl text-base sm:text-lg">
                Discover a tighter edit of everyday products with cleaner
                categories, a softer palette, and a much less crowded layout.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <label className="block flex-1">
                <span className="sr-only">Search products</span>
                <input
                  type="search"
                  className="field-input"
                  placeholder="Search for skincare, laptops, decor..."
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                />
              </label>
              <Link to="/cart" className="action-btn-secondary">
                Open cart
              </Link>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="mini-stat">
                <span>Showing</span>
                <strong>{curatedProducts.length}</strong>
              </div>
              <div className="mini-stat">
                <span>Category</span>
                <strong>{selectedCategoryLabel}</strong>
              </div>
              <div className="mini-stat">
                <span>Curated from</span>
                <strong>{productsQuery.data?.length ?? 0}</strong>
              </div>
            </div>
          </div>

          <div className="editorial-panel">
            {featuredProduct ? (
              <>
                <div className="space-y-4">
                  <p className="eyebrow">Featured pick</p>
                  <div className="space-y-2">
                    <p className="text-sm uppercase tracking-[0.24em]">
                      {formatCategoryName(featuredProduct.category)}
                    </p>
                    <h3 className="text-3xl font-semibold">{featuredProduct.title}</h3>
                  </div>
                  <p className="line-clamp-3">{featuredProduct.description}</p>
                </div>

                <div className="editorial-media">
                  <img
                    src={featuredProduct.thumbnail}
                    alt={featuredProduct.title}
                    className="h-72 w-full object-contain"
                  />
                </div>

                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm uppercase tracking-[0.24em]">From</p>
                    <p className="text-3xl font-bold text-[color:var(--text-main)]">
                      {formatCurrency(featuredProduct.price)}
                    </p>
                  </div>
                  <Link
                    to={`/products/${featuredProduct.id}`}
                    className="action-btn"
                  >
                    Shop now
                  </Link>
                </div>
              </>
            ) : (
              <div className="space-y-4">
                <p className="eyebrow">Featured pick</p>
                <h3 className="text-3xl font-semibold">Loading the current edit</h3>
                <p>Your curated selection will appear here in a moment.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <SettingsPanel categories={storeCategories} />

      <section className="glass-panel px-6 py-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="eyebrow">Shop the edit</p>
            <h2 className="mt-2 text-3xl font-semibold">Curated products</h2>
            <p className="mt-2">
              Products are grouped into simpler storefront categories and shown
              in a smaller, easier-to-browse collection.
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
            products={curatedProducts}
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
