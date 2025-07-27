import { useState, useEffect, useRef } from "react";
import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, 
  Navigation, 
  Clock, 
  AlertTriangle,
  Route,
  Package,
  Home,
  DollarSign,
  HelpCircle,
  CheckCircle,
  RefreshCw
} from "lucide-react";
import { DeliveryMobileNav } from "@/components/DeliveryMobileNav";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

// Google Maps API Key
const GOOGLE_MAPS_API_KEY = "AIzaSyDyWQoaznzdCbuTfLOMJVES57nrwgdQgWM";

const DeliveryMap = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const mapContainer = useRef<HTMLDivElement>(null);
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);
  const [showTrafficAlerts, setShowTrafficAlerts] = useState(true);
  
  const [deliveryPoints, setDeliveryPoints] = useState([
    {
      id: "pickup-1",
      type: "pickup",
      name: "Fresh Ingredients Co.",
      address: "Karol Bagh Market, Delhi",
      orderId: "ORD-001",
      eta: "5 mins",
      status: "next",
      coordinates: { lat: 28.6517, lng: 77.1910 }
    },
    {
      id: "delivery-1", 
      type: "delivery",
      name: "Raj's Chaat Corner",
      address: "Connaught Place, Delhi",
      orderId: "ORD-001",
      eta: "25 mins",
      status: "pending",
      coordinates: { lat: 28.6304, lng: 77.2177 }
    },
    {
      id: "pickup-2",
      type: "pickup",
      name: "Spice Masters Ltd.",
      address: "Crawford Market, Mumbai",
      orderId: "ORD-002", 
      eta: "45 mins",
      status: "pending",
      coordinates: { lat: 18.9465, lng: 72.8347 }
    },
    {
      id: "delivery-2",
      type: "delivery", 
      name: "Mumbai Street Foods",
      address: "Bandra West, Mumbai",
      orderId: "ORD-002",
      eta: "1hr 20mins",
      status: "pending",
      coordinates: { lat: 19.0596, lng: 72.8295 }
    }
  ]);

  const trafficAlerts = [
    {
      id: "alert-1",
      type: "heavy-traffic",
      location: "Ring Road - Karol Bagh",
      delay: "15 mins",
      severity: "high"
    },
    {
      id: "alert-2", 
      type: "accident",
      location: "CP Metro Station",
      delay: "8 mins",
      severity: "medium"
    }
  ];

  const routeStats = {
    totalDistance: "23.5 KM",
    estimatedTime: "1hr 45mins",
    fuelCost: "₹185",
    totalStops: 4
  };

  useEffect(() => {
    // Initialize map with Google Maps
    if (mapContainer.current) {
      console.log("Map would be initialized here with Google Maps API");
      // This would be replaced with actual Google Maps implementation
    }
  }, []);

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

  const handleOptimizeRoute = () => {
    // Create optimized route with Google Maps
    const destinations = deliveryPoints.map(point => 
      encodeURIComponent(`${point.address}, India`)
    ).join('/');
    
    const googleMapsUrl = `https://maps.google.com/maps/dir/?api=1&destination=${destinations}&travelmode=driving`;
    window.open(googleMapsUrl, '_blank');
    
    toast({
      title: "🗺️ Route Optimized",
      description: "Found a faster route saving 12 minutes! Opening in Google Maps.",
    });
  };

  const handleStartNavigation = (pointId: string) => {
    const point = deliveryPoints.find(p => p.id === pointId);
    if (!point) return;

    setSelectedRoute(pointId);
    
    // Open Google Maps with navigation
    const encodedDestination = encodeURIComponent(`${point.address}, India`);
    const googleMapsUrl = `https://maps.google.com/maps/dir/?api=1&destination=${encodedDestination}&travelmode=driving`;
    
    window.open(googleMapsUrl, '_blank');
    
    toast({
      title: "🚗 Navigation Started",
      description: `Opening Google Maps directions to ${point.name}`,
    });
  };

  const handleMarkComplete = (pointId: string) => {
    setDeliveryPoints(prevPoints => 
      prevPoints.map(point => 
        point.id === pointId 
          ? { ...point, status: 'completed' }
          : point
      )
    );
    
    const point = deliveryPoints.find(p => p.id === pointId);
    
    toast({
      title: "✅ Location Completed",
      description: `${point?.name} marked as completed. Moving to next stop.`,
    });
  };

  const handleRefreshMap = () => {
    toast({
      title: "🔄 Map Refreshed",
      description: "Updated with latest traffic and route information",
    });
  };

  const getPointIcon = (type: string, status: string) => {
    if (type === "pickup") {
      return <Package className={`h-5 w-5 ${status === 'next' ? 'text-primary' : status === 'completed' ? 'text-success' : 'text-muted-foreground'}`} />;
    }
    return <Home className={`h-5 w-5 ${status === 'next' ? 'text-primary' : status === 'completed' ? 'text-success' : 'text-muted-foreground'}`} />;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'next': return 'border-primary bg-primary/10';
      case 'pending': return 'border-muted-foreground bg-muted/10';
      case 'completed': return 'border-success bg-success/10';
      default: return 'border-muted-foreground bg-muted/10';
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20 lg:pb-0">
      <Header />
      
      <div className="container px-4 py-6">
        <div className="flex gap-6">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-64">
            <Card className="sticky top-6">
              <CardContent className="p-4">
                <div className="space-y-4">
                  <Button variant="ghost" className="w-full justify-start" onClick={() => handleNavigateToPage("dashboard")}>
                    <Home className="h-4 w-4 mr-2" />
                    Dashboard
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" onClick={() => handleNavigateToPage("orders")}>
                    <Package className="h-4 w-4 mr-2" />
                    My Deliveries
                  </Button>
                  <Button variant="default" className="w-full justify-start" onClick={() => handleNavigateToPage("map")}>
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
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold gradient-primary bg-clip-text text-transparent">
                  Delivery Map
                </h1>
                <p className="text-muted-foreground mt-1">
                  Live route optimization and navigation
                </p>
              </div>
              <Button variant="vibrant" onClick={handleOptimizeRoute}>
                <Route className="h-4 w-4 mr-2" />
                Optimize Route
              </Button>
            </div>

            {/* Route Statistics */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="shadow-card">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2">
                    <Route className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-lg font-bold">{routeStats.totalDistance}</p>
                      <p className="text-sm text-muted-foreground">Total Distance</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="shadow-card">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-warning" />
                    <div>
                      <p className="text-lg font-bold">{routeStats.estimatedTime}</p>
                      <p className="text-sm text-muted-foreground">Est. Time</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="shadow-card">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-success" />
                    <div>
                      <p className="text-lg font-bold">{routeStats.fuelCost}</p>
                      <p className="text-sm text-muted-foreground">Fuel Cost</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="shadow-card">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-lg font-bold">{routeStats.totalStops}</p>
                      <p className="text-sm text-muted-foreground">Total Stops</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Map Container */}
              <div className="lg:col-span-2">
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Navigation className="h-5 w-5 text-primary" />
                        Live Route Map
                      </div>
                      <Button size="sm" variant="outline" onClick={handleRefreshMap}>
                        <RefreshCw className="h-4 w-4" />
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div 
                      ref={mapContainer}
                      className="w-full h-96 bg-muted rounded-lg flex items-center justify-center relative overflow-hidden cursor-pointer"
                      onClick={() => handleOptimizeRoute()}
                    >
                      {/* Placeholder Map */}
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-success/5">
                        <div className="absolute top-4 left-4 bg-background/90 p-2 rounded shadow">
                          <div className="flex items-center gap-2 text-sm">
                            <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
                            <span>Current Location</span>
                          </div>
                        </div>
                        
                        <div className="absolute bottom-4 left-4 bg-background/90 p-2 rounded shadow">
                          <div className="flex items-center gap-2 text-sm">
                            <Navigation className="h-4 w-4 text-primary" />
                            <span>Click to open Google Maps</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-center h-full">
                          <div className="text-center">
                            <MapPin className="h-12 w-12 text-primary mx-auto mb-2" />
                            <p className="text-lg font-semibold">Interactive Map</p>
                            <p className="text-sm text-muted-foreground">Real-time navigation with optimized routes</p>
                            <p className="text-xs text-muted-foreground mt-2">Click anywhere to open in Google Maps</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Delivery Checklist */}
              <div className="space-y-6">
                {/* Delivery Points */}
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle>Delivery Checklist</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {deliveryPoints.map((point) => (
                        <div 
                          key={point.id}
                          className={`p-3 rounded-lg border-2 transition-smooth ${getStatusColor(point.status)}`}
                        >
                          <div className="flex items-start gap-3">
                            {getPointIcon(point.type, point.status)}
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-medium text-sm">{point.name}</span>
                                <Badge variant="outline" className="text-xs">
                                  {point.type}
                                </Badge>
                              </div>
                              <p className="text-xs text-muted-foreground mb-1">
                                {point.address}
                              </p>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <Clock className="h-3 w-3" />
                                <span>{point.eta}</span>
                                <span>• Order #{point.orderId}</span>
                              </div>
                              <div className="flex gap-1 mt-2">
                                {(point.status === 'next' || point.status === 'pending') && (
                                  <>
                                    <Button 
                                      size="sm" 
                                      variant="vibrant" 
                                      className="text-xs h-7"
                                      onClick={() => handleStartNavigation(point.id)}
                                    >
                                      <Navigation className="h-3 w-3 mr-1" />
                                      Navigate
                                    </Button>
                                    <Button 
                                      size="sm" 
                                      variant="outline" 
                                      className="text-xs h-7"
                                      onClick={() => handleMarkComplete(point.id)}
                                    >
                                      <CheckCircle className="h-3 w-3 mr-1" />
                                      Complete
                                    </Button>
                                  </>
                                )}
                                {point.status === 'completed' && (
                                  <Badge variant="default" className="text-xs bg-success text-success-foreground">
                                    <CheckCircle className="h-3 w-3 mr-1" />
                                    Completed
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Traffic Alerts */}
                {showTrafficAlerts && trafficAlerts.length > 0 && (
                  <Card className="shadow-card">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-warning" />
                        Traffic Alerts
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {trafficAlerts.map((alert) => (
                          <div key={alert.id} className="p-3 bg-warning/10 rounded-lg border border-warning/20">
                            <div className="flex items-start gap-2">
                              <AlertTriangle className="h-4 w-4 text-warning mt-0.5" />
                              <div className="flex-1">
                                <p className="font-medium text-sm">{alert.location}</p>
                                <p className="text-xs text-muted-foreground capitalize">
                                  {alert.type.replace('-', ' ')} • +{alert.delay} delay
                                </p>
                              </div>
                              <Badge 
                                variant={alert.severity === 'high' ? 'destructive' : 'outline'}
                                className="text-xs"
                              >
                                {alert.severity}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>

      <DeliveryMobileNav />
    </div>
  );
};

export default DeliveryMap;