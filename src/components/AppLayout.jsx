import { Outlet } from 'react-router-dom'
import { Navbar } from './Navbar'

export function AppLayout() {
  return (
    <div className="app-shell">
      <div className="hero-orb hero-orb-left"></div>
      <div className="hero-orb hero-orb-right"></div>

      <div className="page-frame">
        <Navbar />

        <main className="space-y-8 py-2">
          <Outlet />
        </main>

        <footer className="glass-panel flex flex-col gap-3 px-6 py-5 text-sm sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-semibold text-[color:var(--text-main)]">
              Product Store App
            </p>
            <p>
              Context API handles settings, Redux Toolkit manages the cart, and
              React Query controls product data.
            </p>
          </div>

          <p className="text-xs uppercase tracking-[0.24em]">
            React • TailwindCSS 4 • Vite 8
          </p>
        </footer>
      </div>
    </div>
  )
}
