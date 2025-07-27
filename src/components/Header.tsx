import { Search, Home, ShoppingCart } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageSelector } from "./LanguageSelector";
import { MobileMenu } from "./MobileMenu";
import { NotificationDropdown } from "./NotificationDropdown";
import { ProfileDropdown } from "./ProfileDropdown";
import { CartSidebar } from "./CartSidebar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { useNavigate, useLocation } from "react-router-dom";

export const Header = () => {
  const { user } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const isSupplierPage = location.pathname.startsWith('/supplier');
  const isDeliveryPartnerPage = location.pathname.startsWith('/delivery-partner') || location.pathname.startsWith('/delivery');
  const showCartButton = user && !isSupplierPage && !isDeliveryPartnerPage;

  const handleHomeClick = () => {
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center px-4">
        <div className="mr-4 flex items-center space-x-4">
          <MobileMenu />
          <div className="flex items-center space-x-2">
            <div className="text-xl font-bold gradient-primary bg-clip-text text-transparent">
              StreetLy
            </div>
            <Badge variant="outline" className="text-xs bg-accent/10 text-accent border-accent/20">
              Beta
            </Badge>
          </div>
        </div>

        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search kits, ingredients..."
                className="pl-10 md:w-[300px] lg:w-[400px]"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleHomeClick}
              className="hover:bg-accent hover:text-accent-foreground"
              title="Return to Home"
            >
              <Home className="h-5 w-5" />
            </Button>
            {showCartButton && (
              <CartSidebar>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="relative hover:bg-accent hover:text-accent-foreground"
                  title="Shopping Cart"
                >
                  <ShoppingCart className="h-5 w-5" />
                  {totalItems > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs bg-primary">
                      {totalItems}
                    </Badge>
                  )}
                </Button>
              </CartSidebar>
            )}
            <LanguageSelector />
            {user && <NotificationDropdown />}
            <ThemeToggle />
            {user && <ProfileDropdown />}
          </div>
        </div>
      </div>
    </header>
  );
};