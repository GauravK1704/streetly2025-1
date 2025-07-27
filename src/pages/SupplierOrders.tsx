import { useState } from "react";
import { Header } from "@/components/Header";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Package, Clock, MapPin, CheckCircle, AlertCircle, FileText } from "lucide-react";
import { OrderDetailsModal } from "@/components/OrderDetailsModal";
import { useToast } from "@/hooks/use-toast";

const SupplierOrders = () => {
  const { toast } = useToast();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const [orders, setOrders] = useState<Order[]>([
    { id: "ORD-001", vendor: "Raj's Chaat Corner", region: "Delhi Central", items: "Onions, Tomatoes, Chaat Masala", amount: "₹2,400", status: "pending", eta: "2 hours", date: "2024-01-15" },
    { id: "ORD-002", vendor: "Mumbai Street Foods", region: "Mumbai West", items: "Oil, Spices, Flour", amount: "₹3,200", status: "confirmed", eta: "4 hours", date: "2024-01-15" },
    { id: "ORD-003", vendor: "Chennai Snacks Hub", region: "Chennai North", items: "Vegetables, Chutneys", amount: "₹1,800", status: "delivered", eta: "Completed", date: "2024-01-14" },
    { id: "ORD-004", vendor: "Bangalore Bites", region: "Bangalore South", items: "Rice, Dal, Spices", amount: "₹2,900", status: "pending", eta: "3 hours", date: "2024-01-15" },
    { id: "ORD-005", vendor: "Kolkata Kitchen", region: "Kolkata East", items: "Fish, Vegetables", amount: "₹2,100", status: "confirmed", eta: "5 hours", date: "2024-01-15" },
  ]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <AlertCircle className="h-4 w-4 text-warning" />;
      case 'confirmed': return <Clock className="h-4 w-4 text-primary" />;
      case 'delivered': return <CheckCircle className="h-4 w-4 text-success" />;
      default: return <Package className="h-4 w-4" />;
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'pending': return 'outline' as const;
      case 'confirmed': return 'default' as const;
      case 'delivered': return 'secondary' as const;
      default: return 'secondary' as const;
    }
  };

  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleAcceptOrder = (order: Order) => {
    setOrders(orders.map(o => o.id === order.id ? { ...o, status: 'confirmed' } : o));
    setIsModalOpen(false);
  };

  const handleDeclineOrder = (order: Order) => {
    setOrders(orders.filter(o => o.id !== order.id));
    setIsModalOpen(false);
  };

  const handleDispatchOrder = (order: Order) => {
    setOrders(orders.map(o => o.id === order.id ? { ...o, status: 'delivered', eta: 'Completed' } : o));
    toast({
      title: "Order Dispatched",
      description: `Order ${order.id} has been dispatched to ${order.vendor}`,
    });
  };

  const handleExport = () => {
    toast({
      title: "Export Started",
      description: "Orders report will be downloaded shortly",
    });
  };

  const handleNewOrder = () => {
    toast({
      title: "New Order",
      description: "Opening new order creation form...",
    });
  };

  const handleGenerateInvoice = (order: Order) => {
    toast({
      title: "Invoice Generated",
      description: `Invoice created for order ${order.id}`,
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
              <div>
                <h1 className="text-3xl font-bold gradient-primary bg-clip-text text-transparent">
                  Orders Management
                </h1>
                <p className="text-muted-foreground mt-1">
                  Manage and track all vendor orders
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={handleExport}>Export</Button>
                <Button variant="vibrant" onClick={handleNewOrder}>New Order</Button>
              </div>
            </div>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5 text-primary" />
                  All Orders
                  <Badge variant="outline" className="ml-auto">
                    {orders.length} orders
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 bg-accent/5 rounded-lg border border-accent/20 hover-lift transition-smooth">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold">{order.vendor}</h3>
                          <Badge variant={getStatusVariant(order.status)} className="flex items-center gap-1">
                            {getStatusIcon(order.status)}
                            {order.status}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-1">
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {order.region}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {order.eta}
                          </div>
                          <span>Order #{order.id}</span>
                          <span>{order.date}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{order.items}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg">{order.amount}</p>
                        <div className="flex gap-2 mt-2">
                          {order.status === 'pending' && (
                            <>
                              <Button size="sm" variant="vibrant" onClick={() => handleAcceptOrder(order)}>
                                Accept
                              </Button>
                              <Button size="sm" variant="outline" onClick={() => handleDeclineOrder(order)}>
                                Decline
                              </Button>
                            </>
                          )}
                          {order.status === 'confirmed' && (
                            <Button size="sm" variant="vibrant" onClick={() => handleDispatchOrder(order)}>
                              Dispatch
                            </Button>
                          )}
                          {order.status === 'delivered' && (
                            <Button size="sm" variant="outline" onClick={() => handleGenerateInvoice(order)}>
                              <FileText className="h-4 w-4 mr-1" />
                              Invoice
                            </Button>
                          )}
                          <Button size="sm" variant="outline" onClick={() => handleViewDetails(order)}>
                            View Details
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

      <OrderDetailsModal
        order={selectedOrder}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAccept={handleAcceptOrder}
        onDecline={handleDeclineOrder}
      />
    </div>
  );
};

export default SupplierOrders;