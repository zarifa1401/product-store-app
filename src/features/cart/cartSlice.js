import { createSlice } from '@reduxjs/toolkit'
import { loadCartItems } from '../../lib/storage'

const initialState = {
  items: loadCartItems(),
}

function findCartItem(state, productId) {
  return state.items.find((item) => item.id === productId)
}

function normaliseProduct(product) {
  return {
    id: product.id,
    title: product.title,
    price: product.price,
    thumbnail: product.thumbnail || product.images?.[0] || '',
    category: product.category,
    brand: product.brand || 'General Brand',
    quantity: 1,
  }
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = findCartItem(state, action.payload.id)

      if (existingItem) {
        existingItem.quantity += 1
        return
      }

      state.items.push(normaliseProduct(action.payload))
    },

    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload)
    },

    increaseQuantity: (state, action) => {
      const existingItem = findCartItem(state, action.payload)

      if (existingItem) {
        existingItem.quantity += 1
      }
    },

    decreaseQuantity: (state, action) => {
      const existingItem = findCartItem(state, action.payload)

      if (!existingItem) {
        return
      }

      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== action.payload)
        return
      }

      existingItem.quantity -= 1
    },

    clearCart: (state) => {
      state.items = []
    },
  },
})

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions

export const selectCartItems = (state) => state.cart.items

export const selectCartTotals = (state) =>
  state.cart.items.reduce(
    (totals, item) => ({
      itemsCount: totals.itemsCount + item.quantity,
      totalPrice: totals.totalPrice + item.price * item.quantity,
    }),
    {
      itemsCount: 0,
      totalPrice: 0,
    },
  )

export const selectCartQuantityById = (productId) => (state) =>
  state.cart.items.find((item) => item.id === productId)?.quantity ?? 0

export default cartSlice.reducer
