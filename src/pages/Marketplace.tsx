import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import BottomNav from "@/components/BottomNav";

const Marketplace = () => {
  const navigate = useNavigate();

  const products = [
    {
      name: "Traditional Basket",
      category: "Handcrafts",
      price: "RWF 15,000",
      seller: "Kigali Artisans",
      image: "🧺",
    },
    {
      name: "Imigongo Art",
      category: "Art",
      price: "RWF 50,000",
      seller: "Rwanda Heritage",
      image: "🎨",
    },
    {
      name: "Coffee Beans (1kg)",
      category: "Food & Beverage",
      price: "RWF 8,000",
      seller: "Akagera Coffee",
      image: "☕",
    },
    {
      name: "Kitenge Fabric",
      category: "Textiles",
      price: "RWF 20,000",
      seller: "Fashion Rwanda",
      image: "🧵",
    },
    {
      name: "Wooden Sculpture",
      category: "Handcrafts",
      price: "RWF 35,000",
      seller: "Kigali Artisans",
      image: "🗿",
    },
    {
      name: "Honey (500g)",
      category: "Food & Beverage",
      price: "RWF 6,000",
      seller: "Pure Rwanda",
      image: "🍯",
    },
  ];

  const categories = [
    "All", "Handcrafts", "Art", "Food", "Textiles", "Jewelry"
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="bg-primary text-primary-foreground px-4 py-4">
        <div className="flex items-center gap-3 mb-4">
          <Button
            size="icon"
            variant="ghost"
            onClick={() => navigate("/dashboard")}
            className="text-primary-foreground hover:bg-primary-foreground/10"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-xl font-bold">Marketplace</h1>
            <p className="text-sm text-primary-foreground/80">Support local businesses</p>
          </div>
          <Button
            size="icon"
            variant="ghost"
            className="text-primary-foreground hover:bg-primary-foreground/10"
          >
            <ShoppingCart className="h-5 w-5" />
          </Button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            className="pl-10 bg-background"
          />
        </div>
      </header>

      <main className="p-4 space-y-6">
        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((category) => (
            <Badge
              key={category}
              variant={category === "All" ? "default" : "outline"}
              className="cursor-pointer whitespace-nowrap"
            >
              {category}
            </Badge>
          ))}
        </div>

        {/* Featured Seller */}
        <Card className="p-4 bg-gradient-to-r from-purple-500/10 to-purple-600/5 border-purple-500/20">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-semibold mb-1">Featured Seller</h3>
              <p className="text-sm text-muted-foreground">Discover authentic Rwandan crafts</p>
            </div>
            <Badge className="bg-purple-600 text-white">Top Rated</Badge>
          </div>
        </Card>

        {/* Products Grid */}
        <div className="space-y-4">
          <h2 className="font-semibold">Local Products</h2>
          <div className="grid grid-cols-2 gap-4">
            {products.map((product, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-all cursor-pointer">
                <div className="aspect-square bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center text-5xl">
                  {product.image}
                </div>
                <div className="p-3 space-y-2">
                  <div>
                    <h3 className="font-semibold text-sm line-clamp-1">{product.name}</h3>
                    <p className="text-xs text-muted-foreground">{product.seller}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-primary text-sm">{product.price}</span>
                    <Badge variant="secondary" className="text-xs">
                      {product.category}
                    </Badge>
                  </div>
                  <Button size="sm" className="w-full h-8">
                    Add to Cart
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default Marketplace;
