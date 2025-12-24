import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Calendar, Search, Eye, CheckCircle, XCircle } from 'lucide-react';
import { mockBookings } from '@/data/mockData';
import { Booking, BookingStatus } from '@/types/hotel';
import { useToast } from '@/hooks/use-toast';

const statusColors: Record<BookingStatus, string> = {
  confirmed: 'bg-info/20 text-info border-info/30',
  'checked-in': 'bg-success/20 text-success border-success/30',
  'checked-out': 'bg-muted text-muted-foreground border-border',
  cancelled: 'bg-destructive/20 text-destructive border-destructive/30',
};

const AdminBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>(mockBookings);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const { toast } = useToast();

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch = 
      booking.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.roomNumber.includes(searchTerm) ||
      booking.guestEmail.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || booking.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const updateBookingStatus = (id: string, status: BookingStatus) => {
    setBookings(bookings.map(b => 
      b.id === id ? { ...b, status } : b
    ));
    const booking = bookings.find(b => b.id === id);
    toast({
      title: 'Booking Updated',
      description: `${booking?.guestName}'s booking is now ${status}.`,
    });
  };

  const totalRevenue = filteredBookings
    .filter(b => b.status !== 'cancelled')
    .reduce((sum, b) => sum + b.totalAmount, 0);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="font-heading text-4xl font-bold text-foreground">Bookings</h1>
          <p className="text-muted-foreground mt-2">View and manage all room bookings.</p>
        </div>
        <Card variant="gold" className="px-6 py-4">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Total Revenue</p>
            <p className="font-heading text-3xl font-bold text-accent">${totalRevenue.toLocaleString()}</p>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card variant="glass">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search by guest name, email, or room..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Bookings</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="checked-in">Checked In</SelectItem>
                <SelectItem value="checked-out">Checked Out</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card variant="default" className="p-4">
          <p className="text-sm text-muted-foreground">Total Bookings</p>
          <p className="font-heading text-2xl font-bold text-foreground">{filteredBookings.length}</p>
        </Card>
        <Card variant="default" className="p-4">
          <p className="text-sm text-muted-foreground">Confirmed</p>
          <p className="font-heading text-2xl font-bold text-info">
            {filteredBookings.filter(b => b.status === 'confirmed').length}
          </p>
        </Card>
        <Card variant="default" className="p-4">
          <p className="text-sm text-muted-foreground">Checked In</p>
          <p className="font-heading text-2xl font-bold text-success">
            {filteredBookings.filter(b => b.status === 'checked-in').length}
          </p>
        </Card>
        <Card variant="default" className="p-4">
          <p className="text-sm text-muted-foreground">Cancelled</p>
          <p className="font-heading text-2xl font-bold text-destructive">
            {filteredBookings.filter(b => b.status === 'cancelled').length}
          </p>
        </Card>
      </div>

      {/* Bookings Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-accent" />
            All Bookings
          </CardTitle>
          <CardDescription>Complete list of all room reservations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-xl border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead>Guest</TableHead>
                  <TableHead>Room</TableHead>
                  <TableHead>Check In</TableHead>
                  <TableHead>Check Out</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBookings.map((booking) => (
                  <TableRow key={booking.id} className="hover:bg-muted/30 transition-colors">
                    <TableCell>
                      <div>
                        <p className="font-medium text-foreground">{booking.guestName}</p>
                        <p className="text-sm text-muted-foreground">{booking.guestEmail}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="font-heading">
                        Room {booking.roomNumber}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-foreground">{booking.checkIn}</TableCell>
                    <TableCell className="text-foreground">{booking.checkOut}</TableCell>
                    <TableCell className="font-heading font-bold text-accent">
                      ${booking.totalAmount}
                    </TableCell>
                    <TableCell>
                      <Badge className={`${statusColors[booking.status]} border capitalize`}>
                        {booking.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        {booking.status === 'confirmed' && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateBookingStatus(booking.id, 'checked-in')}
                          >
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Check In
                          </Button>
                        )}
                        {booking.status === 'checked-in' && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateBookingStatus(booking.id, 'checked-out')}
                          >
                            <XCircle className="w-4 h-4 mr-1" />
                            Check Out
                          </Button>
                        )}
                        {(booking.status === 'confirmed' || booking.status === 'checked-in') && (
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => updateBookingStatus(booking.id, 'cancelled')}
                          >
                            Cancel
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredBookings.length === 0 && (
            <div className="text-center py-12">
              <Calendar className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" />
              <h3 className="font-heading text-xl font-semibold text-foreground mb-2">No bookings found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filter.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminBookings;
