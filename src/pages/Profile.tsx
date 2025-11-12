import { useNavigate } from "react-router-dom";
import { User, Phone, Mail, MapPin, Star, Settings, HelpCircle, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import BottomNav from "@/components/BottomNav";
import AppHeader from "@/components/AppHeader";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";

const Profile = () => {
  const navigate = useNavigate();

  const menuItems = [
    { icon: Settings, label: "Account Settings", path: "#" },
    { icon: Star, label: "Rewards & Loyalty", path: "#", badge: "5 rewards" },
    { icon: HelpCircle, label: "Help & Support", path: "#" },
    { icon: LogOut, label: "Log Out", path: "#", variant: "destructive" },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      <AppHeader title="Profile" subtitle="Manage your account" />

      <main className="p-4 space-y-6">
        {/* Profile Card */}
        <Card className="p-6">
          <div className="flex items-start gap-4">
            <Avatar className="h-20 w-20">
              <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                JD
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h2 className="text-xl font-bold">John Doe</h2>
                  <Badge variant="secondary" className="mt-1">
                    <Star className="h-3 w-3 mr-1 fill-gold text-gold" />
                    Gold Member
                  </Badge>
                </div>
                <Button variant="outline" size="sm">
                  Edit
                </Button>
              </div>
              
              <div className="space-y-1 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Mail className="h-3 w-3" />
                  <span>john.doe@email.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-3 w-3" />
                  <span>+250 788 123 456</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-3 w-3" />
                  <span>Kigali, Rwanda</span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          <Card className="p-4 text-center">
            <p className="text-2xl font-bold text-primary">47</p>
            <p className="text-xs text-muted-foreground">Total Rides</p>
          </Card>
          <Card className="p-4 text-center">
            <p className="text-2xl font-bold text-gold-foreground">23</p>
            <p className="text-xs text-muted-foreground">Orders</p>
          </Card>
          <Card className="p-4 text-center">
            <p className="text-2xl font-bold text-green-600">12</p>
            <p className="text-xs text-muted-foreground">Experiences</p>
          </Card>
        </div>

        {/* Theme Switcher */}
        <ThemeSwitcher />

        {/* Menu Items */}
        <div className="space-y-2">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const isDestructive = item.variant === "destructive";
            
            return (
              <Card
                key={index}
                className={`p-4 cursor-pointer hover:shadow-md transition-all ${
                  isDestructive ? "hover:border-destructive/50" : ""
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${
                      isDestructive ? "bg-destructive/10" : "bg-primary/10"
                    }`}>
                      <Icon className={`h-5 w-5 ${
                        isDestructive ? "text-destructive" : "text-primary"
                      }`} />
                    </div>
                    <span className={`font-medium ${
                      isDestructive ? "text-destructive" : ""
                    }`}>
                      {item.label}
                    </span>
                  </div>
                  {item.badge && (
                    <Badge variant="secondary">{item.badge}</Badge>
                  )}
                </div>
              </Card>
            );
          })}
        </div>

        {/* App Info */}
        <div className="text-center text-sm text-muted-foreground pt-4 space-y-1">
          <p>Epiphany v1.0.0</p>
          <p>Powered by Mind Storms®</p>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default Profile;
