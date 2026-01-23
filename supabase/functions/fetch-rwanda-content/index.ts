import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.91.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { type } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!);

    let prompt = "";
    let toolDefinition: any = null;

    if (type === "events") {
      prompt = `Generate 8 realistic upcoming events happening in Rwanda in 2025. Include a mix of:
- Music concerts and festivals
- Sports events (football, basketball)
- Cultural festivals and celebrations
- Business conferences
- Art exhibitions

For each event provide realistic details that would be found in Rwanda. Use real venue names like BK Arena, Amahoro Stadium, Kigali Convention Centre, etc.`;

      toolDefinition = {
        type: "function",
        function: {
          name: "store_events",
          description: "Store Rwanda events data",
          parameters: {
            type: "object",
            properties: {
              events: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    title: { type: "string" },
                    description: { type: "string" },
                    date: { type: "string", description: "ISO 8601 date format" },
                    venue: { type: "string" },
                    location: { type: "string" },
                    price: { type: "string", description: "Price in RWF or 'Free'" },
                    category: { type: "string", enum: ["Music", "Sports", "Culture", "Business", "Art"] },
                    is_featured: { type: "boolean" }
                  },
                  required: ["title", "description", "date", "venue", "location", "price", "category"]
                }
              }
            },
            required: ["events"]
          }
        }
      };
    } else if (type === "marketplace") {
      prompt = `Generate 12 authentic Rwandan marketplace products. Include:
- Traditional handcrafts (Imigongo art, Agaseke baskets)
- Rwandan coffee and tea
- Local honey and food products
- Kitenge fabrics and clothing
- Wooden sculptures and carvings
- Jewelry and accessories

Use realistic Rwandan seller names and locations (Kigali, Musanze, Huye, Rubavu, etc.). Prices should be in RWF and realistic.`;

      toolDefinition = {
        type: "function",
        function: {
          name: "store_products",
          description: "Store marketplace products data",
          parameters: {
            type: "object",
            properties: {
              products: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    name: { type: "string" },
                    description: { type: "string" },
                    price: { type: "number" },
                    category: { type: "string", enum: ["Crafts", "Coffee & Tea", "Food", "Fabric", "Art", "Jewelry"] },
                    seller_name: { type: "string" },
                    seller_location: { type: "string" }
                  },
                  required: ["name", "description", "price", "category", "seller_name", "seller_location"]
                }
              }
            },
            required: ["products"]
          }
        }
      };
    } else if (type === "articles") {
      prompt = `Generate 10 informative articles about Rwanda covering these categories:
- News: Recent developments in technology, economy, sustainability
- Travel: Must-visit destinations, hidden gems, travel tips
- Business: Investment opportunities, startup ecosystem, trade

Each article should be informative and highlight Rwanda's progress and opportunities.`;

      toolDefinition = {
        type: "function",
        function: {
          name: "store_articles",
          description: "Store articles about Rwanda",
          parameters: {
            type: "object",
            properties: {
              articles: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    title: { type: "string" },
                    summary: { type: "string", description: "2-3 sentence summary" },
                    content: { type: "string", description: "Full article content, 3-4 paragraphs" },
                    category: { type: "string", enum: ["News", "Travel", "Business"] },
                    author: { type: "string" }
                  },
                  required: ["title", "summary", "content", "category", "author"]
                }
              }
            },
            required: ["articles"]
          }
        }
      };
    } else {
      return new Response(JSON.stringify({ error: "Invalid type" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: "You are a knowledgeable assistant about Rwanda. Generate realistic, accurate, and current information." },
          { role: "user", content: prompt }
        ],
        tools: [toolDefinition],
        tool_choice: { type: "function", function: { name: toolDefinition.function.name } }
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limited. Please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Usage limit reached." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      
      throw new Error("Failed to fetch AI content");
    }

    const data = await response.json();
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
    
    if (!toolCall) {
      throw new Error("No tool call in response");
    }

    const parsedArgs = JSON.parse(toolCall.function.arguments);

    // Store in database based on type
    if (type === "events" && parsedArgs.events) {
      // Clear existing events first
      await supabase.from("events").delete().neq("id", "00000000-0000-0000-0000-000000000000");
      
      const eventsToInsert = parsedArgs.events.map((event: any) => ({
        title: event.title,
        description: event.description,
        date: event.date,
        venue: event.venue,
        location: event.location,
        price: event.price,
        category: event.category,
        is_featured: event.is_featured || false,
      }));
      
      const { error } = await supabase.from("events").insert(eventsToInsert);
      if (error) throw error;
    } else if (type === "marketplace" && parsedArgs.products) {
      await supabase.from("marketplace_products").delete().neq("id", "00000000-0000-0000-0000-000000000000");
      
      const productsToInsert = parsedArgs.products.map((product: any) => ({
        name: product.name,
        description: product.description,
        price: product.price,
        category: product.category,
        seller_name: product.seller_name,
        seller_location: product.seller_location,
      }));
      
      const { error } = await supabase.from("marketplace_products").insert(productsToInsert);
      if (error) throw error;
    } else if (type === "articles" && parsedArgs.articles) {
      await supabase.from("articles").delete().neq("id", "00000000-0000-0000-0000-000000000000");
      
      const articlesToInsert = parsedArgs.articles.map((article: any) => ({
        title: article.title,
        summary: article.summary,
        content: article.content,
        category: article.category,
        author: article.author,
      }));
      
      const { error } = await supabase.from("articles").insert(articlesToInsert);
      if (error) throw error;
    }

    return new Response(JSON.stringify({ success: true, message: `${type} updated successfully` }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("Error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
