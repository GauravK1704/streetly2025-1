import { useState } from "react";
import { Header } from "@/components/Header";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain, TrendingUp, TrendingDown, AlertTriangle, Lightbulb, Target, Zap, BarChart3 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SupplierAIInsights = () => {
  const { toast } = useToast();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const insights = [
    {
      id: 1,
      type: "demand-forecast",
      title: "High Demand Predicted for Biryani Kits",
      description: "AI predicts 40% increase in biryani kit demand next week due to upcoming festival season.",
      impact: "high",
      action: "Increase stock for rice, saffron, and biryani masala",
      confidence: 94,
      icon: TrendingUp
    },
    {
      id: 2,
      type: "price-optimization",
      title: "Price Adjustment Recommended",
      description: "Consider reducing tomato prices by 8% to match market rates and increase sales volume.",
      impact: "medium",
      action: "Update pricing strategy for vegetables",
      confidence: 87,
      icon: Target
    },
    {
      id: 3,
      type: "stock-alert",
      title: "Stock Shortage Risk Detected",
      description: "Low stock levels for turmeric powder may cause supply issues in next 3 days.",
      impact: "high",
      action: "Reorder turmeric powder immediately",
      confidence: 96,
      icon: AlertTriangle
    },
    {
      id: 4,
      type: "trend-analysis",
      title: "Regional Preference Shift",
      description: "South Indian kits showing 25% growth in North India markets.",
      impact: "medium",
      action: "Expand South Indian kit distribution",
      confidence: 82,
      icon: BarChart3
    }
  ];

  const recommendations = [
    {
      title: "Optimize Delivery Routes",
      description: "AI suggests route changes to reduce delivery time by 15%",
      savings: "₹12,000/month",
      effort: "Low"
    },
    {
      title: "Bundle Popular Items",
      description: "Create combo packs for frequently ordered together items",
      savings: "₹8,500/month",
      effort: "Medium"
    },
    {
      title: "Seasonal Inventory Planning",
      description: "Adjust stock levels based on seasonal demand patterns",
      savings: "₹15,200/month",
      effort: "Low"
    }
  ];

  const getImpactBadge = (impact: string) => {
    switch (impact) {
      case 'high': return <Badge variant="destructive">High Impact</Badge>;
      case 'medium': return <Badge variant="outline">Medium Impact</Badge>;
      case 'low': return <Badge variant="secondary">Low Impact</Badge>;
      default: return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'text-destructive';
      case 'medium': return 'text-warning';
      case 'low': return 'text-success';
      default: return 'text-muted-foreground';
    }
  };

  const handleRefreshInsights = async () => {
    setIsRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setIsRefreshing(false);
      toast({
        title: "Insights Refreshed",
        description: "AI insights have been updated with latest data.",
      });
    }, 2000);
  };

  const handleGenerateReport = () => {
    toast({
      title: "Generating Report",
      description: "AI insights report will be ready in a few minutes.",
    });
  };

  const handleApplyInsight = (insight: any) => {
    toast({
      title: "Insight Applied",
      description: `Applied recommendation: ${insight.title}`,
    });
  };

  const handleViewDetails = (insight: any) => {
    toast({
      title: "Insight Details",
      description: `Viewing detailed analysis for: ${insight.title}`,
    });
  };

  const handleImplementRecommendation = (rec: any) => {
    toast({
      title: "Implementation Started",
      description: `Started implementing: ${rec.title}`,
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
                  AI Insights Dashboard
                </h1>
                <p className="text-muted-foreground mt-1">
                  Smart recommendations powered by machine learning
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={handleRefreshInsights} disabled={isRefreshing}>
                  <Zap className="h-4 w-4 mr-2" />
                  {isRefreshing ? "Refreshing..." : "Refresh Insights"}
                </Button>
                <Button variant="vibrant" onClick={handleGenerateReport}>
                  <Brain className="h-4 w-4 mr-2" />
                  Generate Report
                </Button>
              </div>
            </div>

            {/* AI Insights Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="shadow-card">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2">
                    <Brain className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-2xl font-bold">24</p>
                      <p className="text-sm text-muted-foreground">Active Insights</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="shadow-card">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-success" />
                    <div>
                      <p className="text-2xl font-bold">₹45K</p>
                      <p className="text-sm text-muted-foreground">Potential Savings</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="shadow-card">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-warning" />
                    <div>
                      <p className="text-2xl font-bold">92%</p>
                      <p className="text-sm text-muted-foreground">Prediction Accuracy</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Key Insights */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-primary" />
                  Key AI Insights
                  <Badge variant="outline" className="ml-auto">
                    {insights.length} insights
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {insights.map((insight) => (
                    <div key={insight.id} className="flex items-start justify-between p-4 bg-accent/5 rounded-lg border border-accent/20 hover-lift transition-smooth">
                      <div className="flex gap-3 flex-1">
                        <insight.icon className={`h-5 w-5 mt-1 ${getImpactColor(insight.impact)}`} />
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold">{insight.title}</h3>
                            {getImpactBadge(insight.impact)}
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{insight.description}</p>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">
                              {insight.confidence}% confidence
                            </Badge>
                            <span className="text-xs text-muted-foreground">Action: {insight.action}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => handleViewDetails(insight)}>
                          Details
                        </Button>
                        <Button size="sm" variant="vibrant" onClick={() => handleApplyInsight(insight)}>
                          Apply
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* AI Recommendations */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  Optimization Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {recommendations.map((rec, index) => (
                    <div key={index} className="p-4 bg-accent/5 rounded-lg border border-accent/20 hover-lift transition-smooth">
                      <h3 className="font-semibold mb-2">{rec.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{rec.description}</p>
                      <div className="flex items-center justify-between mb-3">
                        <Badge variant="outline" className="text-xs">
                          {rec.effort} Effort
                        </Badge>
                        <span className="text-sm font-semibold text-success">{rec.savings}</span>
                      </div>
                      <Button size="sm" variant="vibrant" className="w-full" onClick={() => handleImplementRecommendation(rec)}>
                        Implement
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Market Intelligence */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  Market Intelligence
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Trending Ingredients</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Organic Turmeric</span>
                        <Badge variant="secondary">+15%</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Quinoa</span>
                        <Badge variant="secondary">+12%</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Coconut Oil</span>
                        <Badge variant="secondary">+8%</Badge>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Regional Demand</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Mumbai - Street Food Kits</span>
                        <Badge variant="outline">High</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Delhi - Breakfast Kits</span>
                        <Badge variant="outline">Medium</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Bangalore - Health Kits</span>
                        <Badge variant="outline">High</Badge>
                      </div>
                    </div>
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

export default SupplierAIInsights;