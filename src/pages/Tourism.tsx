import { useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, Clock, Users, Star, Calendar, Plus, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import BottomNav from "@/components/BottomNav";
import bannerImage from "@/assets/rwanda-tourism-banner.jpg";
import genocideMemorial from "@/assets/genocide-memorial.jpg";
import nyamataMemorial from "@/assets/nyamata-memorial.jpg";
import volcanoesPark from "@/assets/volcanoes-park.jpg";
import lakeKivuTour from "@/assets/lake-kivu-tour.jpg";
import inemaArtsCenter from "@/assets/inema-arts-center.jpg";
import bugeseraLakeResort from "@/assets/bugesera-lake-resort.jpg";

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
      image: genocideMemorial,
    },
    {
      title: "Nyamata Church Memorial",
      category: "Historical Site",
      duration: "Half Day",
      price: "RWF 15,000",
      rating: 4.8,
      reviews: 850,
      image: nyamataMemorial,
    },
    {
      title: "Volcanoes National Park",
      category: "Nature & Wildlife",
      duration: "Full Day",
      price: "RWF 150,000",
      rating: 5.0,
      reviews: 2100,
      image: volcanoesPark,
    },
    {
      title: "Inema Arts Center",
      category: "Art & Culture",
      duration: "1-2 hours",
      price: "RWF 5,000",
      rating: 4.7,
      reviews: 420,
      image: inemaArtsCenter,
    },
    {
      title: "Lake Kivu Boat Tour",
      category: "Adventure",
      duration: "4-5 hours",
      price: "RWF 30,000",
      rating: 4.8,
      reviews: 680,
      image: lakeKivuTour,
    },
    {
      title: "Bugesera Lake Resort",
      category: "Accommodation",
      duration: "Per Night",
      price: "RWF 100,000",
      rating: 4.8,
      reviews: 520,
      image: bugeseraLakeResort,
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
        <Card className="relative overflow-hidden border-green-500/20">
          <div className="absolute inset-0">
            <img 
              src={bannerImage} 
              alt="Rwanda Tourism" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-transparent" />
          </div>
          <div className="relative z-10 p-6 text-white">
            <h3 className="font-semibold text-lg mb-2">🇷🇼 Experience Rwanda</h3>
            <p className="text-sm text-white/90 mb-3">
              From mountain gorillas to cultural heritage sites
            </p>
            <Badge className="bg-green-600 text-white">Featured</Badge>
          </div>
        </Card>

        {/* Curated Itineraries */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">Curated Itineraries</h2>
            <Button variant="ghost" size="sm">View All</Button>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            <Card className="min-w-[280px] p-4 bg-gradient-to-br from-primary/10 to-accent/5 cursor-pointer hover:shadow-lg transition-all">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="h-5 w-5 text-primary" />
                <Badge className="bg-primary text-primary-foreground">Popular</Badge>
              </div>
              <h3 className="font-semibold mb-2">3-Day Cultural Journey</h3>
              <p className="text-sm text-muted-foreground mb-3">Kigali memorials, Inema Arts, Traditional dance</p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-primary">RWF 180,000</span>
                <Button size="sm">View Details</Button>
              </div>
            </Card>
            <Card className="min-w-[280px] p-4 bg-gradient-to-br from-accent/10 to-primary/5 cursor-pointer hover:shadow-lg transition-all">
              <div className="flex items-center gap-2 mb-3">
                <Calendar className="h-5 w-5 text-accent" />
                <Badge className="bg-accent text-accent-foreground">Weekend</Badge>
              </div>
              <h3 className="font-semibold mb-2">Lake Kivu Escape</h3>
              <p className="text-sm text-muted-foreground mb-3">Boat tours, beach activities, local cuisine</p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-primary">RWF 120,000</span>
                <Button size="sm">View Details</Button>
              </div>
            </Card>
          </div>
        </div>

        {/* Custom Itinerary Maker */}
        <Card className="p-4 bg-gradient-to-r from-gold/10 to-gold/5 border-gold/20">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Plus className="h-5 w-5 text-gold" />
              <div>
                <h3 className="font-semibold">Create Your Journey</h3>
                <p className="text-xs text-muted-foreground">Build a custom itinerary</p>
              </div>
            </div>
            <Button size="sm" className="bg-gold text-gold-foreground hover:bg-gold/90">
              Start Planning
            </Button>
          </div>
          <div className="flex gap-2 mt-3">
            <Badge variant="outline" className="text-xs">Mix & Match</Badge>
            <Badge variant="outline" className="text-xs">Flexible Dates</Badge>
            <Badge variant="outline" className="text-xs">Expert Tips</Badge>
          </div>
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

        {/* Hotels Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">Featured Hotels</h2>
            <Button variant="ghost" size="sm">View All</Button>
          </div>
          <div className="grid gap-3">
            {[
              { name: "Radisson Blu Hotel Kigali", rating: 4.8, price: "RWF 180,000", amenities: "Pool • Spa • Restaurant" },
              { name: "Kigali Marriott Hotel", rating: 4.9, price: "RWF 200,000", amenities: "Gym • Bar • Conference" },
              { name: "Kigali Serena Hotel", rating: 4.7, price: "RWF 175,000", amenities: "Garden • WiFi • Parking" },
            ].map((hotel, index) => (
              <Card key={index} className="p-4 hover:shadow-lg transition-all cursor-pointer">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">{hotel.name}</h3>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-gold text-gold" />
                    <span className="text-sm font-medium">{hotel.rating}</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mb-3">{hotel.amenities}</p>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-primary">{hotel.price}/night</span>
                  <Button size="sm">Book Now</Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Experiences Grid */}
        <div className="space-y-4">
          <h2 className="font-semibold">Popular Experiences</h2>
          <div className="grid gap-4">
            {experiences.map((experience, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-all cursor-pointer">
                <div className="flex gap-4 p-4">
                  {/* Image */}
                  <div className="w-24 h-24 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                    {typeof experience.image === 'string' && experience.image.startsWith('�') ? (
                      <div className="w-full h-full bg-gradient-to-br from-primary/10 to-gold/10 flex items-center justify-center text-4xl">
                        {experience.image}
                      </div>
                    ) : (
                      <img 
                        src={experience.image} 
                        alt={experience.title}
                        className="w-full h-full object-cover"
                      />
                    )}
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
