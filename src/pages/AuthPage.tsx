import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import { Loader2, Phone, MapPin, User, Shield, Home } from 'lucide-react';
import { LanguageSelector } from '@/components/LanguageSelector';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useLanguage } from '@/contexts/LanguageContext';

const roleIcons = {
  vendor: '🍽️',
  supplier: '📦',
  admin: '👑',
  delivery: '🚴'
};

const roleLabels = {
  vendor: 'roles.vendor',
  supplier: 'roles.supplier', 
  admin: 'roles.admin',
  delivery: 'roles.delivery'
};

export const AuthPage = () => {
  const { t } = useLanguage();
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [role, setRole] = useState<UserRole>('vendor');
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [activeTab, setActiveTab] = useState('login');
  
  const { login, register, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSendOtp = async () => {
    if (phone.length !== 10) {
      toast({
        title: t('auth.invalidPhone'),
        description: t('auth.invalidPhoneDesc'),
        variant: "destructive"
      });
      return;
    }
    
    // Simulate OTP sending
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsOtpSent(true);
    toast({
      title: t('auth.otpSent'),
      description: t('auth.otpSentDesc'),
    });
  };

  const handleLogin = async () => {
    const success = await login(phone, otp, role);
    if (success) {
      toast({
        title: t('auth.loginSuccessful'),
        description: `${t('auth.welcomeBack')}, ${t(roleLabels[role])}!`,
      });
      navigate(`/${role}`);
    } else {
      toast({
        title: t('auth.loginFailed'),
        description: t('auth.loginFailedDesc'),
        variant: "destructive"
      });
    }
  };

  const handleRegister = async () => {
    if (!name || !phone || !location) {
      toast({
        title: t('auth.missingInfo'),
        description: t('auth.missingInfoDesc'),
        variant: "destructive"
      });
      return;
    }

    const success = await register({ name, phone, role, location });
    if (success) {
      toast({
        title: t('auth.registerSuccessful'),
        description: `${t('auth.welcomeToApp')}, ${name}!`,
      });
      navigate(`/${role}`);
    } else {
      toast({
        title: t('auth.registerFailed'),
        description: t('auth.registerFailedDesc'),
        variant: "destructive"
      });
    }
  };

  const handleHomeClick = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 flex items-center justify-center p-4">
      {/* Header */}
      <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleHomeClick}
            className="hover:bg-accent hover:text-accent-foreground"
            title="Return to Home"
          >
            <Home className="h-5 w-5" />
          </Button>
          <div className="text-2xl font-bold gradient-primary bg-clip-text text-transparent">
            StreetLy
          </div>
        </div>
        <div className="flex items-center gap-2">
          <LanguageSelector />
          <ThemeToggle />
        </div>
      </div>

      <Card className="w-full max-w-md shadow-2xl border-primary/10">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl gradient-primary bg-clip-text text-transparent">
            {t('auth.welcomeTitle')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">{t('auth.login')}</TabsTrigger>
              <TabsTrigger value="register">{t('auth.register')}</TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="role">{t('auth.selectRole')}</Label>
                <Select value={role} onValueChange={(value: UserRole) => setRole(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(roleLabels).map(([key, labelKey]) => (
                      <SelectItem key={key} value={key}>
                        <span className="flex items-center gap-2">
                          <span>{roleIcons[key as UserRole]}</span>
                          {t(labelKey)}
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">{t('auth.phoneNumber')}</Label>
                <div className="flex gap-2">
                  <Input
                    id="phone"
                    placeholder={t('auth.enterPhonePlaceholder')}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    maxLength={10}
                    disabled={isOtpSent}
                  />
                  {!isOtpSent && (
                    <Button onClick={handleSendOtp} variant="outline">
                      <Phone className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>

              {isOtpSent && (
                <div className="space-y-2 animate-fade-in">
                  <Label htmlFor="otp">{t('auth.enterOtp')}</Label>
                  <Input
                    id="otp"
                    placeholder={t('auth.enterOtpPlaceholder')}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    maxLength={4}
                  />
                  <Button onClick={handleLogin} className="w-full" disabled={isLoading}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {t('auth.login')}
                  </Button>
                </div>
              )}

              {!isOtpSent && (
                <div className="text-center text-sm text-muted-foreground">
                  {t('auth.demoPhones')}
                </div>
              )}
            </TabsContent>

            <TabsContent value="register" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="reg-name">{t('auth.fullName')}</Label>
                <Input
                  id="reg-name"
                  placeholder={t('auth.enterNamePlaceholder')}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="reg-phone">{t('auth.phoneNumber')}</Label>
                <Input
                  id="reg-phone"
                  placeholder={t('auth.enterPhonePlaceholder')}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  maxLength={10}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="reg-location">{t('auth.location')}</Label>
                <Input
                  id="reg-location"
                  placeholder={t('auth.enterLocationPlaceholder')}
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="reg-role">{t('auth.selectRole')}</Label>
                <Select value={role} onValueChange={(value: UserRole) => setRole(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(roleLabels).map(([key, labelKey]) => (
                      <SelectItem key={key} value={key}>
                        <span className="flex items-center gap-2">
                          <span>{roleIcons[key as UserRole]}</span>
                          {t(labelKey)}
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button onClick={handleRegister} className="w-full" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {t('auth.register')}
              </Button>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};