import { BarChart3, TrendingUp, Utensils } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export const UsageStatsCard = () => {
  const weeklyStats = [
    { day: "Mon", usage: 85, leftover: 15 },
    { day: "Tue", usage: 92, leftover: 8 },
    { day: "Wed", usage: 78, leftover: 22 },
    { day: "Thu", usage: 95, leftover: 5 },
    { day: "Fri", usage: 88, leftover: 12 },
    { day: "Sat", usage: 96, leftover: 4 },
    { day: "Sun", usage: 82, leftover: 18 },
  ];

  const avgUsage = Math.round(weeklyStats.reduce((acc, day) => acc + day.usage, 0) / weeklyStats.length);

  return (
    <Card className="shadow-card hover-lift">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-primary" />
          Weekly Usage Stats
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
          {weeklyStats.map((day) => (
            <div key={day.day} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">{day.day}</span>
                <span className="text-muted-foreground">{day.usage}% used</span>
              </div>
              <div className="flex gap-1">
                <Progress value={day.usage} className="flex-1 h-2" />
                <div className="w-12 text-xs text-muted-foreground text-right">
                  {day.leftover}% left
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="p-3 bg-accent/10 rounded-lg border border-accent/20">
          <div className="flex items-center gap-2 text-accent mb-1">
            <Utensils className="h-4 w-4" />
            <span className="text-sm font-medium">AI Tip</span>
          </div>
          <p className="text-xs text-accent/80">
            Great usage pattern! Consider switching to Tuesday deliveries for fresher supplies.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};