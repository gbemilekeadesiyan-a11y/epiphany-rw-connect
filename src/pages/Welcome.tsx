import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import logo from "@/assets/epiphany-logo.png";

const Welcome = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Auto-navigate after 2 seconds for demo purposes
    const timer = setTimeout(() => {
      // For MVP, we'll skip login and go straight to dashboard
      // In production, this would check auth status
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary to-primary/80 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative Rwandan pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full" style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, hsl(var(--gold)) 35px, hsl(var(--gold)) 36px)`,
        }} />
      </div>

      <div className="relative z-10 text-center space-y-8 animate-in fade-in duration-700">
        {/* Logo */}
        <div className="flex justify-center">
          <img src={logo} alt="Epiphany Logo" className="w-32 h-32 animate-in zoom-in duration-500" />
        </div>

        {/* App Name */}
        <div className="space-y-2">
          <h1 className="text-5xl font-bold text-white tracking-tight">
            Epiphany
          </h1>
          <p className="text-xl text-white/90 font-light">
            Where Rwanda moves, eats, and connects
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col gap-3 max-w-sm mx-auto pt-8">
          <Button
            size="lg"
            onClick={() => navigate("/dashboard")}
            className="bg-gold text-gold-foreground hover:bg-gold/90 font-semibold shadow-lg hover:shadow-xl transition-all"
          >
            Get Started
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => navigate("/dashboard")}
            className="border-white text-white hover:bg-white/10"
          >
            Continue as Guest
          </Button>
        </div>

        {/* Powered by */}
        <p className="text-white/70 text-sm pt-4">
          Powered by Mind Storms®
        </p>
      </div>
    </div>
  );
};

export default Welcome;
