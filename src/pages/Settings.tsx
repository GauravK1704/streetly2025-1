import { useState } from "react";
import { Header } from "@/components/Header";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { 
  Settings as SettingsIcon,
  User,
  Bell,
  Shield,
  Palette,
  Globe,
  Smartphone,
  Save,
  MapPin,
  CreditCard,
  Lightbulb
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

export const Settings = () => {
  const { t } = useLanguage();
  const [settings, setSettings] = useState({
    // Profile settings
    name: "Raj Kumar",
    phone: "+91 98765 43210",
    email: "raj@example.com",
    address: "Shop 15, Connaught Place, Delhi",
    businessName: "Raj's Chaat Corner",
    gstNumber: "27ABCDE1234F1Z5",
    
    // Notification settings
    emailNotifications: true,
    smsNotifications: true,
    pushNotifications: true,
    orderUpdates: true,
    promotionalOffers: false,
    weeklyReports: true,
    lowStockAlerts: true,
    
    // App preferences
    theme: "system",
    language: "en",
    currency: "INR",
    timezone: "Asia/Kolkata",
    
    // AI & Automation
    aiSuggestions: true,
    autoReorder: false,
    smartPricing: true,
    demandForecasting: true,
    
    // Privacy
    dataSharing: false,
    analytics: true,
    locationTracking: true
  });

  const updateSetting = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const saveSettings = () => {
    toast({
      title: "Settings Saved",
      description: "Your preferences have been updated successfully",
    });
  };

  const resetToDefaults = () => {
    toast({
      title: "Settings Reset",
      description: "All settings have been reset to default values",
      variant: "destructive"
    });
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
              <h1 className="text-3xl font-bold">Settings</h1>
              <div className="flex gap-2">
                <Button variant="outline" onClick={resetToDefaults}>
                  Reset to Defaults
                </Button>
                <Button variant="vibrant" onClick={saveSettings}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </div>

            {/* Profile Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Profile Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={settings.name}
                      onChange={(e) => updateSetting('name', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={settings.phone}
                      onChange={(e) => updateSetting('phone', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={settings.email}
                      onChange={(e) => updateSetting('email', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="businessName">Business Name</Label>
                    <Input
                      id="businessName"
                      value={settings.businessName}
                      onChange={(e) => updateSetting('businessName', e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Business Address</Label>
                  <Textarea
                    id="address"
                    value={settings.address}
                    onChange={(e) => updateSetting('address', e.target.value)}
                    className="min-h-20"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gstNumber">GST Number</Label>
                  <Input
                    id="gstNumber"
                    value={settings.gstNumber}
                    onChange={(e) => updateSetting('gstNumber', e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Notification Preferences */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notification Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold">Delivery Methods</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Email Notifications</Label>
                          <p className="text-sm text-muted-foreground">Receive updates via email</p>
                        </div>
                        <Switch
                          checked={settings.emailNotifications}
                          onCheckedChange={(value) => updateSetting('emailNotifications', value)}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>SMS Notifications</Label>
                          <p className="text-sm text-muted-foreground">Receive SMS updates</p>
                        </div>
                        <Switch
                          checked={settings.smsNotifications}
                          onCheckedChange={(value) => updateSetting('smsNotifications', value)}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Push Notifications</Label>
                          <p className="text-sm text-muted-foreground">App notifications</p>
                        </div>
                        <Switch
                          checked={settings.pushNotifications}
                          onCheckedChange={(value) => updateSetting('pushNotifications', value)}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-semibold">Notification Types</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Order Updates</Label>
                          <p className="text-sm text-muted-foreground">Status changes, delivery updates</p>
                        </div>
                        <Switch
                          checked={settings.orderUpdates}
                          onCheckedChange={(value) => updateSetting('orderUpdates', value)}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Promotional Offers</Label>
                          <p className="text-sm text-muted-foreground">Deals and discounts</p>
                        </div>
                        <Switch
                          checked={settings.promotionalOffers}
                          onCheckedChange={(value) => updateSetting('promotionalOffers', value)}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Weekly Reports</Label>
                          <p className="text-sm text-muted-foreground">Performance analytics</p>
                        </div>
                        <Switch
                          checked={settings.weeklyReports}
                          onCheckedChange={(value) => updateSetting('weeklyReports', value)}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Low Stock Alerts</Label>
                          <p className="text-sm text-muted-foreground">Inventory warnings</p>
                        </div>
                        <Switch
                          checked={settings.lowStockAlerts}
                          onCheckedChange={(value) => updateSetting('lowStockAlerts', value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* App Preferences */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  App Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Theme</Label>
                    <Select value={settings.theme} onValueChange={(value) => updateSetting('theme', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="system">System</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Language</Label>
                    <Select value={settings.language} onValueChange={(value) => updateSetting('language', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="hi">हिंदी</SelectItem>
                        <SelectItem value="bn">বাংলা</SelectItem>
                        <SelectItem value="ta">தமிழ்</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Currency</Label>
                    <Select value={settings.currency} onValueChange={(value) => updateSetting('currency', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="INR">₹ Indian Rupee</SelectItem>
                        <SelectItem value="USD">$ US Dollar</SelectItem>
                        <SelectItem value="EUR">€ Euro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Timezone</Label>
                    <Select value={settings.timezone} onValueChange={(value) => updateSetting('timezone', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Asia/Kolkata">Asia/Kolkata (IST)</SelectItem>
                        <SelectItem value="UTC">UTC</SelectItem>
                        <SelectItem value="America/New_York">America/New_York</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* AI & Automation */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5" />
                  AI & Automation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>AI Suggestions</Label>
                        <p className="text-sm text-muted-foreground">Smart recommendations for your business</p>
                      </div>
                      <Switch
                        checked={settings.aiSuggestions}
                        onCheckedChange={(value) => updateSetting('aiSuggestions', value)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Auto Reorder</Label>
                        <p className="text-sm text-muted-foreground">Automatically reorder when stock is low</p>
                      </div>
                      <Switch
                        checked={settings.autoReorder}
                        onCheckedChange={(value) => updateSetting('autoReorder', value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Smart Pricing</Label>
                        <p className="text-sm text-muted-foreground">AI-powered pricing optimization</p>
                      </div>
                      <Switch
                        checked={settings.smartPricing}
                        onCheckedChange={(value) => updateSetting('smartPricing', value)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Demand Forecasting</Label>
                        <p className="text-sm text-muted-foreground">Predict future demand patterns</p>
                      </div>
                      <Switch
                        checked={settings.demandForecasting}
                        onCheckedChange={(value) => updateSetting('demandForecasting', value)}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Privacy & Security */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Privacy & Security
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Data Sharing</Label>
                      <p className="text-sm text-muted-foreground">Share anonymized data to improve services</p>
                    </div>
                    <Switch
                      checked={settings.dataSharing}
                      onCheckedChange={(value) => updateSetting('dataSharing', value)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Analytics</Label>
                      <p className="text-sm text-muted-foreground">Allow usage analytics collection</p>
                    </div>
                    <Switch
                      checked={settings.analytics}
                      onCheckedChange={(value) => updateSetting('analytics', value)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Location Tracking</Label>
                      <p className="text-sm text-muted-foreground">Use location for better delivery experience</p>
                    </div>
                    <Switch
                      checked={settings.locationTracking}
                      onCheckedChange={(value) => updateSetting('locationTracking', value)}
                    />
                  </div>
                </div>

                <div className="pt-4 border-t space-y-3">
                  <h4 className="font-semibold">Account Actions</h4>
                  <div className="flex gap-2">
                    <Button variant="outline">
                      <CreditCard className="h-4 w-4 mr-2" />
                      Change Password
                    </Button>
                    <Button variant="outline">
                      <Smartphone className="h-4 w-4 mr-2" />
                      Two-Factor Auth
                    </Button>
                    <Button variant="destructive">
                      Delete Account
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </div>
  );
};