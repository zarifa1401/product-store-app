import { useCallback, useMemo, useState } from 'react'
import { ToastContext } from './toastContext'

let toastId = 0

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const dismissToast = useCallback((id) => {
    setToasts((currentToasts) => currentToasts.filter((toast) => toast.id !== id))
  }, [])

  const showToast = useCallback((message, variant = 'success') => {
    const id = toastId++

    setToasts((currentToasts) => [
      ...currentToasts,
      {
        id,
        message,
        variant,
      },
    ])

    window.setTimeout(() => {
      setToasts((currentToasts) => currentToasts.filter((toast) => toast.id !== id))
    }, 2400)
  }, [])

  const value = useMemo(
    () => ({
      showToast,
      dismissToast,
    }),
    [dismissToast, showToast],
  )

  return (
    <ToastContext.Provider value={value}>
      {children}

      <div className="toast-stack" aria-live="polite" aria-atomic="true">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`toast-item ${toast.variant === 'info' ? 'toast-info' : ''}`}
            role="status"
          >
            <span>{toast.message}</span>
            <button
              type="button"
              className="toast-close"
              onClick={() => dismissToast(toast.id)}
              aria-label="Dismiss notification"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}
