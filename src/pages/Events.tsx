import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import AppHeader from "@/components/AppHeader";
import BottomNav from "@/components/BottomNav";
import { Calendar, MapPin, Ticket, RefreshCw, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  venue: string;
  location: string;
  price: string;
  category: string;
  is_featured: boolean;
}

const categoryColors: Record<string, string> = {
  "Music": "bg-pink-500/10 text-pink-700 dark:text-pink-400",
  "Sports": "bg-green-500/10 text-green-700 dark:text-green-400",
  "Culture": "bg-amber-500/10 text-amber-700 dark:text-amber-400",
  "Business": "bg-blue-500/10 text-blue-700 dark:text-blue-400",
  "Art": "bg-purple-500/10 text-purple-700 dark:text-purple-400",
};

const Events = () => {
  const { toast } = useToast();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = ["Music", "Sports", "Culture", "Business", "Art"];

  const fetchEvents = async () => {
    const { data, error } = await supabase.from("events").select("*").order("date", { ascending: true });
    if (!error) setEvents(data || []);
    setLoading(false);
  };

  const refreshContent = async () => {
    setRefreshing(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/fetch-rwanda-content`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}` },
        body: JSON.stringify({ type: "events" }),
      });
      if (!response.ok) throw new Error("Failed to refresh");
      toast({ title: "Events updated!", description: "Latest events loaded." });
      await fetchEvents();
    } catch (error) {
      toast({ title: "Refresh failed", variant: "destructive" });
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => { fetchEvents(); }, []);

  const filteredEvents = selectedCategory ? events.filter((e) => e.category === selectedCategory) : events;
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return { day: date.getDate(), month: date.toLocaleDateString("en-US", { month: "short" }) };
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <AppHeader title="Events" subtitle="Concerts, sports & festivals" showBack={false} showProfile={true}>
        <div className="flex items-center justify-between mt-4">
          <p className="text-sm text-muted-foreground">{filteredEvents.length} events</p>
          <Button variant="ghost" size="sm" onClick={refreshContent} disabled={refreshing} className="gap-2">
            <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
            {refreshing ? "Updating..." : "Refresh"}
          </Button>
        </div>
      </AppHeader>

      <main className="px-4 py-6">
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          <Badge variant={!selectedCategory ? "default" : "outline"} className="cursor-pointer px-4 py-2" onClick={() => setSelectedCategory(null)}>All</Badge>
          {categories.map((cat) => (
            <Badge key={cat} variant={selectedCategory === cat ? "default" : "outline"} className="cursor-pointer px-4 py-2" onClick={() => setSelectedCategory(cat)}>{cat}</Badge>
          ))}
        </div>

        {loading ? (
          <div className="space-y-4">{[1,2,3].map((i) => <Skeleton key={i} className="h-32 w-full rounded-2xl" />)}</div>
        ) : events.length === 0 ? (
          <Card className="p-8 text-center">
            <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="font-semibold mb-2">No events yet</h3>
            <Button onClick={refreshContent} disabled={refreshing}><RefreshCw className="h-4 w-4 mr-2" />Load Events</Button>
          </Card>
        ) : (
          <div className="space-y-3">
            {filteredEvents.map((event) => {
              const { day, month } = formatDate(event.date);
              return (
                <Card key={event.id} className="overflow-hidden hover:shadow-md transition-all">
                  <CardContent className="p-4 flex gap-4">
                    <div className="w-16 h-16 rounded-xl bg-primary/10 flex flex-col items-center justify-center flex-shrink-0">
                      <p className="text-xl font-bold text-primary">{day}</p>
                      <p className="text-xs text-muted-foreground">{month}</p>
                    </div>
                    <div className="flex-1 min-w-0">
                      <Badge className={`mb-1 text-xs ${categoryColors[event.category] || ""}`}>{event.category}</Badge>
                      <h3 className="font-semibold line-clamp-1">{event.title}</h3>
                      <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1"><MapPin className="h-3 w-3" />{event.venue}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-sm font-semibold">{event.price}</span>
                        <Button size="sm" variant="outline" className="h-7 text-xs gap-1"><Ticket className="h-3 w-3" />Book</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </main>
      <BottomNav />
    </div>
  );
};

export default Events;