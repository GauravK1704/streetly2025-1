import { useState } from "react";
import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { 
  HelpCircle, 
  Phone, 
  MessageCircle,
  AlertTriangle,
  FileText,
  Search,
  Package,
  MapPin,
  DollarSign,
  Home,
  Clock,
  Shield,
  Star,
  Headphones,
  Send
} from "lucide-react";
import { DeliveryMobileNav } from "@/components/DeliveryMobileNav";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const DeliveryHelp = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [ticketSubject, setTicketSubject] = useState("");
  const [ticketMessage, setTicketMessage] = useState("");

  const quickActions = [
    {
      icon: Phone,
      title: "Call Support",
      description: "Speak with our support team",
      action: "call",
      urgent: true
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Chat with support agent",
      action: "chat",
      urgent: false
    },
    {
      icon: AlertTriangle,
      title: "Emergency Help",
      description: "Report urgent safety issues",
      action: "emergency",
      urgent: true
    },
    {
      icon: FileText,
      title: "Submit Ticket",
      description: "Create detailed support request",
      action: "ticket",
      urgent: false
    }
  ];

  const faqs = [
    {
      category: "Delivery Process",
      questions: [
        {
          question: "How do I confirm a pickup?",
          answer: "Use the 'Confirm Pickup' button in the order details, upload a photo as proof, and enter the OTP provided by the supplier."
        },
        {
          question: "What if the vendor is not available?",
          answer: "Try calling/messaging the vendor first. If they don't respond within 10 minutes, contact support or use the 'Can't Deliver' option to report the issue."
        },
        {
          question: "How do I mark an order as delivered?",
          answer: "Upload a photo of the delivered items, get the OTP from the vendor, and tap 'Mark as Delivered' in the order screen."
        }
      ]
    },
    {
      category: "Navigation & Routes",
      questions: [
        {
          question: "How does route optimization work?",
          answer: "Our AI optimizes your delivery route based on traffic, distance, and delivery priorities to save time and fuel costs."
        },
        {
          question: "What if GPS shows wrong location?",
          answer: "Use the 'Report Location Issue' feature or call the vendor/supplier to confirm the correct address."
        }
      ]
    },
    {
      category: "Payments & Earnings",
      questions: [
        {
          question: "When do I get paid?",
          answer: "Payments are processed weekly. Your earnings from Monday-Sunday are paid out the following Tuesday to your registered bank account."
        },
        {
          question: "How are delivery fees calculated?",
          answer: "Base fare + distance charges + any applicable bonuses and tips. You can see the breakdown in your earnings section."
        },
        {
          question: "What if a payment is missing?",
          answer: "Check your earnings history first. If you still can't find it, submit a ticket with the order ID and we'll investigate within 24 hours."
        }
      ]
    },
    {
      category: "Safety & Security",
      questions: [
        {
          question: "What should I do in an emergency?",
          answer: "Use the emergency button to share your live location with our support team and local authorities if needed."
        },
        {
          question: "How do I report unsafe pickup/delivery locations?",
          answer: "Use the 'Report Unsafe Zone' feature in the app or call our safety hotline immediately."
        }
      ]
    }
  ];

  const recentTickets = [
    {
      id: "TKT-001",
      subject: "Payment not received for Order #ORD-456",
      status: "resolved",
      createdAt: "2024-01-14",
      priority: "medium"
    },
    {
      id: "TKT-002", 
      subject: "Unable to find vendor location",
      status: "in-progress",
      createdAt: "2024-01-13",
      priority: "high"
    }
  ];

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'call':
        toast({
          title: "Calling Support",
          description: "Connecting you to our support team...",
        });
        break;
      case 'chat':
        toast({
          title: "Opening Live Chat",
          description: "Starting chat session with support agent...",
        });
        break;
      case 'emergency':
        toast({
          title: "Emergency Alert Sent",
          description: "Your location has been shared with our safety team.",
        });
        break;
      case 'ticket':
        // Scroll to ticket form
        document.getElementById('ticket-form')?.scrollIntoView({ behavior: 'smooth' });
        break;
    }
  };

  const handleSubmitTicket = () => {
    if (!ticketSubject.trim() || !ticketMessage.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in both subject and message fields.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Ticket Submitted",
      description: "Your support ticket has been created. We'll respond within 24 hours.",
    });
    
    setTicketSubject("");
    setTicketMessage("");
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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'resolved': return <Badge className="bg-success text-success-foreground">Resolved</Badge>;
      case 'in-progress': return <Badge variant="default">In Progress</Badge>;
      case 'pending': return <Badge variant="outline">Pending</Badge>;
      default: return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const filteredFaqs = faqs.map(category => ({
    ...category,
    questions: category.questions.filter(q => 
      searchQuery === "" || 
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

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
                  <Button variant="ghost" className="w-full justify-start" onClick={() => handleNavigateToPage("earnings")}>
                    <DollarSign className="h-4 w-4 mr-2" />
                    Earnings
                  </Button>
                  <Button variant="default" className="w-full justify-start" onClick={() => handleNavigateToPage("help")}>
                    <HelpCircle className="h-4 w-4 mr-2" />
                    Help & Support
                  </Button>
                </div>
              </CardContent>
            </Card>
          </aside>
          
          <main className="flex-1 space-y-6">
            <div>
              <h1 className="text-3xl font-bold gradient-primary bg-clip-text text-transparent">
                Help & Support
              </h1>
              <p className="text-muted-foreground mt-1">
                Get help with deliveries, payments, and more
              </p>
            </div>

            {/* Quick Actions */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Need Immediate Help?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {quickActions.map((action) => {
                    const Icon = action.icon;
                    return (
                      <Button
                        key={action.action}
                        variant={action.urgent ? "vibrant" : "outline"}
                        className="h-20 flex-col gap-2"
                        onClick={() => handleQuickAction(action.action)}
                      >
                        <Icon className="h-6 w-6" />
                        <div className="text-center">
                          <div className="font-medium text-sm">{action.title}</div>
                          <div className="text-xs opacity-80">{action.description}</div>
                        </div>
                      </Button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Headphones className="h-5 w-5 text-primary" />
                  Support Hours & Contact
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <Phone className="h-8 w-8 text-primary mx-auto mb-2" />
                    <h3 className="font-semibold">Phone Support</h3>
                    <p className="text-sm text-muted-foreground">+91 1800-123-4567</p>
                    <p className="text-xs text-muted-foreground">24/7 Available</p>
                  </div>
                  <div className="text-center">
                    <MessageCircle className="h-8 w-8 text-primary mx-auto mb-2" />
                    <h3 className="font-semibold">Live Chat</h3>
                    <p className="text-sm text-muted-foreground">In-app messaging</p>
                    <p className="text-xs text-muted-foreground">6 AM - 12 AM</p>
                  </div>
                  <div className="text-center">
                    <Shield className="h-8 w-8 text-primary mx-auto mb-2" />
                    <h3 className="font-semibold">Emergency</h3>
                    <p className="text-sm text-muted-foreground">Safety Hotline</p>
                    <p className="text-xs text-muted-foreground">24/7 Emergency</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* FAQs */}
              <div className="lg:col-span-2 space-y-6">
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle>Frequently Asked Questions</CardTitle>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input 
                        placeholder="Search FAQs..." 
                        className="pl-10"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      {filteredFaqs.map((category, categoryIndex) => (
                        <div key={categoryIndex} className="mb-4">
                          <h3 className="font-semibold text-lg mb-2 text-primary">
                            {category.category}
                          </h3>
                          {category.questions.map((faq, index) => (
                            <AccordionItem key={`${categoryIndex}-${index}`} value={`item-${categoryIndex}-${index}`}>
                              <AccordionTrigger className="text-left">
                                {faq.question}
                              </AccordionTrigger>
                              <AccordionContent>
                                {faq.answer}
                              </AccordionContent>
                            </AccordionItem>
                          ))}
                        </div>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>

                {/* Submit Ticket Form */}
                <Card className="shadow-card" id="ticket-form">
                  <CardHeader>
                    <CardTitle>Submit Support Ticket</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Subject</label>
                      <Input 
                        placeholder="Brief description of your issue"
                        value={ticketSubject}
                        onChange={(e) => setTicketSubject(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Description</label>
                      <Textarea 
                        placeholder="Please provide detailed information about your issue, including order IDs if applicable"
                        className="min-h-[120px]"
                        value={ticketMessage}
                        onChange={(e) => setTicketMessage(e.target.value)}
                      />
                    </div>
                    <Button variant="vibrant" onClick={handleSubmitTicket} className="w-full">
                      <Send className="h-4 w-4 mr-2" />
                      Submit Ticket
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Tickets */}
              <div>
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle>Your Recent Tickets</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentTickets.map((ticket) => (
                        <div key={ticket.id} className="p-3 bg-accent/5 rounded-lg border border-accent/20">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                              <h4 className="font-semibold text-sm">{ticket.subject}</h4>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <Clock className="h-3 w-3" />
                                <span>{ticket.createdAt}</span>
                              </div>
                            </div>
                            {getStatusBadge(ticket.status)}
                          </div>
                          <div className="flex items-center justify-between">
                            <Badge variant="outline" className="text-xs">
                              {ticket.priority} priority
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {ticket.id}
                            </span>
                          </div>
                        </div>
                      ))}
                      
                      {recentTickets.length === 0 && (
                        <div className="text-center py-8 text-muted-foreground">
                          <FileText className="h-12 w-12 mx-auto mb-2 opacity-50" />
                          <p>No support tickets found</p>
                          <p className="text-sm">Submit a ticket if you need help</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </main>
        </div>
      </div>

      <DeliveryMobileNav />
    </div>
  );
};

export default DeliveryHelp;