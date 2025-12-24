import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ShoppingCart, Plus, Minus } from 'lucide-react';
import { mockFoodItems } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';

const CustomerFood = () => {
  const [cart, setCart] = useState<Record<string, number>>({});
  const { toast } = useToast();
  const categories = ['breakfast', 'lunch', 'dinner', 'beverages', 'desserts'];

  const addToCart = (id: string) => setCart(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  const removeFromCart = (id: string) => setCart(prev => ({ ...prev, [id]: Math.max(0, (prev[id] || 0) - 1) }));

  const cartTotal = Object.entries(cart).reduce((sum, [id, qty]) => {
    const item = mockFoodItems.find(i => i.id === id);
    return sum + (item?.price || 0) * qty;
  }, 0);

  const handleOrder = () => {
    toast({ title: 'Order Placed!', description: 'Your food order has been submitted.' });
    setCart({});
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="font-heading text-4xl font-bold text-foreground">Order Food</h1>
          <p className="text-muted-foreground mt-2">Browse our menu and order to your room.</p>
        </div>
        {cartTotal > 0 && (
          <Card variant="gold" className="p-4">
            <div className="flex items-center gap-4">
              <ShoppingCart className="w-5 h-5 text-accent" />
              <span className="font-heading text-xl font-bold">${cartTotal}</span>
              <Button variant="gold" size="sm" onClick={handleOrder}>Place Order</Button>
            </div>
          </Card>
        )}
      </div>

      <Tabs defaultValue="breakfast">
        <TabsList className="w-full justify-start gap-2 h-auto p-2 bg-muted/50 rounded-xl flex-wrap">
          {categories.map(cat => (
            <TabsTrigger key={cat} value={cat} className="capitalize rounded-lg">{cat}</TabsTrigger>
          ))}
        </TabsList>

        {categories.map(category => (
          <TabsContent key={category} value={category} className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockFoodItems.filter(i => i.category === category && i.available).map(item => (
                <Card key={item.id} variant="interactive" className="overflow-hidden">
                  <div className="h-40 overflow-hidden">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <CardContent className="p-5">
                    <div className="flex justify-between mb-2">
                      <h3 className="font-heading text-lg font-bold">{item.name}</h3>
                      <span className="font-heading text-xl font-bold text-accent">${item.price}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">{item.description}</p>
                    <div className="flex items-center justify-between">
                      {cart[item.id] ? (
                        <div className="flex items-center gap-3">
                          <Button size="icon" variant="outline" onClick={() => removeFromCart(item.id)}><Minus className="w-4 h-4" /></Button>
                          <span className="font-bold">{cart[item.id]}</span>
                          <Button size="icon" variant="outline" onClick={() => addToCart(item.id)}><Plus className="w-4 h-4" /></Button>
                        </div>
                      ) : (
                        <Button variant="gold" onClick={() => addToCart(item.id)}>Add to Order</Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default CustomerFood;
