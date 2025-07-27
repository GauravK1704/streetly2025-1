import { useState } from "react";
import { Header } from "@/components/Header";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { 
  Calendar,
  Package,
  Edit3,
  Pause,
  Play,
  Trash2,
  Plus,
  Clock,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

const activeSubscriptions = [
  {
    id: 1,
    name: "Daily Chaat Kit",
    description: "Fresh ingredients for street-style chaat",
    frequency: "Daily",
    nextDelivery: "Tomorrow, 8:00 AM",
    price: "₹450/day",
    status: "active",
    deliveryDays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    items: ["Sev", "Chutneys", "Masalas", "Vegetables"]
  },
  {
    id: 2,
    name: "Weekend Special Kit",
    description: "Premium ingredients for weekend specials",
    frequency: "Weekly",
    nextDelivery: "Saturday, 10:00 AM",
    price: "₹850/week",
    status: "active",
    deliveryDays: ["Sat", "Sun"],
    items: ["Premium Flour", "Ghee", "Spices", "Paneer"]
  },
  {
    id: 3,
    name: "Festival Preparation Kit",
    description: "Seasonal festival ingredients",
    frequency: "Monthly",
    nextDelivery: "Paused",
    price: "₹1200/month",
    status: "paused",
    deliveryDays: ["1st", "15th"],
    items: ["Sweets Mix", "Decorations", "Special Spices"]
  }
];

const subscriptionPlans = [
  {
    id: "basic",
    name: "Basic Kit",
    description: "Essential ingredients for daily operations",
    price: "₹300",
    frequency: "Daily",
    savings: "Save 15%",
    features: ["3-4 essential items", "Next-day delivery", "Basic support"]
  },
  {
    id: "premium",
    name: "Premium Kit",
    description: "Premium ingredients with extra variety",
    price: "₹500",
    frequency: "Daily",
    savings: "Save 20%",
    popular: true,
    features: ["5-6 premium items", "Same-day delivery", "Priority support", "Recipe suggestions"]
  },
  {
    id: "deluxe",
    name: "Deluxe Kit",
    description: "Everything you need for gourmet street food",
    price: "₹750",
    frequency: "Daily",
    savings: "Save 25%",
    features: ["8+ premium items", "Same-day delivery", "24/7 support", "Custom recipes", "Seasonal specials"]
  }
];

export const Subscriptions = () => {
  const { t } = useLanguage();
  const [subscriptions, setSubscriptions] = useState(activeSubscriptions);

  const toggleSubscription = (id: number) => {
    setSubscriptions(prev => prev.map(sub => 
      sub.id === id 
        ? { ...sub, status: sub.status === 'active' ? 'paused' : 'active' }
        : sub
    ));
    
    const subscription = subscriptions.find(sub => sub.id === id);
    toast({
      title: subscription?.status === 'active' ? "Subscription Paused" : "Subscription Resumed",
      description: `${subscription?.name} has been ${subscription?.status === 'active' ? 'paused' : 'resumed'}`,
    });
  };

  const deleteSubscription = (id: number) => {
    const subscription = subscriptions.find(sub => sub.id === id);
    setSubscriptions(prev => prev.filter(sub => sub.id !== id));
    toast({
      title: "Subscription Cancelled",
      description: `${subscription?.name} has been cancelled`,
      variant: "destructive"
    });
  };

  const subscribeToKit = (planName: string) => {
    toast({
      title: "Subscription Started",
      description: `You've subscribed to ${planName}`,
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
              <h1 className="text-3xl font-bold">Subscriptions</h1>
              <Button variant="vibrant">
                <Plus className="h-4 w-4 mr-2" />
                New Subscription
              </Button>
            </div>

            {/* Active Subscriptions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Active Subscriptions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {subscriptions.map((subscription) => (
                  <div key={subscription.id} className="border rounded-lg p-4 space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-lg">{subscription.name}</h3>
                          <Badge 
                            variant={subscription.status === 'active' ? 'default' : 'secondary'}
                            className={subscription.status === 'active' ? 'bg-success' : ''}
                          >
                            {subscription.status === 'active' ? (
                              <CheckCircle className="h-3 w-3 mr-1" />
                            ) : (
                              <AlertCircle className="h-3 w-3 mr-1" />
                            )}
                            {subscription.status}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground text-sm mb-2">
                          {subscription.description}
                        </p>
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>{subscription.frequency}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>{subscription.nextDelivery}</span>
                          </div>
                          <span className="font-semibold text-primary">
                            {subscription.price}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={subscription.status === 'active'}
                          onCheckedChange={() => toggleSubscription(subscription.id)}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className="text-sm font-medium">Delivery Days:</p>
                      <div className="flex gap-2">
                        {subscription.deliveryDays.map((day) => (
                          <Badge key={day} variant="outline" className="text-xs">
                            {day}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className="text-sm font-medium">Includes:</p>
                      <div className="flex flex-wrap gap-1">
                        {subscription.items.map((item, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {item}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button variant="outline" size="sm">
                        <Edit3 className="h-4 w-4 mr-1" />
                        Modify
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => toggleSubscription(subscription.id)}
                      >
                        {subscription.status === 'active' ? (
                          <>
                            <Pause className="h-4 w-4 mr-1" />
                            Pause
                          </>
                        ) : (
                          <>
                            <Play className="h-4 w-4 mr-1" />
                            Resume
                          </>
                        )}
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => deleteSubscription(subscription.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Cancel
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Available Plans */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Available Plans</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {subscriptionPlans.map((plan) => (
                  <Card 
                    key={plan.id} 
                    className={`relative ${plan.popular ? 'ring-2 ring-primary shadow-glow' : ''}`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <Badge variant="default" className="bg-primary">
                          Most Popular
                        </Badge>
                      </div>
                    )}
                    <CardHeader className="text-center">
                      <CardTitle className="text-xl">{plan.name}</CardTitle>
                      <p className="text-muted-foreground text-sm">{plan.description}</p>
                      <div className="py-4">
                        <span className="text-3xl font-bold text-primary">{plan.price}</span>
                        <span className="text-muted-foreground">/{plan.frequency.toLowerCase()}</span>
                      </div>
                      <Badge variant="outline" className="mx-auto">
                        {plan.savings}
                      </Badge>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <ul className="space-y-2">
                        {plan.features.map((feature, index) => (
                          <li key={index} className="flex items-center gap-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-success" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <Button 
                        variant={plan.popular ? "vibrant" : "outline"} 
                        className="w-full"
                        onClick={() => subscribeToKit(plan.name)}
                      >
                        Subscribe Now
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};