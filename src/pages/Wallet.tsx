import { useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, ArrowUpRight, ArrowDownLeft, CreditCard, Smartphone, Gift, TrendingUp, Users, Send, Percent, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import BottomNav from "@/components/BottomNav";

const Wallet = () => {
  const navigate = useNavigate();

  const transactions = [
    {
      type: "spent",
      description: "Moto ride to Kimihurura",
      amount: "RWF 2,000",
      date: "Today, 2:30 PM",
      icon: ArrowUpRight,
    },
    {
      type: "received",
      description: "Top-up from MTN Mobile Money",
      amount: "+ RWF 50,000",
      date: "Today, 10:15 AM",
      icon: ArrowDownLeft,
    },
    {
      type: "spent",
      description: "Food delivery - Mama's Kitchen",
      amount: "RWF 8,500",
      date: "Yesterday, 7:45 PM",
      icon: ArrowUpRight,
    },
    {
      type: "spent",
      description: "Tourism booking - Lake Kivu",
      amount: "RWF 30,000",
      date: "2 days ago",
      icon: ArrowUpRight,
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="bg-primary text-primary-foreground px-4 py-4">
        <div className="flex items-center gap-3">
          <Button
            size="icon"
            variant="ghost"
            onClick={() => navigate("/dashboard")}
            className="text-primary-foreground hover:bg-primary-foreground/10"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-xl font-bold">Digital Wallet</h1>
            <p className="text-sm text-primary-foreground/80">Manage your payments</p>
          </div>
        </div>
      </header>

      <main className="p-4 space-y-6">
        {/* Balance Card */}
        <Card className="p-6 bg-gradient-to-br from-gold via-gold to-gold/80 text-gold-foreground">
          <div className="space-y-4">
            <div>
              <p className="text-sm opacity-90 mb-1">Total Balance</p>
              <h2 className="text-4xl font-bold">RWF 25,000</h2>
            </div>
            
            <div className="flex gap-3">
              <Button
                size="sm"
                className="flex-1 bg-white/20 hover:bg-white/30 text-gold-foreground border-0"
              >
                <Plus className="h-4 w-4 mr-2" />
                Top Up
              </Button>
              <Button
                size="sm"
                className="flex-1 bg-white/20 hover:bg-white/30 text-gold-foreground border-0"
              >
                <ArrowUpRight className="h-4 w-4 mr-2" />
                Send
              </Button>
              <Button
                size="sm"
                className="flex-1 bg-white/20 hover:bg-white/30 text-gold-foreground border-0"
              >
                <Users className="h-4 w-4 mr-2" />
                Split
              </Button>
            </div>
          </div>
        </Card>

        {/* Loyalty Points */}
        <Card className="p-4 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-accent/20 rounded-lg">
                <Star className="h-4 w-4 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold">Loyalty Points</h3>
                <p className="text-xs text-muted-foreground">Community Rewards</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-primary">1,250</p>
              <p className="text-xs text-muted-foreground">points</p>
            </div>
          </div>
          <Progress value={62} className="h-2 mb-2" />
          <p className="text-xs text-muted-foreground">750 points to next reward tier</p>
        </Card>

        {/* Spending Insights */}
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">This Month's Insights</h3>
          </div>
          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <p className="text-xs text-muted-foreground mb-1">Rides</p>
              <p className="font-bold text-primary">45%</p>
            </div>
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <p className="text-xs text-muted-foreground mb-1">Food</p>
              <p className="font-bold text-accent">30%</p>
            </div>
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <p className="text-xs text-muted-foreground mb-1">Tourism</p>
              <p className="font-bold text-secondary-foreground">25%</p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">You spent RWF 82,500 this month</p>
        </Card>

        {/* Active Promos */}
        <Card className="p-4 bg-gradient-to-r from-accent/10 to-accent/5 border-accent/20">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Percent className="h-5 w-5 text-accent" />
              <h3 className="font-semibold">Active Promos</h3>
            </div>
            <Badge className="bg-accent text-accent-foreground">3 Available</Badge>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>20% off next ride</span>
              <Badge variant="outline" className="text-xs">Use Now</Badge>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span>Free delivery over RWF 15k</span>
              <Badge variant="outline" className="text-xs">Use Now</Badge>
            </div>
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Card className="p-4 text-center cursor-pointer hover:shadow-lg transition-all">
            <div className="p-3 bg-primary/10 rounded-lg inline-flex mb-2">
              <Send className="h-5 w-5 text-primary" />
            </div>
            <p className="font-medium text-sm">Send Money</p>
            <p className="text-xs text-muted-foreground">Remittances</p>
          </Card>
          <Card className="p-4 text-center cursor-pointer hover:shadow-lg transition-all">
            <div className="p-3 bg-accent/10 rounded-lg inline-flex mb-2">
              <Gift className="h-5 w-5 text-accent" />
            </div>
            <p className="font-medium text-sm">Redeem</p>
            <p className="text-xs text-muted-foreground">Use Points</p>
          </Card>
        </div>

        {/* Payment Methods */}
        <div className="space-y-3">
          <h3 className="font-semibold">Payment Methods</h3>
          <div className="grid gap-3">
            <Card className="p-4 flex items-center gap-3 cursor-pointer hover:shadow-md transition-all">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Smartphone className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium">MTN Mobile Money</h4>
                <p className="text-sm text-muted-foreground">**** **** **78</p>
              </div>
              <Badge variant="secondary">Primary</Badge>
            </Card>

            <Card className="p-4 flex items-center gap-3 cursor-pointer hover:shadow-md transition-all">
              <div className="p-2 bg-gold/10 rounded-lg">
                <CreditCard className="h-5 w-5 text-gold-foreground" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium">Bank Card</h4>
                <p className="text-sm text-muted-foreground">Visa **** 4532</p>
              </div>
            </Card>

            <Button variant="outline" className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Add Payment Method
            </Button>
          </div>
        </div>

        {/* Transaction History */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Recent Transactions</h3>
            <Button variant="ghost" size="sm">View All</Button>
          </div>
          
          <div className="space-y-2">
            {transactions.map((transaction, index) => {
              const Icon = transaction.icon;
              const isSpent = transaction.type === "spent";
              
              return (
                <Card key={index} className="p-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${
                      isSpent ? "bg-red-500/10" : "bg-green-500/10"
                    }`}>
                      <Icon className={`h-4 w-4 ${
                        isSpent ? "text-red-600" : "text-green-600"
                      }`} />
                    </div>
                    
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{transaction.description}</h4>
                      <p className="text-xs text-muted-foreground">{transaction.date}</p>
                    </div>
                    
                    <span className={`font-semibold ${
                      isSpent ? "text-red-600" : "text-green-600"
                    }`}>
                      {transaction.amount}
                    </span>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default Wallet;
