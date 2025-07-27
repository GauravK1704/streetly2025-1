import { useState } from "react";
import { Header } from "@/components/Header";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Package, Search, Plus, AlertTriangle, TrendingUp, TrendingDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SupplierInventory = () => {
  const { toast } = useToast();
  const [inventory, setInventory] = useState([
    { id: 1, name: "Basmati Rice", category: "Grains", stock: 150, unit: "kg", minStock: 50, price: "₹120/kg", trend: "up", status: "in-stock" },
    { id: 2, name: "Turmeric Powder", category: "Spices", stock: 25, unit: "kg", minStock: 30, price: "₹300/kg", trend: "down", status: "low-stock" },
    { id: 3, name: "Mustard Oil", category: "Oils", stock: 80, unit: "L", minStock: 20, price: "₹180/L", trend: "up", status: "in-stock" },
    { id: 4, name: "Red Onions", category: "Vegetables", stock: 5, unit: "kg", minStock: 25, price: "₹40/kg", trend: "down", status: "critical" },
    { id: 5, name: "Garam Masala", category: "Spices", stock: 45, unit: "kg", minStock: 15, price: "₹500/kg", trend: "up", status: "in-stock" },
    { id: 6, name: "Tomatoes", category: "Vegetables", stock: 120, unit: "kg", minStock: 30, price: "₹60/kg", trend: "up", status: "in-stock" },
  ]);

  const handleLowStockAlerts = () => {
    const lowStockItems = inventory.filter(item => item.status === 'low-stock' || item.status === 'critical');
    toast({
      title: "Low Stock Alert",
      description: `${lowStockItems.length} items need restocking`,
    });
  };

  const handleAddItem = () => {
    toast({
      title: "Add New Item",
      description: "Opening item creation form...",
    });
  };

  const handleUpdateStock = (item: any) => {
    const newStock = prompt(`Update stock for ${item.name} (current: ${item.stock}):`);
    if (newStock && !isNaN(Number(newStock))) {
      setInventory(prev => prev.map(i => 
        i.id === item.id ? { ...i, stock: Number(newStock) } : i
      ));
      toast({
        title: "Stock Updated",
        description: `${item.name} stock updated to ${newStock} ${item.unit}`,
      });
    }
  };

  const handleReorder = (item: any) => {
    const reorderQty = Math.max(item.minStock * 2, 100);
    toast({
      title: "Reorder Initiated",
      description: `Reordering ${reorderQty} ${item.unit} of ${item.name}`,
    });
  };

  const handleExport = () => {
    toast({
      title: "Export Started",
      description: "Inventory report will be downloaded shortly",
    });
  };

  const handleFilter = () => {
    toast({
      title: "Filter Options",
      description: "Opening filter panel...",
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'in-stock': return <Badge variant="secondary">In Stock</Badge>;
      case 'low-stock': return <Badge variant="outline">Low Stock</Badge>;
      case 'critical': return <Badge variant="destructive">Critical</Badge>;
      default: return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const getTrendIcon = (trend: string) => {
    return trend === 'up' ? 
      <TrendingUp className="h-4 w-4 text-success" /> : 
      <TrendingDown className="h-4 w-4 text-destructive" />;
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
                  Inventory Management
                </h1>
                <p className="text-muted-foreground mt-1">
                  Monitor and manage your stock levels
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={handleLowStockAlerts}>
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Low Stock Alerts
                </Button>
                <Button variant="vibrant" onClick={handleAddItem}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Item
                </Button>
              </div>
            </div>

            {/* Search and Filters */}
            <Card className="shadow-card">
              <CardContent className="pt-6">
                <div className="flex gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input placeholder="Search inventory..." className="pl-10" />
                  </div>
                  <Button variant="outline" onClick={handleFilter}>Filter</Button>
                  <Button variant="outline" onClick={handleExport}>Export</Button>
                </div>
              </CardContent>
            </Card>

            {/* Inventory List */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5 text-primary" />
                  Current Inventory
                  <Badge variant="outline" className="ml-auto">
                    {inventory.length} items
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {inventory.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-4 bg-accent/5 rounded-lg border border-accent/20 hover-lift transition-smooth">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold">{item.name}</h3>
                          {getStatusBadge(item.status)}
                          {getTrendIcon(item.trend)}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>Category: {item.category}</span>
                          <span>Min Stock: {item.minStock} {item.unit}</span>
                          <span>Price: {item.price}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg">{item.stock} {item.unit}</p>
                        <div className="flex gap-2 mt-2">
                          <Button size="sm" variant="outline" onClick={() => handleUpdateStock(item)}>
                            Update Stock
                          </Button>
                          <Button size="sm" variant="vibrant" onClick={() => handleReorder(item)}>
                            Reorder
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </div>
  );
};

export default SupplierInventory;