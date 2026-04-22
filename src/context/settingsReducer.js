export const initialSettings = {
  theme: 'light',
  view: 'grid',
  category: 'all',
}

export function settingsReducer(state, action) {
  switch (action.type) {
    case 'settings/toggleTheme':
      return {
        ...state,
        theme: state.theme === 'light' ? 'dark' : 'light',
      }

    case 'settings/setTheme':
      return {
        ...state,
        theme: action.payload,
      }

    case 'settings/setView':
      return {
        ...state,
        view: action.payload,
      }

    case 'settings/setCategory':
      return {
        ...state,
        category: action.payload,
      }

    case 'settings/reset':
      return initialSettings

    default:
      return state
  }
}
