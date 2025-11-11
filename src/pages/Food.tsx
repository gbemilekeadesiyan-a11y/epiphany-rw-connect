import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search, Star, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import BottomNav from "@/components/BottomNav";

const Food = () => {
  const navigate = useNavigate();

  const restaurants = [
    {
      name: "Mama's Kitchen",
      cuisine: "Traditional Rwandan",
      rating: 4.8,
      deliveryTime: "20-30 min",
      distance: "1.2 km",
      tags: ["Popular", "Fast Delivery"],
    },
    {
      name: "Urban Bites",
      cuisine: "Fast Food & Burgers",
      rating: 4.5,
      deliveryTime: "25-35 min",
      distance: "2.0 km",
      tags: ["New"],
    },
    {
      name: "Spice Garden",
      cuisine: "Indian & African Fusion",
      rating: 4.7,
      deliveryTime: "30-40 min",
      distance: "3.5 km",
      tags: ["Top Rated"],
    },
    {
      name: "Fresh Corner",
      cuisine: "Juice Bar & Healthy Food",
      rating: 4.6,
      deliveryTime: "15-25 min",
      distance: "0.8 km",
      tags: ["Healthy", "Fast Delivery"],
    },
  ];

  const categories = [
    "All", "Traditional", "Fast Food", "Healthy", "Drinks", "Desserts"
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
          <div>
            <h1 className="text-xl font-bold">Food Delivery</h1>
            <p className="text-sm text-primary-foreground/80">Delivering to Kigali City</p>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search restaurants or dishes..."
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

        {/* Promo Banner */}
        <Card className="p-4 bg-gradient-to-r from-gold/10 to-gold/5 border-gold/20">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-semibold mb-1">Free Delivery</h3>
              <p className="text-sm text-muted-foreground">On orders above RWF 10,000</p>
            </div>
            <Badge className="bg-gold text-gold-foreground">Promo</Badge>
          </div>
        </Card>

        {/* Restaurants List */}
        <div className="space-y-4">
          <h2 className="font-semibold">Nearby Restaurants</h2>
          {restaurants.map((restaurant, index) => (
            <Card key={index} className="p-4 hover:shadow-lg transition-all cursor-pointer">
              <div className="flex gap-4">
                {/* Restaurant Image Placeholder */}
                <div className="w-20 h-20 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">🍽️</span>
                </div>

                {/* Restaurant Info */}
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">{restaurant.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{restaurant.cuisine}</p>
                  
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-gold text-gold" />
                      <span className="font-medium">{restaurant.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{restaurant.deliveryTime}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      <span>{restaurant.distance}</span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex gap-2 mt-2">
                    {restaurant.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default Food;
