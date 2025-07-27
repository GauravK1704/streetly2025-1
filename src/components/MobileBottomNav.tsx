import { 
  Home, 
  ShoppingCart, 
  Package, 
  Settings,
  User
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const bottomNavItems = [
  { icon: Home, label: "Dashboard", path: "/vendor", id: "dashboard" },
  { icon: ShoppingCart, label: "Marketplace", path: "/marketplace", id: "marketplace", badge: 3 },
  { icon: Package, label: "Orders", path: "/history", id: "orders" },
  { icon: Settings, label: "Settings", path: "/settings", id: "settings" },
  { icon: User, label: "Profile", path: "/profile", id: "profile" }
];

export const MobileBottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  const getBasePath = (path: string) => {
    if (path === "/vendor" || path === "/supplier" || path === "/admin" || path === "/delivery") {
      return `/${user?.role}`;
    }
    return path;
  };

  const isActive = (path: string) => {
    const basePath = getBasePath(path);
    return location.pathname === basePath;
  };

  const handleNavigation = (path: string) => {
    const targetPath = getBasePath(path);
    navigate(targetPath);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-background/95 backdrop-blur border-t">
      <div className="flex items-center justify-around p-2">
        {bottomNavItems.map((item) => (
          <Button
            key={item.id}
            variant="ghost"
            size="sm"
            onClick={() => handleNavigation(item.path)}
            className={`relative flex flex-col items-center gap-1 h-12 px-3 ${
              isActive(item.path) 
                ? 'text-primary bg-primary/10' 
                : 'text-muted-foreground'
            }`}
          >
            <div className="relative">
              <item.icon className="h-5 w-5" />
              {item.badge && (
                <Badge 
                  className="absolute -top-2 -right-2 h-4 w-4 p-0 flex items-center justify-center text-xs bg-primary"
                >
                  {item.badge}
                </Badge>
              )}
            </div>
            <span className="text-xs font-medium">{item.label}</span>
            {isActive(item.path) && (
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-primary rounded-full" />
            )}
          </Button>
        ))}
      </div>
    </div>
  );
};