import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, Navigation, Clock, Car, Bike, User, Users, Share2, Route } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import BottomNav from "@/components/BottomNav";

const Rides = () => {
  const navigate = useNavigate();
  const [selectedVehicle, setSelectedVehicle] = useState<string>("moto");

  const vehicles = [
    { id: "car", name: "Car", icon: Car, price: "RWF 5,000", eta: "5 min" },
    { id: "moto", name: "Moto", icon: Bike, price: "RWF 2,000", eta: "3 min" },
    { id: "bicycle", name: "Bicycle", icon: User, price: "RWF 1,000", eta: "8 min" },
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
            <h1 className="text-xl font-bold">Book a Ride</h1>
            <p className="text-sm text-primary-foreground/80">Quick and affordable transport</p>
          </div>
        </div>
      </header>

      <main className="p-4 space-y-6">
        {/* Live Route Preview */}
        <Card className="relative h-52 bg-gradient-to-br from-primary/10 to-accent/5 overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <Route className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p className="text-sm font-medium">Live Route Preview</p>
              <p className="text-xs">Real-time driver tracking</p>
            </div>
          </div>
          {/* Trip Sharing Badge */}
          <div className="absolute top-3 right-3">
            <Badge className="bg-primary text-primary-foreground flex items-center gap-1">
              <Share2 className="h-3 w-3" />
              Trip Shared
            </Badge>
          </div>
          {/* Mode Switch Bar */}
          <div className="absolute bottom-3 left-3 right-3 flex gap-2">
            <Button size="sm" variant="secondary" className="flex-1 h-8">
              <Car className="h-3 w-3 mr-1" />
              Switch to Car
            </Button>
            <Button size="sm" variant="outline" className="flex-1 h-8">
              <Users className="h-3 w-3 mr-1" />
              Share Ride
            </Button>
          </div>
        </Card>

        {/* Location Inputs */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="pickup">Pickup Location</Label>
            <div className="relative">
              <Navigation className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="pickup"
                placeholder="Current location"
                className="pl-10"
                defaultValue="Kigali City Center"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="dropoff">Drop-off Location</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="dropoff"
                placeholder="Where to?"
                className="pl-10"
              />
            </div>
          </div>
        </div>

        {/* Vehicle Selection */}
        <div className="space-y-3">
          <h2 className="font-semibold">Choose Your Ride</h2>
          <div className="grid gap-3">
            {vehicles.map((vehicle) => {
              const Icon = vehicle.icon;
              const isSelected = selectedVehicle === vehicle.id;
              
              return (
                <Card
                  key={vehicle.id}
                  onClick={() => setSelectedVehicle(vehicle.id)}
                  className={`p-4 cursor-pointer transition-all ${
                    isSelected
                      ? "border-primary border-2 bg-primary/5"
                      : "hover:border-primary/50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${
                        isSelected ? "bg-primary text-primary-foreground" : "bg-muted"
                      }`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-medium">{vehicle.name}</h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>{vehicle.eta}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{vehicle.price}</p>
                      <p className="text-xs text-muted-foreground">Estimated</p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Book Button */}
        <Button
          size="lg"
          className="w-full bg-primary hover:bg-primary/90"
        >
          Request Ride
        </Button>

        {/* Safety Info */}
        <Card className="p-4 bg-muted/50">
          <p className="text-xs text-muted-foreground text-center">
            All drivers are verified. Share your trip with friends for added safety.
          </p>
        </Card>
      </main>

      <BottomNav />
    </div>
  );
};

export default Rides;
