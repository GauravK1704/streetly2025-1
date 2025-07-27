import { Header } from "@/components/Header";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/LanguageContext";
import { 
  Truck, 
  MapPin, 
  Clock, 
  Package, 
  CheckCircle, 
  Navigation as NavigationIcon,
  Phone,
  Star
} from "lucide-react";

const DeliveryDashboard = () => {
  const { t } = useLanguage();
  const todayDeliveries = [
    { 
      id: 1, 
      vendor: "Raj's Chaat Corner", 
      address: "Connaught Place, Delhi", 
      items: "Samosa Kit + Chutneys", 
      otp: "1234",
      status: "pickup",
      distance: "2.3 km",
      customerPhone: "+91 98765 43210"
    },
    { 
      id: 2, 
      vendor: "Mumbai Street Foods", 
      address: "Bandra West, Mumbai", 
      items: "Bhel Puri Kit", 
      otp: "5678",
      status: "in-transit",
      distance: "4.1 km",
      customerPhone: "+91 98765 43211"
    },
    { 
      id: 3, 
      vendor: "Chennai Snacks", 
      address: "T Nagar, Chennai", 
      items: "Dosa Kit + Sambar", 
      otp: "9012",
      status: "delivered",
      distance: "1.8 km",
      customerPhone: "+91 98765 43212"
    },
  ];

  const stats = [
    { title: "Today's Deliveries", value: "12", icon: Package, color: "text-primary" },
    { title: "Completed", value: "8", icon: CheckCircle, color: "text-success" },
    { title: "Distance Covered", value: "45 km", icon: NavigationIcon, color: "text-accent" },
    { title: "Rating", value: "4.8", icon: Star, color: "text-warning" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pickup': return 'bg-warning text-warning-foreground';
      case 'in-transit': return 'bg-primary text-primary-foreground';
      case 'delivered': return 'bg-success text-success-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
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
              <h1 className="text-3xl font-bold">{t('delivery.title')}</h1>
              <Button variant="vibrant">
                <NavigationIcon className="h-4 w-4 mr-2" />
                Start Navigation
              </Button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((stat) => (
                <Card key={stat.title}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">{stat.title}</p>
                        <p className="text-2xl font-bold">{stat.value}</p>
                      </div>
                      <stat.icon className={`h-8 w-8 ${stat.color}`} />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Today's Deliveries */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="h-5 w-5" />
                  Today's Deliveries
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {todayDeliveries.map((delivery) => (
                    <div key={delivery.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold">{delivery.vendor}</h3>
                            <Badge className={getStatusColor(delivery.status)}>
                              {delivery.status.replace('-', ' ')}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              {delivery.address}
                            </div>
                            <div className="flex items-center gap-1">
                              <NavigationIcon className="h-4 w-4" />
                              {delivery.distance}
                            </div>
                          </div>
                          <p className="text-sm">{delivery.items}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          {delivery.status !== 'delivered' && (
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium">OTP:</span>
                              <Input 
                                placeholder={delivery.otp} 
                                className="w-20 h-8 text-center"
                                maxLength={4}
                              />
                            </div>
                          )}
                          <Button size="sm" variant="outline">
                            <Phone className="h-4 w-4 mr-1" />
                            Call
                          </Button>
                        </div>
                        
                        <div className="flex gap-2">
                          {delivery.status === 'pickup' && (
                            <Button size="sm" variant="warm">Picked Up</Button>
                          )}
                          {delivery.status === 'in-transit' && (
                            <Button size="sm" variant="vibrant">Mark Delivered</Button>
                          )}
                          {delivery.status === 'delivered' && (
                            <div className="flex items-center gap-1 text-success">
                              <CheckCircle className="h-4 w-4" />
                              <span className="text-sm">Completed</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Map Placeholder */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Delivery Map
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                    <p className="text-muted-foreground">Interactive map will be integrated here</p>
                    <p className="text-sm text-muted-foreground">Shows real-time delivery routes</p>
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

export default DeliveryDashboard;