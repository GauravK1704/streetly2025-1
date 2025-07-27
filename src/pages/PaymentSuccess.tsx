import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Package, Truck, Clock } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";

export const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const sessionId = searchParams.get("session_id");
  const [orderNumber, setOrderNumber] = useState("");

  useEffect(() => {
    // Generate a random order number for demo purposes
    const randomOrder = "FD" + Math.random().toString(36).substr(2, 8).toUpperCase();
    setOrderNumber(randomOrder);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          {/* Success Icon */}
          <div className="flex justify-center">
            <div className="bg-green-100 p-6 rounded-full">
              <CheckCircle className="h-16 w-16 text-green-600" />
            </div>
          </div>

          {/* Success Message */}
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-foreground">
              Payment Successful!
            </h1>
            <p className="text-lg text-muted-foreground">
              Thank you for your order. Your payment has been processed successfully.
            </p>
          </div>

          {/* Order Details Card */}
          <Card className="text-left">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center justify-between border-b pb-4">
                <h3 className="text-lg font-semibold">Order Confirmation</h3>
                <span className="text-sm text-muted-foreground">
                  Order #{orderNumber}
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Package className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Order Confirmed</p>
                    <p className="text-sm text-muted-foreground">
                      Your order has been confirmed and is being prepared.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Truck className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Delivery Address</p>
                    <p className="text-sm text-muted-foreground">
                      Connaught Place, Delhi
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Estimated Delivery</p>
                    <p className="text-sm text-muted-foreground">
                      45-60 minutes from now
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="vibrant" 
              onClick={() => navigate("/delivery-tracking")}
              className="w-full sm:w-auto"
            >
              <Truck className="h-4 w-4 mr-2" />
              Track Your Order
            </Button>
            
            <Button 
              variant="outline" 
              onClick={() => navigate("/marketplace")}
              className="w-full sm:w-auto"
            >
              Continue Shopping
            </Button>
          </div>

          {/* Session Info (for debugging) */}
          {sessionId && (
            <div className="text-xs text-muted-foreground">
              Session ID: {sessionId}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};