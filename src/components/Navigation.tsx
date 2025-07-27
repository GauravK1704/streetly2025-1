import { 
  Home, 
  ShoppingCart, 
  RotateCcw, 
  Sparkles, 
  Truck, 
  BarChart3,
  Calendar,
  Settings,
  HelpCircle,
  Wallet,
  Package,
  PackageOpen,
  TrendingUp,
  DollarSign,
  FileText,
  Users,
  Brain,
  MessageSquare
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const vendorNavItems = [
  { icon: Home, label: "Dashboard", path: "/vendor", id: "dashboard" },
  { icon: ShoppingCart, label: "Marketplace", path: "/marketplace", id: "marketplace" },
  { icon: Package, label: "Orders", path: "/history", id: "orders" },
  { icon: RotateCcw, label: "Subscriptions", path: "/subscriptions", id: "subscriptions" },
  { icon: Wallet, label: "Wallet", path: "/wallet", id: "wallet" },
  { icon: Sparkles, label: "Festival Specials", path: "/festivals", id: "festivals" },
  { icon: Truck, label: "Delivery Tracking", path: "/delivery-tracking", id: "delivery" },
  { icon: Settings, label: "Settings", path: "/settings", id: "settings" },
  { icon: HelpCircle, label: "Help & Support", path: "/help", id: "help" },
];

const supplierNavItems = [
  { icon: Home, label: "Dashboard", path: "/supplier", id: "dashboard" },
  { icon: Package, label: "Orders", path: "/supplier/orders", id: "orders" },
  { icon: PackageOpen, label: "Inventory", path: "/supplier/inventory", id: "inventory" },
  { icon: ShoppingCart, label: "Manage Kits", path: "/supplier/kits", id: "kits" },
  { icon: BarChart3, label: "Analytics", path: "/supplier/analytics", id: "analytics" },
  { icon: Truck, label: "Logistics", path: "/supplier/logistics", id: "logistics" },
  { icon: DollarSign, label: "Payments", path: "/supplier/payments", id: "payments" },
  { icon: FileText, label: "Invoices", path: "/supplier/invoices", id: "invoices" },
  { icon: Brain, label: "AI Insights", path: "/supplier/ai-insights", id: "ai-insights" },
  { icon: Settings, label: "Settings", path: "/settings", id: "settings" },
  { icon: HelpCircle, label: "Help & Support", path: "/help", id: "help" },
];

const getFilteredNavItems = (userRole: string) => {
  if (userRole === 'vendor') {
    return vendorNavItems;
  }
  if (userRole === 'supplier') {
    return supplierNavItems;
  }
  return vendorNavItems;
};

export const Navigation = () => {
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

  const filteredNavItems = getFilteredNavItems(user?.role || '');

  return (
    <Card className="w-64 h-fit shadow-card">
      <div className="p-4 space-y-2">
        {filteredNavItems.map((item) => (
          <Button
            key={item.id}
            variant={isActive(item.path) ? "vibrant" : "ghost"}
            className="w-full justify-start gap-3 h-11"
            onClick={() => handleNavigation(item.path)}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.label}</span>
          </Button>
        ))}
      </div>
    </Card>
  );
};