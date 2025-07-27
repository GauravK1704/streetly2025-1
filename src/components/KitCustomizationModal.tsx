import { useState } from "react";
import { Settings, Plus, Minus, Check } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

interface KitIngredient {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  required: boolean;
  price: number;
}

interface KitCustomizationModalProps {
  trigger: React.ReactNode;
  kitName: string;
  basePrice: number;
  ingredients: KitIngredient[];
}

export const KitCustomizationModal = ({ 
  trigger, 
  kitName,
  basePrice,
  ingredients: initialIngredients 
}: KitCustomizationModalProps) => {
  const [open, setOpen] = useState(false);
  const [ingredients, setIngredients] = useState(initialIngredients);
  const { toast } = useToast();

  const updateQuantity = (id: string, delta: number) => {
    setIngredients(prev => 
      prev.map(ingredient => {
        if (ingredient.id === id) {
          const newQuantity = Math.max(0, ingredient.quantity + delta);
          // Required ingredients must have at least 1 quantity
          if (ingredient.required && newQuantity === 0) {
            return ingredient;
          }
          return { ...ingredient, quantity: newQuantity };
        }
        return ingredient;
      })
    );
  };

  const totalPrice = ingredients.reduce((sum, ingredient) => 
    sum + (ingredient.price * ingredient.quantity), basePrice
  );

  const handleSaveCustomization = () => {
    toast({
      title: "Kit Customized!",
      description: `Your ${kitName} has been customized. Total: ₹${totalPrice}`,
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-primary" />
            Customize {kitName}
          </DialogTitle>
          <DialogDescription>
            Adjust ingredient quantities to match your needs
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Base Kit */}
          <div className="p-3 bg-primary/10 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="font-medium">{kitName} (Base)</span>
              <span className="font-medium">₹{basePrice}</span>
            </div>
          </div>

          <Separator />

          {/* Ingredients */}
          <div className="space-y-3">
            <h4 className="font-medium text-sm">Ingredients</h4>
            {ingredients.map((ingredient) => (
              <div key={ingredient.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm">{ingredient.name}</span>
                    {ingredient.required && (
                      <Badge variant="outline" className="text-xs">Required</Badge>
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    ₹{ingredient.price} per {ingredient.unit}
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => updateQuantity(ingredient.id, -1)}
                    disabled={ingredient.required && ingredient.quantity <= 1}
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  
                  <span className="w-12 text-center text-sm font-medium">
                    {ingredient.quantity}
                  </span>
                  
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => updateQuantity(ingredient.id, 1)}
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <Separator />

          {/* Total */}
          <div className="flex justify-between items-center p-3 bg-accent/10 rounded-lg">
            <span className="font-medium">Total Price</span>
            <span className="font-bold text-lg">₹{totalPrice}</span>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSaveCustomization} className="flex-1">
            <Check className="h-4 w-4 mr-2" />
            Save Customization
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};