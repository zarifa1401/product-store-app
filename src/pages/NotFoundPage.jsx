import { Link } from 'react-router'

export function NotFoundPage() {
  return (
    <section className="glass-panel px-6 py-12 text-center">
      <p className="eyebrow">404</p>
      <h2 className="mt-3 text-3xl font-semibold">Page not found</h2>
      <p className="mx-auto mt-3 max-w-2xl">
        The page you requested does not exist. Use the button below to return to
        the store homepage.
      </p>
      <div className="mt-6 flex justify-center">
        <Link to="/" className="action-btn">
          Back to products
        </Link>
      </div>
    </section>
  )
}
