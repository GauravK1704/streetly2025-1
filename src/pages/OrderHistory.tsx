import { useState } from "react";
import { Header } from "@/components/Header";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Package,
  Search,
  Filter,
  Download,
  RotateCcw,
  Eye,
  Calendar,
  DollarSign,
  CheckCircle,
  Clock,
  XCircle,
  Star
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

const orderHistory = [
  {
    id: "ORD-2024-001",
    date: "2024-01-15",
    vendor: "StreetLy Supply Co.",
    items: ["Samosa Kit", "Chutneys", "Spices"],
    quantity: 3,
    amount: "₹1,250",
    status: "delivered",
    deliveryDate: "2024-01-16",
    rating: 5,
    paymentMethod: "UPI"
  },
  {
    id: "ORD-2024-002",
    date: "2024-01-12",
    vendor: "Fresh Ingredients Ltd",
    items: ["Dosa Batter", "Sambar Mix", "Coconut Chutney"],
    quantity: 2,
    amount: "₹890",
    status: "delivered",
    deliveryDate: "2024-01-13",
    rating: 4,
    paymentMethod: "Credit Card"
  },
  {
    id: "ORD-2024-003",
    date: "2024-01-10",
    vendor: "Street Food Essentials",
    items: ["Pav Bhaji Kit", "Butter", "Pav Bread"],
    quantity: 1,
    amount: "₹650",
    status: "delivered",
    deliveryDate: "2024-01-11",
    rating: 5,
    paymentMethod: "UPI"
  },
  {
    id: "ORD-2024-004",
    date: "2024-01-08",
    vendor: "Mumbai Suppliers",
    items: ["Chaat Kit", "Sev", "Tamarind Chutney"],
    quantity: 2,
    amount: "₹1,100",
    status: "cancelled",
    deliveryDate: null,
    rating: null,
    paymentMethod: "UPI"
  },
  {
    id: "ORD-2024-005",
    date: "2024-01-05",
    vendor: "Premium Food Supplies",
    items: ["Biryani Kit", "Basmati Rice", "Saffron"],
    quantity: 1,
    amount: "₹1,850",
    status: "delivered",
    deliveryDate: "2024-01-06",
    rating: 4,
    paymentMethod: "Credit Card"
  },
  {
    id: "ORD-2024-006",
    date: "2024-01-03",
    vendor: "Local Fresh Market",
    items: ["Vegetable Kit", "Onions", "Tomatoes", "Green Chilies"],
    quantity: 1,
    amount: "₹450",
    status: "in-transit",
    deliveryDate: null,
    rating: null,
    paymentMethod: "Cash on Delivery"
  }
];

const statusFilters = ["All", "Delivered", "In Transit", "Cancelled"];
const timeFilters = ["All Time", "Last 7 Days", "Last 30 Days", "Last 3 Months"];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'delivered': return 'bg-success text-success-foreground';
    case 'in-transit': return 'bg-primary text-primary-foreground';
    case 'cancelled': return 'bg-destructive text-destructive-foreground';
    default: return 'bg-muted text-muted-foreground';
  }
};

