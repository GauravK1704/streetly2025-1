import { useState } from "react";
import { Header } from "@/components/Header";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { FileText, Search, Download, Plus, Eye, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import jsPDF from 'jspdf';

const SupplierInvoices = () => {
  const { toast } = useToast();
  const [invoices, setInvoices] = useState([
    { id: "INV-001", vendor: "Raj's Chaat Corner", amount: "₹2,400", status: "paid", date: "2024-01-15", dueDate: "2024-01-30", items: "Onions, Tomatoes, Chaat Masala" },
    { id: "INV-002", vendor: "Mumbai Street Foods", amount: "₹3,200", status: "sent", date: "2024-01-15", dueDate: "2024-01-30", items: "Oil, Spices, Flour" },
    { id: "INV-003", vendor: "Chennai Snacks Hub", amount: "₹1,800", status: "paid", date: "2024-01-14", dueDate: "2024-01-29", items: "Vegetables, Chutneys" },
    { id: "INV-004", vendor: "Bangalore Bites", amount: "₹2,900", status: "overdue", date: "2024-01-10", dueDate: "2024-01-25", items: "Rice, Dal, Spices" },
    { id: "INV-005", vendor: "Kolkata Kitchen", amount: "₹2,100", status: "draft", date: "2024-01-15", dueDate: "2024-01-30", items: "Fish, Vegetables" },
  ]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid': return <Badge variant="secondary">Paid</Badge>;
      case 'sent': return <Badge variant="default">Sent</Badge>;
      case 'draft': return <Badge variant="outline">Draft</Badge>;
      case 'overdue': return <Badge variant="destructive">Overdue</Badge>;
      default: return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const totalInvoiced = invoices.reduce((sum, inv) => sum + parseInt(inv.amount.replace('₹', '').replace(',', '')), 0);
  const paidAmount = invoices
    .filter(inv => inv.status === 'paid')
    .reduce((sum, inv) => sum + parseInt(inv.amount.replace('₹', '').replace(',', '')), 0);
  const pendingAmount = totalInvoiced - paidAmount;

  const handleExportAll = () => {
    toast({
      title: "Exporting All Invoices",
      description: "All invoices will be downloaded as a zip file",
    });
  };

  const handleCreateInvoice = () => {
    toast({
      title: "Create Invoice",
      description: "Opening invoice creation form...",
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

  const handleViewInvoice = (invoice: any) => {
    toast({
      title: "Invoice Details",
      description: `Viewing invoice ${invoice.id}`,
    });
  };

  const handleSendInvoice = (invoice: any) => {
    setInvoices(prev => prev.map(inv => 
      inv.id === invoice.id ? { ...inv, status: 'sent' } : inv
    ));
    toast({
      title: "Invoice Sent",
      description: `Invoice ${invoice.id} has been sent to ${invoice.vendor}`,
    });
  };

  const handleDownloadPDF = (invoice: any) => {
    // Create PDF using jsPDF
    const doc = new jsPDF();
    
    // Add invoice header
    doc.setFontSize(20);
    doc.text('INVOICE', 105, 30, { align: 'center' });
    
    doc.setFontSize(12);
    doc.text(`Invoice ID: ${invoice.id}`, 20, 50);
    doc.text(`Date: ${invoice.date}`, 20, 60);
    doc.text(`Due Date: ${invoice.dueDate}`, 20, 70);
    
    // Add vendor details
    doc.text('Bill To:', 20, 90);
    doc.text(invoice.vendor, 20, 100);
    
    // Add items
    doc.text('Items:', 20, 120);
    doc.text(invoice.items, 20, 130);
    
    // Add amount
    doc.text(`Total Amount: ${invoice.amount}`, 20, 150);
    doc.text(`Status: ${invoice.status}`, 20, 160);
    
    // Save the PDF
    doc.save(`invoice-${invoice.id}.pdf`);
    
    toast({
      title: "PDF Downloaded",
      description: `Invoice ${invoice.id} has been downloaded as PDF`,
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
                  Invoice Management
                </h1>
                <p className="text-muted-foreground mt-1">
                  Create and manage invoices for your deliveries
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={handleExportAll}>
                  <Download className="h-4 w-4 mr-2" />
                  Export All
                </Button>
                <Button variant="vibrant" onClick={handleCreateInvoice}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Invoice
                </Button>
              </div>
            </div>

            {/* Invoice Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="shadow-card">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-2xl font-bold">₹{totalInvoiced.toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">Total Invoiced</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="shadow-card">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-success" />
                    <div>
                      <p className="text-2xl font-bold">₹{paidAmount.toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">Paid Amount</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="shadow-card">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-warning" />
                    <div>
                      <p className="text-2xl font-bold">₹{pendingAmount.toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">Pending Amount</p>
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
                    <Input placeholder="Search invoices..." className="pl-10" />
                  </div>
                  <Button variant="outline" onClick={handleFilterByStatus}>Filter by Status</Button>
                  <Button variant="outline" onClick={handleDateRange}>Date Range</Button>
                </div>
              </CardContent>
            </Card>

            {/* Invoices List */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  All Invoices
                  <Badge variant="outline" className="ml-auto">
                    {invoices.length} invoices
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {invoices.map((invoice) => (
                    <div key={invoice.id} className="flex items-center justify-between p-4 bg-accent/5 rounded-lg border border-accent/20 hover-lift transition-smooth">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <FileText className="h-4 w-4 text-primary" />
                          <h3 className="font-semibold">{invoice.vendor}</h3>
                          {getStatusBadge(invoice.status)}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-1">
                          <span>Invoice: {invoice.id}</span>
                          <span>Date: {invoice.date}</span>
                          <span>Due: {invoice.dueDate}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{invoice.items}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg">{invoice.amount}</p>
                        <div className="flex gap-2 mt-2">
                          <Button size="sm" variant="outline" onClick={() => handleViewInvoice(invoice)}>
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                          {invoice.status === 'draft' && (
                            <Button size="sm" variant="vibrant" onClick={() => handleSendInvoice(invoice)}>
                              <Send className="h-4 w-4 mr-1" />
                              Send
                            </Button>
                          )}
                          <Button size="sm" variant="outline" onClick={() => handleDownloadPDF(invoice)}>
                            <Download className="h-4 w-4 mr-1" />
                            PDF
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
    </div>
  );
};

export default SupplierInvoices;