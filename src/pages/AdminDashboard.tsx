import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageSelector } from "@/components/LanguageSelector";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { 
  Shield, 
  Users, 
  TrendingUp, 
  Bell, 
  Package, 
  Truck, 
  DollarSign, 
  AlertTriangle,
  CheckCircle,
  XCircle,
  Search,
  Download,
  Filter,
  MapPin,
  BarChart3,
  PieChart,
  FileText,
  Settings,
  MessageSquare,
  Megaphone,
  ChefHat,
  Building2,
  UserCheck,
  ShoppingCart,
  IndianRupee,
  Globe,
  HelpCircle,
  Activity,
  Calendar,
  Eye,
  Edit,
  Ban,
  RefreshCw,
  Mail,
  Phone,
  Star,
  Clock,
  ArrowUp,
  ArrowDown,
  Menu,
  LogOut,
  User,
  Home,
  Briefcase,
  Plus,
  Send,
  Trash2,
  Upload,
  Award,
  Target,
  TrendingDown
} from "lucide-react";

const AdminDashboard = () => {
  const { t } = useLanguage();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [broadcastMessage, setBroadcastMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Sample data for dashboard
  const stats = [
    { title: "Total Vendors", value: "12,847", icon: ChefHat, color: "text-primary", change: "+8.2%", trend: "up" },
    { title: "Active Suppliers", value: "1,289", icon: Building2, color: "text-success", change: "+3.1%", trend: "up" },
    { title: "Daily Orders", value: "34,567", icon: ShoppingCart, color: "text-accent", change: "+15.4%", trend: "up" },
    { title: "Revenue Today", value: "₹24.8L", icon: IndianRupee, color: "text-warning", change: "+12.3%", trend: "up" },
  ];

  const [pendingApprovals, setPendingApprovals] = useState([
    { id: 1, name: "New Delhi Food Corner", type: "vendor", location: "Delhi", documents: 4, status: "kyc_pending" },
    { id: 2, name: "Fresh Vegetables Ltd", type: "supplier", location: "Mumbai", documents: 3, status: "tax_verification" },
    { id: 3, name: "Quick Delivery Services", type: "delivery", location: "Bangalore", documents: 2, status: "background_check" },
    { id: 4, name: "Rajasthan Spice Co.", type: "supplier", location: "Jaipur", documents: 5, status: "license_pending" },
  ]);

  const [systemAlerts, setSystemAlerts] = useState([
    { id: 1, message: "High demand for onions in Delhi NCR region", severity: "warning", time: "2 hours ago", action: "stock_alert" },
    { id: 2, message: "Festival kit promotion campaign ready for approval", severity: "info", time: "4 hours ago", action: "campaign_approval" },
    { id: 3, message: "Supplier stock shortage reported in 3 categories", severity: "error", time: "6 hours ago", action: "supply_critical" },
    { id: 4, message: "Payment gateway maintenance scheduled tomorrow", severity: "info", time: "8 hours ago", action: "maintenance" },
  ]);

  const recentTickets = [
    { id: "TKT-001", title: "Payment not reflected", user: "Vendor - Delhi", priority: "high", status: "open", time: "1 hour ago" },
    { id: "TKT-002", title: "Delivery partner verification", user: "Delivery - Mumbai", priority: "medium", status: "in_progress", time: "3 hours ago" },
    { id: "TKT-003", title: "Kit customization request", user: "Vendor - Pune", priority: "low", status: "resolved", time: "5 hours ago" },
  ];

  const sidebarItems = [
    { id: "overview", label: t('admin.overview'), icon: Home },
    { id: "vendors", label: t('admin.vendors'), icon: ChefHat },
    { id: "suppliers", label: t('admin.suppliers'), icon: Building2 },
    { id: "delivery", label: t('admin.delivery'), icon: Truck },
    { id: "orders", label: t('admin.orders'), icon: ShoppingCart },
    { id: "analytics", label: t('admin.analytics'), icon: BarChart3 },
    { id: "financial", label: t('admin.financial'), icon: IndianRupee },
    { id: "settings", label: t('admin.settings'), icon: Settings },
    { id: "support", label: t('admin.support'), icon: MessageSquare },
    { id: "campaigns", label: t('admin.campaigns'), icon: Megaphone },
    { id: "reports", label: t('admin.reports'), icon: FileText },
    { id: "help", label: t('admin.help'), icon: HelpCircle },
  ];

  // Functional handlers
  const handleApproval = (id: number, approved: boolean) => {
    setIsLoading(true);
    setTimeout(() => {
      setPendingApprovals(prev => prev.filter(item => item.id !== id));
      toast({
        title: approved ? "Application Approved" : "Application Rejected",
        description: `The application has been ${approved ? 'approved' : 'rejected'} successfully.`,
      });
      setIsLoading(false);
    }, 1000);
  };

  const handleAlertAction = (alertId: number) => {
    setIsLoading(true);
    setTimeout(() => {
      setSystemAlerts(prev => prev.filter(alert => alert.id !== alertId));
      toast({
        title: "Action Taken",
        description: "Alert has been addressed and resolved.",
      });
      setIsLoading(false);
    }, 1000);
  };

  const handleBroadcastMessage = () => {
    if (!broadcastMessage.trim()) {
      toast({
        title: "Message Required",
        description: "Please enter a message to broadcast.",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    setTimeout(() => {
      toast({
        title: "Message Broadcasted",
        description: `Message sent to all users: "${broadcastMessage}"`,
      });
      setBroadcastMessage("");
      setIsLoading(false);
    }, 1500);
  };

  const handleExportReport = () => {
    setIsLoading(true);
    setTimeout(() => {
      // Create a simple CSV content
      const csvContent = `
Date,Vendors,Suppliers,Orders,Revenue
${new Date().toISOString().split('T')[0]},12847,1289,34567,2480000
      `.trim();
      
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `admin-report-${new Date().toISOString().split('T')[0]}.csv`;
      link.click();
      URL.revokeObjectURL(url);
      
      toast({
        title: "Report Exported",
        description: "Admin report has been downloaded successfully.",
      });
      setIsLoading(false);
    }, 1000);
  };

  const handleQuickAction = (action: string) => {
    setIsLoading(true);
    setTimeout(() => {
      switch (action) {
        case 'logout':
          // Use auth context logout for proper state management
          logout();
          navigate('/auth');
          toast({ title: "Signed Out", description: "You have been successfully signed out." });
          break;
        case 'approve_vendor':
          toast({ title: "Vendor Approval", description: "Redirected to vendor approval interface." });
          break;
        case 'add_kit':
          toast({ title: "Add Kit", description: "Kit creation interface opened." });
          break;
        case 'announcement':
          toast({ title: "Announcement", description: "Announcement creation interface opened." });
          break;
        case 'live_map':
          toast({ title: "Live Map", description: "Live tracking map opened." });
          break;
        case 'generate_report':
          toast({ title: "Report Generation", description: "Report generation started." });
          break;
        case 'system_settings':
          toast({ title: "System Settings", description: "Settings panel opened." });
          break;
        default:
          toast({ title: "Action", description: `${action} functionality activated.` });
      }
      setIsLoading(false);
    }, 800);
  };

  const handleNotifications = () => {
    toast({
      title: "Notifications",
      description: "You have 3 new notifications",
    });
  };

  const handleRefreshAlerts = () => {
    setIsLoading(true);
    setTimeout(() => {
      toast({
        title: "Alerts Refreshed",
        description: "System alerts have been updated.",
      });
      setIsLoading(false);
    }, 1000);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'error': return 'bg-destructive';
      case 'warning': return 'bg-warning';
      case 'info': return 'bg-primary';
      default: return 'bg-muted';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-destructive';
      case 'medium': return 'text-warning';
      case 'low': return 'text-success';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'open': return <Badge variant="destructive">Open</Badge>;
      case 'in_progress': return <Badge variant="secondary">In Progress</Badge>;
      case 'resolved': return <Badge variant="outline" className="text-success border-success">Resolved</Badge>;
      default: return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-50 border-b bg-card shadow-sm">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-foreground font-heading">{t('admin.title')}</h1>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => navigate('/')}
                className="ml-4"
              >
                <Home className="h-4 w-4 mr-2" />
                {t('admin.home')}
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="hidden md:flex relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search vendors, orders, tickets..." 
                className="pl-10 w-80"
              />
            </div>

            {/* Notifications */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative"
              onClick={handleNotifications}
            >
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-destructive rounded-full text-xs flex items-center justify-center">
                <span className="text-white text-[10px]">3</span>
              </span>
            </Button>

            {/* Language Selector */}
            <LanguageSelector />

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Admin Profile */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 px-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary text-primary-foreground">AD</AvatarFallback>
                  </Avatar>
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-medium">Admin Officer</p>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem onClick={() => handleQuickAction('profile')}>
                  <User className="mr-2 h-4 w-4" />
                  Profile Settings
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleQuickAction('admin_tools')}>
                  <Briefcase className="mr-2 h-4 w-4" />
                  Admin Tools
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setActiveTab('settings')}>
                  <Settings className="mr-2 h-4 w-4" />
                  System Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive" onClick={() => handleQuickAction('logout')}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`${sidebarCollapsed ? 'w-16' : 'w-64'} hidden lg:block border-r bg-card transition-all duration-300`}>
          <div className="p-4 space-y-2">
            {sidebarItems.map((item) => (
              <Button
                key={item.id}
                variant={activeTab === item.id ? "default" : "ghost"}
                className={`w-full justify-start ${sidebarCollapsed ? 'px-2' : 'px-4'}`}
                onClick={() => setActiveTab(item.id)}
              >
                <item.icon className={`h-5 w-5 ${sidebarCollapsed ? '' : 'mr-3'}`} />
                {!sidebarCollapsed && <span>{item.label}</span>}
              </Button>
            ))}
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 space-y-6">
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <>
              {/* Page Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold gradient-primary bg-clip-text text-transparent">
                    {t('admin.title')}
                  </h1>
                  <p className="text-muted-foreground mt-1">
                    {t('admin.subtitle')}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    onClick={handleExportReport}
                    disabled={isLoading}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    {t('admin.export')}
                  </Button>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="bg-gradient-primary">
                        <Megaphone className="h-4 w-4 mr-2" />
                        {t('admin.broadcast')}
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Broadcast Message to All Users</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="message">Message</Label>
                          <Textarea
                            id="message"
                            placeholder="Enter your broadcast message..."
                            value={broadcastMessage}
                            onChange={(e) => setBroadcastMessage(e.target.value)}
                            className="min-h-32"
                          />
                        </div>
                        <Button 
                          onClick={handleBroadcastMessage} 
                          className="w-full"
                          disabled={isLoading}
                        >
                          <Send className="h-4 w-4 mr-2" />
                          Send Broadcast
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => (
                  <Card key={stat.title} className="hover-lift border shadow-card cursor-pointer" onClick={() => handleQuickAction(`view_${stat.title.toLowerCase().replace(' ', '_')}`)}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="space-y-2">
                          <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                          <p className="text-3xl font-bold">{stat.value}</p>
                          <div className="flex items-center gap-1">
                            {stat.trend === 'up' ? (
                              <ArrowUp className="h-3 w-3 text-success" />
                            ) : (
                              <ArrowDown className="h-3 w-3 text-destructive" />
                            )}
                            <span className={`text-sm font-medium ${stat.trend === 'up' ? 'text-success' : 'text-destructive'}`}>
                              {stat.change}
                            </span>
                          </div>
                        </div>
                        <div className={`p-3 rounded-lg bg-gradient-primary`}>
                          <stat.icon className="h-8 w-8 text-white" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Pending Approvals */}
                <Card className="shadow-card">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Shield className="h-5 w-5 text-primary" />
                        Pending Approvals
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {pendingApprovals.length} pending
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {pendingApprovals.map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="space-y-1">
                          <h4 className="font-semibold text-foreground">{item.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {item.location} • {item.type} • {item.documents} docs
                          </p>
                          <Badge variant="outline" className="text-xs">
                            {item.status.replace('_', ' ')}
                          </Badge>
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="text-success hover:bg-success/10"
                            onClick={() => handleApproval(item.id, true)}
                            disabled={isLoading}
                          >
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="text-destructive hover:bg-destructive/10"
                            onClick={() => handleApproval(item.id, false)}
                            disabled={isLoading}
                          >
                            <XCircle className="h-4 w-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleQuickAction(`view_application_${item.id}`)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => setActiveTab('vendors')}
                    >
                      View All Approvals
                    </Button>
                  </CardContent>
                </Card>

                {/* System Alerts */}
                <Card className="shadow-card">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-warning" />
                        System Alerts
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={handleRefreshAlerts}
                        disabled={isLoading}
                      >
                        <RefreshCw className="h-4 w-4" />
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {systemAlerts.map((alert) => (
                      <div key={alert.id} className="flex items-start gap-3 p-4 border rounded-lg">
                        <div className={`w-3 h-3 rounded-full mt-1 ${getSeverityColor(alert.severity)}`} />
                        <div className="flex-1 space-y-1">
                          <p className="text-sm font-medium">{alert.message}</p>
                          <div className="flex items-center justify-between">
                            <p className="text-xs text-muted-foreground">{alert.time}</p>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="h-7 text-xs"
                              onClick={() => handleAlertAction(alert.id)}
                              disabled={isLoading}
                            >
                              Take Action
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => setActiveTab('support')}
                    >
                      View All Alerts
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Support Tickets */}
                <Card className="lg:col-span-2 shadow-card">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2">
                      <MessageSquare className="h-5 w-5 text-accent" />
                      Recent Support Tickets
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {recentTickets.map((ticket) => (
                      <div key={ticket.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium">{ticket.title}</h4>
                            <span className={`text-xs font-medium ${getPriorityColor(ticket.priority)}`}>
                              {ticket.priority}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">{ticket.user}</p>
                          <p className="text-xs text-muted-foreground">{ticket.time}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          {getStatusBadge(ticket.status)}
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleQuickAction(`view_ticket_${ticket.id}`)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card className="shadow-card">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="h-5 w-5 text-success" />
                      Quick Actions
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => handleQuickAction('approve_vendor')}
                      disabled={isLoading}
                    >
                      <UserCheck className="h-4 w-4 mr-2" />
                      Approve Vendor
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => handleQuickAction('add_kit')}
                      disabled={isLoading}
                    >
                      <Package className="h-4 w-4 mr-2" />
                      Add New Kit
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => handleQuickAction('announcement')}
                      disabled={isLoading}
                    >
                      <Megaphone className="h-4 w-4 mr-2" />
                      Send Announcement
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => handleQuickAction('live_map')}
                      disabled={isLoading}
                    >
                      <MapPin className="h-4 w-4 mr-2" />
                      View Live Map
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => handleQuickAction('generate_report')}
                      disabled={isLoading}
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      Generate Report
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => setActiveTab('settings')}
                      disabled={isLoading}
                    >
                      <Settings className="h-4 w-4 mr-2" />
                      System Settings
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Platform Health Overview */}
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-primary" />
                    Platform Health Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="space-y-3 cursor-pointer hover:opacity-80" onClick={() => handleQuickAction('vendor_adoption_details')}>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Vendor Adoption Rate</span>
                        <span className="text-sm font-bold text-primary">78.5%</span>
                      </div>
                      <Progress value={78.5} className="h-3" />
                      <p className="text-xs text-muted-foreground">12,847 of 16,350 eligible vendors</p>
                    </div>
                    <div className="space-y-3 cursor-pointer hover:opacity-80" onClick={() => handleQuickAction('supplier_network_details')}>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Supplier Network Coverage</span>
                        <span className="text-sm font-bold text-success">92.1%</span>
                      </div>
                      <Progress value={92.1} className="h-3" />
                      <p className="text-xs text-muted-foreground">Coverage across 28 states</p>
                    </div>
                    <div className="space-y-3 cursor-pointer hover:opacity-80" onClick={() => handleQuickAction('delivery_network_details')}>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Delivery Network</span>
                        <span className="text-sm font-bold text-accent">85.7%</span>
                      </div>
                      <Progress value={85.7} className="h-3" />
                      <p className="text-xs text-muted-foreground">8,456 active delivery partners</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {/* Other tab sections */}
          {activeTab === "vendors" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Vendor Management</h2>
                <Button onClick={() => handleQuickAction('add_vendor')}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Vendor
                </Button>
              </div>
              <Card>
                <CardContent className="p-6">
                  <p className="text-muted-foreground">Vendor management interface will be implemented here.</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                    <Button variant="outline" onClick={() => handleQuickAction('vendor_kyc')}>
                      <UserCheck className="h-4 w-4 mr-2" />
                      KYC Verification
                    </Button>
                    <Button variant="outline" onClick={() => handleQuickAction('vendor_performance')}>
                      <TrendingUp className="h-4 w-4 mr-2" />
                      Performance
                    </Button>
                    <Button variant="outline" onClick={() => handleQuickAction('vendor_block')}>
                      <Ban className="h-4 w-4 mr-2" />
                      Block/Unblock
                    </Button>
                    <Button variant="outline" onClick={() => handleQuickAction('vendor_export')}>
                      <Download className="h-4 w-4 mr-2" />
                      Export Data
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "suppliers" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Supplier Management</h2>
                <Button onClick={() => handleQuickAction('add_supplier')}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Supplier
                </Button>
              </div>
              <Card>
                <CardContent className="p-6">
                  <p className="text-muted-foreground">Supplier management interface will be implemented here.</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                    <Button variant="outline" onClick={() => handleQuickAction('supplier_inventory')}>
                      <Package className="h-4 w-4 mr-2" />
                      Inventory
                    </Button>
                    <Button variant="outline" onClick={() => handleQuickAction('supplier_quality')}>
                      <Award className="h-4 w-4 mr-2" />
                      Quality Check
                    </Button>
                    <Button variant="outline" onClick={() => handleQuickAction('supplier_payments')}>
                      <DollarSign className="h-4 w-4 mr-2" />
                      Payments
                    </Button>
                    <Button variant="outline" onClick={() => handleQuickAction('supplier_suspend')}>
                      <XCircle className="h-4 w-4 mr-2" />
                      Suspend
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "analytics" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
                <Button onClick={() => handleQuickAction('refresh_analytics')}>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh Data
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="cursor-pointer hover-lift" onClick={() => handleQuickAction('order_analytics')}>
                  <CardContent className="p-6 text-center">
                    <BarChart3 className="h-12 w-12 mx-auto text-primary mb-4" />
                    <h3 className="font-semibold mb-2">Order Analytics</h3>
                    <p className="text-sm text-muted-foreground">Daily, Weekly, Monthly trends</p>
                  </CardContent>
                </Card>
                <Card className="cursor-pointer hover-lift" onClick={() => handleQuickAction('revenue_analytics')}>
                  <CardContent className="p-6 text-center">
                    <TrendingUp className="h-12 w-12 mx-auto text-success mb-4" />
                    <h3 className="font-semibold mb-2">Revenue Analytics</h3>
                    <p className="text-sm text-muted-foreground">Financial performance metrics</p>
                  </CardContent>
                </Card>
                <Card className="cursor-pointer hover-lift" onClick={() => handleQuickAction('user_analytics')}>
                  <CardContent className="p-6 text-center">
                    <Users className="h-12 w-12 mx-auto text-accent mb-4" />
                    <h3 className="font-semibold mb-2">User Analytics</h3>
                    <p className="text-sm text-muted-foreground">User behavior and engagement</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Platform Settings</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>System Configuration</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button variant="outline" className="w-full justify-start" onClick={() => handleQuickAction('kit_templates')}>
                      <Package className="h-4 w-4 mr-2" />
                      Manage Kit Templates
                    </Button>
                    <Button variant="outline" className="w-full justify-start" onClick={() => handleQuickAction('product_catalog')}>
                      <Star className="h-4 w-4 mr-2" />
                      Product Catalog
                    </Button>
                    <Button variant="outline" className="w-full justify-start" onClick={() => handleQuickAction('system_thresholds')}>
                      <Target className="h-4 w-4 mr-2" />
                      System Thresholds
                    </Button>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Feature Controls</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button variant="outline" className="w-full justify-start" onClick={() => handleQuickAction('beta_features')}>
                      <Upload className="h-4 w-4 mr-2" />
                      Beta Features
                    </Button>
                    <Button variant="outline" className="w-full justify-start" onClick={() => handleQuickAction('ai_tracking')}>
                      <Activity className="h-4 w-4 mr-2" />
                      AI Route Tracking
                    </Button>
                    <Button variant="outline" className="w-full justify-start" onClick={() => handleQuickAction('delivery_zones')}>
                      <MapPin className="h-4 w-4 mr-2" />
                      Delivery Zones
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Add other tab contents as needed */}
          {!["overview", "vendors", "suppliers", "analytics", "settings"].includes(activeTab) && (
            <div className="flex items-center justify-center h-96">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
                  <Settings className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold">Section Under Development</h3>
                <p className="text-muted-foreground">
                  The {sidebarItems.find(item => item.id === activeTab)?.label} section is currently being built.
                </p>
                <Button onClick={() => handleQuickAction(`develop_${activeTab}`)}>
                  Request Development
                </Button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
