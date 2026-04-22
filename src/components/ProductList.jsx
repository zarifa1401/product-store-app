import { ErrorState } from './ErrorState'
import { LoadingState } from './LoadingState'
import { ProductCard } from './ProductCard'

export function ProductList({
  products,
  isLoading,
  isError,
  error,
  view,
}) {
  if (isLoading) {
    return <LoadingState view={view} />
  }

  if (isError) {
    return (
      <ErrorState
        title="Products could not be loaded"
        message={error?.message || 'Please check your network connection and try again.'}
      />
    )
  }

  if (!products.length) {
    return (
      <div className="glass-panel px-6 py-10 text-center">
        <p className="eyebrow">No Matches</p>
        <h2 className="mt-3 text-2xl font-semibold">No products found</h2>
        <p className="mx-auto mt-3 max-w-2xl">
          Try a different search term, sort option, or category selection.
        </p>
      </div>
    )
  }

  return (
    <div className={view === 'grid' ? 'product-grid' : 'product-list'}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} view={view} />
      ))}
    </div>
  )
}
