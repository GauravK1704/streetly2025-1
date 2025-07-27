import { useState } from "react";
import { Header } from "@/components/Header";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  ShoppingCart, 
  Filter, 
  Star, 
  Clock, 
  Package, 
  Search,
  Heart,
  ChefHat
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useCart } from "@/contexts/CartContext";
import { useLanguage } from "@/contexts/LanguageContext";

// Import HD images
import chaatKitImage from "@/assets/chaat-kit.jpg";
import samosaKitImage from "@/assets/samosa-kit.jpg";
import dosaKitImage from "@/assets/dosa-kit.jpg";
import pavBhajiKitImage from "@/assets/pav-bhaji-kit.jpg";
import kulfiKitImage from "@/assets/kulfi-kit.jpg";
import biryaniKitImage from "@/assets/biryani-kit.jpg";
import gujaratiThaliKitImage from "@/assets/gujarati-thali-kit.jpg";
import rajasthaniKitImage from "@/assets/rajasthani-kit.jpg";
import bengaliFishKitImage from "@/assets/bengali-fish-kit.jpg";
import vegetablesBundleImage from "@/assets/vegetables-bundle.jpg";
import spicesCollectionImage from "@/assets/spices-collection.jpg";
import grainsPulsesImage from "@/assets/grains-pulses.jpg";
import dairyProductsImage from "@/assets/dairy-products.jpg";
import oilsCollectionImage from "@/assets/oils-collection.jpg";

const kitCategories = ["All", "Breakfast", "Lunch", "Snacks", "Dinner", "Desserts"];
const productCategories = ["All", "Vegetables", "Spices", "Grains", "Pulses", "Oils", "Dairy", "Condiments", "Snacks", "Nuts", "Beverages", "Baking"];
const priceRanges = ["All", "₹0-₹500", "₹500-₹1000", "₹1000-₹2000", "₹2000+"];

