import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { 
  ShoppingCart, 
  Plus, 
  Minus, 
  Trash2, 
  MapPin,
  CreditCard,
  Clock
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useCart } from "@/contexts/CartContext";
import { createClient } from '@supabase/supabase-js';

export const CartSidebar = ({ children }: { children: React.ReactNode }) => {
  const { items, updateQuantity, removeFromCart, totalItems, totalAmount } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  const deliveryFee = 50;
  const total = totalAmount + deliveryFee;

  const handleCheckout = async () => {
    if (items.length === 0) {
      toast({
        title: "Cart is Empty",
        description: "Add items to your cart before checkout",
        variant: "destructive",
      });
      return;
    }

    try {
      // For demo purposes, simulate payment gateway redirect
      toast({
        title: "Redirecting to Payment",
        description: "Opening payment gateway...",
      });

      // Simulate the payment gateway redirect
      setTimeout(() => {
        window.open('/payment-success', '_blank');
        setIsOpen(false);
      }, 1500);

      // TODO: Replace with actual Supabase integration
      // const supabase = createClient('YOUR_SUPABASE_URL', 'YOUR_SUPABASE_ANON_KEY');
      // const { data, error } = await supabase.functions.invoke('create-payment', {
      //   body: { items, total, deliveryAddress: "Connaught Place, Delhi" }
      // });
      // if (error) throw error;
      // if (data?.url) window.open(data.url, '_blank');
      
    } catch (error) {
      console.error('Payment error:', error);
      toast({
        title: "Payment Error",
        description: "Failed to initialize payment. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        {children}
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:w-[400px] p-0 flex flex-col">
        <SheetHeader className="p-6 pb-4 flex-shrink-0">
          <SheetTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Your Cart
            {totalItems > 0 && (
              <Badge className="bg-primary">{totalItems}</Badge>
            )}
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col flex-1 min-h-0">
          {/* Cart Items - Scrollable */}
          <div className="flex-1 overflow-y-auto px-6 space-y-4 scrollbar-thin scrollbar-thumb-muted-foreground/20 scrollbar-track-transparent hover:scrollbar-thumb-muted-foreground/40">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <ShoppingCart className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Your cart is empty</h3>
                <p className="text-muted-foreground text-sm">
                  Browse our marketplace to add items
                </p>
              </div>
            ) : (
              items.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 rounded-lg overflow-hidden">
                        {typeof item.image === 'string' && item.image.includes('.') ? (
                          <img 
                            src={item.image} 
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="text-2xl flex items-center justify-center w-full h-full bg-muted">
                            {item.image}
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{item.name}</h4>
                        <p className="text-xs text-muted-foreground mb-2">{item.category}</p>
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-primary">₹{item.price}</span>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="text-sm font-medium w-8 text-center">
                              {item.quantity}
                            </span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-destructive hover:text-destructive"
                              onClick={() => removeFromCart(item.id)}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>

          {/* Cart Summary & Checkout - Fixed at bottom */}
          {items.length > 0 && (
            <div className="flex-shrink-0 border-t bg-background p-6 space-y-4">
              {/* Delivery Info */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>Delivery to Connaught Place, Delhi</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>Estimated delivery: 45-60 minutes</span>
                </div>
              </div>

              <Separator />

              {/* Price Breakdown */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>₹{totalAmount}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Delivery Fee</span>
                  <span>₹{deliveryFee}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span className="text-primary">₹{total}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <Button 
                variant="vibrant" 
                className="w-full" 
                size="lg"
                onClick={handleCheckout}
              >
                <CreditCard className="h-4 w-4 mr-2" />
                Proceed to Checkout
              </Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};