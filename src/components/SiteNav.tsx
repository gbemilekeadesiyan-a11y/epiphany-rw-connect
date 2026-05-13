import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import EpiphanyLogo from "./EpiphanyLogo";
import CTAButton from "./CTAButton";
import { cn } from "@/lib/utils";

const links = [
  { label: "Tourism", to: "/#tourism" },
  { label: "Marketplace", to: "/#marketplace" },
  { label: "Events", to: "/#events" },
  { label: "Articles", to: "/#articles" },
];

const SiteNav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-primary/80 backdrop-blur-xl border-b border-white/10 py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <EpiphanyLogo className="w-12 h-12 transition-transform group-hover:rotate-6" />
          <span className="text-white text-xl font-bold tracking-tight hidden sm:inline">
            Epiphany
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.to}
              href={l.to}
              className="text-white/80 hover:text-gold text-sm font-medium transition-colors relative group"
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <CTAButton size="sm">Try the App</CTAButton>
        </div>

        <button
          className="md:hidden text-white p-2"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-primary/95 backdrop-blur-xl border-t border-white/10 animate-fade-in-out">
          <div className="container mx-auto px-4 py-6 flex flex-col gap-4">
            {links.map((l) => (
              <a
                key={l.to}
                href={l.to}
                onClick={() => setOpen(false)}
                className="text-white/90 hover:text-gold py-2 text-base font-medium"
              >
                {l.label}
              </a>
            ))}
            <CTAButton size="sm" className="w-full justify-center">
              Try the App
            </CTAButton>
          </div>
        </div>
      )}
    </header>
  );
};

export default SiteNav;