const availableKits = [
  {
    id: 1,
    name: "Ultimate Chaat Kit",
    description: "Everything needed for authentic street-style chaat",
    price: "₹850",
    rating: 4.8,
    reviews: 124,
    deliveryTime: "Next Day",
    category: "Snacks",
    image: chaatKitImage,
    popular: true,
    items: ["Sev", "Chutneys", "Masalas", "Papadums"]
  },
  {
    id: 2,
    name: "Samosa Special Kit",
    description: "Premium samosa ingredients with 3 fillings",
    price: "₹650",
    rating: 4.6,
    reviews: 89,
    deliveryTime: "Same Day",
    category: "Snacks",
    image: samosaKitImage,
    popular: false,
    items: ["Flour", "Oil", "Potato Mix", "Peas", "Spices"]
  },
  {
    id: 3,
    name: "Dosa Master Kit",
    description: "South Indian breakfast perfection",
    price: "₹750",
    rating: 4.9,
    reviews: 156,
    deliveryTime: "Next Day",
    category: "Breakfast",
    image: dosaKitImage,
    popular: true,
    items: ["Batter", "Sambar", "Chutneys", "Ghee"]
  },
  {
    id: 4,
    name: "Pav Bhaji Deluxe",
    description: "Mumbai street food classic",
    price: "₹550",
    rating: 4.7,
    reviews: 203,
    deliveryTime: "Same Day",
    category: "Lunch",
    image: pavBhajiKitImage,
    popular: false,
    items: ["Vegetables", "Masala", "Pav", "Butter"]
  },
  {
    id: 5,
    name: "Kulfi Creation Kit",
    description: "Traditional Indian ice cream",
    price: "₹450",
    rating: 4.5,
    reviews: 67,
    deliveryTime: "Next Day",
    category: "Desserts",
    image: kulfiKitImage,
    popular: false,
    items: ["Milk Powder", "Cardamom", "Pistachios", "Molds"]
  },
  {
    id: 6,
    name: "Biryani Bonanza",
    description: "Aromatic biryani with all essentials",
    price: "₹1200",
    rating: 4.9,
    reviews: 299,
    deliveryTime: "Same Day",
    category: "Dinner",
    image: biryaniKitImage,
    popular: true,
    items: ["Basmati Rice", "Meat/Veg", "Saffron", "Fried Onions"]
  },
  {
    id: 7,
    name: "Gujarati Thali Kit",
    description: "Complete Gujarati meal experience",
    price: "₹950",
    rating: 4.7,
    reviews: 178,
    deliveryTime: "Same Day",
    category: "Lunch",
    image: gujaratiThaliKitImage,
    popular: false,
    items: ["Dal", "Sabzi", "Rotli", "Rice", "Pickle", "Papad"]
  },
  {
    id: 8,
    name: "Rajasthani Royal Kit",
    description: "Traditional Rajasthani cuisine kit",
    price: "₹1100",
    rating: 4.8,
    reviews: 142,
    deliveryTime: "Next Day",
    category: "Dinner",
    image: rajasthaniKitImage,
    popular: true,
    items: ["Dal Baati", "Churma", "Ker Sangri", "Gatte"]
  },
  {
    id: 9,
    name: "Bengali Fish Curry Kit",
    description: "Authentic Bengali fish curry essentials",
    price: "₹780",
    rating: 4.6,
    reviews: 95,
    deliveryTime: "Same Day",
    category: "Lunch",
    image: bengaliFishKitImage,
    popular: false,
    items: ["Fish", "Mustard Oil", "Panch Phoron", "Potatoes"]
  },
  {
    id: 10,
    name: "Punjabi Chole Bhature Kit",
    description: "Authentic Punjabi street food",
    price: "₹690",
    rating: 4.7,
    reviews: 234,
    deliveryTime: "Same Day",
    category: "Lunch",
    image: chaatKitImage,
    popular: true,
    items: ["Chole", "Bhature Mix", "Onions", "Pickle"]
  },
  {
    id: 11,
    name: "Hyderabadi Haleem Kit",
    description: "Traditional Ramadan delicacy",
    price: "₹890",
    rating: 4.9,
    reviews: 167,
    deliveryTime: "Next Day",
    category: "Dinner",
    image: biryaniKitImage,
    popular: false,
    items: ["Wheat", "Lentils", "Meat", "Ghee", "Spices"]
  },
  {
    id: 12,
    name: "South Indian Filter Coffee Kit",
    description: "Authentic filter coffee experience",
    price: "₹320",
    rating: 4.5,
    reviews: 89,
    deliveryTime: "Same Day",
    category: "Breakfast",
    image: dosaKitImage,
    popular: false,
    items: ["Coffee Powder", "Chicory", "Filter", "Steel Tumbler"]
  },
  {
    id: 13,
    name: "Maharashtrian Misal Pav Kit",
    description: "Spicy Maharashtrian breakfast",
    price: "₹580",
    rating: 4.6,
    reviews: 156,
    deliveryTime: "Same Day",
    category: "Breakfast",
    image: pavBhajiKitImage,
    popular: false,
    items: ["Sprouted Mix", "Spicy Curry", "Pav", "Farsan"]
  },
  {
    id: 14,
    name: "Kashmiri Wazwan Kit",
    description: "Royal Kashmiri feast essentials",
    price: "₹1450",
    rating: 4.9,
    reviews: 67,
    deliveryTime: "Next Day",
    category: "Dinner",
    image: rajasthaniKitImage,
    popular: true,
    items: ["Rogan Josh", "Yakhni", "Kebabs", "Rice"]
  },
  {
    id: 15,
    name: "Goan Fish Curry Kit",
    description: "Coastal Goan flavors",
    price: "₹720",
    rating: 4.7,
    reviews: 123,
    deliveryTime: "Same Day",
    category: "Lunch",
    image: bengaliFishKitImage,
    popular: false,
    items: ["Coconut", "Kokum", "Fish", "Spices"]
  },
  {
    id: 16,
    name: "Assamese Thali Kit",
    description: "Northeast Indian cuisine",
    price: "₹680",
    rating: 4.5,
    reviews: 78,
    deliveryTime: "Next Day",
    category: "Lunch",
    image: gujaratiThaliKitImage,
    popular: false,
    items: ["Duck Curry", "Bamboo Shoot", "Fish Curry", "Rice"]
  },
  {
    id: 17,
    name: "Tamil Nadu Chettinad Kit",
    description: "Spicy Chettinad cuisine",
    price: "₹850",
    rating: 4.8,
    reviews: 145,
    deliveryTime: "Same Day",
    category: "Dinner",
    image: spicesCollectionImage,
    popular: true,
    items: ["Chettinad Masala", "Chicken", "Coconut", "Curry Leaves"]
  },
  {
    id: 18,
    name: "Kerala Appam Kit",
    description: "Traditional Kerala breakfast",
    price: "₹480",
    rating: 4.6,
    reviews: 112,
    deliveryTime: "Same Day",
    category: "Breakfast",
    image: dosaKitImage,
    popular: false,
    items: ["Rice Batter", "Coconut Milk", "Curry", "Appam Pan"]
  },
  {
    id: 19,
    name: "Odia Dalma Kit",
    description: "Healthy Odia cuisine",
    price: "₹420",
    rating: 4.4,
    reviews: 67,
    deliveryTime: "Same Day",
    category: "Lunch",
    image: grainsPulsesImage,
    popular: false,
    items: ["Arhar Dal", "Vegetables", "Ginger", "Turmeric"]
  },
  {
    id: 20,
    name: "Uttarakhandi Aloo Ke Gutke Kit",
    description: "Mountain flavors from Uttarakhand",
    price: "₹380",
    rating: 4.5,
    reviews: 89,
    deliveryTime: "Same Day",
    category: "Lunch",
    image: vegetablesBundleImage,
    popular: false,
    items: ["Baby Potatoes", "Hill Spices", "Coriander", "Local Oil"]
  }
];

