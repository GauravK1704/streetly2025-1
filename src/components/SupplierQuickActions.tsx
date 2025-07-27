import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Package, 
  AlertTriangle, 
  Truck, 
  Plus, 
  BarChart3, 
  Settings,
  RefreshCw,
  Zap
} from "lucide-react";

export const SupplierQuickActions = () => {
  const quickActions = [
    {
      title: "Update Inventory",
      description: "Add or modify stock levels",
      icon: Package,
      action: "update-inventory",
      variant: "default" as const,
      urgent: false
    },
    {
      title: "Low Stock Alert",
      description: "5 items need restocking",
      icon: AlertTriangle,
      action: "view-low-stock",
      variant: "warning" as const,
      urgent: true,
      count: 5
    },
    {
      title: "Dispatch Orders",
      description: "18 orders ready for dispatch",
      icon: Truck,
      action: "dispatch-orders",
      variant: "vibrant" as const,
      urgent: true,
      count: 18
    },
    {
      title: "Create New Kit",
      description: "Design custom ingredient kits",
      icon: Plus,
      action: "create-kit",
      variant: "outline" as const,
      urgent: false
    },
    {
      title: "View Analytics",
      description: "Check performance metrics",
      icon: BarChart3,
      action: "view-analytics",
      variant: "secondary" as const,
      urgent: false
    },
    {
      title: "Bulk Operations",
      description: "Mass update prices & stock",
      icon: RefreshCw,
      action: "bulk-operations",
      variant: "outline" as const,
      urgent: false
    }
  ];

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'update-inventory':
        window.location.href = '/supplier/inventory';
        break;
      case 'view-low-stock':
        window.location.href = '/supplier/inventory?filter=low-stock';
        break;
      case 'dispatch-orders':
        window.location.href = '/supplier/orders?status=confirmed';
        break;
      case 'create-kit':
        window.location.href = '/supplier/kits?action=create';
        break;
      case 'view-analytics':
        window.location.href = '/supplier/analytics';
        break;
      case 'bulk-operations':
        window.location.href = '/supplier/inventory?action=bulk';
        break;
      default:
        console.log(`Quick action triggered: ${action}`);
    }
  };

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-primary" />
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {quickActions.map((action) => (
            <div key={action.action} className="relative">
              <Button
                variant={action.variant}
                className="w-full h-auto p-4 flex flex-col items-start gap-2 hover-lift"
                onClick={() => handleQuickAction(action.action)}
              >
                <div className="flex items-center justify-between w-full">
                  <action.icon className="h-5 w-5" />
                  {action.count && (
                    <Badge variant={action.urgent ? "destructive" : "secondary"} className="text-xs">
                      {action.count}
                    </Badge>
                  )}
                </div>
                <div className="text-left w-full">
                  <div className="font-semibold text-sm">{action.title}</div>
                  <div className="text-xs opacity-80 mt-1">{action.description}</div>
                </div>
              </Button>
              {action.urgent && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-destructive rounded-full animate-pulse"></div>
              )}
            </div>
          ))}
        </div>

        {/* Quick Stats Bar */}
        <div className="mt-6 p-4 bg-accent/5 rounded-lg border border-accent/20">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <span className="text-muted-foreground">In Stock: 234 items</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-warning rounded-full"></div>
                <span className="text-muted-foreground">Low Stock: 5 items</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-destructive rounded-full"></div>
                <span className="text-muted-foreground">Out of Stock: 2 items</span>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="text-xs">
              View All →
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};