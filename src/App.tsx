
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Welcome from "./pages/Welcome";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Categories from "./pages/Categories";
import CategoryDetail from "./pages/CategoryDetail";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderStatus from "./pages/OrderStatus";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

// Components
import BottomNavigation from "./components/BottomNavigation";
import { CartProvider } from "./context/CartContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="mobile-container bg-gray-50">
            <div className="mobile-screen">
              <Routes>
                <Route path="/" element={<Welcome />} />
                <Route path="/home" element={
                  <>
                    <Home />
                    <BottomNavigation />
                  </>
                } />
                <Route path="/search" element={
                  <>
                    <Search />
                    <BottomNavigation />
                  </>
                } />
                <Route path="/categories" element={
                  <>
                    <Categories />
                    <BottomNavigation />
                  </>
                } />
                <Route path="/category/:categoryId" element={
                  <>
                    <CategoryDetail />
                    <BottomNavigation />
                  </>
                } />
                <Route path="/product/:productId" element={
                  <>
                    <ProductDetail />
                    <BottomNavigation />
                  </>
                } />
                <Route path="/cart" element={
                  <>
                    <Cart />
                    <BottomNavigation />
                  </>
                } />
                <Route path="/checkout" element={
                  <>
                    <Checkout />
                    <BottomNavigation />
                  </>
                } />
                <Route path="/order-status/:orderId" element={
                  <>
                    <OrderStatus />
                    <BottomNavigation />
                  </>
                } />
                <Route path="/profile" element={
                  <>
                    <Profile />
                    <BottomNavigation />
                  </>
                } />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </div>
        </BrowserRouter>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
