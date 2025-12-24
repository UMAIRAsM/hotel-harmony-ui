import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CreditCard, Calendar, Coffee, Bed } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

const CustomerCheckout = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleCheckout = () => {
    toast({ title: 'Checked Out Successfully', description: 'Thank you for staying with us!' });
    setTimeout(() => navigate('/'), 1500);
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-2xl mx-auto">
      <div className="text-center">
        <h1 className="font-heading text-4xl font-bold text-foreground">Check Out</h1>
        <p className="text-muted-foreground mt-2">Review your stay and complete checkout.</p>
      </div>

      <Card variant="gold">
        <CardHeader><CardTitle className="flex items-center gap-2"><Bed className="w-5 h-5" /> Room 102 - Deluxe</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
            <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> Stay Duration</span>
            <span className="font-medium">Dec 20 - Dec 25 (5 nights)</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
            <span className="flex items-center gap-2"><Bed className="w-4 h-4" /> Room Charges</span>
            <span className="font-medium">$1,000</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
            <span className="flex items-center gap-2"><Coffee className="w-4 h-4" /> Food & Services</span>
            <span className="font-medium">$250</span>
          </div>
          <div className="border-t pt-4 flex justify-between items-center">
            <span className="font-heading text-xl font-bold">Total Amount</span>
            <span className="font-heading text-3xl font-bold text-accent">$1,250</span>
          </div>
        </CardContent>
      </Card>

      <Button variant="gold" size="xl" className="w-full" onClick={handleCheckout}>
        <CreditCard className="w-5 h-5" /> Complete Checkout
      </Button>
    </div>
  );
};

export default CustomerCheckout;
