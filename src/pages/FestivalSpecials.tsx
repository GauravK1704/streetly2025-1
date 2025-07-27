import { useState } from "react";
import { Header } from "@/components/Header";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Sparkles,
  Calendar,
  Clock,
  ShoppingCart,
  Star,
  Gift,
  Zap,
  Heart,
  Users
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

const festivalKits = [
  {
    id: 1,
    name: "Diwali Celebration Kit",
    description: "Everything needed for the perfect Diwali feast",
    price: "₹1,899",
    originalPrice: "₹2,499",
    discount: "24% OFF",
    rating: 4.9,
    reviews: 345,
    emoji: "🪔",
    timeLeft: "5 days left",
    stock: 85,
    totalStock: 100,
    popular: true,
    features: ["Sweets Mix", "Decorative Items", "Premium Spices", "Recipe Cards"],
    colors: "from-yellow-400 to-orange-500"
  },
  {
    id: 2,
    name: "Holi Colors Kit",
    description: "Organic colors and festive snacks",
    price: "₹899",
    originalPrice: "₹1,199",
    discount: "25% OFF",
    rating: 4.7,
    reviews: 189,
    emoji: "🌈",
    timeLeft: "12 days left",
    stock: 42,
    totalStock: 80,
    popular: false,
    features: ["Natural Colors", "Gujiya Mix", "Thandai Ingredients", "Safety Guide"],
    colors: "from-pink-400 to-purple-500"
  },
  {
    id: 3,
    name: "Eid Special Kit",
    description: "Traditional Eid delicacies and ingredients",
    price: "₹1,599",
    originalPrice: "₹2,099",
    discount: "20% OFF",
    rating: 4.8,
    reviews: 267,
    emoji: "🌙",
    timeLeft: "8 days left",
    stock: 67,
    totalStock: 90,
    popular: true,
    features: ["Dates Variety", "Biryani Essentials", "Seviyan Mix", "Halal Certified"],
    colors: "from-green-400 to-blue-500"
  },
  {
    id: 4,
    name: "Ganesh Chaturthi Kit",
    description: "Modak and celebration essentials",
    price: "₹1,299",
    originalPrice: "₹1,699",
    discount: "15% OFF",
    rating: 4.6,
    reviews: 156,
    emoji: "🐘",
    timeLeft: "15 days left",
    stock: 73,
    totalStock: 100,
    popular: false,
    features: ["Modak Flour", "Coconut Mix", "Decorations", "Aarti Items"],
    colors: "from-orange-400 to-red-500"
  },
  {
    id: 5,
    name: "Christmas Special Kit",
    description: "Holiday baking and celebration kit",
    price: "₹1,799",
    originalPrice: "₹2,299",
    discount: "22% OFF",
    rating: 4.5,
    reviews: 98,
    emoji: "🎄",
    timeLeft: "45 days left",
    stock: 56,
    totalStock: 75,
    popular: false,
    features: ["Cake Mix", "Decorations", "Plum Cake Ingredients", "Cookie Cutters"],
    colors: "from-red-500 to-green-500"
  },
  {
    id: 6,
    name: "Navratri Fasting Kit",
    description: "Vrat-friendly ingredients and recipes",
    price: "₹999",
    originalPrice: "₹1,299",
    discount: "18% OFF",
    rating: 4.7,
    reviews: 234,
    emoji: "🕉️",
    timeLeft: "20 days left",
    stock: 81,
    totalStock: 120,
    popular: true,
    features: ["Fasting Flour", "Rock Salt", "Special Spices", "Recipe Guide"],
    colors: "from-purple-400 to-pink-500"
  }
];

const upcomingFestivals = [
  { name: "Karva Chauth", date: "Nov 1, 2024", status: "coming-soon" },
  { name: "Dhanteras", date: "Nov 10, 2024", status: "pre-order" },
  { name: "Bhai Dooj", date: "Nov 15, 2024", status: "coming-soon" },
];

