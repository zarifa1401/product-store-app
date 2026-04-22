import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { store } from './app/store'
import { SettingsProvider } from './context/settingsContext.jsx'
import { ToastProvider } from './context/toastContext.jsx'
import './index.css'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 30,
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ToastProvider>
          <SettingsProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </SettingsProvider>
        </ToastProvider>
      </QueryClientProvider>
    </Provider>
  </StrictMode>,
)
