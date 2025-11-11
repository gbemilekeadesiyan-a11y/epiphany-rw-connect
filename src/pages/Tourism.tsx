import { useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, Clock, Users, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import BottomNav from "@/components/BottomNav";

const Tourism = () => {
  const navigate = useNavigate();

  const experiences = [
    {
      title: "Kigali Genocide Memorial",
      category: "Cultural Heritage",
      duration: "2-3 hours",
      price: "Free",
      rating: 4.9,
      reviews: 1200,
      image: "🏛️",
    },
    {
      title: "Nyamata Church Memorial",
      category: "Historical Site",
      duration: "Half Day",
      price: "RWF 15,000",
      rating: 4.8,
      reviews: 850,
      image: "⛪",
    },
    {
      title: "Volcanoes National Park",
      category: "Nature & Wildlife",
      duration: "Full Day",
      price: "RWF 150,000",
      rating: 5.0,
      reviews: 2100,
      image: "🦍",
    },
    {
      title: "Inema Arts Center",
      category: "Art & Culture",
      duration: "1-2 hours",
      price: "RWF 5,000",
      rating: 4.7,
      reviews: 420,
      image: "🎨",
    },
    {
      title: "Lake Kivu Boat Tour",
      category: "Adventure",
      duration: "4-5 hours",
      price: "RWF 30,000",
      rating: 4.8,
      reviews: 680,
      image: "🚤",
    },
    {
      title: "Traditional Dance Show",
      category: "Entertainment",
      duration: "2 hours",
      price: "RWF 20,000",
      rating: 4.6,
      reviews: 310,
      image: "💃",
    },
  ];

  const categories = [
    "All", "Cultural", "Nature", "Adventure", "Historical", "Art"
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="bg-primary text-primary-foreground px-4 py-4">
        <div className="flex items-center gap-3">
          <Button
            size="icon"
            variant="ghost"
            onClick={() => navigate("/dashboard")}
            className="text-primary-foreground hover:bg-primary-foreground/10"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-xl font-bold">Tourism & Experiences</h1>
            <p className="text-sm text-primary-foreground/80">Discover the beauty of Rwanda</p>
          </div>
        </div>
      </header>

      <main className="p-4 space-y-6">
        {/* Featured Banner */}
        <Card className="p-6 bg-gradient-to-br from-green-500/10 to-green-600/5 border-green-500/20">
          <h3 className="font-semibold text-lg mb-2">🇷🇼 Experience Rwanda</h3>
          <p className="text-sm text-muted-foreground mb-3">
            From mountain gorillas to cultural heritage sites
          </p>
          <Badge className="bg-green-600 text-white">Featured</Badge>
        </Card>

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

        {/* Experiences Grid */}
        <div className="space-y-4">
          <h2 className="font-semibold">Popular Experiences</h2>
          <div className="grid gap-4">
            {experiences.map((experience, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-all cursor-pointer">
                <div className="flex gap-4 p-4">
                  {/* Image Placeholder */}
                  <div className="w-24 h-24 bg-gradient-to-br from-primary/10 to-gold/10 rounded-lg flex items-center justify-center flex-shrink-0 text-4xl">
                    {experience.image}
                  </div>

                  {/* Experience Info */}
                  <div className="flex-1 space-y-2">
                    <div>
                      <h3 className="font-semibold mb-1">{experience.title}</h3>
                      <Badge variant="secondary" className="text-xs">
                        {experience.category}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{experience.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-gold text-gold" />
                        <span className="font-medium">{experience.rating}</span>
                        <span>({experience.reviews})</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-primary">{experience.price}</span>
                      <Button size="sm" variant="outline" className="h-7">
                        Book Now
                      </Button>
                    </div>
                  </div>
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

export default Tourism;
