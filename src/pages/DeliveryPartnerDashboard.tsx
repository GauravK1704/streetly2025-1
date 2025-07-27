import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { 
  Home, 
  Package, 
  MapPin, 
  DollarSign, 
  HelpCircle,
  Truck,
  Clock,
  Route,
  Phone,
  MessageSquare,
  AlertTriangle,
  TrendingUp,
  CheckCircle,
  Navigation,
  Camera,
  Star,
  BarChart3,
  Bell,
  Languages,
  User,
  Zap,
  Shield,
  Target,
  PlayCircle,
  Eye,
  AlertCircle
} from "lucide-react";
import { DeliveryMobileNav } from "@/components/DeliveryMobileNav";
import { useToast } from "@/hooks/use-toast";

// Google Maps API Key
const GOOGLE_MAPS_API_KEY = "AIzaSyDyWQoaznzdCbuTfLOMJVES57nrwgdQgWM";

const DeliveryPartnerDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isOnline, setIsOnline] = useState(true);
  
  const todayStats = {
    totalDeliveries: 12,
    earningsToday: "₹1,580",
    kmCovered: 52,
    liveOrders: 3,
    rating: 4.9,
    onTimePercentage: 98
  };

  const initialLiveOrders = [
    {
      id: "DLV-001",
      vendorName: "Raj's Chaat Corner",
      vendorAddress: "Connaught Place, New Delhi",
      supplierName: "Fresh Spice Co.",
      pickupAddress: "Karol Bagh Market",
      eta: "8 mins",
      status: "in_transit",
      priority: "high",
      distance: "1.2 km",
      payment: "₹120",
      specialInstructions: "Handle fragile spice packets with care",
      orderTime: "15:30",
      vendorPhone: "+91 98765 43210",
      supplierPhone: "+91 87654 32109"
    },
    {
      id: "DLV-002", 
      vendorName: "Mumbai Street Foods",
      vendorAddress: "Bandra West, Mumbai",
      supplierName: "Premium Suppliers",
      pickupAddress: "Crawford Market",
      eta: "22 mins",
      status: "assigned",
      priority: "medium",
      distance: "3.4 km", 
      payment: "₹95",
      specialInstructions: "Call before delivery - Gate 2 entrance",
      orderTime: "15:45",
      vendorPhone: "+91 76543 21098",
      supplierPhone: "+91 65432 10987"
    },
    {
      id: "DLV-003",
      vendorName: "Chennai Snacks Hub", 
      vendorAddress: "T. Nagar Main Road",
      supplierName: "South Suppliers",
      pickupAddress: "Koyambedu Market",
      eta: "35 mins",
      status: "assigned",
      priority: "low",
      distance: "5.1 km",
      payment: "₹85",
      specialInstructions: "Ring doorbell twice - 3rd floor",
      orderTime: "16:00",
      vendorPhone: "+91 54321 09876",
      supplierPhone: "+91 43210 98765"
    }
  ];

  const [orders, setOrders] = useState(initialLiveOrders);

  const recentDeliveries = [
    { id: "DLV-087", vendor: "Taste of Punjab", time: "1h ago", payment: "₹110", rating: 5 },
    { id: "DLV-086", vendor: "South Corner", time: "2h ago", payment: "₹95", rating: 5 },
    { id: "DLV-085", vendor: "Bengali House", time: "3h ago", payment: "₹125", rating: 4 },
  ];

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'assigned': 
        return { 
          badge: <Badge className="bg-warning/20 text-warning-foreground border-warning/30">New Order</Badge>,
          color: "border-l-warning",
          action: "Accept & Start"
        };
      case 'in_transit': 
        return { 
          badge: <Badge className="bg-primary/20 text-primary-foreground border-primary/30">In Transit</Badge>,
          color: "border-l-primary",
          action: "Mark Delivered"
        };
      case 'delivered': 
        return { 
          badge: <Badge className="bg-success/20 text-success-foreground border-success/30">Delivered</Badge>,
          color: "border-l-success",
          action: "Complete"
        };
      default: 
        return { 
          badge: <Badge variant="outline">Unknown</Badge>,
          color: "",
          action: "Action"
        };
    }
  };

  // Navigation handlers
  const handleNavigateToPage = (page: string) => {
    switch (page) {
      case "orders":
        navigate("/delivery-partner/orders");
        break;
      case "map":
        navigate("/delivery-partner/map");
        break;
      case "earnings":
        navigate("/delivery-partner/earnings");
        break;
      case "analytics":
        navigate("/delivery-partner/analytics");
        break;
      case "profile":
        navigate("/delivery-partner/profile");
        break;
      case "help":
        navigate("/delivery-partner/help");
        break;
      default:
        break;
    }
  };

  // Google Maps navigation
  const handleNavigateToLocation = (orderId: string) => {
    const order = orders.find(o => o.id === orderId);
    if (!order) return;

    // Determine destination based on order status
    const destination = order.status === 'assigned' ? order.pickupAddress : order.vendorAddress;
    const locationName = order.status === 'assigned' ? order.supplierName : order.vendorName;
    
    // Open Google Maps with directions
    const encodedDestination = encodeURIComponent(`${destination}, India`);
    const googleMapsUrl = `https://maps.google.com/maps/dir/?api=1&destination=${encodedDestination}&travelmode=driving`;
    
    // Open in new tab
    window.open(googleMapsUrl, '_blank');
    
    toast({
      title: "🗺️ Navigation Started",
      description: `Opening Google Maps directions to ${locationName}`,
    });
  };

  // Phone call functionality
  const handleMakeCall = (orderId: string) => {
    const order = orders.find(o => o.id === orderId);
    if (!order) return;

    // Determine phone number based on order status
    const phoneNumber = order.status === 'assigned' ? order.supplierPhone : order.vendorPhone;
    const contactName = order.status === 'assigned' ? order.supplierName : order.vendorName;
    
    // Open phone dialer
    window.location.href = `tel:${phoneNumber}`;
    
    toast({
      title: "📞 Calling...",
      description: `Calling ${contactName} at ${phoneNumber}`,
    });
  };

  // Order status management
  const handleMarkDelivered = (orderId: string) => {
    setOrders(prevOrders => 
      prevOrders.map(order => 
        order.id === orderId 
          ? { ...order, status: 'delivered' as const }
          : order
      )
    );
    
    toast({
      title: "✅ Order Delivered!",
      description: `Order ${orderId} marked as delivered successfully.`,
    });
  };

  const handleAcceptOrder = (orderId: string) => {
    setOrders(prevOrders => 
      prevOrders.map(order => 
        order.id === orderId 
          ? { ...order, status: 'in_transit' as const }
          : order
      )
    );
    
    toast({
      title: "🚚 Order Started!",
      description: `Order ${orderId} accepted and marked as in transit.`,
    });
  };

  // Quick action handlers
  const handleStartRoute = () => {
    const activeOrders = orders.filter(order => order.status !== 'delivered');
    if (activeOrders.length === 0) {
      toast({
        title: "No Active Orders",
        description: "You don't have any active orders to start a route.",
        variant: "destructive"
      });
      return;
    }

    // Create optimized route with multiple destinations
    const destinations = activeOrders.map(order => {
      const address = order.status === 'assigned' ? order.pickupAddress : order.vendorAddress;
      return encodeURIComponent(`${address}, India`);
    }).join('/');
    
    const googleMapsUrl = `https://maps.google.com/maps/dir/?api=1&destination=${destinations}&travelmode=driving`;
    window.open(googleMapsUrl, '_blank');
    
    toast({
      title: "🚛 Route Started!",
      description: `Optimized route created for ${activeOrders.length} deliveries.`,
    });
  };

  const handleViewMap = () => {
    navigate("/delivery-partner/map");
  };

  const handleCallSupport = () => {
    window.location.href = "tel:+911800123456";
    toast({
      title: "📞 Calling Support",
      description: "Connecting you to delivery support team...",
    });
  };

  const handleReportIssue = () => {
    navigate("/delivery-partner/help");
    toast({
      title: "🚨 Report Issue",
      description: "Redirecting to help & support page...",
    });
  };

  const handleToggleOnline = (checked: boolean) => {
    setIsOnline(checked);
    toast({
      title: checked ? "You're now Online! 🟢" : "You're now Offline 🔴",
      description: checked ? "You'll start receiving delivery requests" : "You won't receive new delivery requests",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/10 pb-20 lg:pb-0">
      {/* Professional Header */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/50 shadow-sm">
        <div className="container px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Profile Section */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <Avatar className="h-11 w-11 border-2 border-primary/20 shadow-sm">
                  <AvatarImage src="/placeholder.svg" alt="Profile" />
                  <AvatarFallback className="bg-gradient-to-br from-primary/10 to-primary/20 text-primary font-bold">DP</AvatarFallback>
                </Avatar>
                <div className={`absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full border-2 border-background shadow-sm ${isOnline ? 'bg-success animate-pulse' : 'bg-muted-foreground'}`}></div>
              </div>
              <div className="hidden sm:block">
                <h3 className="font-bold text-foreground text-lg">Delivery Partner</h3>
                <p className="text-sm text-muted-foreground font-medium">
                  {isOnline ? '🟢 Online & Ready' : '🔴 Offline'}
                </p>
              </div>
            </div>
            
            {/* Header Actions */}
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" className="h-9 w-9 p-0 hover:bg-accent/50">
                <Languages className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="h-9 w-9 p-0 relative hover:bg-accent/50">
                <Bell className="h-4 w-4" />
                <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-destructive rounded-full animate-pulse"></div>
              </Button>
              <div className="flex items-center gap-2 bg-gradient-to-r from-accent/30 to-accent/50 rounded-xl px-4 py-2 border border-accent/20">
                <span className="text-sm font-bold text-foreground">
                  {isOnline ? 'Online' : 'Offline'}
                </span>
                <Switch 
                  checked={isOnline} 
                  onCheckedChange={handleToggleOnline}
                  className="data-[state=checked]:bg-success scale-90"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container px-4 py-6">
        <div className="flex gap-6">
          {/* Enhanced Desktop Sidebar */}
          <aside className="hidden lg:block w-80">
            <Card className="sticky top-28 shadow-xl border-border/50 bg-gradient-to-b from-card/95 to-card">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-bold gradient-primary bg-clip-text text-transparent">Navigation</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="space-y-2">
                  {[
                    { icon: Home, label: "Dashboard", key: "home", active: true, description: "Overview & Stats" },
                    { icon: Package, label: "My Deliveries", key: "orders", description: "Active Orders" },
                    { icon: MapPin, label: "Route Map", key: "map", description: "Navigation View" },
                    { icon: DollarSign, label: "Earnings", key: "earnings", description: "Income Tracking" },
                    { icon: BarChart3, label: "Performance", key: "analytics", description: "Analytics & Reports" },
                    { icon: User, label: "Profile", key: "profile", description: "Settings & Info" },
                    { icon: HelpCircle, label: "Support", key: "help", description: "Help & FAQ" }
                  ].map((item) => (
                    <Button 
                      key={item.key}
                      variant={item.active ? "default" : "ghost"} 
                      className={`w-full justify-start gap-3 h-14 ${item.active ? 'bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-md' : 'hover:bg-accent/50'}`}
                      onClick={() => handleNavigateToPage(item.key)}
                    >
                      <item.icon className="h-5 w-5" />
                      <div className="text-left">
                        <div className="font-semibold">{item.label}</div>
                        <div className="text-xs opacity-80">{item.description}</div>
                      </div>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </aside>
          
          <main className="flex-1 space-y-6">
            {/* Welcome Banner */}
            <Card className="shadow-xl border-border/50 bg-gradient-to-r from-primary/5 via-primary/10 to-success/5 relative overflow-hidden">
              <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]"></div>
              <CardContent className="pt-6 relative">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-3xl font-bold gradient-primary bg-clip-text text-transparent mb-2">Good Afternoon, Partner! 🚛</h2>
                    <p className="text-muted-foreground text-lg">Ready to deliver excellence today? You're doing great!</p>
                  </div>
                  <div className="hidden md:flex items-center gap-4">
                    <div className="text-center bg-background/50 backdrop-blur-sm rounded-xl p-4 border border-border/30">
                      <p className="text-sm text-muted-foreground font-medium">Today's Rating</p>
                      <div className="flex items-center gap-2 justify-center">
                        <Star className="h-5 w-5 fill-warning text-warning" />
                        <span className="font-bold text-2xl gradient-primary bg-clip-text text-transparent">{todayStats.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Performance Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
              {[
                { title: "Deliveries", value: todayStats.totalDeliveries, icon: Package, color: "primary", bg: "primary" },
                { title: "Earned Today", value: todayStats.earningsToday, icon: DollarSign, color: "success", bg: "success" },
                { title: "Distance", value: `${todayStats.kmCovered} km`, icon: Route, color: "warning", bg: "warning" },
                { title: "Live Orders", value: todayStats.liveOrders, icon: Clock, color: "accent", bg: "accent" },
                { title: "Rating", value: todayStats.rating, icon: Star, color: "warning", bg: "warning" },
                { title: "On Time", value: `${todayStats.onTimePercentage}%`, icon: Target, color: "success", bg: "success" }
              ].map((stat, index) => (
                <Card key={index} className="shadow-lg hover:shadow-xl transition-all duration-300 border-border/50 hover:scale-105 bg-gradient-to-br from-card to-card/80">
                  <CardContent className="pt-4 pb-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-2.5 bg-${stat.bg}/10 rounded-xl shadow-sm`}>
                        <stat.icon className={`h-5 w-5 text-${stat.color}`} />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                        <p className="text-xs text-muted-foreground font-medium">{stat.title}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Quick Action Center */}
            <Card className="shadow-xl border-border/50 bg-gradient-to-br from-card to-card/90">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <Zap className="h-6 w-6 text-primary" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Button 
                    variant="default" 
                    className="h-14 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg hover:shadow-xl transition-all duration-300 font-bold"
                    onClick={handleStartRoute}
                  >
                    <PlayCircle className="h-5 w-5 mr-2" />
                    Start Route
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-14 hover:bg-accent/50 border-2 hover:scale-105 transition-all duration-300 font-semibold"
                    onClick={handleViewMap}
                  >
                    <Eye className="h-5 w-5 mr-2" />
                    View Map
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-14 hover:bg-accent/50 border-2 hover:scale-105 transition-all duration-300 font-semibold"
                    onClick={handleCallSupport}
                  >
                    <Phone className="h-5 w-5 mr-2" />
                    Call Support
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-14 hover:bg-destructive/10 hover:text-destructive hover:border-destructive/50 border-2 hover:scale-105 transition-all duration-300 font-semibold"
                    onClick={handleReportIssue}
                  >
                    <AlertCircle className="h-5 w-5 mr-2" />
                    Report Issue
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Active Orders Section */}
            <Card className="shadow-xl border-border/50 bg-gradient-to-br from-card to-card/95">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <Package className="h-6 w-6 text-primary" />
                    Active Orders
                     <Badge className="bg-primary/20 text-primary-foreground border-primary/30 font-bold">
                       {orders.length} pending
                     </Badge>
                   </CardTitle>
                   <Button variant="ghost" size="sm" className="font-semibold">View All →</Button>
                 </div>
               </CardHeader>
               <CardContent>
                 <div className="space-y-4">
                   {orders.map((order) => {
                    const statusInfo = getStatusInfo(order.status);
                    return (
                      <div key={order.id} className={`p-5 bg-gradient-to-r from-background to-accent/5 rounded-2xl border-l-4 ${statusInfo.color} border border-border/50 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]`}>
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                              <h3 className="font-bold text-lg text-foreground">#{order.id}</h3>
                              {statusInfo.badge}
                              <Badge variant="outline" className="font-medium">
                                {order.distance} • {order.payment}
                              </Badge>
                            </div>
                            
                            <div className="space-y-2 text-sm">
                              <div className="flex items-center gap-3 p-2 bg-primary/5 rounded-lg">
                                <Package className="h-4 w-4 text-primary" />
                                <span><strong>Pickup:</strong> {order.supplierName}</span>
                              </div>
                              <div className="flex items-center gap-3 p-2 bg-success/5 rounded-lg">
                                <MapPin className="h-4 w-4 text-success" />
                                <span><strong>Delivery:</strong> {order.vendorName}</span>
                              </div>
                              <div className="flex items-center gap-3 p-2 bg-warning/5 rounded-lg">
                                <Clock className="h-4 w-4 text-warning" />
                                <span><strong>ETA:</strong> {order.eta} • Ordered: {order.orderTime}</span>
                              </div>
                            </div>
                            
                            {order.specialInstructions && (
                              <div className="mt-3 p-3 bg-warning/10 rounded-xl border-l-3 border-warning">
                                <p className="text-sm font-medium text-warning-foreground">
                                  📋 Special Instructions: {order.specialInstructions}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="flex gap-3 pt-3 border-t border-border/30">
                          <Button 
                            size="sm" 
                            variant="default"
                            className="flex-1 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 font-semibold"
                            onClick={() => handleNavigateToLocation(order.id)}
                          >
                            <Navigation className="h-4 w-4 mr-2" />
                            Navigate
                          </Button>
                          
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="hover:bg-accent/50 font-semibold"
                            onClick={() => order.status === 'assigned' ? handleAcceptOrder(order.id) : handleMarkDelivered(order.id)}
                          >
                            {order.status === 'assigned' && <CheckCircle className="h-4 w-4 mr-2" />}
                            {order.status === 'in_transit' && <Camera className="h-4 w-4 mr-2" />}
                            {statusInfo.action}
                          </Button>
                          
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="hover:bg-accent/50 font-semibold"
                            onClick={() => handleMakeCall(order.id)}
                          >
                            <Phone className="h-4 w-4 mr-2" />
                            Call
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Recent Deliveries & Performance Insights */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="shadow-xl border-border/50 bg-gradient-to-br from-card to-card/90">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-success" />
                    Recent Deliveries
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recentDeliveries.map((delivery) => (
                      <div key={delivery.id} className="flex items-center justify-between p-3 bg-gradient-to-r from-background to-accent/5 rounded-xl border border-border/30">
                        <div>
                          <p className="font-semibold text-sm">#{delivery.id}</p>
                          <p className="text-xs text-muted-foreground">{delivery.vendor}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-sm text-success">{delivery.payment}</p>
                          <div className="flex items-center gap-1">
                            {[...Array(delivery.rating)].map((_, i) => (
                              <Star key={i} className="h-3 w-3 fill-warning text-warning" />
                            ))}
                            <span className="text-xs text-muted-foreground ml-1">{delivery.time}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-xl border-border/50 bg-gradient-to-br from-card to-card/90">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    Performance Insights
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-gradient-to-r from-success/5 to-success/10 rounded-xl">
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-success" />
                        <span className="font-medium">Safety Score</span>
                      </div>
                      <span className="font-bold text-success">95%</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl">
                      <div className="flex items-center gap-2">
                        <Target className="h-4 w-4 text-primary" />
                        <span className="font-medium">Efficiency</span>
                      </div>
                      <span className="font-bold text-primary">92%</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gradient-to-r from-warning/5 to-warning/10 rounded-xl">
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-warning" />
                        <span className="font-medium">Customer Rating</span>
                      </div>
                      <span className="font-bold text-warning">4.9/5</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>

      <DeliveryMobileNav />
    </div>
  );
};

export default DeliveryPartnerDashboard;