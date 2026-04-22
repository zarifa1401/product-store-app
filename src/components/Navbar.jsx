import { useSelector } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import { selectCartTotals } from '../features/cart/cartSlice'
import { useSettings } from '../context/useSettings'
import { formatCurrency } from '../lib/formatters'

export function Navbar() {
  const { itemsCount, totalPrice } = useSelector(selectCartTotals)
  const { state, dispatch } = useSettings()

  const navLinkClass = ({ isActive }) =>
    `nav-link ${isActive ? 'nav-link-active' : ''}`

  return (
    <header className="glass-panel sticky top-4 z-40 px-4 py-4 sm:px-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <Link to="/" className="flex items-center gap-3">
          <span className="brand-mark"></span>
          <div className="space-y-1">
            <p className="eyebrow">Aster Collection</p>
            <div>
              <h1 className="text-2xl font-bold sm:text-3xl">Aster Store</h1>
              <p>Modern essentials with a cleaner way to browse.</p>
            </div>
          </div>
        </Link>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <nav className="flex flex-wrap items-center gap-2">
            <NavLink to="/" end className={navLinkClass}>
              Shop
            </NavLink>
            <NavLink to="/cart" className={navLinkClass}>
              Cart
            </NavLink>
          </nav>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              className="action-btn-secondary"
              onClick={() => dispatch({ type: 'settings/toggleTheme' })}
            >
              {state.theme === 'dark' ? 'Light' : 'Dark'}
            </button>

            <NavLink to="/cart" className="cart-pill">
              <span className="badge-pill">{itemsCount} items</span>
              <span>{formatCurrency(totalPrice)}</span>
            </NavLink>
          </div>
        </div>
      </div>
    </header>
  )
}
