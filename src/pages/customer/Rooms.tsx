import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Bed, Users, Wifi, Search, Calendar } from 'lucide-react';
import { mockRooms } from '@/data/mockData';
import { Room } from '@/types/hotel';
import { useToast } from '@/hooks/use-toast';

const CustomerRooms = () => {
  const [rooms] = useState<Room[]>(mockRooms);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const { toast } = useToast();

  const availableRooms = rooms.filter(r => r.status === 'available');
  const filteredRooms = availableRooms.filter((room) => {
    const matchesSearch = room.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || room.type === filterType;
    return matchesSearch && matchesType;
  });

  const handleBookRoom = () => {
    toast({ title: 'Booking Confirmed!', description: `Room ${selectedRoom?.number} has been booked.` });
    setSelectedRoom(null);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="font-heading text-4xl font-bold text-foreground">Browse Rooms</h1>
        <p className="text-muted-foreground mt-2">Find your perfect room for a luxurious stay.</p>
      </div>

      <Card variant="glass">
        <CardContent className="p-4 flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input placeholder="Search rooms..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10" />
          </div>
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-full md:w-40"><SelectValue placeholder="Room Type" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="standard">Standard</SelectItem>
              <SelectItem value="deluxe">Deluxe</SelectItem>
              <SelectItem value="suite">Suite</SelectItem>
              <SelectItem value="presidential">Presidential</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRooms.map((room, index) => (
          <Card key={room.id} variant="interactive" className="overflow-hidden" style={{ animationDelay: `${index * 0.1}s` }}>
            <div className="relative h-48 overflow-hidden">
              <img src={room.image} alt={`Room ${room.number}`} className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" />
              <Badge variant="secondary" className="absolute top-4 right-4 bg-card/90 backdrop-blur-sm capitalize">{room.type}</Badge>
            </div>
            <CardContent className="p-5">
              <div className="flex justify-between mb-3">
                <h3 className="font-heading text-xl font-bold">Room {room.number}</h3>
                <p className="font-heading text-2xl font-bold text-accent">${room.price}<span className="text-sm text-muted-foreground">/night</span></p>
              </div>
              <p className="text-sm text-muted-foreground mb-3">{room.description}</p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                <span className="flex items-center gap-1"><Users className="w-4 h-4" />{room.capacity}</span>
                <span className="flex items-center gap-1"><Wifi className="w-4 h-4" />WiFi</span>
              </div>
              <Button variant="gold" className="w-full" onClick={() => setSelectedRoom(room)}>Book Now</Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={!!selectedRoom} onOpenChange={() => setSelectedRoom(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle className="font-heading text-2xl">Book Room {selectedRoom?.number}</DialogTitle></DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2"><Label>Check-in Date</Label><Input type="date" /></div>
            <div className="space-y-2"><Label>Check-out Date</Label><Input type="date" /></div>
            <div className="p-4 bg-muted/50 rounded-xl">
              <p className="text-sm text-muted-foreground">Total: <span className="font-heading text-xl font-bold text-accent">${selectedRoom?.price}/night</span></p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedRoom(null)}>Cancel</Button>
            <Button variant="gold" onClick={handleBookRoom}>Confirm Booking</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CustomerRooms;
