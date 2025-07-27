import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Package, 
  RotateCcw, 
  Wallet, 
  TrendingUp, 
  ShoppingCart, 
  Clock,
  DollarSign,
  Users
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

const statsData = [
  {
    title: "Total Orders",
    value: "247",
    change: "+12%",
    trend: "up",
    icon: Package,
    timeframe: "This Week",
    color: "text-primary"
  },
  {
    title: "Active Subscriptions", 
    value: "8",
    change: "+2",
    trend: "up",
    icon: RotateCcw,
    timeframe: "Currently",
    color: "text-success"
  },
  {
    title: "Wallet Balance",
    value: "₹4,250",
    change: "+₹890",
    trend: "up", 
    icon: Wallet,
    timeframe: "Available",
    color: "text-accent"
  },
  {
    title: "Monthly Revenue",
    value: "₹32,400",
    change: "+18%",
    trend: "up",
    icon: DollarSign,
    timeframe: "This Month",
    color: "text-warning"
  }
];

const popularKits = [
  { name: "Chaat Special Kit", orders: 45, percentage: 85 },
  { name: "Samosa Starter Kit", orders: 32, percentage: 65 },
  { name: "Dosa Master Kit", orders: 28, percentage: 55 },
  { name: "Pav Bhaji Deluxe", orders: 22, percentage: 45 }
];

export const DashboardStatsGrid = () => {
  return (
    <div className="space-y-6">
      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {statsData.map((stat) => (
          <Card key={stat.title} className="hover-lift shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Badge 
                  variant="outline" 
                  className="bg-success/10 text-success border-success/20"
                >
                  <TrendingUp className="h-3 w-3 mr-1" />
                  {stat.change}
                </Badge>
                <span>{stat.timeframe}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Popular Kits Section */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5 text-primary" />
              Most Ordered Kits
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {popularKits.map((kit, index) => (
              <div key={kit.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{kit.name}</span>
                    <Badge variant="outline" className="text-xs">
                      {kit.orders} orders
                    </Badge>
                  </div>
                  <span className="text-sm text-muted-foreground">{kit.percentage}%</span>
                </div>
                <Progress value={kit.percentage} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-accent" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-3 p-2 bg-accent/5 rounded-lg">
              <div className="h-2 w-2 bg-success rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">New order received</p>
                <p className="text-xs text-muted-foreground">Chaat Kit - ₹850</p>
              </div>
              <span className="text-xs text-muted-foreground">2m ago</span>
            </div>
            <div className="flex items-center gap-3 p-2 bg-accent/5 rounded-lg">
              <div className="h-2 w-2 bg-primary rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Subscription renewed</p>
                <p className="text-xs text-muted-foreground">Weekly Premium Kit</p>
              </div>
              <span className="text-xs text-muted-foreground">1h ago</span>
            </div>
            <div className="flex items-center gap-3 p-2 bg-accent/5 rounded-lg">
              <div className="h-2 w-2 bg-warning rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Low stock alert</p>
                <p className="text-xs text-muted-foreground">Onion supply running low</p>
              </div>
              <span className="text-xs text-muted-foreground">3h ago</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};