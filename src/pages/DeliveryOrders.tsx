import { useState } from "react";
import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Package, 
  MapPin, 
  Clock, 
  Phone, 
  MessageSquare, 
  Camera,
  CheckCircle,
  Navigation,
  AlertTriangle,
  Home,
  DollarSign,
  HelpCircle
} from "lucide-react";
import { DeliveryMobileNav } from "@/components/DeliveryMobileNav";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

// Google Maps API Key
const GOOGLE_MAPS_API_KEY = "AIzaSyDyWQoaznzdCbuTfLOMJVES57nrwgdQgWM";

const DeliveryOrders = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("upcoming");

  const [orders, setOrders] = useState({
    upcoming: [
      {
        id: "ORD-001",
        vendorName: "Raj's Chaat Corner",
        vendorAddress: "Shop 15, Connaught Place, New Delhi - 110001",
        vendorPhone: "+91 98765 43210",
        supplierName: "Fresh Ingredients Co.",
        pickupAddress: "Block A, Karol Bagh Market, Delhi - 110005",
        supplierPhone: "+91 87654 32109",
        eta: "25 mins",
        status: "assigned",
        priority: "high",
        items: ["2kg Onions", "1kg Tomatoes", "500g Chaat Masala"],
        instructions: "Handle with care - fragile spice packets",
        otp: "5847"
      },
      {
        id: "ORD-002",
        vendorName: "Mumbai Street Foods",
        vendorAddress: "Lane 3, Bandra West, Mumbai - 400050",
        vendorPhone: "+91 76543 21098",
        supplierName: "Spice Masters Ltd.",
        pickupAddress: "Shop 42, Crawford Market, Mumbai - 400003",
        supplierPhone: "+91 65432 10987",
        eta: "40 mins",
        status: "assigned", 
        priority: "medium",
        items: ["500g Garam Masala", "1L Mustard Oil", "2kg Flour"],
        instructions: "Oil containers need to be kept upright",
        otp: "9234"
      }
    ],
    inTransit: [
      {
        id: "ORD-003",
        vendorName: "Chennai Snacks Hub",
        vendorAddress: "T. Nagar Main Road, Chennai - 600017",
        vendorPhone: "+91 54321 09876",
        supplierName: "South India Supplies",
        pickupAddress: "Block C, Koyambedu Market, Chennai - 600110",
        supplierPhone: "+91 43210 98765",
        eta: "15 mins",
        status: "transit",
        priority: "high",
        items: ["1kg Curry Leaves", "2kg Rice", "500g Coconut"],
        instructions: "Keep curry leaves fresh - avoid heat",
        otp: "7651"
      }
    ],
    delivered: [
      {
        id: "ORD-004",
        vendorName: "Bangalore Bites",
        vendorAddress: "Residency Road, Bangalore - 560025",
        vendorPhone: "+91 32109 87654",
        supplierName: "Karnataka Organics",
        pickupAddress: "Madiwala Market, Bangalore - 560068",
        supplierPhone: "+91 21098 76543",
        eta: "Completed",
        status: "delivered",
        priority: "low",
        items: ["1kg Dal", "500g Turmeric", "2kg Vegetables"],
        instructions: "No special instructions",
        otp: "Delivered",
        deliveredAt: "2024-01-15 14:30"
      }
    ],
    cancelled: []
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'assigned': return <Badge variant="outline">Assigned</Badge>;
      case 'picked': return <Badge variant="default">Picked Up</Badge>;
      case 'transit': return <Badge variant="secondary">In Transit</Badge>;
      case 'delivered': return <Badge className="bg-success text-success-foreground">Delivered</Badge>;
      case 'cancelled': return <Badge variant="destructive">Cancelled</Badge>;
      default: return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-4 border-l-destructive';
      case 'medium': return 'border-l-4 border-l-warning';
      case 'low': return 'border-l-4 border-l-success';
      default: return '';
    }
  };

  // Google Maps Navigation
  const handleStartNavigation = (address: string, name: string) => {
    const encodedDestination = encodeURIComponent(`${address}, India`);
    const googleMapsUrl = `https://maps.google.com/maps/dir/?api=1&destination=${encodedDestination}&travelmode=driving`;
    
    // Open Google Maps in new tab
    window.open(googleMapsUrl, '_blank');
    
    toast({
      title: "🗺️ Navigation Started",
      description: `Opening Google Maps directions to ${name}`,
    });
  };

  // Phone Call Functionality
  const handleCall = (phone: string, type: string) => {
    // Open phone dialer
    window.location.href = `tel:${phone}`;
    
    toast({
      title: `📞 Calling ${type}`,
      description: `Connecting you with ${type} at ${phone}`,
    });
  };

  // Order Status Management
  const handleConfirmPickup = (orderId: string) => {
    setOrders(prevOrders => ({
      ...prevOrders,
      upcoming: prevOrders.upcoming.map(order => 
        order.id === orderId 
          ? { ...order, status: 'picked' as const }
          : order
      ),
      inTransit: [...prevOrders.inTransit, 
        ...prevOrders.upcoming.filter(order => order.id === orderId && order.status === 'assigned')
          .map(order => ({ ...order, status: 'transit' as const }))
      ]
    }));
    
    toast({
      title: "✅ Pickup Confirmed",
      description: `Order ${orderId} pickup confirmed with photo and OTP verification.`,
    });
  };

  const handleMarkDelivered = (orderId: string) => {
    const now = new Date().toLocaleString();
    
    setOrders(prevOrders => ({
      ...prevOrders,
      inTransit: prevOrders.inTransit.filter(order => order.id !== orderId),
      delivered: [...prevOrders.delivered,
        ...prevOrders.inTransit.filter(order => order.id === orderId)
          .map(order => ({ 
            ...order, 
            status: 'delivered' as const, 
            deliveredAt: now,
            otp: 'Delivered'
          }))
      ]
    }));
    
    toast({
      title: "🎉 Delivery Complete!",
      description: `Order ${orderId} marked as delivered successfully.`,
    });
  };

  // Navigation functionality
  const handleNavigateToPage = (page: string) => {
    switch (page) {
      case "dashboard":
        navigate("/delivery-partner");
        break;
      case "orders":
        navigate("/delivery-partner/orders");
        break;
      case "map":
        navigate("/delivery-partner/map");
        break;
      case "earnings":
        navigate("/delivery-partner/earnings");
        break;
      case "help":
        navigate("/delivery-partner/help");
        break;
      default:
        break;
    }
  };

  const OrderCard = ({ order }: { order: any }) => (
    <div className={`p-4 bg-accent/5 rounded-lg border border-accent/20 hover-lift transition-smooth ${getPriorityColor(order.priority)}`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="font-semibold">Order #{order.id}</h3>
            {getStatusBadge(order.status)}
            <Badge variant="outline" className="text-xs">
              {order.priority} priority
            </Badge>
          </div>
          
          {/* Pickup Details */}
          <div className="space-y-2 mb-3">
            <div className="flex items-start gap-2">
              <Package className="h-4 w-4 mt-0.5 text-primary" />
              <div className="flex-1">
                <p className="font-medium text-sm">{order.supplierName}</p>
                <p className="text-xs text-muted-foreground">{order.pickupAddress}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Button size="sm" variant="outline" onClick={() => handleCall(order.supplierPhone, "Supplier")}>
                    <Phone className="h-3 w-3 mr-1" />
                    Call
                  </Button>
                  <Button size="sm" variant="outline">
                    <MessageSquare className="h-3 w-3 mr-1" />
                    Chat
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Delivery Details */}
          <div className="space-y-2 mb-3">
            <div className="flex items-start gap-2">
              <Home className="h-4 w-4 mt-0.5 text-success" />
              <div className="flex-1">
                <p className="font-medium text-sm">{order.vendorName}</p>
                <p className="text-xs text-muted-foreground">{order.vendorAddress}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Button size="sm" variant="outline" onClick={() => handleCall(order.vendorPhone, "Vendor")}>
                    <Phone className="h-3 w-3 mr-1" />
                    Call
                  </Button>
                  <Button size="sm" variant="outline">
                    <MessageSquare className="h-3 w-3 mr-1" />
                    Chat
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="mb-3">
            <p className="font-medium text-sm mb-1">Items:</p>
            <div className="flex flex-wrap gap-1">
              {order.items.map((item: string, index: number) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {item}
                </Badge>
              ))}
            </div>
          </div>

          {/* Instructions */}
          {order.instructions && (
            <div className="mb-3 p-2 bg-warning/10 rounded border-l-2 border-warning">
              <p className="text-xs font-medium text-warning-foreground">
                Special Instructions: {order.instructions}
              </p>
            </div>
          )}

          {/* ETA and OTP */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>ETA: {order.eta}</span>
            </div>
            {order.otp !== "Delivered" && (
              <div className="flex items-center gap-1">
                <span className="font-medium">OTP: {order.otp}</span>
              </div>
            )}
            {order.deliveredAt && (
              <span>Delivered: {order.deliveredAt}</span>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 pt-3 border-t border-accent/20">
        <Button 
          size="sm" 
          variant="vibrant" 
          className="flex-1"
          onClick={() => handleStartNavigation(
            order.status === 'assigned' ? order.pickupAddress : order.vendorAddress,
            order.status === 'assigned' ? order.supplierName : order.vendorName
          )}
        >
          <Navigation className="h-4 w-4 mr-1" />
          Navigate
        </Button>
        
        {order.status === 'assigned' && (
          <Button size="sm" variant="outline" onClick={() => handleConfirmPickup(order.id)}>
            <Camera className="h-4 w-4 mr-1" />
            Confirm Pickup
          </Button>
        )}
        
        {order.status === 'transit' && (
          <Button size="sm" variant="outline" onClick={() => handleMarkDelivered(order.id)}>
            <CheckCircle className="h-4 w-4 mr-1" />
            Mark Delivered
          </Button>
        )}
        
        {(order.status === 'assigned' || order.status === 'transit') && (
          <Button size="sm" variant="destructive">
            <AlertTriangle className="h-4 w-4 mr-1" />
            Can't Deliver
          </Button>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background pb-20 lg:pb-0">
      <Header />
      
      <div className="container px-4 py-6">
        <div className="flex gap-6">
          {/* Desktop Sidebar - Hidden on mobile */}
          <aside className="hidden lg:block w-64">
            <Card className="sticky top-6">
              <CardContent className="p-4">
                <div className="space-y-4">
                  <Button variant="ghost" className="w-full justify-start" onClick={() => handleNavigateToPage("dashboard")}>
                    <Home className="h-4 w-4 mr-2" />
                    Dashboard
                  </Button>
                  <Button variant="default" className="w-full justify-start" onClick={() => handleNavigateToPage("orders")}>
                    <Package className="h-4 w-4 mr-2" />
                    My Deliveries
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" onClick={() => handleNavigateToPage("map")}>
                    <MapPin className="h-4 w-4 mr-2" />
                    Map View
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" onClick={() => handleNavigateToPage("earnings")}>
                    <DollarSign className="h-4 w-4 mr-2" />
                    Earnings
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" onClick={() => handleNavigateToPage("help")}>
                    <HelpCircle className="h-4 w-4 mr-2" />
                    Help & Support
                  </Button>
                </div>
              </CardContent>
            </Card>
          </aside>
          
          <main className="flex-1 space-y-6">
            <div>
              <h1 className="text-3xl font-bold gradient-primary bg-clip-text text-transparent">
                My Deliveries
              </h1>
              <p className="text-muted-foreground mt-1">
                Manage your pickup and delivery orders
              </p>
            </div>

            <Card className="shadow-card">
              <CardContent className="p-6">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="upcoming">
                      Upcoming ({orders.upcoming.length})
                    </TabsTrigger>
                    <TabsTrigger value="inTransit">
                      In Transit ({orders.inTransit.length})
                    </TabsTrigger>
                    <TabsTrigger value="delivered">
                      Delivered ({orders.delivered.length})
                    </TabsTrigger>
                    <TabsTrigger value="cancelled">
                      Cancelled ({orders.cancelled.length})
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="upcoming" className="mt-6">
                    <div className="space-y-4">
                      {orders.upcoming.map((order) => (
                        <OrderCard key={order.id} order={order} />
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="inTransit" className="mt-6">
                    <div className="space-y-4">
                      {orders.inTransit.map((order) => (
                        <OrderCard key={order.id} order={order} />
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="delivered" className="mt-6">
                    <div className="space-y-4">
                      {orders.delivered.map((order) => (
                        <OrderCard key={order.id} order={order} />
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="cancelled" className="mt-6">
                    <div className="text-center py-8 text-muted-foreground">
                      No cancelled orders found.
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>

      <DeliveryMobileNav />
    </div>
  );
};

export default DeliveryOrders;