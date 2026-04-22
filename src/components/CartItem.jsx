import { useDispatch } from 'react-redux'
import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from '../features/cart/cartSlice'
import { formatCategoryName, formatCurrency } from '../lib/formatters'

export function CartItem({ item }) {
  const dispatch = useDispatch()

  return (
    <article className="surface-card flex flex-col gap-5 sm:flex-row sm:items-center">
      <img
        src={item.thumbnail}
        alt={item.title}
        className="h-32 w-full rounded-[1.5rem] bg-white/70 object-contain p-4 sm:w-32"
      />

      <div className="flex flex-1 flex-col gap-4">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-2">
            <span className="badge-pill">{formatCategoryName(item.category)}</span>
            <div>
              <h2 className="text-xl font-semibold">{item.title}</h2>
              <p>{item.brand}</p>
            </div>
          </div>

          <div className="text-right">
            <p className="text-sm uppercase tracking-[0.24em]">Unit Price</p>
            <p className="text-2xl font-bold text-[color:var(--text-main)]">
              {formatCurrency(item.price)}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="icon-btn"
              onClick={() => dispatch(decreaseQuantity(item.id))}
              aria-label={`Decrease quantity for ${item.title}`}
            >
              -
            </button>
            <span className="min-w-10 text-center text-lg font-semibold text-[color:var(--text-main)]">
              {item.quantity}
            </span>
            <button
              type="button"
              className="icon-btn"
              onClick={() => dispatch(increaseQuantity(item.id))}
              aria-label={`Increase quantity for ${item.title}`}
            >
              +
            </button>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm uppercase tracking-[0.24em]">Subtotal</p>
              <p className="text-xl font-bold text-[color:var(--text-main)]">
                {formatCurrency(item.price * item.quantity)}
              </p>
            </div>

            <button
              type="button"
              className="action-btn-secondary"
              onClick={() => dispatch(removeFromCart(item.id))}
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}
