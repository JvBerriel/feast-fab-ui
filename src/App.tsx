import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";
import SplashScreen from "./pages/SplashScreen";
import LoginScreen from "./pages/LoginScreen";
import MenuScreen from "./pages/MenuScreen";
import DishDetailScreen from "./pages/DishDetailScreen";
import CartScreen from "./pages/CartScreen";
import OrderStatusScreen from "./pages/OrderStatusScreen";
import OrderHistoryScreen from "./pages/OrderHistoryScreen";
import BottomNav from "./components/BottomNav";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

const LayoutWithNav = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <BottomNav />
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <CartProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<SplashScreen />} />
              <Route path="/login" element={<LoginScreen />} />
              
              <Route
                path="/menu"
                element={
                  <ProtectedRoute>
                    <LayoutWithNav>
                      <MenuScreen />
                    </LayoutWithNav>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dish/:id"
                element={
                  <ProtectedRoute>
                    <DishDetailScreen />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/cart"
                element={
                  <ProtectedRoute>
                    <CartScreen />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/order-status/:id"
                element={
                  <ProtectedRoute>
                    <OrderStatusScreen />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/orders"
                element={
                  <ProtectedRoute>
                    <LayoutWithNav>
                      <OrderStatusScreen />
                    </LayoutWithNav>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/history"
                element={
                  <ProtectedRoute>
                    <LayoutWithNav>
                      <OrderHistoryScreen />
                    </LayoutWithNav>
                  </ProtectedRoute>
                }
              />
              
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
