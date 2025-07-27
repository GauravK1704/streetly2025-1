import { useState } from "react";
import { Header } from "@/components/Header";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  HelpCircle,
  Search,
  Phone,
  Mail,
  MessageCircle,
  ChevronDown,
  ChevronRight,
  Clock,
  CheckCircle,
  AlertCircle,
  Send,
  Book,
  Video,
  Users
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

const faqs = [
  {
    id: 1,
    category: "Orders",
    question: "How do I place an order for ingredients?",
    answer: "You can place an order by browsing our marketplace, selecting the kits you need, and clicking 'Add to Cart'. Once you've added all items, proceed to checkout and confirm your order."
  },
  {
    id: 2,
    category: "Delivery",
    question: "What are the delivery timings?",
    answer: "We deliver between 6 AM to 10 PM daily. You can choose your preferred delivery slot during checkout. Same-day delivery is available for orders placed before 2 PM."
  },
  {
    id: 3,
    category: "Payment",
    question: "What payment methods do you accept?",
    answer: "We accept UPI, Credit/Debit cards, Net Banking, and Cash on Delivery. All online payments are secured with 256-bit SSL encryption."
  },
  {
    id: 4,
    category: "Subscriptions",
    question: "How do I modify my subscription?",
    answer: "Go to the Subscriptions page, find your active subscription, and click 'Modify'. You can change delivery frequency, items, or pause/resume your subscription."
  },
  {
    id: 5,
    category: "Quality",
    question: "What if I receive damaged or poor quality items?",
    answer: "We offer a 100% quality guarantee. If you're not satisfied with any item, contact us within 24 hours and we'll provide a replacement or full refund."
  },
  {
    id: 6,
    category: "Account",
    question: "How do I reset my password?",
    answer: "Click on 'Forgot Password' on the login page, enter your registered phone number, and follow the OTP verification process to set a new password."
  }
];

const supportTickets = [
  {
    id: "TICKET-001",
    subject: "Delivery delay issue",
    status: "in-progress",
    priority: "high",
    created: "2024-01-15",
    lastUpdate: "2 hours ago"
  },
  {
    id: "TICKET-002",
    subject: "Wrong items delivered",
    status: "resolved",
    priority: "medium",
    created: "2024-01-12",
    lastUpdate: "Yesterday"
  }
];

const contactMethods = [
  {
    icon: Phone,
    title: "Phone Support",
    description: "Speak with our support team",
    contact: "+91 1800-123-4567",
    availability: "24/7 Available",
    action: "Call Now"
  },
  {
    icon: MessageCircle,
    title: "WhatsApp Chat",
    description: "Quick help via WhatsApp",
    contact: "+91 98765-43210",
    availability: "Online now",
    action: "Start Chat"
  },
  {
    icon: Mail,
    title: "Email Support",
    description: "Send us your queries",
    contact: "support@streetly.com",
    availability: "Response within 4 hours",
    action: "Send Email"
  }
];

