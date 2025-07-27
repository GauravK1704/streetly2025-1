import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  BarChart3, 
  PieChart, 
  TrendingUp, 
  Package, 
  CheckCircle, 
  RotateCcw,
  DollarSign,
  AlertCircle,
  Clock
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Cell, Pie } from 'recharts';

const dailyDispatchData = [
  { day: 'Mon', dispatches: 45 },
  { day: 'Tue', dispatches: 52 },
  { day: 'Wed', dispatches: 38 },
  { day: 'Thu', dispatches: 61 },
  { day: 'Fri', dispatches: 55 },
  { day: 'Sat', dispatches: 67 },
  { day: 'Sun', dispatches: 43 },
];

const categoryData = [
  { name: 'Vegetables', value: 35, color: 'hsl(var(--success))' },
  { name: 'Spices', value: 25, color: 'hsl(var(--primary))' },
  { name: 'Dairy', value: 20, color: 'hsl(var(--accent))' },
  { name: 'Grains', value: 15, color: 'hsl(var(--warning))' },
  { name: 'Others', value: 5, color: 'hsl(var(--muted-foreground))' },
];

const recentActivity = [
  { 
    id: 1, 
    action: "New order received", 
    details: "Chaat Kit - 15 units", 
    time: "2 min ago", 
    type: "order",
    amount: "₹2,250"
  },
  { 
    id: 2, 
    action: "Stock alert", 
    details: "Onions running low (< 10kg)", 
    time: "15 min ago", 
    type: "alert",
    amount: null
  },
  { 
    id: 3, 
    action: "Payment received", 
    details: "Mumbai Street Foods", 
    time: "1 hour ago", 
    type: "payment",
    amount: "₹3,400"
  },
  { 
    id: 4, 
    action: "Kit delivered", 
    details: "Samosa Kit to Delhi vendor", 
    time: "2 hours ago", 
    type: "delivery",
    amount: "₹1,800"
  },
];

export const SupplierAnalytics = () => {
  const dashboardStats = [
    {
      title: "Daily Collection",
      value: "₹24,680",
      change: "+12.5%",
      period: "Today",
      icon: DollarSign,
      color: "text-success"
    },
    {
      title: "Pending Orders",
      value: "18",
      change: "+3",
      period: "Awaiting dispatch",
      icon: Package,
      color: "text-warning"
    },
    {
      title: "Fulfilled Orders",
      value: "127",
      change: "+8.2%",
      period: "This week",
      icon: CheckCircle,
      color: "text-primary"
    },
    {
      title: "Returns/Exchanges",
      value: "3",
      change: "-2",
      period: "This month",
      icon: RotateCcw,
      color: "text-destructive"
    },
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'order':
        return <Package className="h-4 w-4 text-primary" />;
      case 'alert':
        return <AlertCircle className="h-4 w-4 text-warning" />;
      case 'payment':
        return <DollarSign className="h-4 w-4 text-success" />;
      case 'delivery':
        return <CheckCircle className="h-4 w-4 text-accent" />;
      default:
        return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {dashboardStats.map((stat) => (
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
                <span>{stat.period}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Daily Dispatches Chart */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              Daily Kit Dispatches
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dailyDispatchData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--popover))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: 'var(--radius)'
                  }}
                />
                <Bar dataKey="dispatches" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Product Category Distribution */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5 text-accent" />
              Product Category Contribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <ResponsiveContainer width="60%" height={250}>
                <RechartsPieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--popover))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: 'var(--radius)'
                    }}
                  />
                </RechartsPieChart>
              </ResponsiveContainer>
              <div className="flex-1 space-y-2">
                {categoryData.map((category, index) => (
                  <div key={category.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: category.color }}
                      />
                      <span className="text-sm">{category.name}</span>
                    </div>
                    <span className="text-sm font-medium">{category.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-accent" />
            Recent Activity & Notifications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-3 bg-accent/5 rounded-lg border border-accent/20">
                <div className="flex items-center gap-3">
                  {getActivityIcon(activity.type)}
                  <div>
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.details}</p>
                  </div>
                </div>
                <div className="text-right">
                  {activity.amount && (
                    <p className="text-sm font-bold text-success">{activity.amount}</p>
                  )}
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};