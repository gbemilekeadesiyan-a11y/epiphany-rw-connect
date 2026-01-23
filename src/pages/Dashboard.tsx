import { useNavigate } from "react-router-dom";
import { MapPin, ShoppingBag, Calendar, BookOpen, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ServiceCard from "@/components/ServiceCard";
import BottomNav from "@/components/BottomNav";
import AppHeader from "@/components/AppHeader";
import { useAuth } from "@/hooks/useAuth";
import heroImage from "@/assets/kigali-city.jpg";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const services = [
    {
      icon: MapPin,
      title: "Tourism",
      description: "Discover Rwanda's breathtaking culture & experiences",
      color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
      path: "/tourism",
    },
    {
      icon: ShoppingBag,
      title: "Marketplace",
      description: "Authentic local products, art & souvenirs",
      color: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
      path: "/marketplace",
    },
    {
      icon: Calendar,
      title: "Events",
      description: "Live concerts, sports & cultural festivals",
      color: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
      path: "/events",
    },
    {
      icon: BookOpen,
      title: "Articles",
      description: "News, travel guides & business insights",
      color: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
      path: "/articles",
    },
  ];

  const firstName = user?.user_metadata?.full_name?.split(' ')[0] || 
                    user?.email?.split('@')[0] || 
                    'Explorer';

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30 pb-24">
      <AppHeader 
        title={`Hello, ${firstName}!`}
        subtitle="What would you like to explore today?" 
        showBack={false}
        showProfile={true}
      >
        {/* Hero Banner */}
        <Card className="overflow-hidden border-0 shadow-xl mt-4">
          <div className="relative h-40 md:h-48">
            <img
              src={heroImage}
              alt="Rwanda landscape"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-transparent flex items-center px-5">
              <div className="text-white max-w-[70%]">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="h-4 w-4" />
                  <span className="text-xs font-medium uppercase tracking-wide opacity-90">Discover</span>
                </div>
                <h2 className="text-xl md:text-2xl font-bold mb-1">Explore Rwanda</h2>
                <p className="text-sm opacity-90">The land of a thousand hills</p>
                <Button 
                  size="sm" 
                  variant="secondary" 
                  className="mt-3 gap-1"
                  onClick={() => navigate("/tourism")}
                >
                  Start Exploring
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </AppHeader>

      {/* Services Grid */}
      <main className="px-4 py-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">Our Services</h2>
          <span className="text-xs text-muted-foreground">
            AI-powered updates
          </span>
        </div>
        
        <div className="grid gap-3 md:grid-cols-2">
          {services.map((service) => (
            <ServiceCard
              key={service.title}
              {...service}
              onClick={() => navigate(service.path)}
            />
          ))}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3 mt-6">
          <Card className="p-4 text-center bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
            <CardContent className="p-0">
              <p className="text-2xl font-bold text-primary">500+</p>
              <p className="text-xs text-muted-foreground mt-1">Experiences</p>
            </CardContent>
          </Card>
          <Card className="p-4 text-center bg-gradient-to-br from-accent/5 to-accent/10 border-accent/20">
            <CardContent className="p-0">
              <p className="text-2xl font-bold text-accent-foreground">100+</p>
              <p className="text-xs text-muted-foreground mt-1">Local Sellers</p>
            </CardContent>
          </Card>
          <Card className="p-4 text-center bg-gradient-to-br from-emerald-500/5 to-emerald-500/10 border-emerald-500/20">
            <CardContent className="p-0">
              <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">50+</p>
              <p className="text-xs text-muted-foreground mt-1">Events</p>
            </CardContent>
          </Card>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default Dashboard;
