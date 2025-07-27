import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Package, MapPin, Clock, User, Phone, Mail } from "lucide-react";

interface Order {
  id: string;
  vendor: string;
  region: string;
  items: string;
  amount: string;
  status: string;
  eta: string;
  date: string;
}

interface OrderDetailsModalProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
  onAccept: (order: Order) => void;
  onDecline: (order: Order) => void;
}

export const OrderDetailsModal = ({ order, isOpen, onClose, onAccept, onDecline }: OrderDetailsModalProps) => {
  if (!order) return null;

  const orderItems = [
    { name: "Red Onions", quantity: "25 kg", price: "₹1,000" },
    { name: "Tomatoes", quantity: "20 kg", price: "₹800" },
    { name: "Chaat Masala", quantity: "2 kg", price: "₹600" }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending': return <Badge variant="outline">Pending</Badge>;
      case 'confirmed': return <Badge variant="default">Confirmed</Badge>;
      case 'delivered': return <Badge variant="secondary">Delivered</Badge>;
      default: return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl gradient-primary bg-clip-text text-transparent">
            Order Details - {order.id}
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Order Overview */}
          <div className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-lg">{order.vendor}</h3>
                  {getStatusBadge(order.status)}
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{order.region}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Expected delivery: {order.eta}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Package className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Order date: {order.date}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-3">Vendor Contact</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Raj Kumar (Owner)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">+91 98765 43210</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">raj@chaatcorner.com</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Items */}
          <div>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-4">Order Items</h3>
                <div className="space-y-3">
                  {orderItems.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-accent/5 rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">{item.quantity}</p>
                      </div>
                      <p className="font-semibold">{item.price}</p>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 pt-4 border-t border-border">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Total Amount:</span>
                    <span className="text-lg font-bold text-primary">{order.amount}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4 border-t border-border">
          <Button onClick={onClose} variant="outline" className="flex-1">
            Close
          </Button>
          {order.status === 'pending' && (
            <>
              <Button onClick={() => onDecline(order)} variant="destructive" className="flex-1">
                Decline Order
              </Button>
              <Button onClick={() => onAccept(order)} variant="vibrant" className="flex-1">
                Accept Order
              </Button>
            </>
          )}
          {order.status === 'confirmed' && (
            <Button variant="vibrant" className="flex-1">
              Mark as Dispatched
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};