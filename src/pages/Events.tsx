import { useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, MapPin, Music, Trophy, PartyPopper, Clock, Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import BottomNav from "@/components/BottomNav";

const Events = () => {
  const navigate = useNavigate();

  const categories = [
    { name: "All", icon: Calendar },
    { name: "Concerts", icon: Music },
    { name: "Sports", icon: Trophy },
    { name: "Festivals", icon: PartyPopper },
  ];

  const events = [
    {
      title: "Kigali Jazz Junction",
      category: "Concert",
      date: "Dec 15, 2025",
      time: "7:00 PM",
      venue: "Kigali Arena",
      location: "Remera, Kigali",
      price: "RWF 25,000",
      image: "🎵",
      featured: true,
      ticketsLeft: 150,
    },
    {
      title: "APR FC vs Rayon Sports",
      category: "Sports",
      date: "Dec 20, 2025",
      time: "3:00 PM",
      venue: "Kigali Stadium",
      location: "Nyamirambo, Kigali",
      price: "RWF 5,000",
      image: "⚽",
      featured: true,
      ticketsLeft: 500,
    },
    {
      title: "Ubumuntu Arts Festival",
      category: "Festival",
      date: "Jan 5-7, 2026",
      time: "All Day",
      venue: "Kigali Genocide Memorial",
      location: "Gisozi, Kigali",
      price: "RWF 15,000",
      image: "🎭",
      featured: false,
      ticketsLeft: 300,
    },
    {
      title: "Rwanda Film Festival",
      category: "Festival",
      date: "Jan 12-14, 2026",
      time: "6:00 PM",
      venue: "Century Cinema",
      location: "City Center, Kigali",
      price: "RWF 10,000",
      image: "🎬",
      featured: false,
      ticketsLeft: 200,
    },
    {
      title: "Kigali Up Music Festival",
      category: "Concert",
      date: "Feb 1, 2026",
      time: "5:00 PM",
      venue: "Amahoro Stadium",
      location: "Remera, Kigali",
      price: "RWF 50,000",
      image: "🎤",
      featured: true,
      ticketsLeft: 1000,
    },
    {
      title: "Basketball Championship Finals",
      category: "Sports",
      date: "Feb 8, 2026",
      time: "4:00 PM",
      venue: "Kigali Arena",
      location: "Remera, Kigali",
      price: "RWF 8,000",
      image: "🏀",
      featured: false,
      ticketsLeft: 400,
    },
  ];

  const featuredEvents = events.filter((event) => event.featured);

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="bg-primary text-primary-foreground sticky top-0 z-10">
        <div className="flex items-center gap-3 px-4 py-4">
          <Button
            size="icon"
            variant="ghost"
            onClick={() => navigate("/dashboard")}
            className="text-primary-foreground hover:bg-primary-foreground/10"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-xl font-bold">Events</h1>
            <p className="text-sm text-primary-foreground/80">Discover & book tickets</p>
          </div>
        </div>
      </header>

      <main className="px-4 py-6 space-y-6">
        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Badge
                key={category.name}
                variant="secondary"
                className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors whitespace-nowrap px-4 py-2"
              >
                <Icon className="h-4 w-4 mr-1" />
                {category.name}
              </Badge>
            );
          })}
        </div>

        {/* Featured Events */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-lg">Featured Events</h2>
            <Button variant="ghost" size="sm">View All</Button>
          </div>
          <div className="space-y-3">
            {featuredEvents.map((event, index) => (
              <Card key={index} className="p-0 overflow-hidden hover:shadow-lg transition-all cursor-pointer">
                <div className="flex">
                  <div className="w-24 h-24 bg-gradient-to-br from-primary/20 to-gold/20 flex items-center justify-center text-4xl">
                    {event.image}
                  </div>
                  <div className="flex-1 p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-sm mb-1">{event.title}</h3>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          <span>{event.date}</span>
                          <Clock className="h-3 w-3 ml-1" />
                          <span>{event.time}</span>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {event.category}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
                      <MapPin className="h-3 w-3" />
                      <span>{event.venue}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-primary">{event.price}</span>
                      <span className="text-xs text-muted-foreground">
                        {event.ticketsLeft} tickets left
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* All Events */}
        <div className="space-y-3">
          <h2 className="font-semibold text-lg">Upcoming Events</h2>
          <div className="grid gap-3">
            {events.map((event, index) => (
              <Card key={index} className="p-4 hover:shadow-lg transition-all cursor-pointer">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex gap-3">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-gold/20 rounded-lg flex items-center justify-center text-2xl">
                      {event.image}
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{event.title}</h3>
                      <Badge variant="outline" className="text-xs mb-2">
                        {event.category}
                      </Badge>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        <span>{event.date}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground mb-3">
                  <MapPin className="h-3 w-3" />
                  <span>{event.venue}, {event.location}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-semibold text-primary block">{event.price}</span>
                    <span className="text-xs text-muted-foreground">
                      {event.ticketsLeft} left
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <MapPin className="h-4 w-4" />
                      Directions
                    </Button>
                    <Button size="sm">
                      <Ticket className="h-4 w-4 mr-1" />
                      Buy Ticket
                    </Button>
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

export default Events;
