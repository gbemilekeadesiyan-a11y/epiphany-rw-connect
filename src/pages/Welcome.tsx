import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

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
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 166 202"
            className="w-40 h-40 text-gold"
          >
            <g className="animate-in zoom-in duration-1000" style={{ animationDelay: "0.3s", animationFillMode: "backwards" }}>
              {/* Top section - slides from top-left */}
              <path 
                d="M 47.77 87.83 L 48.44 82.74 C49.24,76.71 50.30,74.49 53.29,72.58 C55.50,71.17 108.87,56.53 109.50,57.17 C110.06,57.73 107.54,67.37 106.21,69.73 C104.89,72.08 102.60,72.88 79.10,79.23 L 66.69 82.59" 
                fill="currentColor"
                className="animate-[slide-in-from-top-left_0.8s_ease-out_0.5s_backwards]"
              />
              
              {/* Middle-left section - slides from left */}
              <path 
                d="M 49.01 141.59 C49.01,138.15 51.09,131.62 52.78,129.72 C53.65,128.74 56.31,127.45 58.68,126.85 C61.06,126.25 62.99,125.48 62.99,125.13 C62.98,124.78 59.56,122.52 55.39,120.11 C48.10,115.88 47.83,115.59 48.42,112.66 C50.31,103.18 51.01,101.90 55.31,99.95 C57.61,98.90 60.29,98.03 61.25,98.02" 
                fill="currentColor"
                className="animate-[slide-in-from-left_0.8s_ease-out_0.6s_backwards]"
              />
              
              {/* Center section - zooms in */}
              <path 
                d="M 61.25 98.02 C64.48,97.98 63.02,96.52 55.37,92.16 L 47.77 87.83 L 66.69 82.59 L 73.77 86.79 C81.31,91.28 84.11,91.76 91.60,89.87 C94.06,89.25 96.31,88.98 96.60,89.26 C97.62,90.29 94.03,101.53 92.20,103.03" 
                fill="currentColor"
                className="animate-[scale-in_0.8s_ease-out_0.7s_backwards]"
              />
              
              {/* Middle-right section - slides from right */}
              <path 
                d="M 92.20 103.03 C91.17,103.87 85.31,105.84 79.17,107.41 C73.02,108.99 68.01,110.55 68.02,110.89 C68.05,111.76 80.06,118.59 82.72,119.25 C83.94,119.55 90.63,118.29 97.59,116.46 L 110.24 113.12" 
                fill="currentColor"
                className="animate-[slide-in-from-right_0.8s_ease-out_0.8s_backwards]"
              />
              
              {/* Bottom section - slides from bottom */}
              <path 
                d="M 110.24 113.12 L 109.58 118.31 C108.51,126.78 107.00,128.04 93.41,131.77 C51.40,143.31 49.00,143.84 49.01,141.59 M 73.21 122.96 C75.26,122.39 77.18,121.52 77.49,121.02 C78.04,120.12 68.12,113.81 64.18,112.56 C61.41,111.68 54.00,113.73 54.00,115.38 C54.00,116.09 55.01,117.19 56.25,117.82 C57.49,118.45 60.52,120.09 62.98,121.48 C68.08,124.34 68.17,124.36 73.21,122.96" 
                fill="currentColor"
                className="animate-[slide-in-from-bottom_0.8s_ease-out_0.9s_backwards]"
              />
              
              {/* Bottom-center detail - fades in last */}
              <path 
                d="M 72.60 94.87 C75.07,94.25 76.92,93.24 76.72,92.62 C76.52,92.00 73.37,89.77 69.73,87.65 C64.07,84.37 62.53,83.90 59.28,84.45 C57.18,84.81 54.79,85.53 53.98,86.06 C52.74,86.86 52.91,87.33 55.00,88.95 C57.23,90.68 66.86,96.00 67.76,96.00 C67.95,96.00 70.13,95.49 72.60,94.87 Z" 
                fill="currentColor"
                className="animate-[fade-in_0.8s_ease-out_1s_backwards]"
              />
            </g>
          </svg>
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
