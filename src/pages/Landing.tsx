import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  MapPin,
  ShoppingBag,
  Calendar,
  Newspaper,
  Sparkles,
  Zap,
  Globe,
  Shield,
  ArrowUpRight,
} from "lucide-react";
import SiteNav from "@/components/SiteNav";
import CTAButton from "@/components/CTAButton";
import EpiphanyLogo from "@/components/EpiphanyLogo";
import heroImg from "@/assets/landing-hero.jpg";
import tourismImg from "@/assets/section-tourism.jpg";
import marketplaceImg from "@/assets/section-marketplace.jpg";
import eventsImg from "@/assets/section-events.jpg";
import articlesImg from "@/assets/section-articles.jpg";
import aiPattern from "@/assets/ai-pattern.jpg";

const services = [
  {
    id: "tourism",
    icon: MapPin,
    title: "Tourism & Activities",
    desc: "AI-curated itineraries, hotel bookings, gorilla treks, and the heart of Rwanda's landscapes.",
    image: tourismImg,
  },
  {
    id: "marketplace",
    icon: ShoppingBag,
    title: "Rwandan Marketplace",
    desc: "From Kigali makers to coffee growers — buy authentic Rwandan products in RWF.",
    image: marketplaceImg,
  },
  {
    id: "events",
    icon: Calendar,
    title: "Live Events",
    desc: "Real-time, AI-sourced events happening across Rwanda. Book tickets and get directions.",
    image: eventsImg,
  },
  {
    id: "articles",
    icon: Newspaper,
    title: "Articles & Stories",
    desc: "News, travel guides, business insights, and culture — auto-updated daily.",
    image: articlesImg,
  },
];

const features = [
  { icon: Sparkles, title: "AI Intelligence", desc: "Real-time content sourcing, personalized for you." },
  { icon: Zap, title: "Lightning Fast", desc: "21st-century UX. Built for instant, fluid interaction." },
  { icon: Globe, title: "Made for Rwanda", desc: "Local payments (RWF), local culture, local makers." },
  { icon: Shield, title: "Secure by Default", desc: "Encrypted auth, protected data, modern architecture." },
];

