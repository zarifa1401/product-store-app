import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
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
        <div className="space-y-1">
          <p className="eyebrow">Week 7 • Week 8 • Week 9</p>
          <div>
            <h1 className="text-2xl font-bold sm:text-3xl">Product Store</h1>
            <p>Assignment-ready store app with modern React state patterns.</p>
          </div>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <nav className="flex flex-wrap items-center gap-2">
            <NavLink to="/" end className={navLinkClass}>
              Products
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
              {state.theme === 'dark' ? 'Light mode' : 'Dark mode'}
            </button>

            <NavLink
              to="/cart"
              className="flex items-center gap-3 rounded-full border px-4 py-2.5 text-sm font-semibold"
              style={{
                background: 'color-mix(in srgb, var(--surface-strong) 90%, transparent)',
                borderColor: 'var(--line)',
                color: 'var(--text-main)',
              }}
            >
              <span className="badge-pill">{itemsCount} items</span>
              <span>{formatCurrency(totalPrice)}</span>
            </NavLink>
          </div>
        </div>
      </div>
    </header>
  )
}
