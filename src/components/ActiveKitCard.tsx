import { Calendar, Package, Edit3, Clock, Eye } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { KitCustomizationModal } from "./KitCustomizationModal";
import { OrderConfirmationModal } from "./OrderConfirmationModal";
import { useToast } from "@/hooks/use-toast";
import foodKitImage from "@/assets/food-kit-illustration.jpg";

const mockIngredients = [
  { id: "1", name: "Potatoes", quantity: 2, unit: "kg", required: true, price: 30 },
  { id: "2", name: "Green Peas", quantity: 1, unit: "cup", required: true, price: 25 },
  { id: "3", name: "Samosa Sheets", quantity: 20, unit: "pieces", required: true, price: 40 },
  { id: "4", name: "Oil", quantity: 1, unit: "liter", required: true, price: 150 },
  { id: "5", name: "Mint Chutney", quantity: 1, unit: "bottle", required: false, price: 30 },
  { id: "6", name: "Tamarind Chutney", quantity: 1, unit: "bottle", required: false, price: 35 },
];

const tomorrowKit = [
  { id: "1", name: "Chaat Masala Kit", quantity: 1, price: 180 },
  { id: "2", name: "Extra Chutneys", quantity: 2, price: 65 },
];

export const ActiveKitCard = () => {
  const { toast } = useToast();

  const handleViewDetails = () => {
    toast({
      title: "Kit Details",
      description: "Opening detailed kit information...",
    });
  };

  return (
    <Card className="shadow-card hover-lift">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5 text-primary" />
            Active Kit Subscription
          </CardTitle>
          <Badge variant="outline" className="bg-success/10 text-success border-success/20">
            Active
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-4">
          <img 
            src={foodKitImage} 
            alt="Today's Kit" 
            className="w-20 h-20 rounded-lg object-cover shadow-card"
          />
          <div className="flex-1">
            <h3 className="font-semibold text-lg">Samosa Special Kit</h3>
            <p className="text-muted-foreground text-sm">Perfect for evening snacks</p>
            <div className="flex items-center gap-2 mt-2">
              <Calendar className="h-4 w-4 text-primary" />
              <span className="text-sm">Today's Kit</span>
            </div>
          </div>
        </div>
        
        <div className="bg-muted rounded-lg p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Next Delivery</span>
            <div className="flex items-center gap-1 text-success">
              <Clock className="h-4 w-4" />
              <span className="text-sm font-medium">Tomorrow 8 AM</span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            Chaat Masala Kit with extra chutneys
          </p>
        </div>

        <div className="flex gap-2">
          <KitCustomizationModal
            trigger={
              <Button variant="outline" size="sm" className="flex-1">
                <Edit3 className="h-4 w-4 mr-2" />
                Modify Kit
              </Button>
            }
            kitName="Samosa Special Kit"
            basePrice={120}
            ingredients={mockIngredients}
          />
          
          <OrderConfirmationModal
            trigger={
              <Button variant="warm" size="sm" className="flex-1">
                <Eye className="h-4 w-4 mr-2" />
                Preview Order
              </Button>
            }
            items={tomorrowKit}
            deliveryTime="Tomorrow 8:00 AM"
          />
        </div>
      </CardContent>
    </Card>
  );
};