import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Bell, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const services = [
  { value: 'cleaning', label: 'Room Cleaning', icon: '🧹' },
  { value: 'laundry', label: 'Laundry Service', icon: '👔' },
  { value: 'towels', label: 'Extra Towels', icon: '🛁' },
  { value: 'maintenance', label: 'Maintenance', icon: '🔧' },
  { value: 'room-service', label: 'Room Service', icon: '🍽️' },
];

const CustomerServices = () => {
  const [serviceType, setServiceType] = useState('');
  const [description, setDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = () => {
    toast({ title: 'Request Submitted', description: 'Our staff will attend to your request shortly.' });
    setSubmitted(true);
    setTimeout(() => { setSubmitted(false); setServiceType(''); setDescription(''); }, 3000);
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-2xl mx-auto">
      <div className="text-center">
        <h1 className="font-heading text-4xl font-bold text-foreground">Room Service</h1>
        <p className="text-muted-foreground mt-2">Request any service for your room.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {services.map(service => (
          <Card 
            key={service.value} 
            variant={serviceType === service.value ? 'gold' : 'interactive'}
            className="cursor-pointer p-4 text-center"
            onClick={() => setServiceType(service.value)}
          >
            <span className="text-4xl mb-2 block">{service.icon}</span>
            <p className="font-medium text-sm">{service.label}</p>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader><CardTitle>Request Details</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Service Type</Label>
            <Select value={serviceType} onValueChange={setServiceType}>
              <SelectTrigger><SelectValue placeholder="Select a service" /></SelectTrigger>
              <SelectContent>
                {services.map(s => <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Additional Notes</Label>
            <Textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Any specific instructions..." />
          </div>
          <Button variant="gold" size="lg" className="w-full" onClick={handleSubmit} disabled={!serviceType || submitted}>
            {submitted ? <><CheckCircle className="w-5 h-5" /> Submitted!</> : <><Bell className="w-5 h-5" /> Submit Request</>}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerServices;