export const FestivalSpecials = () => {
  const [favorites, setFavorites] = useState<number[]>([]);

  const toggleFavorite = (kitId: number) => {
    setFavorites(prev => 
      prev.includes(kitId) 
        ? prev.filter(id => id !== kitId)
        : [...prev, kitId]
    );
  };

  const addToCart = (kitName: string) => {
    toast({
      title: "Added to Cart",
      description: `${kitName} has been added to your cart`,
    });
  };

  const preOrder = (kitName: string) => {
    toast({
      title: "Pre-order Placed",
      description: `You'll be notified when ${kitName} is available`,
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
                <h1 className="text-3xl font-bold flex items-center gap-2">
                  <Sparkles className="h-8 w-8 text-primary" />
                  Festival Specials
                </h1>
                <p className="text-muted-foreground mt-1">
                  Celebrate every festival with our special ingredient kits
                </p>
              </div>
              <Button variant="vibrant">
                <ShoppingCart className="h-4 w-4 mr-2" />
                View Cart
              </Button>
            </div>

            {/* Upcoming Festivals */}
            <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Upcoming Festivals
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {upcomingFestivals.map((festival, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
                      <div>
                        <h4 className="font-semibold">{festival.name}</h4>
                        <p className="text-sm text-muted-foreground">{festival.date}</p>
                      </div>
                      <Button 
                        size="sm" 
                        variant={festival.status === 'pre-order' ? 'vibrant' : 'outline'}
                        onClick={() => festival.status === 'pre-order' && preOrder(festival.name)}
                      >
                        {festival.status === 'pre-order' ? 'Pre-order' : 'Notify Me'}
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Featured Kits Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {festivalKits.map((kit) => (
                <Card key={kit.id} className="group hover-lift shadow-card overflow-hidden">
                  <div className={`h-2 bg-gradient-to-r ${kit.colors}`} />
                  <CardHeader className="relative">
                    <div className="flex items-start justify-between">
                      <div className="text-4xl mb-2">{kit.emoji}</div>
                      <div className="flex gap-2">
                        {kit.popular && (
                          <Badge variant="default" className="bg-primary">
                            <Sparkles className="h-3 w-3 mr-1" />
                            Popular
                          </Badge>
                        )}
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => toggleFavorite(kit.id)}
                          className="h-8 w-8"
                        >
                          <Heart
                            className={`h-4 w-4 ${
                              favorites.includes(kit.id) 
                                ? 'fill-red-500 text-red-500' 
                                : 'text-muted-foreground'
                            }`}
                          />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <CardTitle className="text-lg">{kit.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{kit.description}</p>
                      
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium text-sm">{kit.rating}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">({kit.reviews} reviews)</span>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">{kit.reviews}+ sold</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-warning" />
                      <span className="text-sm font-medium text-warning">{kit.timeLeft}</span>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Stock remaining</span>
                        <span className="font-medium">{kit.stock}/{kit.totalStock}</span>
                      </div>
                      <Progress value={(kit.stock / kit.totalStock) * 100} className="h-2" />
                    </div>

                    <div className="space-y-2">
                      <p className="text-sm font-medium">Includes:</p>
                      <div className="flex flex-wrap gap-1">
                        {kit.features.map((feature, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-bold text-primary">{kit.price}</span>
                          <Badge variant="destructive" className="text-xs">
                            {kit.discount}
                          </Badge>
                        </div>
                        <span className="text-sm text-muted-foreground line-through">
                          {kit.originalPrice}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Gift className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="vibrant" 
                          size="sm"
                          onClick={() => addToCart(kit.name)}
                          className="gap-1"
                        >
                          <Zap className="h-4 w-4" />
                          Order Now
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Special Offer Banner */}
            <Card className="bg-gradient-to-r from-primary to-accent text-white">
              <CardContent className="p-8 text-center">
                <Sparkles className="h-12 w-12 mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-2">Festival Season Special!</h2>
                <p className="text-lg mb-4">
                  Order any 2 festival kits and get FREE delivery + 10% extra discount
                </p>
                <Button variant="secondary" size="lg">
                  <Gift className="h-5 w-5 mr-2" />
                  Claim Offer
                </Button>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </div>
  );
};