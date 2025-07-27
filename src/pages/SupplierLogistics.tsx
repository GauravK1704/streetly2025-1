import { useState } from "react";
import { Header } from "@/components/Header";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Truck, MapPin, Clock, Package, Route, AlertTriangle } from "lucide-react";
import { TrackingModal } from "@/components/TrackingModal";

const SupplierLogistics = () => {
  const [selectedDelivery, setSelectedDelivery] = useState<Delivery | null>(null);
  const [isTrackingModalOpen, setIsTrackingModalOpen] = useState(false);

  interface Delivery {
    id: string;
    driver: string;
    vehicle: string;
    route: string;
    orders: number;
    status: string;
    eta: string;
    distance: string;
  }

  const deliveries = [
    { id: "DEL-001", driver: "Rajesh Kumar", vehicle: "MH-01-AB-1234", route: "Delhi Central", orders: 8, status: "in-transit", eta: "2:30 PM", distance: "12 km" },
    { id: "DEL-002", driver: "Amit Singh", vehicle: "MH-02-CD-5678", route: "Mumbai West", orders: 5, status: "delivered", eta: "Completed", distance: "8 km" },
    { id: "DEL-003", driver: "Priya Sharma", vehicle: "TN-03-EF-9012", route: "Chennai North", orders: 12, status: "pending", eta: "4:00 PM", distance: "15 km" },
    { id: "DEL-004", driver: "Vikram Rao", vehicle: "KA-04-GH-3456", route: "Bangalore South", orders: 7, status: "delayed", eta: "5:30 PM", distance: "20 km" },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'in-transit': return <Badge variant="default">In Transit</Badge>;
      case 'delivered': return <Badge variant="secondary">Delivered</Badge>;
      case 'pending': return <Badge variant="outline">Pending</Badge>;
      case 'delayed': return <Badge variant="destructive">Delayed</Badge>;
      default: return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'in-transit': return <Truck className="h-4 w-4 text-primary" />;
      case 'delivered': return <Package className="h-4 w-4 text-success" />;
      case 'pending': return <Clock className="h-4 w-4 text-warning" />;
      case 'delayed': return <AlertTriangle className="h-4 w-4 text-destructive" />;
      default: return <Truck className="h-4 w-4" />;
    }
  };

  const handleTrackDelivery = (delivery: Delivery) => {
    setSelectedDelivery(delivery);
    setIsTrackingModalOpen(true);
  };

  const handleContactDriver = (delivery: Delivery) => {
    // Simulate calling driver
    alert(`Calling ${delivery.driver} at +91 98765 43210`);
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
              <div>
                <h1 className="text-3xl font-bold gradient-primary bg-clip-text text-transparent">
                  Logistics Management
                </h1>
                <p className="text-muted-foreground mt-1">
                  Track deliveries and manage logistics operations
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Route className="h-4 w-4 mr-2" />
                  Route Optimizer
                </Button>
                <Button variant="vibrant">
                  <Truck className="h-4 w-4 mr-2" />
                  New Delivery
                </Button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="shadow-card">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2">
                    <Truck className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-2xl font-bold">12</p>
                      <p className="text-sm text-muted-foreground">Active Deliveries</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="shadow-card">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2">
                    <Package className="h-5 w-5 text-success" />
                    <div>
                      <p className="text-2xl font-bold">45</p>
                      <p className="text-sm text-muted-foreground">Delivered Today</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="shadow-card">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-warning" />
                    <div>
                      <p className="text-2xl font-bold">3</p>
                      <p className="text-sm text-muted-foreground">Pending Dispatch</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="shadow-card">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-destructive" />
                    <div>
                      <p className="text-2xl font-bold">1</p>
                      <p className="text-sm text-muted-foreground">Delayed</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Delivery Tracking */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="h-5 w-5 text-primary" />
                  Delivery Tracking
                  <Badge variant="outline" className="ml-auto">
                    {deliveries.length} deliveries
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {deliveries.map((delivery) => (
                    <div key={delivery.id} className="flex items-center justify-between p-4 bg-accent/5 rounded-lg border border-accent/20 hover-lift transition-smooth">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          {getStatusIcon(delivery.status)}
                          <h3 className="font-semibold">{delivery.driver}</h3>
                          {getStatusBadge(delivery.status)}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {delivery.route}
                          </div>
                          <span>Vehicle: {delivery.vehicle}</span>
                          <span>{delivery.orders} orders</span>
                          <span>{delivery.distance}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">ETA: {delivery.eta}</p>
                        <div className="flex gap-2 mt-2">
                          <Button size="sm" variant="outline" onClick={() => handleTrackDelivery(delivery)}>
                            Track
                          </Button>
                          <Button size="sm" variant="vibrant" onClick={() => handleContactDriver(delivery)}>
                            Contact
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>

      <TrackingModal
        delivery={selectedDelivery}
        isOpen={isTrackingModalOpen}
        onClose={() => setIsTrackingModalOpen(false)}
        onContact={handleContactDriver}
      />
    </div>
  );
};

export default SupplierLogistics;