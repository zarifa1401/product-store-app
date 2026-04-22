import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { addToCart, selectCartQuantityById } from '../features/cart/cartSlice'
import { formatCategoryName, formatCurrency } from '../lib/formatters'

export function ProductCard({ product, view = 'grid' }) {
  const dispatch = useDispatch()
  const quantityInCart = useSelector(selectCartQuantityById(product.id))
  const isListView = view === 'list'

  return (
    <article
      className={`product-card overflow-hidden ${
        isListView
          ? 'flex flex-col gap-5 md:flex-row md:items-center'
          : 'flex h-full flex-col gap-4'
      }`}
    >
      <Link
        to={`/products/${product.id}`}
        className={isListView ? 'md:w-72 md:flex-shrink-0' : ''}
      >
        <div className="product-media">
          <img
            src={product.thumbnail}
            alt={product.title}
            className={`mx-auto object-contain transition duration-300 hover:scale-105 ${
              isListView ? 'h-52 w-full' : 'h-64 w-full'
            }`}
          />
        </div>
      </Link>

      <div className="flex flex-1 flex-col gap-4">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2">
            <span className="badge-pill">{formatCategoryName(product.category)}</span>
            <Link to={`/products/${product.id}`}>
              <h2 className="text-[1.55rem] font-semibold leading-tight">
                {product.title}
              </h2>
            </Link>
          </div>

          <div className="metric-chip">
            <span className="text-xs uppercase tracking-[0.22em]">Rating</span>
            <strong className="text-base text-[color:var(--text-main)]">
              {product.rating}
            </strong>
          </div>
        </div>

        <div className="space-y-3">
          <p className="line-clamp-2 text-[15px] leading-7">{product.description}</p>
          <div className="flex flex-wrap gap-2 text-sm">
            <span>{product.brand || 'General Brand'}</span>
            <span>/</span>
            <span>{product.stock} in stock</span>
            <span>/</span>
            <span>{product.discountPercentage}% off</span>
          </div>
        </div>

        <div className="mt-auto flex flex-wrap items-end justify-between gap-4">
          <div className="space-y-1">
            <p className="text-3xl font-bold text-[color:var(--text-main)]">
              {formatCurrency(product.price)}
            </p>
            <p>Ready to ship</p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link to={`/products/${product.id}`} className="action-btn-secondary">
              Details
            </Link>
            <button
              type="button"
              className="action-btn"
              onClick={() => dispatch(addToCart(product))}
            >
              {quantityInCart > 0 ? `Add another (${quantityInCart})` : 'Add to cart'}
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}
