import { configureStore } from '@reduxjs/toolkit'
import cartReducer from '../features/cart/cartSlice'
import { saveCartItems } from '../lib/storage'

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
})

store.subscribe(() => {
  saveCartItems(store.getState().cart.items)
})
