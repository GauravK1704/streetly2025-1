import { Header } from "@/components/Header";
import { Navigation } from "@/components/Navigation";
import { SupplierAnalytics } from "@/components/SupplierAnalytics";
import { SupplierQuickActions } from "@/components/SupplierQuickActions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Package, TrendingUp, MapPin, Clock, Users, DollarSign, Bell, Zap } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const SupplierDashboard = () => {
  const { t } = useLanguage();
  const orders = [
    { id: 1, vendor: "Raj's Chaat Corner", region: "Delhi Central", items: "Onions, Tomatoes, Chaat Masala", amount: "₹2,400", status: "pending", eta: "2 hours" },
    { id: 2, vendor: "Mumbai Street Foods", region: "Mumbai West", items: "Oil, Spices, Flour", amount: "₹3,200", status: "confirmed", eta: "4 hours" },
    { id: 3, vendor: "Chennai Snacks Hub", region: "Chennai North", items: "Vegetables, Chutneys", amount: "₹1,800", status: "delivered", eta: "Completed" },
  ];

  const stats = [
    { title: "Active Orders", value: "24", icon: Package, color: "text-primary" },
    { title: "Daily Revenue", value: "₹45,600", icon: DollarSign, color: "text-success" },
    { title: "Total Vendors", value: "156", icon: Users, color: "text-accent" },
    { title: "Growth", value: "+12%", icon: TrendingUp, color: "text-primary" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container px-4 py-6">
        <div className="flex gap-6">
          <aside className="hidden lg:block">
            <Navigation />
          </aside>
          
          <main className="flex-1 space-y-6">
            {/* Header Section */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold gradient-primary bg-clip-text text-transparent">
                  {t('supplier.title')}
                </h1>
                <p className="text-muted-foreground mt-1">
                  {t('supplier.welcomeBack')}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" size="sm">
                  <Bell className="h-4 w-4 mr-2" />
                  3 New
                </Button>
                <Button variant="vibrant">
                  <Zap className="h-4 w-4 mr-2" />
                  Quick Update
                </Button>
              </div>
            </div>

            {/* Main Analytics Section */}
            <SupplierAnalytics />

            {/* Quick Actions */}
            <SupplierQuickActions />

            {/* Recent Orders Summary */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5 text-primary" />
                  Recent Orders Summary
                  <Badge variant="outline" className="ml-auto">
                    {orders.length} orders
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {orders.slice(0, 3).map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 bg-accent/5 rounded-lg border border-accent/20 hover-lift transition-smooth">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-sm">{order.vendor}</h3>
                          <Badge variant={order.status === 'pending' ? 'destructive' : order.status === 'confirmed' ? 'default' : 'secondary'} className="text-xs">
                            {order.status}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {order.region}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {order.eta}
                          </div>
                        </div>
                        <p className="text-xs mt-1 text-muted-foreground">{order.items}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-sm">{order.amount}</p>
                        <div className="flex gap-1 mt-2">
                          {order.status === 'pending' && (
                            <Button size="sm" variant="vibrant" className="text-xs h-7 px-2">
                              Accept
                            </Button>
                          )}
                          <Button size="sm" variant="outline" className="text-xs h-7 px-2">
                            View
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="pt-2 border-t border-border">
                    <Button variant="ghost" className="w-full text-sm">
                      View All Orders →
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </div>
  );
};

export default SupplierDashboard;