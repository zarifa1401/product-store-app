import { Route, Routes } from 'react-router-dom'
import { AppLayout } from './components/AppLayout'
import { CartPage } from './pages/CartPage'
import { HomePage } from './pages/HomePage'
import { NotFoundPage } from './pages/NotFoundPage'
import { ProductDetailsPage } from './pages/ProductDetailsPage'

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route path="products/:productId" element={<ProductDetailsPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App