const individualProducts = [
  // Vegetables
  { id: 101, name: "Potatoes", price: 30, category: "Vegetables", image: vegetablesBundleImage, unit: "kg" },
  { id: 102, name: "Tomatoes", price: 40, category: "Vegetables", image: vegetablesBundleImage, unit: "kg" },
  { id: 103, name: "Onions", price: 25, category: "Vegetables", image: vegetablesBundleImage, unit: "kg" },
  { id: 104, name: "Green Chilies", price: 60, category: "Vegetables", image: vegetablesBundleImage, unit: "250g" },
  { id: 105, name: "Coriander", price: 20, category: "Vegetables", image: vegetablesBundleImage, unit: "bunch" },
  { id: 106, name: "Mint", price: 15, category: "Vegetables", image: vegetablesBundleImage, unit: "bunch" },
  { id: 107, name: "Ginger", price: 80, category: "Vegetables", image: vegetablesBundleImage, unit: "250g" },
  { id: 108, name: "Garlic", price: 120, category: "Vegetables", image: vegetablesBundleImage, unit: "250g" },
  { id: 109, name: "Curry Leaves", price: 10, category: "Vegetables", image: vegetablesBundleImage, unit: "bunch" },
  { id: 110, name: "Green Peas", price: 50, category: "Vegetables", image: vegetablesBundleImage, unit: "500g" },
  
  // Spices
  { id: 201, name: "Turmeric Powder", price: 45, category: "Spices", image: spicesCollectionImage, unit: "100g" },
  { id: 202, name: "Red Chili Powder", price: 60, category: "Spices", image: spicesCollectionImage, unit: "100g" },
  { id: 203, name: "Coriander Powder", price: 40, category: "Spices", image: spicesCollectionImage, unit: "100g" },
  { id: 204, name: "Cumin Powder", price: 80, category: "Spices", image: spicesCollectionImage, unit: "50g" },
  { id: 205, name: "Garam Masala", price: 120, category: "Spices", image: spicesCollectionImage, unit: "50g" },
  { id: 206, name: "Cardamom", price: 200, category: "Spices", image: spicesCollectionImage, unit: "25g" },
  { id: 207, name: "Cinnamon", price: 150, category: "Spices", image: spicesCollectionImage, unit: "25g" },
  { id: 208, name: "Cloves", price: 180, category: "Spices", image: spicesCollectionImage, unit: "25g" },
  { id: 209, name: "Bay Leaves", price: 30, category: "Spices", image: spicesCollectionImage, unit: "10g" },
  { id: 210, name: "Mustard Seeds", price: 35, category: "Spices", image: spicesCollectionImage, unit: "50g" },
  
  // Grains & Pulses
  { id: 301, name: "Basmati Rice", price: 180, category: "Grains", image: grainsPulsesImage, unit: "kg" },
  { id: 302, name: "Wheat Flour", price: 50, category: "Grains", image: grainsPulsesImage, unit: "kg" },
  { id: 303, name: "Arhar Dal", price: 120, category: "Pulses", image: grainsPulsesImage, unit: "kg" },
  { id: 304, name: "Moong Dal", price: 110, category: "Pulses", image: grainsPulsesImage, unit: "kg" },
  { id: 305, name: "Chana Dal", price: 90, category: "Pulses", image: grainsPulsesImage, unit: "kg" },
  { id: 306, name: "Urad Dal", price: 130, category: "Pulses", image: grainsPulsesImage, unit: "kg" },
  { id: 307, name: "Masoor Dal", price: 100, category: "Pulses", image: grainsPulsesImage, unit: "kg" },
  { id: 308, name: "Chickpeas", price: 80, category: "Pulses", image: grainsPulsesImage, unit: "kg" },
  { id: 309, name: "Black Beans", price: 120, category: "Pulses", image: grainsPulsesImage, unit: "kg" },
  { id: 310, name: "Kidney Beans", price: 140, category: "Pulses", image: grainsPulsesImage, unit: "kg" },
  
  // Oils & Ghee
  { id: 401, name: "Mustard Oil", price: 180, category: "Oils", image: oilsCollectionImage, unit: "500ml" },
  { id: 402, name: "Coconut Oil", price: 220, category: "Oils", image: oilsCollectionImage, unit: "500ml" },
  { id: 403, name: "Sunflower Oil", price: 150, category: "Oils", image: oilsCollectionImage, unit: "500ml" },
  { id: 404, name: "Ghee", price: 350, category: "Oils", image: oilsCollectionImage, unit: "500g" },
  { id: 405, name: "Sesame Oil", price: 280, category: "Oils", image: oilsCollectionImage, unit: "250ml" },
  
  // Dairy
  { id: 501, name: "Paneer", price: 250, category: "Dairy", image: dairyProductsImage, unit: "250g" },
  { id: 502, name: "Yogurt", price: 60, category: "Dairy", image: dairyProductsImage, unit: "500g" },
  { id: 503, name: "Milk", price: 55, category: "Dairy", image: dairyProductsImage, unit: "500ml" },
  { id: 504, name: "Butter", price: 180, category: "Dairy", image: dairyProductsImage, unit: "200g" },
  { id: 505, name: "Cream", price: 120, category: "Dairy", image: dairyProductsImage, unit: "200ml" },
  
  // Additional Vegetables
  { id: 111, name: "Capsicum", price: 60, category: "Vegetables", image: vegetablesBundleImage, unit: "kg" },
  { id: 112, name: "Cauliflower", price: 40, category: "Vegetables", image: vegetablesBundleImage, unit: "kg" },
  { id: 113, name: "Cabbage", price: 30, category: "Vegetables", image: vegetablesBundleImage, unit: "kg" },
  { id: 114, name: "Carrots", price: 50, category: "Vegetables", image: vegetablesBundleImage, unit: "kg" },
  { id: 115, name: "Radish", price: 35, category: "Vegetables", image: vegetablesBundleImage, unit: "kg" },
  { id: 116, name: "Eggplant", price: 45, category: "Vegetables", image: vegetablesBundleImage, unit: "kg" },
  { id: 117, name: "Okra", price: 70, category: "Vegetables", image: vegetablesBundleImage, unit: "kg" },
  { id: 118, name: "Spinach", price: 25, category: "Vegetables", image: vegetablesBundleImage, unit: "bunch" },
  { id: 119, name: "Fenugreek Leaves", price: 20, category: "Vegetables", image: vegetablesBundleImage, unit: "bunch" },
  { id: 120, name: "Green Beans", price: 55, category: "Vegetables", image: vegetablesBundleImage, unit: "kg" },
];

