import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Bed, 
  Users, 
  DollarSign, 
  CalendarCheck, 
  Bell, 
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';
import { mockRooms, mockBookings, mockServiceRequests } from '@/data/mockData';

const StatCard = ({ 
  title, 
  value, 
  change, 
  changeType, 
  icon: Icon, 
  iconBg 
}: { 
  title: string; 
  value: string | number; 
  change: string; 
  changeType: 'up' | 'down';
  icon: React.ElementType;
  iconBg: string;
}) => (
  <Card variant="interactive" className="group">
    <CardContent className="p-6">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground font-medium">{title}</p>
          <p className="text-3xl font-heading font-bold text-foreground">{value}</p>
          <div className="flex items-center gap-1">
            {changeType === 'up' ? (
              <ArrowUpRight className="w-4 h-4 text-success" />
            ) : (
              <ArrowDownRight className="w-4 h-4 text-destructive" />
            )}
            <span className={changeType === 'up' ? 'text-success text-sm' : 'text-destructive text-sm'}>
              {change}
            </span>
            <span className="text-muted-foreground text-sm">vs last month</span>
          </div>
        </div>
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${iconBg} transition-transform group-hover:scale-110`}>
          <Icon className="w-7 h-7" />
        </div>
      </div>
    </CardContent>
  </Card>
);

const AdminDashboard = () => {
  const availableRooms = mockRooms.filter(r => r.status === 'available').length;
  const occupiedRooms = mockRooms.filter(r => r.status === 'occupied').length;
  const pendingRequests = mockServiceRequests.filter(r => r.status === 'pending').length;
  const activeBookings = mockBookings.filter(b => b.status === 'confirmed' || b.status === 'checked-in').length;

  const totalRevenue = mockBookings
    .filter(b => b.status !== 'cancelled')
    .reduce((sum, b) => sum + b.totalAmount, 0);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="font-heading text-4xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-2">Welcome back! Here's an overview of your hotel operations.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Available Rooms"
          value={availableRooms}
          change="+12%"
          changeType="up"
          icon={Bed}
          iconBg="bg-emerald-light/20 text-emerald"
        />
        <StatCard
          title="Active Bookings"
          value={activeBookings}
          change="+8%"
          changeType="up"
          icon={CalendarCheck}
          iconBg="bg-accent/20 text-accent"
        />
        <StatCard
          title="Total Revenue"
          value={`$${totalRevenue.toLocaleString()}`}
          change="+23%"
          changeType="up"
          icon={DollarSign}
          iconBg="bg-success/20 text-success"
        />
        <StatCard
          title="Pending Requests"
          value={pendingRequests}
          change="-5%"
          changeType="down"
          icon={Bell}
          iconBg="bg-warning/20 text-warning"
        />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Bookings */}
        <Card variant="default" className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarCheck className="w-5 h-5 text-accent" />
              Recent Bookings
            </CardTitle>
            <CardDescription>Latest room reservations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockBookings.slice(0, 4).map((booking, index) => (
                <div 
                  key={booking.id}
                  className="flex items-center justify-between p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <span className="font-heading font-bold text-primary">{booking.roomNumber}</span>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{booking.guestName}</p>
                      <p className="text-sm text-muted-foreground">
                        {booking.checkIn} - {booking.checkOut}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-heading font-semibold text-foreground">
                      ${booking.totalAmount}
                    </span>
                    <Badge 
                      variant={
                        booking.status === 'checked-in' ? 'default' :
                        booking.status === 'confirmed' ? 'secondary' :
                        booking.status === 'checked-out' ? 'outline' : 'destructive'
                      }
                      className="capitalize"
                    >
                      {booking.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Room Status */}
        <Card variant="gold">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bed className="w-5 h-5 text-accent" />
              Room Status
            </CardTitle>
            <CardDescription>Current room availability</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-success" />
                  <span className="text-foreground">Available</span>
                </div>
                <span className="font-heading font-bold text-foreground">{availableRooms}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-destructive" />
                  <span className="text-foreground">Occupied</span>
                </div>
                <span className="font-heading font-bold text-foreground">{occupiedRooms}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-warning" />
                  <span className="text-foreground">Maintenance</span>
                </div>
                <span className="font-heading font-bold text-foreground">
                  {mockRooms.filter(r => r.status === 'maintenance').length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-info" />
                  <span className="text-foreground">Reserved</span>
                </div>
                <span className="font-heading font-bold text-foreground">
                  {mockRooms.filter(r => r.status === 'reserved').length}
                </span>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-border">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Occupancy Rate</span>
                <span className="font-heading font-bold text-accent text-xl">
                  {Math.round((occupiedRooms / mockRooms.length) * 100)}%
                </span>
              </div>
              <div className="mt-3 h-3 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-accent to-gold-dark rounded-full transition-all duration-1000"
                  style={{ width: `${(occupiedRooms / mockRooms.length) * 100}%` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Service Requests */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-accent" />
            Recent Service Requests
          </CardTitle>
          <CardDescription>Latest guest service requests</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {mockServiceRequests.map((request, index) => (
              <div 
                key={request.id}
                className="p-4 rounded-xl border border-border bg-card hover:shadow-lg transition-all duration-300"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start justify-between mb-3">
                  <Badge 
                    variant={request.priority === 'high' ? 'destructive' : request.priority === 'medium' ? 'secondary' : 'outline'}
                    className="capitalize text-xs"
                  >
                    {request.priority}
                  </Badge>
                  <span className="text-xs text-muted-foreground">Room {request.roomNumber}</span>
                </div>
                <p className="font-medium text-foreground capitalize mb-1">{request.type.replace('-', ' ')}</p>
                <p className="text-sm text-muted-foreground line-clamp-2">{request.description}</p>
                <div className="mt-3 flex items-center justify-between">
                  <Badge 
                    variant={
                      request.status === 'completed' ? 'default' :
                      request.status === 'in-progress' ? 'secondary' : 'outline'
                    }
                    className="capitalize text-xs"
                  >
                    {request.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
