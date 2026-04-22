import { useEffect, useReducer } from 'react'
import { loadSettings, saveSettings } from '../lib/storage'
import { SettingsContext } from './settingsContext'
import { initialSettings, settingsReducer } from './settingsReducer'

export function SettingsProvider({ children }) {
  const [state, dispatch] = useReducer(settingsReducer, {
    ...initialSettings,
    ...loadSettings(),
  })

  useEffect(() => {
    document.documentElement.classList.toggle('dark', state.theme === 'dark')
    document.documentElement.setAttribute('data-theme', state.theme)
  }, [state.theme])

  useEffect(() => {
    saveSettings(state)
  }, [state])

  return (
    <SettingsContext.Provider value={{ state, dispatch }}>
      {children}
    </SettingsContext.Provider>
  )
}
