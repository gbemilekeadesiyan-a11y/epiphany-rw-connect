import { useEffect, useState } from "react";
import logo from "@/assets/epiphany-logo.png";

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(onComplete, 500); // Wait for exit animation
    }, 2000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 bg-gradient-to-br from-primary via-primary to-primary/80 flex flex-col items-center justify-center transition-opacity duration-500 ${
        isExiting ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Decorative Rwandan pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, hsl(var(--gold)) 35px, hsl(var(--gold)) 36px)`,
          }}
        />
      </div>

      {/* Logo with animations */}
      <div className="relative z-10 flex flex-col items-center space-y-6">
        <div
          className={`transition-all duration-700 ${
            isExiting ? "scale-95 opacity-0" : "scale-100 opacity-100 animate-scale-in"
          }`}
        >
          <img
            src={logo}
            alt="Epiphany Logo"
            className="w-32 h-32 animate-fade-in"
            style={{ animationDelay: "0.2s", animationFillMode: "backwards" }}
          />
        </div>

        {/* App name */}
        <div
          className={`text-center space-y-2 transition-all duration-700 ${
            isExiting ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
          }`}
        >
          <h1
            className="text-4xl font-bold text-white tracking-tight animate-fade-in"
            style={{ animationDelay: "0.4s", animationFillMode: "backwards" }}
          >
            Epiphany
          </h1>
          <p
            className="text-lg text-white/90 font-light animate-fade-in"
            style={{ animationDelay: "0.6s", animationFillMode: "backwards" }}
          >
            Where Rwanda moves, eats, and connects
          </p>
        </div>

        {/* Loading indicator */}
        <div
          className="animate-fade-in"
          style={{ animationDelay: "0.8s", animationFillMode: "backwards" }}
        >
          <div className="flex space-x-2">
            <div
              className="w-2 h-2 bg-gold rounded-full animate-pulse"
              style={{ animationDelay: "0s" }}
            />
            <div
              className="w-2 h-2 bg-gold rounded-full animate-pulse"
              style={{ animationDelay: "0.2s" }}
            />
            <div
              className="w-2 h-2 bg-gold rounded-full animate-pulse"
              style={{ animationDelay: "0.4s" }}
            />
          </div>
        </div>
      </div>

      {/* Powered by */}
      <p
        className={`absolute bottom-8 text-white/70 text-sm transition-all duration-700 animate-fade-in ${
          isExiting ? "opacity-0" : "opacity-100"
        }`}
        style={{ animationDelay: "1s", animationFillMode: "backwards" }}
      >
        Powered by Mind Storms®
      </p>
    </div>
  );
};

export default LoadingScreen;
