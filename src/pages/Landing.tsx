import { 
  ArrowRight, Users, Truck, ShieldCheck, Package, 
  Bot, Calendar, MapPin, MessageCircle, Zap, Globe,
  CheckCircle, Star, Play, Download, QrCode,
  Clock, Heart, Award, TrendingUp, Menu, X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageSelector } from "@/components/LanguageSelector";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import heroVendorImage from "@/assets/hero-vendor-delivery.jpg";
import subscriptionKitsImage from "@/assets/subscription-kits.jpg";
import howItWorksImage from "@/assets/how-it-works.jpg";

const getFeatures = (t: (key: string) => string) => [
  {
    icon: Bot,
    title: t('features.aiRecommendations'),
    description: t('features.aiRecommendationsDesc')
  },
  {
    icon: Calendar,
    title: t('features.festivalKits'),
    description: t('features.festivalKitsDesc')
  },
  {
    icon: Package,
    title: t('features.subscriptions'),
    description: t('features.subscriptionsDesc')
  },
  {
    icon: Truck,
    title: t('features.delivery'),
    description: t('features.deliveryDesc')
  },
  {
    icon: MessageCircle,
    title: t('features.support'),
    description: t('features.supportDesc')
  },
  {
    icon: Zap,
    title: t('features.topUp'),
    description: t('features.topUpDesc')
  },
  {
    icon: Globe,
    title: t('features.multiLang'),
    description: t('features.multiLangDesc')
  },
  {
    icon: Heart,
    title: t('features.darkMode'),
    description: t('features.darkModeDesc')
  }
];

const getHowItWorksSteps = (t: (key: string) => string) => [
  {
    step: "01",
    icon: Users,
    title: t('howItWorks.step1'),
    description: t('howItWorks.step1Desc')
  },
  {
    step: "02",
    icon: Package,
    title: t('howItWorks.step2'),
    description: t('howItWorks.step2Desc')
  },
  {
    step: "03",
    icon: Calendar,
    title: t('howItWorks.step3'),
    description: t('howItWorks.step3Desc')
  },
  {
    step: "04",
    icon: Truck,
    title: t('howItWorks.step4'),
    description: t('howItWorks.step4Desc')
  },
  {
    step: "05",
    icon: TrendingUp,
    title: t('howItWorks.step5'),
    description: t('howItWorks.step5Desc')
  }
];

const getSubscriptionKits = (t: (key: string) => string) => [
  {
    name: t('kit.chatori'),
    description: t('kit.chatoriDesc'),
    price: "₹299/day",
    ingredients: ["Sev", "Chutneys", "Papadis", "Spices"],
    badge: t('subscriptionKits.mostPopular')
  },
  {
    name: t('kit.nashta'),
    description: t('kit.nashtaDesc'),
    price: "₹199/day",
    ingredients: ["Bread", "Eggs", "Vegetables", "Oil"],
    badge: t('subscriptionKits.bestValue')
  },
  {
    name: t('kit.chai'),
    description: t('kit.chaiDesc'),
    price: "₹149/day",
    ingredients: ["Tea Leaves", "Milk", "Sugar", "Spices"],
    badge: t('subscriptionKits.new')
  }
];

const testimonials = [
  {
    name: "Rajesh Kumar",
    location: "Delhi",
    image: "/placeholder.svg",
    rating: 5,
    quote: "StreetLy ne mera business badal diya! Ab main cooking pe focus kar sakta hun."
  },
  {
    name: "Priya Sharma",
    location: "Mumbai",
    image: "/placeholder.svg",
    rating: 5,
    quote: "Fresh ingredients, on-time delivery. My customers love the consistent quality!"
  },
  {
    name: "Mustafa Ali",
    location: "Kolkata",
    image: "/placeholder.svg",
    rating: 5,
    quote: "The AI suggestions helped me introduce new items that became bestsellers."
  }
];

