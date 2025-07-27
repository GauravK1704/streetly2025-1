import { useState } from "react";
import { Header } from "@/components/Header";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { 
  Truck,
  MapPin,
  Clock,
  Phone,
  CheckCircle,
  Package,
  Navigation as NavigationIcon,
  AlertCircle,
  Search,
  RefreshCw
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

const activeDeliveries = [
  {
    id: "DEL001",
    orderNumber: "ORD-2024-001",
    vendor: "Raj's Chaat Corner",
    items: "Samosa Kit + Chutneys",
    status: "picked-up",
    progress: 60,
    estimatedTime: "15 mins",
    driverName: "Amit Kumar",
    driverPhone: "+91 98765 43210",
    driverRating: 4.8,
    vehicleNumber: "DL-8C-1234",
    currentLocation: "Approaching CP Metro",
    destination: "Connaught Place, Delhi",
    orderTime: "2:30 PM",
    pickupTime: "2:45 PM",
    estimatedDelivery: "3:15 PM",
    otp: "1234"
  },
  {
    id: "DEL002",
    orderNumber: "ORD-2024-002",
    vendor: "Mumbai Street Foods",
    items: "Bhel Puri Kit",
    status: "in-transit",
    progress: 85,
    estimatedTime: "8 mins",
    driverName: "Priya Sharma",
    driverPhone: "+91 98765 43211",
    driverRating: 4.9,
    vehicleNumber: "MH-12-5678",
    currentLocation: "2 km away",
    destination: "Bandra West, Mumbai",
    orderTime: "1:15 PM",
    pickupTime: "1:30 PM",
    estimatedDelivery: "2:00 PM",
    otp: "5678"
  }
];

const recentDeliveries = [
  {
    id: "DEL003",
    orderNumber: "ORD-2024-003",
    vendor: "Chennai Snacks",
    items: "Dosa Kit + Sambar",
    status: "delivered",
    deliveredTime: "12:45 PM",
    driverName: "Rajesh Kumar",
    rating: 5
  },
  {
    id: "DEL004",
    orderNumber: "ORD-2024-004",
    vendor: "Delhi Food Corner",
    items: "Chole Bhature Kit",
    status: "delivered",
    deliveredTime: "11:30 AM",
    driverName: "Sunita Devi",
    rating: 4
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'ordered': return 'bg-muted text-muted-foreground';
    case 'confirmed': return 'bg-primary text-primary-foreground';
    case 'picked-up': return 'bg-warning text-warning-foreground';
    case 'in-transit': return 'bg-accent text-accent-foreground';
    case 'delivered': return 'bg-success text-success-foreground';
    case 'cancelled': return 'bg-destructive text-destructive-foreground';
    default: return 'bg-muted text-muted-foreground';
  }
};

const getStatusSteps = (status: string) => {
  const steps = [
    { key: 'ordered', label: 'Order Placed', icon: Package },
    { key: 'confirmed', label: 'Confirmed', icon: CheckCircle },
    { key: 'picked-up', label: 'Picked Up', icon: Truck },
    { key: 'in-transit', label: 'In Transit', icon: NavigationIcon },
    { key: 'delivered', label: 'Delivered', icon: CheckCircle }
  ];

  const statusOrder = ['ordered', 'confirmed', 'picked-up', 'in-transit', 'delivered'];
  const currentIndex = statusOrder.indexOf(status);

  return steps.map((step, index) => ({
    ...step,
    completed: index <= currentIndex,
    active: index === currentIndex
  }));
};

export const DeliveryTracking = () => {
  const [trackingId, setTrackingId] = useState("");

  const trackOrder = () => {
    if (trackingId.trim()) {
      toast({
        title: "Tracking Order",
        description: `Searching for order: ${trackingId}`,
      });
    }
  };

  const callDriver = (driverName: string, phone: string) => {
    toast({
      title: "Calling Driver",
      description: `Connecting you with ${driverName}`,
    });
  };

  const refreshTracking = () => {
    toast({
      title: "Tracking Updated",
      description: "Latest delivery information refreshed",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container px-4 py-6">
        <div className="flex gap-6">
          <aside className="hidden lg:block">
            <Navigation />
          </aside>
          
          <main className="flex-1 space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold">Delivery Tracking</h1>
              <Button variant="outline" onClick={refreshTracking}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
            </div>

            {/* Track Order */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="h-5 w-5" />
                  Track Your Order
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  <Input
                    placeholder="Enter order number or tracking ID"
                    value={trackingId}
                    onChange={(e) => setTrackingId(e.target.value)}
                    className="flex-1"
                  />
                  <Button onClick={trackOrder} variant="vibrant">
                    Track Order
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Active Deliveries */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Active Deliveries</h2>
              {activeDeliveries.map((delivery) => (
                <Card key={delivery.id} className="overflow-hidden">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <Truck className="h-5 w-5" />
                          {delivery.orderNumber}
                        </CardTitle>
                        <p className="text-muted-foreground">{delivery.vendor}</p>
                      </div>
                      <Badge className={getStatusColor(delivery.status)}>
                        {delivery.status.replace('-', ' ')}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Progress Timeline */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Delivery Progress</span>
                        <span className="text-sm text-muted-foreground">{delivery.progress}%</span>
                      </div>
                      <Progress value={delivery.progress} className="h-3" />
                      
                      <div className="flex justify-between">
                        {getStatusSteps(delivery.status).map((step) => (
                          <div key={step.key} className="flex flex-col items-center">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              step.completed 
                                ? 'bg-primary text-primary-foreground' 
                                : 'bg-muted text-muted-foreground'
                            }`}>
                              <step.icon className="h-4 w-4" />
                            </div>
                            <span className="text-xs mt-1 text-center">{step.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Delivery Info */}
                      <div className="space-y-3">
                        <h4 className="font-semibold">Delivery Information</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2">
                            <Package className="h-4 w-4 text-muted-foreground" />
                            <span>{delivery.items}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span>{delivery.destination}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>ETA: {delivery.estimatedDelivery}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <NavigationIcon className="h-4 w-4 text-muted-foreground" />
                            <span>{delivery.currentLocation}</span>
                          </div>
                        </div>
                      </div>

                      {/* Driver Info */}
                      <div className="space-y-3">
                        <h4 className="font-semibold">Driver Information</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center justify-between">
                            <span>{delivery.driverName}</span>
                            <div className="flex items-center gap-1">
                              <span>★ {delivery.driverRating}</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <span>{delivery.vehicleNumber}</span>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => callDriver(delivery.driverName, delivery.driverPhone)}
                            >
                              <Phone className="h-4 w-4 mr-1" />
                              Call
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Map Placeholder */}
                    <div className="h-48 bg-muted rounded-lg flex items-center justify-center border-2 border-dashed border-muted-foreground/30">
                      <div className="text-center">
                        <MapPin className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                        <p className="text-muted-foreground">Live tracking map</p>
                        <p className="text-sm text-muted-foreground">Real-time location updates</p>
                      </div>
                    </div>

                    {/* Time Details */}
                    <div className="flex justify-between text-sm border-t pt-4">
                      <div>
                        <span className="text-muted-foreground">Ordered: </span>
                        <span>{delivery.orderTime}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Picked up: </span>
                        <span>{delivery.pickupTime}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">OTP: </span>
                        <span className="font-mono font-bold">{delivery.otp}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Recent Deliveries */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  Recent Deliveries
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentDeliveries.map((delivery) => (
                    <div key={delivery.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold">{delivery.orderNumber}</h4>
                          <Badge className="bg-success text-success-foreground">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Delivered
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{delivery.vendor} • {delivery.items}</p>
                        <p className="text-xs text-muted-foreground">
                          Delivered at {delivery.deliveredTime} by {delivery.driverName}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="text-right">
                          <div className="flex items-center gap-1">
                            <span className="text-sm">★ {delivery.rating}</span>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Reorder
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Emergency Contact */}
            <Card className="border-warning/20 bg-warning/5">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <AlertCircle className="h-12 w-12 text-warning" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">Need Help?</h3>
                    <p className="text-muted-foreground">
                      Having issues with your delivery? Contact our support team immediately.
                    </p>
                  </div>
                  <Button variant="warning">
                    <Phone className="h-4 w-4 mr-2" />
                    Emergency Contact
                  </Button>
                </div>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </div>
  );
};