import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar } from 'lucide-react';
import { mockBookings } from '@/data/mockData';

const CustomerBookings = () => {
  const myBookings = mockBookings.filter(b => b.status !== 'cancelled');

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="font-heading text-4xl font-bold text-foreground">My Bookings</h1>
        <p className="text-muted-foreground mt-2">View your current and past reservations.</p>
      </div>

      <div className="grid gap-6">
        {myBookings.map((booking) => (
          <Card key={booking.id} variant="interactive">
            <CardContent className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center">
                  <span className="font-heading text-xl font-bold text-primary">{booking.roomNumber}</span>
                </div>
                <div>
                  <h3 className="font-heading text-lg font-bold">Room {booking.roomNumber}</h3>
                  <p className="text-muted-foreground flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {booking.checkIn} → {booking.checkOut}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <p className="font-heading text-2xl font-bold text-accent">${booking.totalAmount}</p>
                <Badge className={booking.status === 'checked-in' ? 'bg-success/20 text-success' : 'bg-info/20 text-info'}>
                  {booking.status}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CustomerBookings;
