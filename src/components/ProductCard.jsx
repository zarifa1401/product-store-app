import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router'
import { addToCart, selectCartQuantityById } from '../features/cart/cartSlice'
import { formatCategoryName, formatCurrency } from '../lib/formatters'

export function ProductCard({ product, view = 'grid' }) {
  const dispatch = useDispatch()
  const quantityInCart = useSelector(selectCartQuantityById(product.id))
  const isListView = view === 'list'

  return (
    <article
      className={`surface-card overflow-hidden ${
        isListView
          ? 'flex flex-col gap-6 md:flex-row md:items-center'
          : 'flex h-full flex-col gap-5'
      }`}
    >
      <Link
        to={`/products/${product.id}`}
        className={isListView ? 'md:w-72 md:flex-shrink-0' : ''}
      >
        <div className="overflow-hidden rounded-[1.5rem] bg-white/80 p-6">
          <img
            src={product.thumbnail}
            alt={product.title}
            className={`mx-auto object-contain transition duration-300 hover:scale-105 ${
              isListView ? 'h-52 w-full' : 'h-56 w-full'
            }`}
          />
        </div>
      </Link>

      <div className="flex flex-1 flex-col gap-4">
        <div className="flex flex-wrap gap-2">
          <span className="badge-pill">{formatCategoryName(product.category)}</span>
          <span className="badge-pill">{product.brand || 'General Brand'}</span>
          <span className="badge-pill">Rating {product.rating}</span>
        </div>

        <div className="space-y-2">
          <Link to={`/products/${product.id}`}>
            <h2 className="text-2xl font-semibold">{product.title}</h2>
          </Link>
          <p className="line-clamp-3">{product.description}</p>
        </div>

        <div className="mt-auto flex flex-wrap items-end justify-between gap-4">
          <div className="space-y-1">
            <p className="text-3xl font-bold text-[color:var(--text-main)]">
              {formatCurrency(product.price)}
            </p>
            <p>
              {product.stock} in stock • {product.discountPercentage}% discount
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              to={`/products/${product.id}`}
              className="action-btn-secondary"
            >
              View details
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
