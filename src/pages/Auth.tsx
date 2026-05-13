import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Mail, Lock, Loader2, ArrowLeft } from "lucide-react";
import { z } from "zod";

const emailSchema = z.string().email("Please enter a valid email address");
const passwordSchema = z.string().min(6, "Password must be at least 6 characters");

const EpiphanyMark = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 166 202" className={className}>
    <path
      d="M 49.01 141.59 C49.01,138.15 51.09,131.62 52.78,129.72 C53.65,128.74 56.31,127.45 58.68,126.85 C61.06,126.25 62.99,125.48 62.99,125.13 C62.98,124.78 59.56,122.52 55.39,120.11 C48.10,115.88 47.83,115.59 48.42,112.66 C50.31,103.18 51.01,101.90 55.31,99.95 C57.61,98.90 60.29,98.03 61.25,98.02 C64.48,97.98 63.02,96.52 55.37,92.16 L 47.77 87.83 L 48.44 82.74 C49.24,76.71 50.30,74.49 53.29,72.58 C55.50,71.17 108.87,56.53 109.50,57.17 C110.06,57.73 107.54,67.37 106.21,69.73 C104.89,72.08 102.60,72.88 79.10,79.23 L 66.69 82.59 L 73.77 86.79 C81.31,91.28 84.11,91.76 91.60,89.87 C94.06,89.25 96.31,88.98 96.60,89.26 C97.62,90.29 94.03,101.53 92.20,103.03 C91.17,103.87 85.31,105.84 79.17,107.41 C73.02,108.99 68.01,110.55 68.02,110.89 C68.05,111.76 80.06,118.59 82.72,119.25 C83.94,119.55 90.63,118.29 97.59,116.46 L 110.24 113.12 L 109.58 118.31 C108.51,126.78 107.00,128.04 93.41,131.77 C51.40,143.31 49.00,143.84 49.01,141.59 ZM 73.21 122.96 C75.26,122.39 77.18,121.52 77.49,121.02 C78.04,120.12 68.12,113.81 64.18,112.56 C61.41,111.68 54.00,113.73 54.00,115.38 C54.00,116.09 55.01,117.19 56.25,117.82 C57.49,118.45 60.52,120.09 62.98,121.48 C68.08,124.34 68.17,124.36 73.21,122.96 ZM 72.60 94.87 C75.07,94.25 76.92,93.24 76.72,92.62 C76.52,92.00 73.37,89.77 69.73,87.65 C64.07,84.37 62.53,83.90 59.28,84.45 C57.18,84.81 54.79,85.53 53.98,86.06 C52.74,86.86 52.91,87.33 55.00,88.95 C57.23,90.68 66.86,96.00 67.76,96.00 C67.95,96.00 70.13,95.49 72.60,94.87 Z"
      fill="currentColor"
    />
  </svg>
);

const GoogleIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className}>
    <path fill="#EA4335" d="M12 5c1.6 0 3 .55 4.13 1.62l3.07-3.07C17.18 1.62 14.78.5 12 .5 7.4.5 3.4 3.13 1.5 7l3.55 2.75C5.95 7.05 8.7 5 12 5z"/>
    <path fill="#4285F4" d="M23.5 12.27c0-.83-.07-1.6-.2-2.36H12v4.46h6.47c-.28 1.5-1.13 2.78-2.4 3.62l3.7 2.87c2.16-2 3.4-4.95 3.73-8.59z"/>
    <path fill="#FBBC05" d="M5.05 14.25c-.23-.7-.36-1.45-.36-2.25s.13-1.55.36-2.25L1.5 7C.55 8.5 0 10.18 0 12s.55 3.5 1.5 5l3.55-2.75z"/>
    <path fill="#34A853" d="M12 23.5c3.24 0 5.95-1.07 7.93-2.9l-3.7-2.87c-1.03.7-2.36 1.12-4.23 1.12-3.3 0-6.05-2.05-7.05-4.75L1.5 17c1.9 3.87 5.9 6.5 10.5 6.5z"/>
  </svg>
);

