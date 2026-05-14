import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import AppHeader from "@/components/AppHeader";
import BottomNav from "@/components/BottomNav";
import { BookOpen, TrendingUp, Plane, Briefcase, RefreshCw, Clock, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Article {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  author: string;
  image_url: string | null;
  published_at: string;
}

const categoryIcons: Record<string, any> = {
  "News": TrendingUp,
  "Travel": Plane,
  "Business": Briefcase,
};

const categoryColors: Record<string, string> = {
  "News": "bg-blue-500/10 text-blue-700 dark:text-blue-400",
  "Travel": "bg-green-500/10 text-green-700 dark:text-green-400",
  "Business": "bg-purple-500/10 text-purple-700 dark:text-purple-400",
};

const Articles = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const categories = ["News", "Travel", "Business"];

  const fetchArticles = async () => {
    const { data, error } = await supabase
      .from("articles")
      .select("*")
      .order("published_at", { ascending: false });

    if (error) {
      console.error("Error fetching articles:", error);
    } else {
      setArticles(data || []);
    }
    setLoading(false);
  };

  const refreshContent = async () => {
    setRefreshing(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/fetch-rwanda-content`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ type: "articles" }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to refresh");
      }

      toast({
        title: "Articles refreshed!",
        description: "New articles have been loaded.",
      });
      await fetchArticles();
    } catch (error) {
      toast({
        title: "Refresh failed",
        description: error instanceof Error ? error.message : "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const filteredArticles = selectedCategory
    ? articles.filter((a) => a.category === selectedCategory)
    : articles;

  const featuredArticle = articles[0];

  if (selectedArticle) {
    const Icon = categoryIcons[selectedArticle.category] || BookOpen;
    return (
      <div className="min-h-screen bg-background pb-20">
        <AppHeader title="Article" showBack={true} showProfile={false} />
        
        <main className="px-4 py-6 max-w-2xl mx-auto">
          <Badge className={`mb-4 ${categoryColors[selectedArticle.category]}`}>
            <Icon className="h-3 w-3 mr-1" />
            {selectedArticle.category}
          </Badge>
          
          <h1 className="text-2xl md:text-3xl font-bold mb-4 leading-tight">
            {selectedArticle.title}
          </h1>
          
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
            <span className="flex items-center gap-1">
              <User className="h-4 w-4" />
              {selectedArticle.author}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {new Date(selectedArticle.published_at).toLocaleDateString()}
            </span>
          </div>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-lg text-muted-foreground mb-6 font-medium">
              {selectedArticle.summary}
            </p>
            <div className="whitespace-pre-wrap text-foreground leading-relaxed">
              {selectedArticle.content}
            </div>
          </div>

          <Button
            variant="outline"
            className="mt-8"
            onClick={() => setSelectedArticle(null)}
          >
            ← Back to Articles
          </Button>
        </main>

        <BottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <AppHeader
        title="Articles"
        subtitle="Stories from Rwanda"
        showBack={false}
        showProfile={true}
      >
        <div className="flex items-center justify-between mt-4">
          <p className="text-sm text-muted-foreground">
            {articles.length} articles
          </p>
          <Button
            variant="ghost"
            size="sm"
            onClick={refreshContent}
            disabled={refreshing}
            className="gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
            {refreshing ? "Updating..." : "Refresh"}
          </Button>
        </div>
      </AppHeader>

      <main className="px-4 py-6">
        {/* Category Filter */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
          <Badge
            variant={selectedCategory === null ? "default" : "outline"}
            className="cursor-pointer whitespace-nowrap px-4 py-2"
            onClick={() => setSelectedCategory(null)}
          >
            All
          </Badge>
          {categories.map((cat) => {
            const Icon = categoryIcons[cat];
            return (
              <Badge
                key={cat}
                variant={selectedCategory === cat ? "default" : "outline"}
                className="cursor-pointer whitespace-nowrap px-4 py-2 gap-1"
                onClick={() => setSelectedCategory(cat)}
              >
                <Icon className="h-3 w-3" />
                {cat}
              </Badge>
            );
          })}
        </div>

        {loading ? (
          <div className="space-y-4">
            <Skeleton className="h-48 w-full rounded-2xl" />
            <div className="grid gap-4">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-32 w-full rounded-xl" />
              ))}
            </div>
          </div>
        ) : articles.length === 0 ? (
          <Card className="p-8 text-center">
            <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="font-semibold mb-2">No articles yet</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Tap refresh to load articles about Rwanda
            </p>
            <Button onClick={refreshContent} disabled={refreshing}>
              <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? "animate-spin" : ""}`} />
              Load Articles
            </Button>
          </Card>
        ) : (
          <>
            {/* Featured Article */}
            {featuredArticle && !selectedCategory && (
              <Card 
                className="overflow-hidden mb-6 cursor-pointer hover:shadow-lg transition-all group border-l-4 border-l-primary"
                onClick={() => setSelectedArticle(featuredArticle)}
              >
                {featuredArticle.image_url && (
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={featuredArticle.image_url}
                      alt={featuredArticle.title}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
                  </div>
                )}
                <CardContent className="p-5">
                  <Badge className={`mb-3 ${categoryColors[featuredArticle.category]}`}>
                    {featuredArticle.category}
                  </Badge>
                  <h2 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {featuredArticle.title}
                  </h2>
                  <p className="text-muted-foreground text-sm line-clamp-3">
                    {featuredArticle.summary}
                  </p>
                  <div className="flex items-center gap-3 mt-4 text-xs text-muted-foreground">
                    <span>{featuredArticle.author}</span>
                    <span>•</span>
                    <span>{new Date(featuredArticle.published_at).toLocaleDateString()}</span>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Article Grid */}
            <div className="grid gap-4">
              {(selectedCategory ? filteredArticles : filteredArticles.slice(1)).map((article) => {
                const Icon = categoryIcons[article.category] || BookOpen;
                return (
                  <Card
                    key={article.id}
                    className="overflow-hidden cursor-pointer hover:shadow-md transition-all group"
                    onClick={() => setSelectedArticle(article)}
                  >
                    <CardContent className="p-4 flex gap-4">
                      {article.image_url ? (
                        <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 relative">
                          <img
                            src={article.image_url}
                            alt={article.title}
                            loading="lazy"
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                      ) : (
                        <div className="w-1.5 rounded-full bg-primary/40 flex-shrink-0" />
                      )}
                      <div className="flex-1 min-w-0">
                        <Badge className={`mb-2 text-xs ${categoryColors[article.category]}`}>
                          {article.category}
                        </Badge>
                        <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-primary transition-colors">
                          {article.title}
                        </h3>
                        {!article.image_url && article.summary && (
                          <p className="text-xs text-muted-foreground line-clamp-2 mt-1">{article.summary}</p>
                        )}
                        <p className="text-xs text-muted-foreground mt-1 flex items-center gap-2">
                          <span>{article.author}</span>
                          <span>·</span>
                          <span>{new Date(article.published_at).toLocaleDateString()}</span>
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </>
        )}
      </main>

      <BottomNav />
    </div>
  );
};

export default Articles;
