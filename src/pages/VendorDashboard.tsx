import { Header } from "@/components/Header";
import { Navigation } from "@/components/Navigation";
import { CartSidebar } from "@/components/CartSidebar";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { WelcomeCard } from "@/components/WelcomeCard";

import { PromotionsBanner } from "@/components/PromotionsBanner";
import { MobileBottomNav } from "@/components/MobileBottomNav";
import { QuickActionsCard } from "@/components/QuickActionsCard";
import { SmartSuggestionsCard } from "@/components/SmartSuggestionsCard";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCart } from "@/contexts/CartContext";

const VendorDashboard = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const { totalItems } = useCart();

  return (
    <div className="min-h-screen bg-background pb-16 md:pb-0">
      <Header />
      
      <div className="container px-4 py-6">
        <div className="flex gap-6">
          {/* Sidebar Navigation - Desktop */}
          <aside className="hidden lg:block">
            <Navigation />
          </aside>
          
          {/* Main Content */}
          <main className="flex-1 space-y-6">
            {/* Header with Cart */}
            <div className="flex items-center justify-between">
               <div>
                 <h1 className="text-3xl font-bold">{t('dashboard.title')}</h1>
                <p className="text-muted-foreground">{t('dashboard.welcome')}, {user?.name || "Rajesh Bhai"}</p>
              </div>
              <CartSidebar>
                <Button variant="outline" size="lg" className="relative">
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  {t('dashboard.cart')}
                  {totalItems > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-primary text-primary-foreground text-xs">
                      {totalItems}
                    </Badge>
                  )}
                </Button>
              </CartSidebar>
            </div>
            
            {/* Welcome Section */}
            <WelcomeCard 
              vendorName={user?.name || "Rajesh Bhai"}
              location="Connaught Place, Delhi"
            />
            
            {/* Promotions Banner */}
            <PromotionsBanner />
            
            {/* Action Cards Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {/* Quick Actions */}
              <QuickActionsCard />
              
              {/* Smart Suggestions */}
              <SmartSuggestionsCard />
            </div>
          </main>
        </div>
      </div>
      
      {/* Mobile Bottom Navigation */}
      <MobileBottomNav />
    </div>
  );
};

export default VendorDashboard;