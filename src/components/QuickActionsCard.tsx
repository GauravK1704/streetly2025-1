import { ShoppingCart, Zap, RotateCcw, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const quickActions = [
  {
    id: 1,
    title: "Quick Reorder",
    description: "Yesterday's Chaat Kit",
    icon: RotateCcw,
    variant: "outline" as const,
    color: "text-secondary",
  },
  {
    id: 2,
    title: "Emergency Top-Up",
    description: "Need ingredients now?",
    icon: Zap,
    variant: "warning" as const,
    color: "text-warning-foreground",
  },
  {
    id: 3,
    title: "Browse Marketplace",
    description: "Explore new kits",
    icon: ShoppingCart,
    variant: "vibrant" as const,
    color: "text-accent-foreground",
  },
];

export const QuickActionsCard = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleQuickAction = (action: typeof quickActions[0]) => {
    switch (action.id) {
      case 1: // Quick Reorder
        toast({
          title: "Order Processing",
          description: "Adding yesterday's Chaat Kit to your cart...",
        });
        setTimeout(() => {
          toast({
            title: "Order Added!",
            description: "Chaat Kit has been added to your cart.",
          });
        }, 1500);
        break;
      case 2: // Emergency Top-Up
        toast({
          title: "Emergency Mode",
          description: "Redirecting to express delivery options...",
        });
        navigate("/marketplace");
        break;
      case 3: // Browse Marketplace
        navigate("/marketplace");
        break;
    }
  };

  const handleStockAlert = () => {
    toast({
      title: "Stock Alert",
      description: "Redirecting to oil refill options...",
    });
    navigate("/marketplace");
  };

  return (
    <Card className="shadow-card hover-lift">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-primary" />
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {quickActions.map((action) => (
          <Button
            key={action.id}
            variant={action.variant}
            className="w-full h-auto p-4 flex items-center justify-start gap-3 transition-all duration-200 hover:scale-[1.02]"
            onClick={() => handleQuickAction(action)}
          >
            <div className="w-10 h-10 rounded-full bg-background/20 flex items-center justify-center">
              <action.icon className={`h-5 w-5 ${action.color}`} />
            </div>
            <div className="text-left">
              <div className="font-medium">{action.title}</div>
              <div className="text-xs opacity-80">{action.description}</div>
            </div>
          </Button>
        ))}
        
        <div 
          className="mt-4 p-3 bg-warning/10 rounded-lg border border-warning/20 cursor-pointer transition-all duration-200 hover:bg-warning/20"
          onClick={handleStockAlert}
        >
          <div className="flex items-center gap-2 text-warning">
            <AlertTriangle className="h-4 w-4" />
            <span className="text-sm font-medium">Low Stock Alert</span>
          </div>
          <p className="text-xs text-warning/80 mt-1">
            Your oil supply is running low. Consider ordering a refill.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};