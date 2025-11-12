import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search, ShoppingCart, Award, Star, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import BottomNav from "@/components/BottomNav";
import aziziLife from "@/assets/azizi-life.jpg";
import hagariRwanda from "@/assets/hagari-rwanda.jpg";
import imigongoArt from "@/assets/imigongo-art.jpg";
import akageraCoffee from "@/assets/akagera-coffee.jpg";
import kitengeFabric from "@/assets/kitenge-fabric.jpg";
import woodenSculpture from "@/assets/wooden-sculpture.jpg";
import rwandaHoney from "@/assets/rwanda-honey.jpg";

const Marketplace = () => {
  const navigate = useNavigate();

  const products = [
    {
      name: "Hagari Rwanda",
      category: "Handcrafts",
      price: "RWF 15,000",
      seller: "Hagari Rwanda",
      image: hagariRwanda,
    },
    {
      name: "Imigongo Art",
      category: "Art",
      price: "RWF 50,000",
      seller: "Rwanda Heritage",
      image: imigongoArt,
    },
    {
      name: "Coffee Beans (1kg)",
      category: "Food & Beverage",
      price: "RWF 8,000",
      seller: "Akagera Coffee",
      image: akageraCoffee,
    },
    {
      name: "Kitenge Fabric",
      category: "Textiles",
      price: "RWF 20,000",
      seller: "Fashion Rwanda",
      image: kitengeFabric,
    },
    {
      name: "Wooden Sculpture",
      category: "Handcrafts",
      price: "RWF 35,000",
      seller: "Azizi Life",
      image: woodenSculpture,
    },
    {
      name: "Honey (500g)",
      category: "Food & Beverage",
      price: "RWF 6,000",
      seller: "Pure Rwanda",
      image: rwandaHoney,
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
                <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                  <img 
                    src={aziziLife} 
                    alt="Azizi Life"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-sm">Azizi Life</h4>
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
              <div className="aspect-square rounded-lg overflow-hidden">
                <img 
                  src={hagariRwanda} 
                  alt="Hagari Rwanda"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-square rounded-lg overflow-hidden">
                <img 
                  src={imigongoArt} 
                  alt="Imigongo Art"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-square rounded-lg overflow-hidden">
                <img 
                  src={aziziLife} 
                  alt="Azizi Life Products"
                  className="w-full h-full object-cover"
                />
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
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
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
