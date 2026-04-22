const SETTINGS_STORAGE_KEY = 'product-store-settings'
const CART_STORAGE_KEY = 'product-store-cart'

function canUseStorage() {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined'
}

function readStorage(key, fallbackValue) {
  if (!canUseStorage()) {
    return fallbackValue
  }

  try {
    const storedValue = window.localStorage.getItem(key)
    return storedValue ? JSON.parse(storedValue) : fallbackValue
  } catch {
    return fallbackValue
  }
}

function writeStorage(key, value) {
  if (!canUseStorage()) {
    return
  }

  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // Ignore write failures so the app still works without persistence.
  }
}

export function loadSettings() {
  return readStorage(SETTINGS_STORAGE_KEY, null)
}

export function saveSettings(settings) {
  writeStorage(SETTINGS_STORAGE_KEY, settings)
}

export function loadCartItems() {
  return readStorage(CART_STORAGE_KEY, [])
}

export function saveCartItems(items) {
  writeStorage(CART_STORAGE_KEY, items)
}
