import { formatCategoryName } from '../lib/formatters'
import { useSettings } from '../context/useSettings'

const viewOptions = [
  { value: 'grid', label: 'Grid view' },
  { value: 'list', label: 'List view' },
]

const themeOptions = [
  { value: 'light', label: 'Light mode' },
  { value: 'dark', label: 'Dark mode' },
]

export function SettingsPanel({
  categories,
  isLoading,
  categoryErrorMessage = '',
}) {
  const { state, dispatch } = useSettings()

  return (
    <section className="glass-panel px-6 py-6">
      <div className="flex flex-col gap-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="eyebrow">Context API + useReducer</p>
            <h2 className="mt-2 text-2xl font-semibold">Shared app settings</h2>
            <p className="mt-2 max-w-2xl">
              These controls are stored in one context provider and updated with
              reducer actions, so every page can respond without prop drilling.
            </p>
          </div>

          <button
            type="button"
            className="action-btn-secondary"
            onClick={() => dispatch({ type: 'settings/reset' })}
          >
            Reset settings
          </button>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          <div className="metric-card space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.22em]">
              Theme
            </p>
            <div className="flex flex-wrap gap-3">
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
            <p className="text-sm font-semibold uppercase tracking-[0.22em]">
              Product layout
            </p>
            <div className="flex flex-wrap gap-3">
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

          <div className="metric-card space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.22em]">
              Selected category
            </p>
            <p className="text-lg font-semibold text-[color:var(--text-main)]">
              {state.category === 'all'
                ? 'All Products'
                : formatCategoryName(state.category)}
            </p>
            <p>Category is also kept in shared settings state.</p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm font-semibold uppercase tracking-[0.22em]">
              Category filter
            </p>
            {isLoading ? <p>Loading categories...</p> : null}
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              className={
                state.category === 'all' ? 'action-btn' : 'action-btn-secondary'
              }
              onClick={() =>
                dispatch({ type: 'settings/setCategory', payload: 'all' })
              }
            >
              All
            </button>

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

          {categoryErrorMessage ? <p>{categoryErrorMessage}</p> : null}
        </div>
      </div>
    </section>
  )
}
