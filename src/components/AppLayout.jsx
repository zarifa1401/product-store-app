import { Outlet } from 'react-router-dom'
import { Navbar } from './Navbar'

export function AppLayout() {
  return (
    <div className="app-shell">
      <div className="hero-orb hero-orb-left"></div>
      <div className="hero-orb hero-orb-right"></div>
      <div className="hero-orb hero-orb-bottom"></div>

      <div className="page-frame">
        <Navbar />

        <main className="space-y-8 py-2">
          <Outlet />
        </main>

        <footer className="glass-panel flex flex-col gap-2 px-6 py-5 text-sm sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[color:var(--text-main)] font-semibold uppercase tracking-[0.18em]">
              Aster Store
            </p>
            <p>Thoughtful finds for a calmer shopping experience.</p>
          </div>

          <p className="text-xs uppercase tracking-[0.24em]">Curated daily edit</p>
        </footer>
      </div>
    </div>
  )
}