const Auth = () => {
  const navigate = useNavigate();
  const { user, loading, signIn, signUp, signInWithGoogle } = useAuth();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (user && !loading) navigate("/dashboard");
  }, [user, loading, navigate]);

  const validateInputs = () => {
    try {
      emailSchema.parse(email);
      passwordSchema.parse(password);
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({ title: "Hold on", description: error.errors[0].message, variant: "destructive" });
      }
      return false;
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateInputs()) return;
    setIsSubmitting(true);
    const { error } = await signIn(email, password);
    setIsSubmitting(false);
    if (error) {
      toast({
        title: "Sign in failed",
        description: error.message === "Invalid login credentials"
          ? "Invalid email or password. Please try again."
          : error.message,
        variant: "destructive",
      });
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateInputs()) return;
    setIsSubmitting(true);
    const { error } = await signUp(email, password);
    setIsSubmitting(false);
    if (error) {
      toast({
        title: "Sign up failed",
        description: error.message.includes("already registered")
          ? "This email is already registered. Try signing in."
          : error.message,
        variant: "destructive",
      });
    } else {
      toast({ title: "Murakaza neza!", description: "Welcome to Epiphany." });
    }
  };

  const handleGoogleSignIn = async () => {
    setIsSubmitting(true);
    const { error } = await signInWithGoogle();
    setIsSubmitting(false);
    if (error) {
      toast({ title: "Google sign in failed", description: error.message, variant: "destructive" });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary via-primary to-primary/80">
        <Loader2 className="h-8 w-8 animate-spin text-gold" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary to-primary/80 relative overflow-hidden">
      {/* Rwandan pattern overlay - matches Welcome screen */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, transparent, transparent 35px, hsl(var(--gold)) 35px, hsl(var(--gold)) 36px)",
          }}
        />
      </div>

      {/* Soft glows */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-gold/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />

      {/* Back link */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-5 left-5 z-20 flex items-center gap-2 text-white/80 hover:text-gold transition-colors text-sm font-medium"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </button>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-5">
        {/* Brand */}
        <div className="text-center mb-6 animate-[slide-up_0.6s_ease-out]">
          <div className="inline-flex items-center justify-center mb-3">
            <EpiphanyMark className="w-20 h-20 text-gold" />
          </div>
          <h1 className="text-4xl font-bold text-white tracking-tight">Epiphany</h1>
          <p className="text-white/80 mt-1 text-sm">Where Rwanda moves and connects</p>
        </div>

        {/* Card */}
        <div className="w-full max-w-md bg-card rounded-3xl shadow-2xl shadow-black/20 p-6 sm:p-8 animate-[slide-up_0.7s_ease-out]">
          <div className="mb-5">
            <h2 className="text-xl font-bold text-foreground">Get started</h2>
            <p className="text-sm text-muted-foreground">Sign in or create your account</p>
          </div>

          <Button
            type="button"
            variant="outline"
            className="w-full h-12 mb-5 border-2 hover:bg-secondary/60 font-medium"
            onClick={handleGoogleSignIn}
            disabled={isSubmitting}
          >
            <GoogleIcon className="mr-2 h-5 w-5" />
            Continue with Google
          </Button>

          <div className="relative mb-5">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase tracking-wider">
              <span className="bg-card px-3 text-muted-foreground">or with email</span>
            </div>
          </div>

          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-5 bg-secondary">
              <TabsTrigger value="signin" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Sign In</TabsTrigger>
              <TabsTrigger value="signup" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="signin">
              <form onSubmit={handleSignIn} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signin-email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="signin-email" type="email" placeholder="you@example.com"
                      value={email} onChange={(e) => setEmail(e.target.value)} className="pl-10 h-12 rounded-xl" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signin-password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="signin-password" type="password" placeholder="••••••••"
                      value={password} onChange={(e) => setPassword(e.target.value)} className="pl-10 h-12 rounded-xl" required />
                  </div>
                </div>
                <Button type="submit" disabled={isSubmitting}
                  className="w-full h-12 bg-gold text-gold-foreground hover:bg-gold/90 font-semibold shadow-lg hover:shadow-xl transition-all">
                  {isSubmitting && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
                  Sign In
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup">
              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="signup-email" type="email" placeholder="you@example.com"
                      value={email} onChange={(e) => setEmail(e.target.value)} className="pl-10 h-12 rounded-xl" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="signup-password" type="password" placeholder="At least 6 characters"
                      value={password} onChange={(e) => setPassword(e.target.value)} className="pl-10 h-12 rounded-xl" required />
                  </div>
                </div>
                <Button type="submit" disabled={isSubmitting}
                  className="w-full h-12 bg-gold text-gold-foreground hover:bg-gold/90 font-semibold shadow-lg hover:shadow-xl transition-all">
                  {isSubmitting && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
                  Create Account
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </div>

        <p className="text-white/60 text-xs mt-6 text-center max-w-sm px-4">
          By continuing you agree to Epiphany's Terms & Privacy Policy
        </p>
        <p className="text-white/50 text-xs mt-2">Powered by Mind Storms®</p>
      </div>
    </div>
  );
};

export default Auth;
