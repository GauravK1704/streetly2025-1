import { Home, Package, MapPin, DollarSign, HelpCircle } from "lucide-react";
import { NavLink } from "react-router-dom";

const DeliveryMobileNav = () => {
  const navItems = [
    { icon: Home, label: "Home", path: "/delivery-partner" },
    { icon: Package, label: "Orders", path: "/delivery-partner/orders" },
    { icon: MapPin, label: "Map", path: "/delivery-partner/map" },
    { icon: DollarSign, label: "Earnings", path: "/delivery-partner/earnings" },
    { icon: HelpCircle, label: "Help", path: "/delivery-partner/help" }
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-md border-t border-border/50 z-50 shadow-lg">
      <div className="flex items-center justify-around py-3 px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 p-3 rounded-xl transition-all duration-200 min-w-[70px] ${
                  isActive 
                    ? 'text-primary bg-primary/10 scale-105 shadow-sm' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent/50 hover:scale-105'
                }`
              }
            >
              <Icon className="h-5 w-5" />
              <span className="text-xs font-medium">{item.label}</span>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};

export { DeliveryMobileNav };