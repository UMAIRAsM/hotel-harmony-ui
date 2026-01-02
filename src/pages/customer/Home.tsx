import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bed, Utensils, Sparkles, CreditCard } from 'lucide-react';
import { Link } from 'react-router-dom';
import hotelHero from '@/assets/hotel-hero.jpg';

const stats = [
  { value: '250+', label: 'Luxury Rooms' },
  { value: '98%', label: 'Guest Satisfaction' },
  { value: '24/7', label: 'Concierge Service' },
];

const quickLinks = [
  { icon: Bed, label: 'Browse Rooms', path: '/customer/rooms', description: 'Find your perfect room' },
  { icon: Utensils, label: 'Order Food', path: '/customer/food', description: 'Explore our menu' },
  { icon: Sparkles, label: 'Room Service', path: '/customer/services', description: 'Request assistance' },
  { icon: CreditCard, label: 'Checkout', path: '/customer/checkout', description: 'Complete your stay' },
];

const CustomerHome = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero Section */}
      <div className="relative rounded-2xl overflow-hidden h-80">
        <img 
          src={hotelHero} 
          alt="Luxury Hotel" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/60" />
        <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-12">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
            Welcome to The Grand Meridian
          </h1>
          <p className="text-primary-foreground/80 text-lg max-w-md">
            Experience luxury redefined. Your comfort is our priority.
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="relative rounded-2xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/95 to-primary" />
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6 p-8">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="text-center py-4 border-b md:border-b-0 md:border-r last:border-0 border-primary-foreground/20"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <p className="font-heading text-4xl md:text-5xl font-bold text-accent mb-2">
                {stat.value}
              </p>
              <p className="text-primary-foreground/80 text-sm uppercase tracking-wider">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Links */}
      <div>
        <h2 className="font-heading text-2xl font-bold text-foreground mb-6">Quick Access</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickLinks.map((link, index) => (
            <Link key={index} to={link.path}>
              <Card 
                variant="interactive" 
                className="p-6 text-center group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                  <link.icon className="w-7 h-7 text-accent" />
                </div>
                <h3 className="font-heading font-semibold text-foreground mb-1">{link.label}</h3>
                <p className="text-sm text-muted-foreground">{link.description}</p>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomerHome;
