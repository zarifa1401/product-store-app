export function LoadingState({ count = 6, view = 'grid' }) {
  return (
    <div className="space-y-5">
      <div className="glass-panel px-5 py-4">
        <p className="eyebrow">Loading</p>
        <p className="mt-2">Loading products...</p>
      </div>

      <div className={view === 'grid' ? 'product-grid' : 'product-list'}>
        {Array.from({ length: count }, (_, index) => (
          <div key={index} className="surface-card animate-pulse space-y-4">
            <div className="h-56 rounded-[1.5rem] bg-slate-200/70 dark:bg-slate-700/60"></div>
            <div className="h-4 w-24 rounded-full bg-slate-200/70 dark:bg-slate-700/60"></div>
            <div className="h-6 w-3/4 rounded-full bg-slate-200/70 dark:bg-slate-700/60"></div>
            <div className="h-4 w-full rounded-full bg-slate-200/70 dark:bg-slate-700/60"></div>
            <div className="h-4 w-2/3 rounded-full bg-slate-200/70 dark:bg-slate-700/60"></div>
            <div className="h-11 rounded-full bg-slate-200/70 dark:bg-slate-700/60"></div>
          </div>
        ))}
      </div>
    </div>
  )
}