export const Landing = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { t } = useLanguage();
  
  const features = getFeatures(t);
  const howItWorksSteps = getHowItWorksSteps(t);
  const subscriptionKits = getSubscriptionKits(t);

  return (
    <div className="min-h-screen bg-background">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg gradient-warm flex items-center justify-center">
                <Package className="h-5 w-5 text-white" />
              </div>
              <div className="text-2xl font-bold gradient-primary bg-clip-text text-transparent">
                StreetLy
              </div>
            </div>
            <Badge variant="outline" className="text-xs bg-accent/10 text-accent border-accent/20 hidden sm:block">
              Smart Kit Ordering
            </Badge>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <a href="#home" className="text-sm font-medium hover:text-primary transition-colors">{t('nav.home')}</a>
            <a href="#how-it-works" className="text-sm font-medium hover:text-primary transition-colors">{t('nav.howItWorks')}</a>
            <a href="#subscription-kits" className="text-sm font-medium hover:text-primary transition-colors">{t('nav.subscriptionKits')}</a>
            <a href="#track-orders" className="text-sm font-medium hover:text-primary transition-colors">{t('nav.trackOrders')}</a>
            <a href="#contact" className="text-sm font-medium hover:text-primary transition-colors">{t('nav.contact')}</a>
          </nav>

          {/* Right Side Controls */}
          <div className="flex items-center space-x-2">
            <div className="hidden sm:flex items-center space-x-2">
              <LanguageSelector />
              <ThemeToggle />
            </div>
            <div className="hidden md:flex items-center space-x-2">
              <Button variant="ghost" size="sm" onClick={() => navigate('/auth')}>{t('nav.login')}</Button>
              <Button size="sm" className="gap-2" onClick={() => navigate('/auth')}>
                {t('nav.register')}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
            
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t bg-background">
            <div className="container px-4 py-4 space-y-4">
              <div className="flex items-center justify-between mb-4">
                <LanguageSelector />
                <ThemeToggle />
              </div>
              <nav className="space-y-3">
                <a href="#home" className="block text-sm font-medium hover:text-primary transition-colors">{t('nav.home')}</a>
                <a href="#how-it-works" className="block text-sm font-medium hover:text-primary transition-colors">{t('nav.howItWorks')}</a>
                <a href="#subscription-kits" className="block text-sm font-medium hover:text-primary transition-colors">{t('nav.subscriptionKits')}</a>
                <a href="#track-orders" className="block text-sm font-medium hover:text-primary transition-colors">{t('nav.trackOrders')}</a>
                <a href="#contact" className="block text-sm font-medium hover:text-primary transition-colors">{t('nav.contact')}</a>
              </nav>
              <div className="flex flex-col space-y-2 pt-4 border-t">
                <Button variant="ghost" size="sm" onClick={() => navigate('/auth')}>{t('nav.login')}</Button>
                <Button size="sm" className="gap-2" onClick={() => navigate('/auth')}>
                  {t('nav.register')}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section id="home" className="container px-4 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                {t('hero.title')}{" "}
                <span className="gradient-warm bg-clip-text text-transparent">
                  {t('hero.titleHighlight')}
                </span>
              </h1>
              <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-2xl">
                {t('hero.subtitle')}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="xl" className="gap-2 shadow-warm hover:shadow-glow" onClick={() => navigate('/subscriptions')}>
                {t('hero.subscribeNow')}
                <ArrowRight className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="xl" className="gap-2" onClick={() => navigate('/marketplace')}>
                <Play className="h-5 w-5" />
                {t('hero.exploreKits')}
              </Button>
            </div>
          </div>
          <div className="relative">
            <img 
              src={heroVendorImage} 
              alt="Happy street vendor receiving fresh ingredient delivery" 
              className="w-full rounded-2xl shadow-warm hover-lift"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent rounded-2xl" />
            <div className="absolute bottom-4 left-4 right-4">
              <Card className="bg-background/90 backdrop-blur">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium">{t('hero.deliveryStatus')}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features Highlights */}
      <section className="bg-muted/30 py-16 lg:py-24">
        <div className="container px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              {t('features.title')} <span className="gradient-primary bg-clip-text text-transparent">StreetLy</span>?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('features.subtitle')}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="hover-lift shadow-card group cursor-pointer">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-xl gradient-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm">{feature.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 lg:py-24">
        <div className="container px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">{t('howItWorks.title')}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('howItWorks.subtitle')}
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-8">
            {howItWorksSteps.map((step, index) => (
              <div key={index} className="text-center space-y-4 group">
                <div className="relative">
                  <div className="w-20 h-20 mx-auto bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold shadow-warm group-hover:scale-110 transition-transform">
                    {step.step}
                  </div>
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full gradient-warm flex items-center justify-center">
                    <step.icon className="h-4 w-4 text-white" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold">{step.title}</h3>
                <p className="text-muted-foreground text-sm">{step.description}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <img 
              src={howItWorksImage} 
              alt="How StreetLy works process" 
              className="mx-auto rounded-2xl shadow-card max-w-4xl w-full"
            />
          </div>
        </div>
      </section>

      {/* Testimonials Carousel */}
      <section className="bg-muted/30 py-16 lg:py-24">
        <div className="container px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">{t('testimonials.title')}</h2>
            <p className="text-lg text-muted-foreground">
              {t('testimonials.subtitle')}
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover-lift shadow-card">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-warning text-warning" />
                    ))}
                  </div>
                  <blockquote className="text-foreground mb-4 italic">
                    "{testimonial.quote}"
                  </blockquote>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.location}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Subscription Section */}
      <section id="subscription-kits" className="py-16 lg:py-24">
        <div className="container px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">{t('subscriptionKits.title')}</h2>
            <p className="text-lg text-muted-foreground">
              {t('subscriptionKits.subtitle')}
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {subscriptionKits.map((kit, index) => (
              <Card key={index} className="hover-lift shadow-card relative overflow-hidden group">
                {kit.badge && (
                  <Badge className="absolute top-4 right-4 z-10">{kit.badge}</Badge>
                )}
                <div className="h-48 overflow-hidden">
                  <img 
                    src={subscriptionKitsImage} 
                    alt={kit.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">{kit.name}</h3>
                  <p className="text-muted-foreground mb-4">{kit.description}</p>
                  <div className="text-2xl font-bold text-primary mb-4">{kit.price}</div>
                  <div className="space-y-2 mb-6">
                    <div className="text-sm font-medium">{t('subscriptionKits.includes')}</div>
                    <div className="flex flex-wrap gap-2">
                      {kit.ingredients.map((ingredient, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {ingredient}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Button className="w-full" onClick={() => navigate('/subscriptions')}>{t('hero.subscribeNow')}</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>


      {/* Call to Action Section */}
      <section className="gradient-warm py-16 lg:py-24">
        <div className="container px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-6 text-white">
            <h2 className="text-3xl lg:text-5xl font-bold">
              {t('cta.title')}
            </h2>
            <p className="text-lg lg:text-xl opacity-90">
              {t('cta.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="xl" variant="secondary" className="gap-2 shadow-glow" onClick={() => navigate('/auth')}>
                {t('cta.getStarted')}
                <ArrowRight className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="xl" className="bg-white/10 border-white/20 text-white hover:bg-white/20" onClick={() => navigate('/auth')}>
                {t('cta.registerFree')}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t py-12">
        <div className="container px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-lg gradient-warm flex items-center justify-center">
                  <Package className="h-5 w-5 text-white" />
                </div>
                <div className="text-xl font-bold gradient-primary bg-clip-text text-transparent">
                  StreetLy
                </div>
              </div>
              <p className="text-muted-foreground text-sm">
                {t('footer.description')}
              </p>
              <div className="flex items-center space-x-2">
                <LanguageSelector />
                <ThemeToggle />
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">{t('footer.quickLinks')}</h3>
              <div className="space-y-2 text-sm">
                <a href="#about" className="text-muted-foreground hover:text-primary transition-colors block">About</a>
                <a href="#contact" className="text-muted-foreground hover:text-primary transition-colors block">Contact</a>
                <a href="#privacy" className="text-muted-foreground hover:text-primary transition-colors block">Privacy</a>
                <a href="#terms" className="text-muted-foreground hover:text-primary transition-colors block">Terms</a>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">{t('footer.forVendors')}</h3>
              <div className="space-y-2 text-sm">
                <a href="#kits" className="text-muted-foreground hover:text-primary transition-colors block">Browse Kits</a>
                <a href="#pricing" className="text-muted-foreground hover:text-primary transition-colors block">Pricing</a>
                <a href="#support" className="text-muted-foreground hover:text-primary transition-colors block">Support</a>
                <a href="#app" className="text-muted-foreground hover:text-primary transition-colors block">Mobile App</a>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">{t('footer.connect')}</h3>
              <div className="space-y-2 text-sm">
                <a href="#facebook" className="text-muted-foreground hover:text-primary transition-colors block">Facebook</a>
                <a href="#instagram" className="text-muted-foreground hover:text-primary transition-colors block">Instagram</a>
                <a href="#twitter" className="text-muted-foreground hover:text-primary transition-colors block">Twitter</a>
                <a href="#youtube" className="text-muted-foreground hover:text-primary transition-colors block">YouTube</a>
              </div>
            </div>
          </div>
          
          <div className="border-t mt-8 pt-8 text-center text-muted-foreground text-sm">
            <p>{t('footer.copyright')}</p>
          </div>
        </div>
      </footer>
    </div>
  );
};