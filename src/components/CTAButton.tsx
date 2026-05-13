import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface CTAButtonProps {
  children: React.ReactNode;
  to?: string;
  variant?: "primary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
  showArrow?: boolean;
}

const CTAButton = ({
  children,
  to = "/app",
  variant = "primary",
  size = "md",
  className,
  showArrow = true,
}: CTAButtonProps) => {
  const navigate = useNavigate();

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  if (variant === "primary") {
    return (
      <button
        onClick={() => navigate(to)}
        className={cn(
          "group relative inline-flex items-center justify-center gap-2 font-semibold rounded-full overflow-hidden",
          "bg-gold text-gold-foreground shadow-[0_8px_30px_-8px_hsl(var(--gold)/0.6)]",
          "transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_12px_40px_-8px_hsl(var(--gold)/0.8)]",
          "active:scale-95",
          sizes[size],
          className
        )}
      >
        {/* animated shine */}
        <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
        {/* glow pulse */}
        <span className="absolute inset-0 rounded-full bg-gold opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500" />
        <span className="relative z-10">{children}</span>
        {showArrow && (
          <ArrowRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        )}
      </button>
    );
  }

  if (variant === "outline") {
    return (
      <button
        onClick={() => navigate(to)}
        className={cn(
          "group relative inline-flex items-center justify-center gap-2 font-semibold rounded-full",
          "border-2 border-white/30 text-white backdrop-blur-sm bg-white/5",
          "transition-all duration-300 hover:border-gold hover:bg-white/10 hover:scale-[1.03]",
          sizes[size],
          className
        )}
      >
        <span>{children}</span>
        {showArrow && (
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        )}
      </button>
    );
  }

  return (
    <button
      onClick={() => navigate(to)}
      className={cn(
        "group inline-flex items-center gap-1 font-medium text-gold hover:text-gold/80 transition-colors",
        className
      )}
    >
      <span className="relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-right after:scale-x-0 after:bg-gold after:transition-transform after:duration-300 group-hover:after:origin-left group-hover:after:scale-x-100">
        {children}
      </span>
      {showArrow && <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />}
    </button>
  );
};

export default CTAButton;
