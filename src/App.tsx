import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import { CartProvider } from "./contexts/CartContext";
import { AuthPage } from "./pages/AuthPage";
import { Landing } from "./pages/Landing";
import VendorDashboard from "./pages/VendorDashboard";
import SupplierDashboard from "./pages/SupplierDashboard";
import SupplierOrders from "./pages/SupplierOrders";
import SupplierInventory from "./pages/SupplierInventory";
import SupplierKits from "./pages/SupplierKits";
import SupplierAnalyticsPage from "./pages/SupplierAnalytics";
import SupplierLogistics from "./pages/SupplierLogistics";
import SupplierPayments from "./pages/SupplierPayments";
import SupplierInvoices from "./pages/SupplierInvoices";
import SupplierAIInsights from "./pages/SupplierAIInsights";
import DeliveryPartnerDashboard from "./pages/DeliveryPartnerDashboard";
import DeliveryOrders from "./pages/DeliveryOrders";
import DeliveryMap from "./pages/DeliveryMap";
import DeliveryEarnings from "./pages/DeliveryEarnings";
import DeliveryHelp from "./pages/DeliveryHelp";
import AdminDashboard from "./pages/AdminDashboard";
import DeliveryDashboard from "./pages/DeliveryDashboard";
import NotFound from "./pages/NotFound";
import { Marketplace } from "./pages/Marketplace";
import { Subscriptions } from "./pages/Subscriptions";
import { FestivalSpecials } from "./pages/FestivalSpecials";
import { DeliveryTracking } from "./pages/DeliveryTracking";
import { Analytics } from "./pages/Analytics";
import { OrderHistory } from "./pages/OrderHistory";
import { WalletDashboard } from "./pages/WalletDashboard";
import { Settings } from "./pages/Settings";
import { HelpSupport } from "./pages/HelpSupport";
import { PaymentSuccess } from "./pages/PaymentSuccess";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children, allowedRoles }: { children: React.ReactNode; allowedRoles: string[] }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to={`/${user.role}`} replace />;
  }

  return <>{children}</>;
};

const AppRoutes = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <Routes>
      <Route path="/auth" element={user ? <Navigate to={`/${user.role}`} replace /> : <AuthPage />} />
      <Route path="/" element={<Landing />} />
      <Route path="/home" element={<Landing />} />
      
      <Route 
        path="/vendor" 
        element={
          <ProtectedRoute allowedRoles={['vendor']}>
            <VendorDashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/supplier" 
        element={
          <ProtectedRoute allowedRoles={['supplier']}>
            <SupplierDashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/admin" 
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminDashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/delivery" 
        element={
          <ProtectedRoute allowedRoles={['delivery']}>
            <DeliveryPartnerDashboard />
          </ProtectedRoute>
        } 
      />
      
      {/* Delivery Partner Routes */}
      <Route 
        path="/delivery-partner" 
        element={
          <ProtectedRoute allowedRoles={['delivery']}>
            <DeliveryPartnerDashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/delivery-partner/orders" 
        element={
          <ProtectedRoute allowedRoles={['delivery']}>
            <DeliveryOrders />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/delivery-partner/map" 
        element={
          <ProtectedRoute allowedRoles={['delivery']}>
            <DeliveryMap />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/delivery-partner/earnings" 
        element={
          <ProtectedRoute allowedRoles={['delivery']}>
            <DeliveryEarnings />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/delivery-partner/help" 
        element={
          <ProtectedRoute allowedRoles={['delivery']}>
            <DeliveryHelp />
          </ProtectedRoute>
        } 
      />
      
      {/* Supplier Routes */}
      <Route 
        path="/supplier/orders" 
        element={
          <ProtectedRoute allowedRoles={['supplier']}>
            <SupplierOrders />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/supplier/inventory" 
        element={
          <ProtectedRoute allowedRoles={['supplier']}>
            <SupplierInventory />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/supplier/kits" 
        element={
          <ProtectedRoute allowedRoles={['supplier']}>
            <SupplierKits />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/supplier/analytics" 
        element={
          <ProtectedRoute allowedRoles={['supplier']}>
            <SupplierAnalyticsPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/supplier/logistics" 
        element={
          <ProtectedRoute allowedRoles={['supplier']}>
            <SupplierLogistics />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/supplier/payments" 
        element={
          <ProtectedRoute allowedRoles={['supplier']}>
            <SupplierPayments />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/supplier/invoices" 
        element={
          <ProtectedRoute allowedRoles={['supplier']}>
            <SupplierInvoices />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/supplier/ai-insights" 
        element={
          <ProtectedRoute allowedRoles={['supplier']}>
            <SupplierAIInsights />
          </ProtectedRoute>
        } 
      />
      
      {/* Shared Routes - Available to all authenticated users */}
      <Route path="/marketplace" element={user ? <Marketplace /> : <Navigate to="/auth" replace />} />
      <Route path="/subscriptions" element={user ? <Subscriptions /> : <Navigate to="/auth" replace />} />
      <Route path="/festivals" element={user ? <FestivalSpecials /> : <Navigate to="/auth" replace />} />
      <Route path="/delivery-tracking" element={user ? <DeliveryTracking /> : <Navigate to="/auth" replace />} />
      <Route path="/analytics" element={user ? <Analytics /> : <Navigate to="/auth" replace />} />
      <Route path="/history" element={user ? <OrderHistory /> : <Navigate to="/auth" replace />} />
      <Route path="/wallet" element={user ? <WalletDashboard /> : <Navigate to="/auth" replace />} />
      <Route path="/settings" element={user ? <Settings /> : <Navigate to="/auth" replace />} />
      <Route path="/help" element={user ? <HelpSupport /> : <Navigate to="/auth" replace />} />
      <Route path="/payment-success" element={<PaymentSuccess />} />
      
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <LanguageProvider>
          <AuthProvider>
            <CartProvider>
              <AppRoutes />
            </CartProvider>
          </AuthProvider>
        </LanguageProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
