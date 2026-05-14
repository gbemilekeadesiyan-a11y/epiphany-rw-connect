import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import AppHeader from "@/components/AppHeader";
import BottomNav from "@/components/BottomNav";
import { ShoppingBag, MapPin, RefreshCw, ShoppingCart, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";


interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  category: string;
  seller_name: string;
  seller_location: string;
}

const categoryColors: Record<string, string> = {
  "Crafts": "bg-amber-500/10 text-amber-700",
  "Coffee & Tea": "bg-emerald-500/10 text-emerald-700",
  "Food": "bg-orange-500/10 text-orange-700",
  "Fabric": "bg-pink-500/10 text-pink-700",
  "Art": "bg-purple-500/10 text-purple-700",
  "Jewelry": "bg-cyan-500/10 text-cyan-700",
};

const Marketplace = () => {
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["Crafts", "Coffee & Tea", "Food", "Fabric", "Art", "Jewelry"];

  const fetchProducts = async () => {
    const { data, error } = await supabase.from("marketplace_products").select("*").order("created_at", { ascending: false });
    if (!error) setProducts(data || []);
    setLoading(false);
  };

  const refreshContent = async () => {
    setRefreshing(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/fetch-rwanda-content`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}` },
        body: JSON.stringify({ type: "marketplace" }),
      });
      if (!response.ok) throw new Error("Failed");
      toast({ title: "Products updated!" });
      await fetchProducts();
    } catch { toast({ title: "Refresh failed", variant: "destructive" }); }
    finally { setRefreshing(false); }
  };

  useEffect(() => { fetchProducts(); }, []);

  const filteredProducts = products.filter((p) => {
    const matchesCategory = !selectedCategory || p.category === selectedCategory;
    const matchesSearch = !searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background pb-20">
      <AppHeader title="Marketplace" subtitle="Authentic Rwandan products" showBack={false} showProfile={true}>
        <div className="mt-4 space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search products..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10" />
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">{filteredProducts.length} products</p>
            <Button variant="ghost" size="sm" onClick={refreshContent} disabled={refreshing} className="gap-2">
              <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />{refreshing ? "Updating..." : "Refresh"}
            </Button>
          </div>
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
          <div className="grid grid-cols-2 gap-3">{[1,2,3,4].map((i) => <Skeleton key={i} className="h-56 w-full rounded-2xl" />)}</div>
        ) : products.length === 0 ? (
          <Card className="p-8 text-center">
            <ShoppingBag className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="font-semibold mb-2">No products yet</h3>
            <Button onClick={refreshContent} disabled={refreshing}><RefreshCw className="h-4 w-4 mr-2" />Load Products</Button>
          </Card>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-all">
                <div className="aspect-square overflow-hidden relative bg-muted">
                  <img src={marketImg} alt={product.name} loading="lazy" className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>
                <CardContent className="p-3">
                  <Badge className={`mb-2 text-[10px] ${categoryColors[product.category] || ""}`}>{product.category}</Badge>
                  <h3 className="font-semibold text-sm line-clamp-2 min-h-[40px]">{product.name}</h3>
                  <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1"><MapPin className="h-3 w-3" />{product.seller_location}</p>
                  <div className="flex items-center justify-between mt-3">
                    <span className="font-bold text-sm">{product.currency} {product.price.toLocaleString()}</span>
                    <Button size="icon" variant="outline" className="h-8 w-8"><ShoppingCart className="h-4 w-4" /></Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
      <BottomNav />
    </div>
  );
};

export default Marketplace;