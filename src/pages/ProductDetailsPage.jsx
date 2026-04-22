import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { fetchProductById } from '../api/products'
import { ErrorState } from '../components/ErrorState'
import { useToast } from '../context/useToast'
import { addToCart, selectCartQuantityById } from '../features/cart/cartSlice'
import { formatCategoryName, formatCurrency } from '../lib/formatters'

export function ProductDetailsPage() {
  const { productId } = useParams()
  const dispatch = useDispatch()
  const { showToast } = useToast()
  const quantityInCart = useSelector(selectCartQuantityById(Number(productId)))
  const [selectedImage, setSelectedImage] = useState('')

  const productQuery = useQuery({
    queryKey: ['product', productId],
    queryFn: () => fetchProductById(productId),
  })

  if (productQuery.isPending) {
    return (
      <section className="glass-panel grid gap-6 px-6 py-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <div className="h-[420px] animate-pulse rounded-[2rem] bg-slate-200/70 dark:bg-slate-700/60"></div>
        <div className="space-y-4">
          <div className="h-4 w-28 animate-pulse rounded-full bg-slate-200/70 dark:bg-slate-700/60"></div>
          <div className="h-10 w-4/5 animate-pulse rounded-full bg-slate-200/70 dark:bg-slate-700/60"></div>
          <div className="h-4 w-full animate-pulse rounded-full bg-slate-200/70 dark:bg-slate-700/60"></div>
          <div className="h-4 w-5/6 animate-pulse rounded-full bg-slate-200/70 dark:bg-slate-700/60"></div>
          <div className="h-24 animate-pulse rounded-[1.5rem] bg-slate-200/70 dark:bg-slate-700/60"></div>
        </div>
      </section>
    )
  }

  if (productQuery.isError) {
    return (
      <ErrorState
        title="Product details could not be loaded"
        message={productQuery.error?.message || 'The selected product is unavailable right now.'}
        action={
          <Link to="/" className="action-btn">
            Back to shop
          </Link>
        }
      />
    )
  }

  const product = productQuery.data
  const gallery = product.images?.length
    ? product.images
    : [product.thumbnail].filter(Boolean)
  const defaultImage = product.thumbnail || gallery[0] || ''
  const activeImage = gallery.includes(selectedImage) ? selectedImage : defaultImage

  return (
    <section className="space-y-6">
      <Link to="/" className="action-btn-secondary">
        Back to shop
      </Link>

      <article className="glass-panel grid gap-6 px-6 py-6 xl:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
        <div className="space-y-4">
          <div className="product-media rounded-[2rem] p-8">
            <img
              src={activeImage}
              alt={product.title}
              className="mx-auto h-[340px] w-full object-contain sm:h-[420px]"
            />
          </div>

          <div className="grid grid-cols-4 gap-3">
            {gallery.slice(0, 4).map((image) => (
              <button
                key={image}
                type="button"
                className="overflow-hidden rounded-[1.25rem] border p-2 transition"
                style={{
                  borderColor:
                    activeImage === image
                      ? 'color-mix(in srgb, var(--accent) 55%, white)'
                      : 'var(--line)',
                  background: 'color-mix(in srgb, var(--surface-strong) 88%, transparent)',
                }}
                onClick={() => setSelectedImage(image)}
              >
                <img
                  src={image}
                  alt={`${product.title} preview`}
                  className="h-20 w-full object-contain"
                />
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              <span className="badge-pill">{formatCategoryName(product.category)}</span>
              <span className="badge-pill">{product.brand || 'General Brand'}</span>
              <span className="badge-pill">SKU {product.sku || product.id}</span>
            </div>

            <div>
              <h2 className="section-title">{product.title}</h2>
              <p className="mt-3 text-base sm:text-lg">{product.description}</p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="metric-card">
              <p className="text-sm uppercase tracking-[0.24em]">Price</p>
              <p className="mt-2 text-2xl font-bold text-[color:var(--text-main)]">
                {formatCurrency(product.price)}
              </p>
            </div>
            <div className="metric-card">
              <p className="text-sm uppercase tracking-[0.24em]">Rating</p>
              <p className="mt-2 text-2xl font-bold text-[color:var(--text-main)]">
                {product.rating}
              </p>
            </div>
            <div className="metric-card">
              <p className="text-sm uppercase tracking-[0.24em]">Stock</p>
              <p className="mt-2 text-2xl font-bold text-[color:var(--text-main)]">
                {product.stock}
              </p>
            </div>
          </div>

          <div className="surface-card space-y-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <p className="text-sm uppercase tracking-[0.24em]">Availability</p>
                <p className="mt-2 text-lg font-semibold text-[color:var(--text-main)]">
                  {product.availabilityStatus || 'Available'}
                </p>
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.24em]">Shipping</p>
                <p className="mt-2 text-lg font-semibold text-[color:var(--text-main)]">
                  {product.shippingInformation || 'Standard delivery'}
                </p>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <p className="text-sm uppercase tracking-[0.24em]">Warranty</p>
                <p className="mt-2 text-lg font-semibold text-[color:var(--text-main)]">
                  {product.warrantyInformation || 'Store warranty included'}
                </p>
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.24em]">Returns</p>
                <p className="mt-2 text-lg font-semibold text-[color:var(--text-main)]">
                  {product.returnPolicy || '30-day returns'}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              className="action-btn"
              onClick={() => {
                dispatch(addToCart(product))
                showToast(`${product.title} added to cart`)
              }}
            >
              {quantityInCart > 0 ? `Add another (${quantityInCart})` : 'Add to cart'}
            </button>
            <Link to="/cart" className="action-btn-secondary">
              View cart
            </Link>
          </div>

          <div className="glass-panel px-5 py-5">
            <div className="flex flex-wrap gap-2">
              {(product.tags || []).map((tag) => (
                <span key={tag} className="badge-pill">
                  {tag}
                </span>
              ))}
            </div>

            {product.reviews?.length ? (
              <div className="mt-5 space-y-3">
                <p className="text-sm font-semibold uppercase tracking-[0.24em]">
                  Customer reviews
                </p>
                {product.reviews.slice(0, 3).map((review) => (
                  <div key={`${review.reviewerEmail}-${review.date}`} className="metric-card">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <strong className="text-[color:var(--text-main)]">
                        {review.reviewerName}
                      </strong>
                      <span>Rating {review.rating}/5</span>
                    </div>
                    <p className="mt-2">{review.comment}</p>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </article>
    </section>
  )
}
