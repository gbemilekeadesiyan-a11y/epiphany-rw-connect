import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search, ShoppingCart, Award, Star, TrendingUp } from "lucide-react";
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

        {/* Maker Spotlight */}
        <Card className="p-5 bg-gradient-to-br from-gold/10 to-primary/5 border-gold/20">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-gold/20 rounded-full">
              <Award className="h-6 w-6 text-gold" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-lg">Maker Spotlight</h3>
              <p className="text-sm text-muted-foreground">Supporting local artisans</p>
            </div>
            <Badge className="bg-gold text-gold-foreground">Featured</Badge>
          </div>
          
          <div className="space-y-3">
            <Card className="p-3 bg-background/50">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center text-2xl">
                  👨‍🎨
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-sm">Kigali Artisans Co-op</h4>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-gold text-gold" />
                      <span>4.9</span>
                    </div>
                    <span>•</span>
                    <span>2,400+ sales</span>
                  </div>
                </div>
                <Button size="sm" variant="outline" className="h-7">
                  View Shop
                </Button>
              </div>
            </Card>
            
            <div className="grid grid-cols-3 gap-2">
              <div className="aspect-square bg-gradient-to-br from-muted to-muted/50 rounded-lg flex items-center justify-center text-3xl">
                🧺
              </div>
              <div className="aspect-square bg-gradient-to-br from-muted to-muted/50 rounded-lg flex items-center justify-center text-3xl">
                🎨
              </div>
              <div className="aspect-square bg-gradient-to-br from-muted to-muted/50 rounded-lg flex items-center justify-center text-3xl">
                🗿
              </div>
            </div>
            
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <TrendingUp className="h-3 w-3 text-primary" />
                <span>Top 3% of sellers this month</span>
              </div>
            </div>
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
