import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, Gift, Clock, Star } from "lucide-react";

const promotions = [
  {
    id: 1,
    title: "Festival Special: 25% Off All Kits!",
    description: "Celebrate with authentic flavors. Limited time offer on all premium kits.",
    discount: "25% OFF",
    validUntil: "2024-02-15",
    category: "festival",
    gradient: "gradient-warm"
  },
  {
    id: 2,
    title: "Refer & Earn ₹500",
    description: "Invite friends to StreetLy and earn ₹500 for each successful referral.",
    reward: "₹500",
    category: "referral",
    gradient: "gradient-success"
  },
  {
    id: 3,
    title: "Premium Member Exclusive",
    description: "Free delivery on all orders above ₹999. Upgrade to premium now!",
    benefit: "Free Delivery",
    category: "premium",
    gradient: "gradient-vibrant"
  }
];

export const PromotionsBanner = () => {
  const [dismissedPromos, setDismissedPromos] = useState<number[]>([]);

  const dismissPromotion = (id: number) => {
    setDismissedPromos(prev => [...prev, id]);
  };

  const activePromotions = promotions.filter(promo => !dismissedPromos.includes(promo.id));

  if (activePromotions.length === 0) return null;

  return (
    <div className="space-y-4">
      {activePromotions.map((promo) => (
        <Card 
          key={promo.id} 
          className={`relative overflow-hidden border-0 ${promo.gradient} text-primary-foreground shadow-glow`}
        >
          <CardContent className="p-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => dismissPromotion(promo.id)}
              className="absolute top-2 right-2 h-8 w-8 text-primary-foreground/80 hover:text-primary-foreground hover:bg-white/10"
            >
              <X className="h-4 w-4" />
            </Button>
            
            <div className="flex items-start gap-4 pr-10">
              <div className="p-2 bg-white/10 rounded-lg">
                {promo.category === 'festival' && <Gift className="h-5 w-5" />}
                {promo.category === 'referral' && <Star className="h-5 w-5" />}
                {promo.category === 'premium' && <Star className="h-5 w-5" />}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold">{promo.title}</h3>
                  {promo.discount && (
                    <Badge className="bg-white/20 text-primary-foreground border-white/30">
                      {promo.discount}
                    </Badge>
                  )}
                  {promo.reward && (
                    <Badge className="bg-white/20 text-primary-foreground border-white/30">
                      {promo.reward}
                    </Badge>
                  )}
                  {promo.benefit && (
                    <Badge className="bg-white/20 text-primary-foreground border-white/30">
                      {promo.benefit}
                    </Badge>
                  )}
                </div>
                
                <p className="text-sm text-primary-foreground/90 mb-2">
                  {promo.description}
                </p>
                
                {promo.validUntil && (
                  <div className="flex items-center gap-1 text-xs text-primary-foreground/80">
                    <Clock className="h-3 w-3" />
                    <span>Valid until {promo.validUntil}</span>
                  </div>
                )}
              </div>
              
              <Button 
                variant="secondary" 
                size="sm"
                className="bg-white/20 text-primary-foreground border-white/30 hover:bg-white/30"
              >
                {promo.category === 'festival' ? 'Shop Now' : 
                 promo.category === 'referral' ? 'Refer Now' : 'Upgrade'}
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};