import { Header } from "@/components/Header";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  BarChart3,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Package,
  Users,
  Clock,
  Lightbulb,
  Download,
  Calendar
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const weeklyData = [
  { day: "Mon", usage: 85, sales: 12400, orders: 24, waste: 15 },
  { day: "Tue", usage: 92, sales: 13200, orders: 28, waste: 8 },
  { day: "Wed", usage: 78, sales: 11800, orders: 22, waste: 22 },
  { day: "Thu", usage: 95, sales: 14100, orders: 31, waste: 5 },
  { day: "Fri", usage: 88, sales: 13500, orders: 27, waste: 12 },
  { day: "Sat", usage: 96, sales: 15200, orders: 35, waste: 4 },
  { day: "Sun", usage: 82, sales: 12100, orders: 23, waste: 18 }
];

const monthlyStats = [
  { title: "Total Revenue", value: "₹3,45,600", change: "+12%", trend: "up", icon: DollarSign },
  { title: "Total Orders", value: "189", change: "+8%", trend: "up", icon: Package },
  { title: "Avg. Order Value", value: "₹1,830", change: "+15%", trend: "up", icon: TrendingUp },
  { title: "Customer Rating", value: "4.8/5", change: "+0.2", trend: "up", icon: Users }
];

const topSellingItems = [
  { name: "Samosa Kit", sales: 45, revenue: "₹38,250", percentage: 85 },
  { name: "Chaat Kit", sales: 38, revenue: "₹32,300", percentage: 72 },
  { name: "Dosa Kit", sales: 32, revenue: "₹28,500", percentage: 65 },
  { name: "Biryani Kit", sales: 28, revenue: "₹42,000", percentage: 58 },
  { name: "Pav Bhaji Kit", sales: 22, revenue: "₹15,400", percentage: 45 }
];

const aiInsights = [
  {
    type: "opportunity",
    title: "Peak Hour Optimization",
    description: "Your busiest time is 6-8 PM. Consider preparing extra Samosa Kits during this period.",
    impact: "Potential +20% revenue",
    priority: "high"
  },
  {
    type: "warning",
    title: "Ingredient Waste Alert",
    description: "Onions have 18% waste rate this week. Consider reducing portion sizes or improving storage.",
    impact: "Save ₹2,400/month",
    priority: "medium"
  },
  {
    type: "trend",
    title: "Weekend Demand Pattern",
    description: "Saturday shows highest sales. Consider special weekend menu items.",
    impact: "Potential +15% weekend sales",
    priority: "low"
  }
];

export const Analytics = () => {
  const { t } = useLanguage();
  const avgUsage = Math.round(weeklyData.reduce((acc, day) => acc + day.usage, 0) / weeklyData.length);
  const totalSales = weeklyData.reduce((acc, day) => acc + day.sales, 0);
  const totalOrders = weeklyData.reduce((acc, day) => acc + day.orders, 0);

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
              <h1 className="text-3xl font-bold">{t('analytics.title')}</h1>
              <div className="flex gap-2">
                <Select defaultValue="7days">
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7days">Last 7 days</SelectItem>
                    <SelectItem value="30days">Last 30 days</SelectItem>
                    <SelectItem value="90days">Last 90 days</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>

            {/* Monthly Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {monthlyStats.map((stat) => (
                <Card key={stat.title}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">{stat.title}</p>
                        <p className="text-2xl font-bold">{stat.value}</p>
                        <div className="flex items-center gap-1 mt-1">
                          {stat.trend === "up" ? (
                            <TrendingUp className="h-4 w-4 text-success" />
                          ) : (
                            <TrendingDown className="h-4 w-4 text-destructive" />
                          )}
                          <span className={`text-sm ${stat.trend === "up" ? "text-success" : "text-destructive"}`}>
                            {stat.change}
                          </span>
                        </div>
                      </div>
                      <stat.icon className="h-8 w-8 text-primary" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Weekly Usage Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Weekly Performance
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-success/10 rounded-lg">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-success" />
                      <span className="text-sm font-medium">Average Usage</span>
                    </div>
                    <span className="text-lg font-bold text-success">{avgUsage}%</span>
                  </div>

                  <div className="space-y-3">
                    {weeklyData.map((day) => (
                      <div key={day.day} className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-medium">{day.day}</span>
                          <div className="flex gap-4 text-xs">
                            <span>Usage: {day.usage}%</span>
                            <span>Sales: ₹{day.sales.toLocaleString()}</span>
                            <span>Orders: {day.orders}</span>
                          </div>
                        </div>
                        <div className="flex gap-1">
                          <Progress value={day.usage} className="flex-1 h-2" />
                          <div className="w-16 text-xs text-muted-foreground text-right">
                            {100 - day.usage}% waste
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <p className="text-sm text-muted-foreground">Weekly Sales</p>
                        <p className="text-lg font-bold text-primary">₹{totalSales.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Total Orders</p>
                        <p className="text-lg font-bold text-primary">{totalOrders}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Top Selling Items */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="h-5 w-5" />
                    Top Selling Items
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {topSellingItems.map((item, index) => (
                    <div key={item.name} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="w-6 h-6 rounded-full p-0 text-xs">
                            {index + 1}
                          </Badge>
                          <span className="font-medium">{item.name}</span>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold">{item.revenue}</p>
                          <p className="text-xs text-muted-foreground">{item.sales} units</p>
                        </div>
                      </div>
                      <Progress value={item.percentage} className="h-2" />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* AI Insights */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5" />
                  AI Insights & Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {aiInsights.map((insight, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${
                          insight.type === 'opportunity' ? 'bg-success' :
                          insight.type === 'warning' ? 'bg-warning' : 'bg-primary'
                        }`} />
                        <h4 className="font-semibold">{insight.title}</h4>
                      </div>
                      <Badge 
                        variant={
                          insight.priority === 'high' ? 'destructive' :
                          insight.priority === 'medium' ? 'default' : 'secondary'
                        }
                      >
                        {insight.priority} priority
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{insight.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-primary">{insight.impact}</span>
                      <Button variant="outline" size="sm">
                        Apply Suggestion
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Time-based Analytics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Peak Hours Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <Clock className="h-8 w-8 mx-auto text-primary mb-2" />
                    <h4 className="font-semibold">Peak Hour</h4>
                    <p className="text-2xl font-bold text-primary">6-8 PM</p>
                    <p className="text-sm text-muted-foreground">35% of daily sales</p>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <Calendar className="h-8 w-8 mx-auto text-success mb-2" />
                    <h4 className="font-semibold">Best Day</h4>
                    <p className="text-2xl font-bold text-success">Saturday</p>
                    <p className="text-sm text-muted-foreground">25% higher sales</p>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <TrendingUp className="h-8 w-8 mx-auto text-accent mb-2" />
                    <h4 className="font-semibold">Growth Rate</h4>
                    <p className="text-2xl font-bold text-accent">+12%</p>
                    <p className="text-sm text-muted-foreground">vs last month</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </div>
  );
};