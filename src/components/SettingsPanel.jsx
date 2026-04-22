import { getStoreCategoryLabel } from '../lib/storeCategories'
import { useSettings } from '../context/useSettings'

const viewOptions = [
  { value: 'grid', label: 'Grid' },
  { value: 'list', label: 'List' },
]

const themeOptions = [
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
]

export function SettingsPanel({ categories }) {
  const { state, dispatch } = useSettings()

  return (
    <section className="glass-panel px-6 py-6">
      <div className="flex flex-col gap-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="eyebrow">Refine the shop</p>
            <h2 className="mt-2 text-2xl font-semibold">Personalize your browse</h2>
            <p className="mt-2 max-w-2xl">
              Keep the storefront calmer with quick appearance, layout, and
              category controls.
            </p>
          </div>

          <button
            type="button"
            className="action-btn-secondary"
            onClick={() => dispatch({ type: 'settings/reset' })}
          >
            Reset
          </button>
        </div>

        <div className="grid gap-4 xl:grid-cols-[240px_240px_minmax(0,1fr)]">
          <div className="metric-card space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.22em]">Theme</p>
            <div className="toggle-row">
              {themeOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  className={
                    state.theme === option.value ? 'action-btn' : 'action-btn-secondary'
                  }
                  onClick={() =>
                    dispatch({
                      type: 'settings/setTheme',
                      payload: option.value,
                    })
                  }
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div className="metric-card space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.22em]">View</p>
            <div className="toggle-row">
              {viewOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  className={
                    state.view === option.value ? 'action-btn' : 'action-btn-secondary'
                  }
                  onClick={() =>
                    dispatch({
                      type: 'settings/setView',
                      payload: option.value,
                    })
                  }
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div className="metric-card space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm font-semibold uppercase tracking-[0.22em]">
                Category
              </p>
              <p className="text-sm">{getStoreCategoryLabel(state.category)}</p>
            </div>

            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category.slug}
                  type="button"
                  className={
                    state.category === category.slug
                      ? 'action-btn'
                      : 'action-btn-secondary'
                  }
                  onClick={() =>
                    dispatch({
                      type: 'settings/setCategory',
                      payload: category.slug,
                    })
                  }
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