export const Marketplace = () => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPriceRange, setSelectedPriceRange] = useState("All");
  const [favorites, setFavorites] = useState<number[]>([]);
  const [activeTab, setActiveTab] = useState<"kits" | "products">("kits");
  const { addToCart } = useCart();

  const filteredKits = availableKits.filter(kit => {
    const matchesSearch = kit.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         kit.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || kit.category === selectedCategory;
    const matchesPrice = selectedPriceRange === "All" || 
                        (selectedPriceRange === "₹0-₹500" && parseInt(kit.price.replace('₹', '')) <= 500) ||
                        (selectedPriceRange === "₹500-₹1000" && parseInt(kit.price.replace('₹', '')) <= 1000) ||
                        (selectedPriceRange === "₹1000-₹2000" && parseInt(kit.price.replace('₹', '')) <= 2000) ||
                        (selectedPriceRange === "₹2000+" && parseInt(kit.price.replace('₹', '')) > 2000);
    
    return matchesSearch && matchesCategory && matchesPrice;
  });

  const filteredProducts = individualProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    const matchesPrice = selectedPriceRange === "All" || 
                        (selectedPriceRange === "₹0-₹500" && product.price <= 500) ||
                        (selectedPriceRange === "₹500-₹1000" && product.price <= 1000) ||
                        (selectedPriceRange === "₹1000-₹2000" && product.price <= 2000) ||
                        (selectedPriceRange === "₹2000+" && product.price > 2000);
    
    return matchesSearch && matchesCategory && matchesPrice;
  });

  const toggleFavorite = (kitId: number) => {
    setFavorites(prev => 
      prev.includes(kitId) 
        ? prev.filter(id => id !== kitId)
        : [...prev, kitId]
    );
  };

  const addKitToCart = (kit: typeof availableKits[0]) => {
    addToCart({
      id: kit.id,
      name: kit.name,
      price: parseInt(kit.price.replace('₹', '')),
      image: kit.image,
      category: kit.category,
      type: 'kit'
    });
  };

  const addProductToCart = (product: typeof individualProducts[0]) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
      type: 'product',
      unit: product.unit
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
              <h1 className="text-3xl font-bold">Marketplace</h1>
              <div className="flex items-center gap-3">
                <div className="flex border rounded-lg p-1">
                  <Button
                    variant={activeTab === "kits" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setActiveTab("kits")}
                  >
                    Kits ({filteredKits.length})
                  </Button>
                  <Button
                    variant={activeTab === "products" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setActiveTab("products")}
                  >
                    Products ({filteredProducts.length})
                  </Button>
                </div>
              </div>
            </div>

            {/* Search and Filters */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search for kits..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-full md:w-48">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {(activeTab === "kits" ? kitCategories : productCategories).map(category => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={selectedPriceRange} onValueChange={setSelectedPriceRange}>
                    <SelectTrigger className="w-full md:w-48">
                      <SelectValue placeholder="Price Range" />
                    </SelectTrigger>
                    <SelectContent>
                      {priceRanges.map(range => (
                        <SelectItem key={range} value={range}>
                          {range}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Kits and Products Grid */}
            {activeTab === "kits" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredKits.map((kit) => (
                <Card key={kit.id} className="group hover-lift shadow-card">
                  <CardHeader className="relative">
                    <div className="flex items-start justify-between">
                      <div className="w-16 h-16 mb-2 rounded-lg overflow-hidden">
                        <img 
                          src={kit.image} 
                          alt={kit.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex gap-2">
                        {kit.popular && (
                          <Badge variant="default" className="bg-primary">
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
                    <CardTitle className="text-lg">{kit.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{kit.description}</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{kit.rating}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">({kit.reviews} reviews)</span>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{kit.deliveryTime}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Package className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{kit.items.length} items</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className="text-sm font-medium">Includes:</p>
                      <div className="flex flex-wrap gap-1">
                        {kit.items.map((item, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {item}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <span className="text-2xl font-bold text-primary">{kit.price}</span>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" title="View Recipe">
                          <ChefHat className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="vibrant" 
                          size="sm"
                          onClick={() => addKitToCart(kit)}
                          className="hover:scale-105 transition-transform"
                        >
                          <ShoppingCart className="h-3 w-3 mr-1" />
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {filteredProducts.map((product) => (
                  <Card key={product.id} className="group hover-lift shadow-card">
                    <CardContent className="p-4">
                      <div className="text-center">
                        <div className="w-12 h-12 mx-auto mb-2 rounded-lg overflow-hidden">
                          <img 
                            src={product.image} 
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <h4 className="font-medium text-sm mb-1">{product.name}</h4>
                        <p className="text-xs text-muted-foreground mb-2">per {product.unit}</p>
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-lg font-bold text-primary">₹{product.price}</span>
                          <Badge variant="outline" className="text-xs">
                            {product.category}
                          </Badge>
                        </div>
                        <Button 
                          variant="vibrant" 
                          size="sm"
                          className="w-full text-xs"
                          onClick={() => addProductToCart(product)}
                        >
                          <ShoppingCart className="h-3 w-3 mr-1" />
                          Add
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {((activeTab === "kits" && filteredKits.length === 0) || 
              (activeTab === "products" && filteredProducts.length === 0)) && (
              <Card>
                <CardContent className="p-12 text-center">
                  <ShoppingCart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">
                    No {activeTab} found
                  </h3>
                  <p className="text-muted-foreground">Try adjusting your search or filters</p>
                </CardContent>
              </Card>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};
