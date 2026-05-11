import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { CartProvider } from './context/CartContext'
import CartDrawer from './components/CartDrawer'
import HomePage from './pages/HomePage'
import ProductPage from './pages/ProductPage'
import CheckoutPage from './pages/CheckoutPage'
import HeritagePage from './pages/HeritagePage'
import CollectionsPage from './pages/CollectionsPage'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <ScrollToTop />
        <CartDrawer />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/collections" element={<CollectionsPage />} />
          <Route path="/heritage" element={<HeritagePage />} />
          <Route path="/product/:sku" element={<ProductPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
        </Routes>
      </CartProvider>
    </BrowserRouter>
  )
}

export default App
