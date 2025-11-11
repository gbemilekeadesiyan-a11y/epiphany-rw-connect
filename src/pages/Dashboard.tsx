import { useNavigate } from "react-router-dom";
import { Car, UtensilsCrossed, MapPin, ShoppingBag, Wallet, User, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import ServiceCard from "@/components/ServiceCard";
import BottomNav from "@/components/BottomNav";
import heroImage from "@/assets/kigali-hero.jpg";

const Dashboard = () => {
  const navigate = useNavigate();

  const services = [
    {
      icon: Car,
      title: "Rides",
      description: "Car, moto, or bicycle on demand",
      color: "bg-primary/10 text-primary",
      path: "/rides",
    },
    {
      icon: UtensilsCrossed,
      title: "Food Delivery",
      description: "Order from local restaurants & vendors",
      color: "bg-gold/10 text-gold-foreground",
      path: "/food",
    },
    {
      icon: MapPin,
      title: "Tourism",
      description: "Discover Rwanda's culture & experiences",
      color: "bg-green-500/10 text-green-700",
      path: "/tourism",
    },
    {
      icon: ShoppingBag,
      title: "Marketplace",
      description: "Local products, art & souvenirs",
      color: "bg-purple-500/10 text-purple-700",
      path: "/marketplace",
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="bg-primary text-primary-foreground">
        <div className="px-4 pt-6 pb-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold">Welcome back!</h1>
              <p className="text-primary-foreground/80 text-sm">How can we help you today?</p>
            </div>
            <div className="flex gap-2">
              <Button
                size="icon"
                variant="ghost"
                className="text-primary-foreground hover:bg-primary-foreground/10"
              >
                <Bell className="h-5 w-5" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => navigate("/profile")}
                className="text-primary-foreground hover:bg-primary-foreground/10"
              >
                <User className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Hero Banner */}
          <Card className="overflow-hidden border-0">
            <div className="relative h-32">
              <img
                src={heroImage}
                alt="Kigali"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-transparent flex items-center px-4">
                <div className="text-white">
                  <p className="text-sm font-medium">Explore Rwanda</p>
                  <p className="text-xs opacity-90">1000+ experiences available</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </header>

      {/* Services Grid */}
      <main className="px-4 py-6">
        <h2 className="text-lg font-semibold mb-4">Our Services</h2>
        <div className="grid gap-4">
          {services.map((service) => (
            <ServiceCard
              key={service.title}
              {...service}
              onClick={() => navigate(service.path)}
            />
          ))}
        </div>

        {/* Quick Access to Wallet */}
        <Card className="mt-6 p-6 bg-gradient-to-br from-gold/10 to-gold/5 border-gold/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gold/20 rounded-xl">
                <Wallet className="h-6 w-6 text-gold-foreground" />
              </div>
              <div>
                <h3 className="font-semibold">Digital Wallet</h3>
                <p className="text-sm text-muted-foreground">Balance: RWF 25,000</p>
              </div>
            </div>
            <Button
              variant="outline"
              onClick={() => navigate("/wallet")}
              className="border-gold/40 hover:bg-gold/10"
            >
              View
            </Button>
          </div>
        </Card>
      </main>

      <BottomNav />
    </div>
  );
};

export default Dashboard;
