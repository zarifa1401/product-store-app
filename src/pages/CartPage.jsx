import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { CartItem } from '../components/CartItem'
import {
  clearCart,
  selectCartItems,
  selectCartTotals,
} from '../features/cart/cartSlice'
import { formatCurrency } from '../lib/formatters'

export function CartPage() {
  const dispatch = useDispatch()
  const items = useSelector(selectCartItems)
  const { itemsCount, totalPrice } = useSelector(selectCartTotals)

  if (!items.length) {
    return (
      <section className="glass-panel px-6 py-10 text-center">
        <p className="eyebrow">Your cart</p>
        <h2 className="mt-3 text-3xl font-semibold">Your bag is still empty</h2>
        <p className="mx-auto mt-3 max-w-2xl">
          Add a few pieces from the collection and they will appear here with a
          live order summary.
        </p>
        <div className="mt-6 flex justify-center">
          <Link to="/" className="action-btn">
            Browse products
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="grid gap-6 xl:grid-cols-[minmax(0,1.7fr)_380px]">
      <div className="space-y-5">
        <div>
          <p className="eyebrow">Shopping bag</p>
          <h2 className="mt-2 text-3xl font-semibold">Review your picks</h2>
          <p className="mt-2">Adjust quantities, remove items, or head back to the shop.</p>
        </div>

        {items.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>

      <aside className="glass-panel h-fit px-6 py-6">
        <div className="space-y-6">
          <div>
            <p className="eyebrow">Summary</p>
            <h2 className="mt-2 text-2xl font-semibold">Order overview</h2>
          </div>

          <div className="grid gap-4">
            <div className="metric-card flex items-center justify-between">
              <span>Total items</span>
              <strong className="text-lg text-[color:var(--text-main)]">
                {itemsCount}
              </strong>
            </div>
            <div className="metric-card flex items-center justify-between">
              <span>Unique products</span>
              <strong className="text-lg text-[color:var(--text-main)]">
                {items.length}
              </strong>
            </div>
            <div className="metric-card flex items-center justify-between">
              <span>Total price</span>
              <strong className="text-lg text-[color:var(--text-main)]">
                {formatCurrency(totalPrice)}
              </strong>
            </div>
          </div>

          <div className="space-y-3">
            <button
              type="button"
              className="action-btn w-full"
              onClick={() => dispatch(clearCart())}
            >
              Clear cart
            </button>
            <Link to="/" className="action-btn-secondary w-full text-center">
              Continue shopping
            </Link>
          </div>
        </div>
      </aside>
    </section>
  )
}
