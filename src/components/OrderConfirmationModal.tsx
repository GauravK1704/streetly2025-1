import { useState } from "react";
import { ShoppingCart, Clock, MapPin, CreditCard } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/contexts/CartContext";
import { useNavigate } from "react-router-dom";

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  image?: string;
}

interface OrderConfirmationModalProps {
  trigger: React.ReactNode;
  items: OrderItem[];
  deliveryTime?: string;
  deliveryAddress?: string;
}

export const OrderConfirmationModal = ({ 
  trigger, 
  items, 
  deliveryTime = "Tomorrow 8:00 AM",
  deliveryAddress = "123 Street Food Lane, Mumbai" 
}: OrderConfirmationModalProps) => {
  const [open, setOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();
  const { clearCart } = useCart();
  const navigate = useNavigate();

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = 50;
  const total = subtotal + deliveryFee;

  const handleConfirmOrder = async () => {
    setIsProcessing(true);
    
    // Simulate order processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Clear cart after successful order
    clearCart();
    
    toast({
      title: "Order Confirmed!",
      description: `Your order of ₹${total} has been confirmed. Delivery expected ${deliveryTime}.`,
    });
    
    setIsProcessing(false);
    setOpen(false);
    
    // Navigate to delivery tracking page
    navigate("/delivery-tracking");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5 text-primary" />
            Confirm Your Order
          </DialogTitle>
          <DialogDescription>
            Review your order details before confirming
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Order Items */}
          <div className="space-y-3">
            {items.map((item) => (
              <div key={item.id} className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="font-medium text-sm">{item.name}</div>
                  <div className="text-xs text-muted-foreground">Qty: {item.quantity}</div>
                </div>
                <div className="font-medium">₹{item.price * item.quantity}</div>
              </div>
            ))}
          </div>

          <Separator />

          {/* Delivery Details */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4 text-primary" />
              <span className="font-medium">Delivery Time:</span>
              <Badge variant="outline">{deliveryTime}</Badge>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4 text-primary" />
              <span className="font-medium">Address:</span>
            </div>
            <div className="text-xs text-muted-foreground pl-6">
              {deliveryAddress}
            </div>
          </div>

          <Separator />

          {/* Order Summary */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Delivery Fee</span>
              <span>₹{deliveryFee}</span>
            </div>
            <Separator />
            <div className="flex justify-between font-medium">
              <span>Total</span>
              <span>₹{total}</span>
            </div>
          </div>

          {/* Payment Method */}
          <div className="flex items-center gap-2 p-3 bg-accent/10 rounded-lg">
            <CreditCard className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Cash on Delivery</span>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleConfirmOrder}
            disabled={isProcessing}
            className="flex-1"
          >
            {isProcessing ? "Processing..." : `Confirm Order (₹${total})`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};