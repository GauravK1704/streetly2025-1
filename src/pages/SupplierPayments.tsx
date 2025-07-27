import { useState } from "react";
import { Header } from "@/components/Header";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { DollarSign, Search, Download, Calendar, TrendingUp, CreditCard, Wallet } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SupplierPayments = () => {
  const { toast } = useToast();
  const [payments, setPayments] = useState([
    { id: "PAY-001", vendor: "Raj's Chaat Corner", amount: "₹2,400", status: "completed", date: "2024-01-15", method: "UPI", orderId: "ORD-001" },
    { id: "PAY-002", vendor: "Mumbai Street Foods", amount: "₹3,200", status: "pending", date: "2024-01-15", method: "Bank Transfer", orderId: "ORD-002" },
    { id: "PAY-003", vendor: "Chennai Snacks Hub", amount: "₹1,800", status: "completed", date: "2024-01-14", method: "Credit Card", orderId: "ORD-003" },
    { id: "PAY-004", vendor: "Bangalore Bites", amount: "₹2,900", status: "failed", date: "2024-01-14", method: "UPI", orderId: "ORD-004" },
    { id: "PAY-005", vendor: "Kolkata Kitchen", amount: "₹2,100", status: "completed", date: "2024-01-13", method: "Net Banking", orderId: "ORD-005" },
  ]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed': return <Badge variant="secondary">Completed</Badge>;
      case 'pending': return <Badge variant="outline">Pending</Badge>;
      case 'failed': return <Badge variant="destructive">Failed</Badge>;
      default: return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const getMethodIcon = (method: string) => {
    switch (method) {
      case 'UPI': return <Wallet className="h-4 w-4 text-primary" />;
      case 'Credit Card': return <CreditCard className="h-4 w-4 text-primary" />;
      default: return <DollarSign className="h-4 w-4 text-primary" />;
    }
  };

  const totalEarnings = payments
    .filter(p => p.status === 'completed')
    .reduce((sum, p) => sum + parseInt(p.amount.replace('₹', '').replace(',', '')), 0);

  const pendingAmount = payments
    .filter(p => p.status === 'pending')
    .reduce((sum, p) => sum + parseInt(p.amount.replace('₹', '').replace(',', '')), 0);

  const handleExportReport = () => {
    toast({
      title: "Exporting Report",
      description: "Payment report will be downloaded shortly",
    });
  };

  const handleRequestPayout = () => {
    toast({
      title: "Payout Requested",
      description: "Your payout request has been submitted",
    });
  };

  const handleFilterByStatus = () => {
    toast({
      title: "Filter Options",
      description: "Opening status filter panel...",
    });
  };

  const handleDateRange = () => {
    toast({
      title: "Date Range",
      description: "Opening date range selector...",
    });
  };

  const handleViewReceipt = (payment: any) => {
    toast({
      title: "Receipt",
      description: `Viewing receipt for payment ${payment.id}`,
    });
  };

  const handleRetryPayment = (payment: any) => {
    setPayments(prev => prev.map(p => 
      p.id === payment.id ? { ...p, status: 'pending' } : p
    ));
    toast({
      title: "Payment Retry",
      description: `Retrying payment ${payment.id}`,
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
                  Payments Dashboard
                </h1>
                <p className="text-muted-foreground mt-1">
                  Track and manage all payment transactions
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={handleExportReport}>
                  <Download className="h-4 w-4 mr-2" />
                  Export Report
                </Button>
                <Button variant="vibrant" onClick={handleRequestPayout}>
                  <DollarSign className="h-4 w-4 mr-2" />
                  Request Payout
                </Button>
              </div>
            </div>

            {/* Payment Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="shadow-card">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-success" />
                    <div>
                      <p className="text-2xl font-bold">₹{totalEarnings.toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">Total Earnings</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="shadow-card">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-warning" />
                    <div>
                      <p className="text-2xl font-bold">₹{pendingAmount.toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">Pending Amount</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="shadow-card">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-2xl font-bold">+12%</p>
                      <p className="text-sm text-muted-foreground">Growth This Month</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Search and Filters */}
            <Card className="shadow-card">
              <CardContent className="pt-6">
                <div className="flex gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input placeholder="Search payments..." className="pl-10" />
                  </div>
                  <Button variant="outline" onClick={handleFilterByStatus}>Filter by Status</Button>
                  <Button variant="outline" onClick={handleDateRange}>Date Range</Button>
                </div>
              </CardContent>
            </Card>

            {/* Payments List */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-primary" />
                  Payment History
                  <Badge variant="outline" className="ml-auto">
                    {payments.length} transactions
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {payments.map((payment) => (
                    <div key={payment.id} className="flex items-center justify-between p-4 bg-accent/5 rounded-lg border border-accent/20 hover-lift transition-smooth">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          {getMethodIcon(payment.method)}
                          <h3 className="font-semibold">{payment.vendor}</h3>
                          {getStatusBadge(payment.status)}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>Payment ID: {payment.id}</span>
                          <span>Order: {payment.orderId}</span>
                          <span>Method: {payment.method}</span>
                          <span>Date: {payment.date}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg">{payment.amount}</p>
                        <div className="flex gap-2 mt-2">
                          <Button size="sm" variant="outline" onClick={() => handleViewReceipt(payment)}>
                            View Receipt
                          </Button>
                          {payment.status === 'failed' && (
                            <Button size="sm" variant="vibrant" onClick={() => handleRetryPayment(payment)}>
                              Retry
                            </Button>
                          )}
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
    </div>
  );
};

export default SupplierPayments;