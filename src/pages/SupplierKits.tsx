import { useState } from "react";
import { Header } from "@/components/Header";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Package, Search, Plus, Edit, Eye, Star } from "lucide-react";
import { KitDetailsModal } from "@/components/KitDetailsModal";
import { EditKitModal } from "@/components/EditKitModal";

const SupplierKits = () => {
  const [selectedKit, setSelectedKit] = useState<Kit | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

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

  const [kits, setKits] = useState<Kit[]>([
    { id: 1, name: "Biryani Master Kit", description: "Complete biryani ingredients", price: "₹450", items: 12, rating: 4.8, sales: 156, status: "active", image: "/lovable-uploads/biryani-kit.jpg" },
    { id: 2, name: "Chaat Special Kit", description: "Street chaat essentials", price: "₹280", items: 8, rating: 4.6, sales: 89, status: "active", image: "/lovable-uploads/chaat-kit.jpg" },
    { id: 3, name: "Dosa Combo Kit", description: "South Indian dosa ingredients", price: "₹320", items: 10, rating: 4.7, sales: 124, status: "active", image: "/lovable-uploads/dosa-kit.jpg" },
    { id: 4, name: "Pav Bhaji Kit", description: "Mumbai street food kit", price: "₹250", items: 7, rating: 4.5, sales: 67, status: "draft", image: "/lovable-uploads/pav-bhaji-kit.jpg" },
    { id: 5, name: "Bengali Fish Curry Kit", description: "Traditional Bengali fish curry", price: "₹380", items: 9, rating: 4.9, sales: 203, status: "active", image: "/lovable-uploads/bengali-fish-kit.jpg" },
  ]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active': return <Badge variant="secondary">Active</Badge>;
      case 'draft': return <Badge variant="outline">Draft</Badge>;
      case 'inactive': return <Badge variant="secondary">Inactive</Badge>;
      default: return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const handleViewKit = (kit: Kit) => {
    setSelectedKit(kit);
    setIsDetailsModalOpen(true);
  };

  const handleEditKit = (kit: Kit) => {
    setSelectedKit(kit);
    setIsEditModalOpen(true);
  };

  const handleSaveKit = (updatedKit: Kit) => {
    setKits(kits.map(kit => kit.id === updatedKit.id ? updatedKit : kit));
  };

  const handleCreateNewKit = () => {
    const newKit: Kit = {
      id: Math.max(...kits.map(k => k.id)) + 1,
      name: "New Kit",
      description: "Custom ingredient kit",
      price: "₹0",
      items: 0,
      rating: 0,
      sales: 0,
      status: "draft",
      image: ""
    };
    setSelectedKit(newKit);
    setIsEditModalOpen(true);
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
                  Kit Management
                </h1>
                <p className="text-muted-foreground mt-1">
                  Create and manage your ingredient kits
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">Bulk Actions</Button>
                <Button onClick={handleCreateNewKit} variant="vibrant">
                  <Plus className="h-4 w-4 mr-2" />
                  Create New Kit
                </Button>
              </div>
            </div>

            {/* Search and Filters */}
            <Card className="shadow-card">
              <CardContent className="pt-6">
                <div className="flex gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input placeholder="Search kits..." className="pl-10" />
                  </div>
                  <Button variant="outline">Filter by Status</Button>
                  <Button variant="outline">Sort by Sales</Button>
                </div>
              </CardContent>
            </Card>

            {/* Kits Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {kits.map((kit) => (
                <Card key={kit.id} className="shadow-card hover-lift transition-smooth">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg">{kit.name}</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">{kit.description}</p>
                      </div>
                      {getStatusBadge(kit.status)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-warning fill-warning" />
                          <span className="text-sm font-medium">{kit.rating}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">{kit.sales} sales</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-primary">{kit.price}</span>
                        <span className="text-sm text-muted-foreground">{kit.items} items</span>
                      </div>

                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="flex-1" onClick={() => handleViewKit(kit)}>
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button size="sm" variant="vibrant" className="flex-1" onClick={() => handleEditKit(kit)}>
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Add New Kit Card */}
            <Card className="shadow-card border-dashed border-2 hover-lift transition-smooth cursor-pointer" onClick={handleCreateNewKit}>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Plus className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Create New Kit</h3>
                <p className="text-muted-foreground text-center mb-4">
                  Design a new ingredient kit for your vendors
                </p>
                <Button variant="vibrant">Get Started</Button>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>

      <KitDetailsModal
        kit={selectedKit}
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        onEdit={handleEditKit}
      />

      <EditKitModal
        kit={selectedKit}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveKit}
      />
    </div>
  );
};

export default SupplierKits;