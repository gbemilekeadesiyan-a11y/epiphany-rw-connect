import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search, Star, Clock, MapPin, ChefHat, Package, Bike, CheckCircle, Heart, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import BottomNav from "@/components/BottomNav";
import promoBanner from "@/assets/food-promo-banner.jpg";

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

        {/* Delivery Tracker */}
        <Card className="p-4 bg-gradient-to-br from-primary/5 to-accent/5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-sm">Order in Progress</h3>
            <Badge variant="outline" className="text-xs">15 min ETA</Badge>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary rounded-full">
                <ChefHat className="h-4 w-4 text-primary-foreground" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Preparing</p>
                <Progress value={100} className="h-1.5 mt-1" />
              </div>
              <CheckCircle className="h-4 w-4 text-primary" />
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary rounded-full">
                <Package className="h-4 w-4 text-primary-foreground" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Ready for Pickup</p>
                <Progress value={100} className="h-1.5 mt-1" />
              </div>
              <CheckCircle className="h-4 w-4 text-primary" />
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-accent rounded-full animate-pulse">
                <Bike className="h-4 w-4 text-accent-foreground" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Out for Delivery</p>
                <Progress value={65} className="h-1.5 mt-1" />
              </div>
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <Button size="sm" variant="outline" className="flex-1">
              <Heart className="h-3 w-3 mr-1" />
              Add Tip
            </Button>
            <Button size="sm" className="flex-1">Track Rider</Button>
          </div>
        </Card>

        {/* Loyalty Rewards */}
        <Card className="p-4 bg-gradient-to-r from-accent/10 to-accent/5 border-accent/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Gift className="h-5 w-5 text-accent" />
              <div>
                <h3 className="font-semibold text-sm">Food Rewards</h3>
                <p className="text-xs text-muted-foreground">2 orders to free delivery</p>
              </div>
            </div>
            <Badge className="bg-accent text-accent-foreground">8/10</Badge>
          </div>
          <Progress value={80} className="h-2 mt-3" />
        </Card>

        {/* Promo Banner */}
        <Card className="relative overflow-hidden border-gold/20">
          <div className="absolute inset-0">
            <img 
              src={promoBanner} 
              alt="Food Delivery Promo" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-gold/90 via-gold/70 to-gold/50" />
          </div>
          <div className="relative z-10 p-4 flex justify-between items-center">
            <div className="text-gold-foreground">
              <h3 className="font-semibold mb-1">Free Delivery</h3>
              <p className="text-sm opacity-90">On orders above RWF 10,000</p>
            </div>
            <Badge className="bg-white text-gold-foreground shadow-md">Promo</Badge>
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
