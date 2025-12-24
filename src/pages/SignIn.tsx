import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Hotel, Mail, Lock, User, ArrowRight } from 'lucide-react';
import hotelHero from '@/assets/hotel-hero.jpg';

const SignIn = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = (role: 'admin' | 'customer') => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/customer/rooms');
      }
    }, 800);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Image */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-dark/90 via-emerald/70 to-transparent z-10" />
        <img
          src={hotelHero}
          alt="Luxury hotel lobby"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 flex flex-col justify-center p-12 text-cream">
          <div className="animate-fade-in">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center">
                <Hotel className="w-7 h-7 text-accent-foreground" />
              </div>
              <span className="font-heading text-3xl font-bold">Luxe Haven</span>
            </div>
            <h1 className="font-heading text-5xl font-bold mb-6 leading-tight">
              Experience Luxury<br />Like Never Before
            </h1>
            <p className="text-cream/80 text-lg max-w-md">
              Welcome to our premium hotel management system. Manage your stay with elegance and ease.
            </p>
          </div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <div className="lg:hidden flex items-center gap-3 mb-8 justify-center">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <Hotel className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="font-heading text-2xl font-bold text-foreground">Luxe Haven</span>
          </div>

          <Card variant="elevated" className="border-0">
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-3xl">Welcome Back</CardTitle>
              <CardDescription className="text-base">
                Sign in to access your dashboard
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <Tabs defaultValue="customer" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6 bg-muted/50 p-1 rounded-xl">
                  <TabsTrigger 
                    value="customer" 
                    className="rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm transition-all"
                  >
                    Guest
                  </TabsTrigger>
                  <TabsTrigger 
                    value="admin"
                    className="rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm transition-all"
                  >
                    Admin
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="customer" className="space-y-4 mt-0">
                  <div className="space-y-2">
                    <Label htmlFor="customer-email" className="text-sm font-medium">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="customer-email"
                        type="email"
                        placeholder="guest@example.com"
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="customer-password" className="text-sm font-medium">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="customer-password"
                        type="password"
                        placeholder="••••••••"
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <Button 
                    variant="gold" 
                    size="lg" 
                    className="w-full mt-6"
                    onClick={() => handleSignIn('customer')}
                    disabled={isLoading}
                  >
                    {isLoading ? 'Signing in...' : 'Sign In as Guest'}
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </TabsContent>

                <TabsContent value="admin" className="space-y-4 mt-0">
                  <div className="space-y-2">
                    <Label htmlFor="admin-email" className="text-sm font-medium">Admin Email</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="admin-email"
                        type="email"
                        placeholder="admin@luxehaven.com"
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="admin-password" className="text-sm font-medium">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="admin-password"
                        type="password"
                        placeholder="••••••••"
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <Button 
                    variant="default" 
                    size="lg" 
                    className="w-full mt-6"
                    onClick={() => handleSignIn('admin')}
                    disabled={isLoading}
                  >
                    {isLoading ? 'Signing in...' : 'Sign In as Admin'}
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </TabsContent>
              </Tabs>

              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground">
                  Don't have an account?{' '}
                  <button className="text-accent hover:underline font-medium">
                    Create one
                  </button>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