export const OrderHistory = () => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [timeFilter, setTimeFilter] = useState("All Time");

  const filteredOrders = orderHistory.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.vendor.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.items.some(item => item.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesStatus = statusFilter === "All" || 
                         order.status.toLowerCase() === statusFilter.toLowerCase().replace(' ', '-');
    
    // Simple time filter (would be more complex with actual dates)
    const matchesTime = timeFilter === "All Time"; // Simplified for demo
    
    return matchesSearch && matchesStatus && matchesTime;
  });

  const reorderItems = (orderId: string, vendor: string) => {
    // Find the order details
    const order = orderHistory.find(o => o.id === orderId);
    if (order) {
      // Simulate adding items to cart
      const itemsList = order.items.join(', ');
      toast({
        title: "Items Added to Cart",
        description: `${itemsList} from ${vendor} have been added to your cart`,
        duration: 3000,
      });
    }
  };

  const viewInvoice = (orderId: string) => {
    // Create a simple invoice HTML
    const invoiceHTML = `
      <html>
        <head><title>Invoice ${orderId}</title></head>
        <body style="font-family: Arial, sans-serif; padding: 20px;">
          <h1>Invoice</h1>
          <p><strong>Order ID:</strong> ${orderId}</p>
          <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
          <p><strong>Vendor:</strong> StreetLy Supply Co.</p>
          <hr>
          <h3>Items:</h3>
          <ul>
            <li>Samosa Kit - ₹650</li>
            <li>Chutneys - ₹200</li>
            <li>Spices - ₹150</li>
          </ul>
          <hr>
          <p><strong>Total: ₹1,000</strong></p>
        </body>
      </html>
    `;
    
    const blob = new Blob([invoiceHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `invoice-${orderId}.html`;
    link.click();
    URL.revokeObjectURL(url);
    
    toast({
      title: "Invoice Downloaded",
      description: `Invoice for ${orderId} has been downloaded`,
    });
  };

  const rateOrder = (orderId: string, rating: number) => {
    toast({
      title: "Rating Submitted",
      description: `You rated order ${orderId} with ${rating} stars`,
    });
  };

  const totalSpent = filteredOrders
    .filter(order => order.status === 'delivered')
    .reduce((sum, order) => sum + parseInt(order.amount.replace('₹', '').replace(',', '')), 0);

  const totalOrders = filteredOrders.length;
  const deliveredOrders = filteredOrders.filter(order => order.status === 'delivered').length;

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
              <h1 className="text-3xl font-bold">Order History</h1>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export All
              </Button>
            </div>

            {/* Summary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-6 text-center">
                  <Package className="h-8 w-8 mx-auto text-primary mb-2" />
                  <p className="text-2xl font-bold">{totalOrders}</p>
                  <p className="text-sm text-muted-foreground">Total Orders</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <CheckCircle className="h-8 w-8 mx-auto text-success mb-2" />
                  <p className="text-2xl font-bold">{deliveredOrders}</p>
                  <p className="text-sm text-muted-foreground">Delivered</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <DollarSign className="h-8 w-8 mx-auto text-primary mb-2" />
                  <p className="text-2xl font-bold">₹{totalSpent.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">Total Spent</p>
                </CardContent>
              </Card>
            </div>

            {/* Search and Filters */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search orders, vendors, or items..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full md:w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {statusFilters.map(status => (
                        <SelectItem key={status} value={status}>
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={timeFilter} onValueChange={setTimeFilter}>
                    <SelectTrigger className="w-full md:w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {timeFilters.map(time => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    More Filters
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Orders List */}
            <div className="space-y-4">
              {filteredOrders.map((order) => (
                <Card key={order.id} className="hover-lift">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-lg">{order.id}</h3>
                          <Badge className={getStatusColor(order.status)}>
                            {order.status === 'in-transit' ? (
                              <Clock className="h-3 w-3 mr-1" />
                            ) : order.status === 'delivered' ? (
                              <CheckCircle className="h-3 w-3 mr-1" />
                            ) : (
                              <XCircle className="h-3 w-3 mr-1" />
                            )}
                            {order.status.replace('-', ' ')}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground">{order.vendor}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>Ordered: {order.date}</span>
                          </div>
                          {order.deliveryDate && (
                            <div className="flex items-center gap-1">
                              <CheckCircle className="h-4 w-4" />
                              <span>Delivered: {order.deliveryDate}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-primary">{order.amount}</p>
                        <p className="text-sm text-muted-foreground">{order.paymentMethod}</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-medium mb-1">Items ({order.quantity} units):</p>
                        <div className="flex flex-wrap gap-1">
                          {order.items.map((item, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {item}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {order.status === 'delivered' && order.rating && (
                        <div className="flex items-center gap-2">
                          <span className="text-sm">Your rating:</span>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < order.rating! 
                                    ? 'fill-yellow-400 text-yellow-400' 
                                    : 'text-muted-foreground'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2 mt-4 pt-4 border-t">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => reorderItems(order.id, order.vendor)}
                        disabled={order.status === 'cancelled'}
                      >
                        <RotateCcw className="h-4 w-4 mr-1" />
                        Reorder
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => viewInvoice(order.id)}
                        disabled={order.status !== 'delivered'}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        Invoice
                      </Button>
                      {order.status === 'delivered' && !order.rating && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => rateOrder(order.id, 5)}
                        >
                          <Star className="h-4 w-4 mr-1" />
                          Rate Order
                        </Button>
                      )}
                      {order.status === 'in-transit' && (
                        <Button variant="vibrant" size="sm">
                          Track Order
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredOrders.length === 0 && (
              <Card>
                <CardContent className="p-12 text-center">
                  <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No orders found</h3>
                  <p className="text-muted-foreground">Try adjusting your search criteria or filters</p>
                </CardContent>
              </Card>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};