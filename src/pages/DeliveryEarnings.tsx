import { useState } from "react";
import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  DollarSign, 
  TrendingUp, 
  Calendar,
  Download,
  CreditCard,
  Package,
  MapPin,
  Home,
  HelpCircle,
  Wallet,
  Target,
  Clock,
  Star
} from "lucide-react";
import { DeliveryMobileNav } from "@/components/DeliveryMobileNav";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const DeliveryEarnings = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("today");

  const earningsData = {
    today: {
      totalEarnings: 840,
      baseFare: 600,
      bonuses: 120,
      tips: 120,
      deliveries: 12,
      avgPerDelivery: 70
    },
    weekly: {
      totalEarnings: 5460,
      baseFare: 3920,
      bonuses: 780,
      tips: 760,
      deliveries: 78,
      avgPerDelivery: 70
    },
    monthly: {
      totalEarnings: 24300,
      baseFare: 17400,
      bonuses: 3480,
      tips: 3420,
      deliveries: 347,
      avgPerDelivery: 70
    }
  };

  const recentEarnings = [
    {
      id: "ORD-001",
      vendorName: "Raj's Chaat Corner",
      completedAt: "14:30",
      baseFare: 50,
      bonus: 10,
      tip: 15,
      total: 75,
      distance: "3.2 KM",
      rating: 5
    },
    {
      id: "ORD-002", 
      vendorName: "Mumbai Street Foods",
      completedAt: "13:45",
      baseFare: 60,
      bonus: 0,
      tip: 20,
      total: 80,
      distance: "4.1 KM", 
      rating: 5
    },
    {
      id: "ORD-003",
      vendorName: "Chennai Snacks Hub",
      completedAt: "12:20",
      baseFare: 45,
      bonus: 15,
      tip: 10,
      total: 70,
      distance: "2.8 KM",
      rating: 4
    },
    {
      id: "ORD-004",
      vendorName: "Bangalore Bites", 
      completedAt: "11:15",
      baseFare: 55,
      bonus: 5,
      tip: 0,
      total: 60,
      distance: "3.5 KM",
      rating: 3
    }
  ];

  const pendingPayouts = [
    {
      period: "Week of Jan 8-14",
      amount: 5460,
      status: "processing",
      expectedDate: "Jan 18, 2024"
    },
    {
      period: "Week of Jan 1-7", 
      amount: 4920,
      status: "pending",
      expectedDate: "Jan 16, 2024"
    }
  ];

  const handleWithdraw = () => {
    toast({
      title: "Withdrawal Initiated",
      description: "Your earnings will be transferred to your bank account within 2-3 business days.",
    });
  };

  const handleDownloadStatement = () => {
    toast({
      title: "Downloading Statement",
      description: "Your payment statement PDF will be downloaded shortly.",
    });
  };

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

  const currentData = earningsData[activeTab as keyof typeof earningsData];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'processing': return <Badge variant="default">Processing</Badge>;
      case 'pending': return <Badge variant="outline">Pending</Badge>;
      case 'completed': return <Badge className="bg-success text-success-foreground">Completed</Badge>;
      default: return <Badge variant="outline">Unknown</Badge>;
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
                  <Button variant="ghost" className="w-full justify-start" onClick={() => handleNavigateToPage("map")}>
                    <MapPin className="h-4 w-4 mr-2" />
                    Map View
                  </Button>
                  <Button variant="default" className="w-full justify-start" onClick={() => handleNavigateToPage("earnings")}>
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
                  Earnings & Payments
                </h1>
                <p className="text-muted-foreground mt-1">
                  Track your delivery earnings and manage payouts
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={handleDownloadStatement}>
                  <Download className="h-4 w-4 mr-2" />
                  Statement
                </Button>
                <Button variant="vibrant" onClick={handleWithdraw}>
                  <Wallet className="h-4 w-4 mr-2" />
                  Withdraw
                </Button>
              </div>
            </div>

            {/* Earnings Overview */}
            <Card className="shadow-card">
              <CardContent className="p-6">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="today">Today</TabsTrigger>
                    <TabsTrigger value="weekly">This Week</TabsTrigger>
                    <TabsTrigger value="monthly">This Month</TabsTrigger>
                  </TabsList>

                  <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-2">
                        <DollarSign className="h-6 w-6 text-success" />
                      </div>
                      <p className="text-3xl font-bold text-success">₹{currentData.totalEarnings.toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">Total Earnings</p>
                    </div>

                    <div className="text-center">
                      <div className="flex items-center justify-center mb-2">
                        <Package className="h-6 w-6 text-primary" />
                      </div>
                      <p className="text-3xl font-bold">{currentData.deliveries}</p>
                      <p className="text-sm text-muted-foreground">Deliveries</p>
                    </div>

                    <div className="text-center">
                      <div className="flex items-center justify-center mb-2">
                        <Target className="h-6 w-6 text-warning" />
                      </div>
                      <p className="text-3xl font-bold">₹{currentData.avgPerDelivery}</p>
                      <p className="text-sm text-muted-foreground">Avg per Delivery</p>
                    </div>

                    <div className="text-center">
                      <div className="flex items-center justify-center mb-2">
                        <TrendingUp className="h-6 w-6 text-primary" />
                      </div>
                      <p className="text-3xl font-bold">₹{currentData.bonuses}</p>
                      <p className="text-sm text-muted-foreground">Bonuses</p>
                    </div>
                  </div>

                  {/* Earnings Breakdown */}
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardContent className="pt-6">
                        <div className="flex items-center gap-2">
                          <CreditCard className="h-5 w-5 text-primary" />
                          <div>
                            <p className="text-lg font-bold">₹{currentData.baseFare.toLocaleString()}</p>
                            <p className="text-sm text-muted-foreground">Base Fare</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="pt-6">
                        <div className="flex items-center gap-2">
                          <Star className="h-5 w-5 text-warning" />
                          <div>
                            <p className="text-lg font-bold">₹{currentData.bonuses.toLocaleString()}</p>
                            <p className="text-sm text-muted-foreground">Bonuses</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="pt-6">
                        <div className="flex items-center gap-2">
                          <Wallet className="h-5 w-5 text-success" />
                          <div>
                            <p className="text-lg font-bold">₹{currentData.tips.toLocaleString()}</p>
                            <p className="text-sm text-muted-foreground">Tips</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </Tabs>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Earnings */}
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Recent Deliveries</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentEarnings.map((earning) => (
                      <div key={earning.id} className="p-4 bg-accent/5 rounded-lg border border-accent/20">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <h4 className="font-semibold text-sm">{earning.vendorName}</h4>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              <span>{earning.completedAt}</span>
                              <span>• {earning.distance}</span>
                              <div className="flex items-center gap-1">
                                <Star className="h-3 w-3 fill-current text-warning" />
                                <span>{earning.rating}</span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-success">₹{earning.total}</p>
                            <p className="text-xs text-muted-foreground">Order #{earning.id}</p>
                          </div>
                        </div>
                        
                        <div className="flex justify-between text-xs">
                          <span>Base: ₹{earning.baseFare}</span>
                          {earning.bonus > 0 && <span>Bonus: +₹{earning.bonus}</span>}
                          {earning.tip > 0 && <span>Tip: +₹{earning.tip}</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Pending Payouts */}
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Pending Payouts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {pendingPayouts.map((payout, index) => (
                      <div key={index} className="p-4 bg-accent/5 rounded-lg border border-accent/20">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <h4 className="font-semibold text-sm">{payout.period}</h4>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <Calendar className="h-3 w-3" />
                              <span>Expected: {payout.expectedDate}</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold">₹{payout.amount.toLocaleString()}</p>
                            {getStatusBadge(payout.status)}
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    <div className="pt-4 border-t border-accent/20">
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-medium">Available for Withdrawal</span>
                        <span className="text-xl font-bold text-success">₹8,420</span>
                      </div>
                      <Button variant="vibrant" className="w-full" onClick={handleWithdraw}>
                        <Wallet className="h-4 w-4 mr-2" />
                        Withdraw to Bank Account
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>

      <DeliveryMobileNav />
    </div>
  );
};

export default DeliveryEarnings;