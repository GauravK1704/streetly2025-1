import { useState } from "react";
import { Header } from "@/components/Header";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Wallet, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Plus, 
  Minus,
  CreditCard,
  Building,
  TrendingUp,
  History,
  Gift,
  DollarSign
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

const transactions = [
  {
    id: "TXN-001",
    type: "credit",
    amount: 890,
    description: "Cashback from Order #ORD-2024-001",
    date: "2024-01-15",
    status: "completed"
  },
  {
    id: "TXN-002", 
    type: "debit",
    amount: 1200,
    description: "Withdrawal to Bank Account",
    date: "2024-01-14",
    status: "completed"
  },
  {
    id: "TXN-003",
    type: "credit",
    amount: 500,
    description: "Referral Bonus - Friend joined",
    date: "2024-01-12",
    status: "completed"
  },
  {
    id: "TXN-004",
    type: "credit",
    amount: 250,
    description: "Loyalty Reward",
    date: "2024-01-10",
    status: "pending"
  }
];

export const WalletDashboard = () => {
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [addMoneyAmount, setAddMoneyAmount] = useState("");

  const walletBalance = 4250;
  const pendingAmount = 250;
  const totalEarnings = 15840;

  const handleWithdraw = () => {
    if (!withdrawAmount || parseFloat(withdrawAmount) <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid withdrawal amount",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Withdrawal Initiated",
      description: `₹${withdrawAmount} withdrawal request submitted. It will be processed within 24 hours.`,
    });
    setWithdrawAmount("");
  };

  const handleAddMoney = () => {
    if (!addMoneyAmount || parseFloat(addMoneyAmount) <= 0) {
      toast({
        title: "Invalid Amount", 
        description: "Please enter a valid amount to add",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Money Added",
      description: `₹${addMoneyAmount} added to your wallet successfully`,
    });
    setAddMoneyAmount("");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container px-4 py-6">
        <div className="flex gap-6">
          <aside className="hidden lg:block">
            <Navigation />
          </aside>
          
          <main className="flex-1 space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold">Wallet</h1>
              <Button variant="vibrant">
                <Gift className="h-4 w-4 mr-2" />
                Refer & Earn
              </Button>
            </div>

            {/* Wallet Balance Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="gradient-primary text-primary-foreground shadow-glow">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Wallet Balance</span>
                    <Wallet className="h-5 w-5" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">₹{walletBalance.toLocaleString()}</p>
                  <p className="text-primary-foreground/80 text-sm">Available to use</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Pending Amount</span>
                    <ArrowDownLeft className="h-5 w-5 text-warning" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-warning">₹{pendingAmount}</p>
                  <p className="text-muted-foreground text-sm">Processing</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Total Earnings</span>
                    <TrendingUp className="h-5 w-5 text-success" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-success">₹{totalEarnings.toLocaleString()}</p>
                  <p className="text-muted-foreground text-sm">All time</p>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Add Money */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plus className="h-5 w-5 text-success" />
                    Add Money
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="addAmount">Amount</Label>
                    <Input
                      id="addAmount"
                      type="number"
                      placeholder="Enter amount"
                      value={addMoneyAmount}
                      onChange={(e) => setAddMoneyAmount(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="paymentMethod">Payment Method</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select payment method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="upi">UPI</SelectItem>
                        <SelectItem value="card">Credit/Debit Card</SelectItem>
                        <SelectItem value="netbanking">Net Banking</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button 
                    variant="success" 
                    className="w-full" 
                    onClick={handleAddMoney}
                  >
                    <CreditCard className="h-4 w-4 mr-2" />
                    Add Money
                  </Button>
                </CardContent>
              </Card>

              {/* Withdraw Money */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Minus className="h-5 w-5 text-primary" />
                    Withdraw Money
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="withdrawAmount">Amount</Label>
                    <Input
                      id="withdrawAmount"
                      type="number"
                      placeholder="Enter amount"
                      value={withdrawAmount}
                      onChange={(e) => setWithdrawAmount(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="bankAccount">Bank Account</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select bank account" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sbi">SBI - ****1234</SelectItem>
                        <SelectItem value="hdfc">HDFC - ****5678</SelectItem>
                        <SelectItem value="icici">ICICI - ****9012</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button 
                    variant="vibrant" 
                    className="w-full" 
                    onClick={handleWithdraw}
                  >
                    <Building className="h-4 w-4 mr-2" />
                    Withdraw to Bank
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Transaction History */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <History className="h-5 w-5" />
                  Recent Transactions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {transactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-full ${
                          transaction.type === 'credit' 
                            ? 'bg-success/10 text-success' 
                            : 'bg-primary/10 text-primary'
                        }`}>
                          {transaction.type === 'credit' ? (
                            <ArrowDownLeft className="h-4 w-4" />
                          ) : (
                            <ArrowUpRight className="h-4 w-4" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-sm">{transaction.description}</p>
                          <p className="text-xs text-muted-foreground">{transaction.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-semibold ${
                          transaction.type === 'credit' ? 'text-success' : 'text-primary'
                        }`}>
                          {transaction.type === 'credit' ? '+' : '-'}₹{transaction.amount}
                        </p>
                        <Badge 
                          variant={transaction.status === 'completed' ? 'default' : 'secondary'}
                          className="text-xs"
                        >
                          {transaction.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </div>
  );
};