const Landing = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  // Subtle parallax on hero
  useEffect(() => {
    const onScroll = () => {
      if (!heroRef.current) return;
      const y = window.scrollY;
      heroRef.current.style.transform = `translateY(${y * 0.3}px)`;
      heroRef.current.style.opacity = `${Math.max(0, 1 - y / 600)}`;
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-primary text-white overflow-x-hidden">
      <SiteNav />

      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center pt-24 pb-20 overflow-hidden">
        {/* Cinematic image background */}
        <div className="absolute inset-0">
          <img src={heroImg} alt="Kigali skyline at golden hour" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/70 to-primary" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-transparent to-primary/60" />
        </div>
        <div
          className="absolute inset-0 opacity-[0.06] mix-blend-overlay"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, hsl(var(--gold)) 35px, hsl(var(--gold)) 36px)`,
          }}
        />
        {/* Glowing orbs */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-gold/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-gold/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: "1.5s" }} />

        <div ref={heroRef} className="relative z-10 container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/30 bg-gold/5 backdrop-blur-sm mb-8 animate-[slide-up_0.6s_ease-out]">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span className="text-xs font-medium text-gold">Powered by AI · Real-time Rwanda</span>
          </div>

          <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-tight mb-6 animate-[slide-up_0.7s_ease-out]">
            Where Rwanda
            <br />
            <span className="bg-gradient-to-r from-gold via-yellow-300 to-gold bg-clip-text text-transparent">
              moves & connects
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto mb-10 animate-[slide-up_0.8s_ease-out]">
            One intelligent platform for tourism, marketplace, events, and stories — all
            updated in real time by AI. Welcome to the Intelligence Engine of Rwanda.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-[slide-up_0.9s_ease-out]">
            <CTAButton size="lg">Launch Epiphany</CTAButton>
            <CTAButton size="lg" variant="outline" to="/#preview">
              See the App
            </CTAButton>
          </div>

          <p className="mt-8 text-sm text-white/50 animate-[slide-up_1s_ease-out]">
            Free to try · No credit card · Built in Kigali
          </p>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center pt-2">
            <div className="w-1 h-2 bg-gold rounded-full" />
          </div>
        </div>
      </section>

      {/* APP PREVIEW */}
      <section id="preview" className="relative py-24 bg-gradient-to-b from-primary to-primary/95">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-gold text-sm font-semibold tracking-widest uppercase mb-3">App Preview</p>
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">Experience it before you enter</h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              A glimpse of the live Epiphany interface — built for speed, built for Rwanda.
            </p>
          </div>

          {/* Mock device frame */}
          <div className="relative max-w-5xl mx-auto group">
            <div className="absolute -inset-4 bg-gradient-to-r from-gold/30 via-gold/10 to-gold/30 rounded-3xl blur-2xl opacity-50 group-hover:opacity-80 transition-opacity duration-700" />
            <div className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl p-2 shadow-2xl">
              <div className="rounded-2xl bg-primary/60 p-8 min-h-[420px]">
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {services.map((s, i) => (
                    <div
                      key={s.id}
                      className="group/card relative rounded-2xl border border-white/10 bg-white/5 overflow-hidden hover:border-gold/40 transition-all duration-500 hover:-translate-y-2 cursor-pointer animate-[slide-up_0.6s_ease-out]"
                      style={{ animationDelay: `${i * 100}ms` }}
                    >
                      <div className="relative h-28 overflow-hidden">
                        <img src={s.image} alt={s.title} loading="lazy" className="absolute inset-0 w-full h-full object-cover group-hover/card:scale-110 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent" />
                        <div className="absolute bottom-2 left-3 w-8 h-8 rounded-lg bg-gold/90 flex items-center justify-center backdrop-blur-sm">
                          <s.icon className="w-4 h-4 text-gold-foreground" />
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold mb-1 text-sm">{s.title}</h3>
                        <p className="text-xs text-white/60 leading-relaxed line-clamp-2">{s.desc}</p>
                      </div>
                      <ArrowUpRight className="absolute top-3 right-3 w-4 h-4 text-white/70 group-hover/card:text-gold transition-colors" />
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-gold/10 to-transparent border border-gold/20">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-sm text-white/80">Live AI sourcing 24 events across Kigali...</span>
                  </div>
                  <span className="text-xs text-gold font-mono">REAL-TIME</span>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <CTAButton size="lg">Open the App</CTAButton>
          </div>
        </div>
      </section>

      {/* SERVICES SECTIONS */}
      {services.map((s, idx) => (
        <section
          key={s.id}
          id={s.id}
          className={`py-24 ${idx % 2 === 0 ? "bg-primary/95" : "bg-primary/90"}`}
        >
          <div className="container mx-auto px-4">
            <div className={`grid md:grid-cols-2 gap-12 items-center ${idx % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""}`}>
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/20 mb-4">
                  <s.icon className="w-3.5 h-3.5 text-gold" />
                  <span className="text-xs text-gold font-semibold uppercase tracking-wider">
                    {s.title.split(" ")[0]}
                  </span>
                </div>
                <h2 className="text-4xl sm:text-5xl font-bold mb-4">{s.title}</h2>
                <p className="text-white/70 text-lg mb-8 leading-relaxed">{s.desc}</p>
                <CTAButton>Explore in the App</CTAButton>
              </div>

              <div className="relative aspect-square rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-gold/10 via-transparent to-primary/50 group">
                <div className="absolute inset-0 flex items-center justify-center">
                  <s.icon className="w-32 h-32 text-gold/40 group-hover:scale-110 group-hover:text-gold/60 transition-all duration-700" />
                </div>
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: `repeating-linear-gradient(${idx * 30}deg, transparent, transparent 25px, hsl(var(--gold)) 25px, hsl(var(--gold)) 26px)`,
                  }}
                />
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* FEATURES GRID */}
      <section className="py-24 bg-primary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">Built different.</h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              The Intelligence Engine for the modern Rwandan experience.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {features.map((f, i) => (
              <div
                key={f.title}
                className="group p-6 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-gold/40 transition-all duration-500 hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gold to-gold/60 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <f.icon className="w-6 h-6 text-gold-foreground" />
                </div>
                <h3 className="font-bold text-lg mb-2">{f.title}</h3>
                <p className="text-sm text-white/60">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gold/20 via-primary to-primary" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold/10 rounded-full blur-[150px]" />

        <div className="relative z-10 container mx-auto px-4 text-center">
          <EpiphanyLogo className="w-24 h-24 mx-auto mb-8 animate-[fade-in-out_3s_ease-in-out_infinite]" />
          <h2 className="text-5xl sm:text-7xl font-bold mb-6 max-w-4xl mx-auto leading-tight">
            Ready to enter the
            <br />
            <span className="bg-gradient-to-r from-gold to-yellow-200 bg-clip-text text-transparent">
              Intelligence Engine?
            </span>
          </h2>
          <p className="text-xl text-white/80 mb-10 max-w-xl mx-auto">
            Join thousands experiencing Rwanda the modern way.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <CTAButton size="lg">Try Epiphany Now</CTAButton>
            <CTAButton size="lg" variant="outline" to="/app">
              Start Exploring
            </CTAButton>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-primary border-t border-white/10 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <EpiphanyLogo className="w-10 h-10" />
                <span className="text-xl font-bold">Epiphany</span>
              </div>
              <p className="text-sm text-white/60">
                Where Rwanda moves and connects.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-gold text-sm uppercase tracking-wider">Platform</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li><Link to="/app" className="hover:text-gold transition-colors">Launch App</Link></li>
                <li><a href="/#preview" className="hover:text-gold transition-colors">App Preview</a></li>
                <li><Link to="/try" className="hover:text-gold transition-colors">Try Demo</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-gold text-sm uppercase tracking-wider">Services</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li><a href="/#tourism" className="hover:text-gold transition-colors">Tourism</a></li>
                <li><a href="/#marketplace" className="hover:text-gold transition-colors">Marketplace</a></li>
                <li><a href="/#events" className="hover:text-gold transition-colors">Events</a></li>
                <li><a href="/#articles" className="hover:text-gold transition-colors">Articles</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-gold text-sm uppercase tracking-wider">Get Started</h4>
              <CTAButton size="sm" className="w-full justify-center">Enter the Platform</CTAButton>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-white/50">
            <p>© {new Date().getFullYear()} Epiphany. Made in Rwanda.</p>
            <p>Powered by Mind Storms®</p>
          </div>
        </div>
      </footer>

      {/* FLOATING CTA */}
      <div className="fixed bottom-6 right-6 z-40 hidden md:block">
        <CTAButton className="shadow-2xl">Try the App</CTAButton>
      </div>
    </div>
  );
};

export default Landing;
