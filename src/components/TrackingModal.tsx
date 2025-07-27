import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Clock, Truck, CheckCircle, Phone } from "lucide-react";

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

interface TrackingModalProps {
  delivery: Delivery | null;
  isOpen: boolean;
  onClose: () => void;
  onContact: (delivery: Delivery) => void;
}

export const TrackingModal = ({ delivery, isOpen, onClose, onContact }: TrackingModalProps) => {
  if (!delivery) return null;

  const trackingUpdates = [
    { time: "10:30 AM", status: "Order picked up from warehouse", location: "Main Warehouse", completed: true },
    { time: "11:15 AM", status: "In transit to delivery zone", location: "Highway Route", completed: true },
    { time: "12:00 PM", status: "Arrived at delivery area", location: delivery.route, completed: true },
    { time: "12:30 PM", status: "Out for delivery", location: "Local Area", completed: delivery.status !== 'pending' },
    { time: "Expected", status: "Delivery completed", location: "Destination", completed: delivery.status === 'delivered' }
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl gradient-primary bg-clip-text text-transparent">
            Delivery Tracking - {delivery.id}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Delivery Overview */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-lg">{delivery.driver}</h3>
                {getStatusBadge(delivery.status)}
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Truck className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">{delivery.vehicle}</p>
                    <p className="text-xs text-muted-foreground">Vehicle</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">{delivery.route}</p>
                    <p className="text-xs text-muted-foreground">Route</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">ETA: {delivery.eta}</p>
                    <p className="text-xs text-muted-foreground">{delivery.distance} remaining</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">{delivery.orders} Orders</p>
                    <p className="text-xs text-muted-foreground">Total deliveries</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tracking Timeline */}
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-4">Delivery Timeline</h3>
              <div className="space-y-4">
                {trackingUpdates.map((update, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className={`mt-1 w-3 h-3 rounded-full ${update.completed ? 'bg-primary' : 'bg-muted'}`} />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className={`text-sm font-medium ${update.completed ? 'text-foreground' : 'text-muted-foreground'}`}>
                          {update.status}
                        </p>
                        <span className="text-xs text-muted-foreground">{update.time}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{update.location}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Driver Contact */}
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-3">Driver Contact</h3>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{delivery.driver}</p>
                  <p className="text-sm text-muted-foreground">+91 98765 43210</p>
                </div>
                <Button onClick={() => onContact(delivery)} variant="outline" size="sm">
                  <Phone className="h-4 w-4 mr-2" />
                  Call Driver
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4 border-t border-border">
          <Button onClick={onClose} variant="outline" className="flex-1">
            Close
          </Button>
          <Button onClick={() => onContact(delivery)} variant="vibrant" className="flex-1">
            <Phone className="h-4 w-4 mr-2" />
            Contact Driver
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};