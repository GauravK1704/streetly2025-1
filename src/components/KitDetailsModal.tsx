import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Package, DollarSign, Eye, Users, Clock } from "lucide-react";

interface Kit {
  id: number;
  name: string;
  description: string;
  price: string;
  items: number;
  rating: number;
  sales: number;
  status: string;
  image: string;
}

interface KitDetailsModalProps {
  kit: Kit | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit: (kit: Kit) => void;
}

export const KitDetailsModal = ({ kit, isOpen, onClose, onEdit }: KitDetailsModalProps) => {
  if (!kit) return null;

  const ingredients = [
    { name: "Basmati Rice", quantity: "2 kg", price: "₹240" },
    { name: "Chicken", quantity: "1 kg", price: "₹300" },
    { name: "Biryani Masala", quantity: "50g", price: "₹25" },
    { name: "Saffron", quantity: "1g", price: "₹50" },
    { name: "Ghee", quantity: "200ml", price: "₹80" },
    { name: "Onions", quantity: "500g", price: "₹30" },
    { name: "Yogurt", quantity: "200g", price: "₹25" },
    { name: "Mint Leaves", quantity: "50g", price: "₹15" }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl gradient-primary bg-clip-text text-transparent">
            {kit.name}
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Kit Overview */}
          <div className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-warning fill-warning" />
                    <span className="font-semibold">{kit.rating}</span>
                  </div>
                  <Badge variant={kit.status === 'active' ? 'secondary' : 'outline'}>
                    {kit.status}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-success" />
                    <div>
                      <p className="text-lg font-bold">{kit.price}</p>
                      <p className="text-xs text-muted-foreground">Price</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-primary" />
                    <div>
                      <p className="text-lg font-bold">{kit.sales}</p>
                      <p className="text-xs text-muted-foreground">Total Sales</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Package className="h-4 w-4 text-accent" />
                    <div>
                      <p className="text-lg font-bold">{kit.items}</p>
                      <p className="text-xs text-muted-foreground">Ingredients</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-warning" />
                    <div>
                      <p className="text-lg font-bold">45m</p>
                      <p className="text-xs text-muted-foreground">Prep Time</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-3">Description</h3>
                <p className="text-sm text-muted-foreground">
                  {kit.description}. This complete kit includes all the essential ingredients 
                  and spices needed to create an authentic and delicious meal. Perfect for 
                  vendors looking to offer high-quality dishes to their customers.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Ingredients List */}
          <div>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-4">Kit Ingredients</h3>
                <div className="space-y-3">
                  {ingredients.map((ingredient, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-accent/5 rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium">{ingredient.name}</p>
                        <p className="text-sm text-muted-foreground">{ingredient.quantity}</p>
                      </div>
                      <p className="font-semibold">{ingredient.price}</p>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 pt-4 border-t border-border">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Total Cost:</span>
                    <span className="text-lg font-bold text-primary">{kit.price}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4 border-t border-border">
          <Button onClick={onClose} variant="outline" className="flex-1">
            Close
          </Button>
          <Button onClick={() => onEdit(kit)} variant="vibrant" className="flex-1">
            Edit Kit
          </Button>
          <Button variant="secondary" className="flex-1">
            Duplicate Kit
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};