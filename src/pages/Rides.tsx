import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, Navigation, Clock, Car, Bike, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
        {/* Map Placeholder */}
        <Card className="h-48 bg-muted flex items-center justify-center overflow-hidden">
          <div className="text-center text-muted-foreground">
            <MapPin className="h-12 w-12 mx-auto mb-2 opacity-50" />
            <p className="text-sm">Map view will appear here</p>
            <p className="text-xs">Live tracking of driver location</p>
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