export const HelpSupport = () => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [contactForm, setContactForm] = useState({
    subject: "",
    category: "",
    message: "",
    priority: "medium"
  });

  const categories = ["All", ...Array.from(new Set(faqs.map(faq => faq.category)))];

  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const submitContactForm = () => {
    if (!contactForm.subject || !contactForm.message) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Support Ticket Created",
      description: "We'll get back to you within 4 hours",
    });
    
    setContactForm({ subject: "", category: "", message: "", priority: "medium" });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'resolved': return 'bg-success text-success-foreground';
      case 'in-progress': return 'bg-primary text-primary-foreground';
      case 'pending': return 'bg-warning text-warning-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-destructive text-destructive-foreground';
      case 'medium': return 'bg-warning text-warning-foreground';
      case 'low': return 'bg-muted text-muted-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
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
              <h1 className="text-3xl font-bold">Help & Support</h1>
              <Button variant="vibrant">
                <MessageCircle className="h-4 w-4 mr-2" />
                Live Chat
              </Button>
            </div>

            {/* Quick Contact Methods */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {contactMethods.map((method, index) => (
                <Card key={index} className="hover-lift">
                  <CardContent className="p-6 text-center">
                    <method.icon className="h-8 w-8 mx-auto text-primary mb-3" />
                    <h3 className="font-semibold text-lg mb-2">{method.title}</h3>
                    <p className="text-muted-foreground text-sm mb-2">{method.description}</p>
                    <p className="font-medium mb-1">{method.contact}</p>
                    <p className="text-xs text-success mb-4">{method.availability}</p>
                    <Button variant="outline" className="w-full">
                      {method.action}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Support Tickets */}
            {supportTickets.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5" />
                    Your Support Tickets
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {supportTickets.map((ticket) => (
                      <div key={ticket.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold">{ticket.id}</h4>
                            <Badge className={getStatusColor(ticket.status)}>
                              {ticket.status === 'in-progress' ? (
                                <Clock className="h-3 w-3 mr-1" />
                              ) : (
                                <CheckCircle className="h-3 w-3 mr-1" />
                              )}
                              {ticket.status.replace('-', ' ')}
                            </Badge>
                            <Badge className={getPriorityColor(ticket.priority)}>
                              {ticket.priority}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{ticket.subject}</p>
                          <p className="text-xs text-muted-foreground">
                            Created: {ticket.created} • Last update: {ticket.lastUpdate}
                          </p>
                        </div>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* FAQ Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HelpCircle className="h-5 w-5" />
                  Frequently Asked Questions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Search and Filter */}
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search FAQs..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <div className="flex gap-2 overflow-x-auto">
                    {categories.map((category) => (
                      <Button
                        key={category}
                        variant={selectedCategory === category ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedCategory(category)}
                        className="whitespace-nowrap"
                      >
                        {category}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* FAQ List */}
                <div className="space-y-2">
                  {filteredFaqs.map((faq) => (
                    <div key={faq.id} className="border rounded-lg">
                      <button
                        className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/50"
                        onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                      >
                        <div className="flex items-center gap-3">
                          <Badge variant="outline" className="text-xs">
                            {faq.category}
                          </Badge>
                          <span className="font-medium">{faq.question}</span>
                        </div>
                        {expandedFaq === faq.id ? (
                          <ChevronDown className="h-5 w-5" />
                        ) : (
                          <ChevronRight className="h-5 w-5" />
                        )}
                      </button>
                      {expandedFaq === faq.id && (
                        <div className="px-4 pb-4 text-muted-foreground">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {filteredFaqs.length === 0 && (
                  <div className="text-center py-8">
                    <HelpCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="font-semibold mb-2">No FAQs found</h3>
                    <p className="text-muted-foreground">Try adjusting your search or contact support</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Send className="h-5 w-5" />
                  Contact Support
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject *</Label>
                    <Input
                      id="subject"
                      placeholder="Brief description of your issue"
                      value={contactForm.subject}
                      onChange={(e) => setContactForm(prev => ({ ...prev, subject: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Input
                      id="category"
                      placeholder="e.g., Orders, Delivery, Payment"
                      value={contactForm.category}
                      onChange={(e) => setContactForm(prev => ({ ...prev, category: e.target.value }))}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    placeholder="Describe your issue in detail..."
                    className="min-h-32"
                    value={contactForm.message}
                    onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Label>Priority:</Label>
                    <div className="flex gap-2">
                      {['low', 'medium', 'high'].map((priority) => (
                        <Button
                          key={priority}
                          variant={contactForm.priority === priority ? "default" : "outline"}
                          size="sm"
                          onClick={() => setContactForm(prev => ({ ...prev, priority }))}
                        >
                          {priority}
                        </Button>
                      ))}
                    </div>
                  </div>
                  <Button variant="vibrant" onClick={submitContactForm}>
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Resources */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="text-center">
                <CardContent className="p-6">
                  <Book className="h-8 w-8 mx-auto text-primary mb-3" />
                  <h3 className="font-semibold mb-2">User Guide</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Comprehensive guide to using StreetLy
                  </p>
                  <Button variant="outline" className="w-full">
                    View Guide
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardContent className="p-6">
                  <Video className="h-8 w-8 mx-auto text-primary mb-3" />
                  <h3 className="font-semibold mb-2">Video Tutorials</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Step-by-step video tutorials
                  </p>
                  <Button variant="outline" className="w-full">
                    Watch Videos
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardContent className="p-6">
                  <Users className="h-8 w-8 mx-auto text-primary mb-3" />
                  <h3 className="font-semibold mb-2">Community Forum</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Connect with other vendors
                  </p>
                  <Button variant="outline" className="w-full">
                    Join Forum
                  </Button>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};