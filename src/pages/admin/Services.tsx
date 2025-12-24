import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Bell, Clock, CheckCircle, AlertTriangle, Loader2 } from 'lucide-react';
import { mockServiceRequests } from '@/data/mockData';
import { ServiceRequest, ServiceRequestStatus } from '@/types/hotel';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';

const statusConfig: Record<ServiceRequestStatus, { color: string; icon: React.ElementType }> = {
  pending: { color: 'bg-warning/20 text-warning border-warning/30', icon: Clock },
  'in-progress': { color: 'bg-info/20 text-info border-info/30', icon: Loader2 },
  completed: { color: 'bg-success/20 text-success border-success/30', icon: CheckCircle },
};

const priorityColors = {
  low: 'bg-muted text-muted-foreground',
  medium: 'bg-warning/20 text-warning',
  high: 'bg-destructive/20 text-destructive',
};

const typeIcons = {
  cleaning: '🧹',
  laundry: '👔',
  towels: '🛁',
  'room-service': '🍽️',
  maintenance: '🔧',
  other: '📝',
};

const AdminServices = () => {
  const [requests, setRequests] = useState<ServiceRequest[]>(mockServiceRequests);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterPriority, setFilterPriority] = useState<string>('all');
  const { toast } = useToast();

  const filteredRequests = requests.filter((request) => {
    const matchesStatus = filterStatus === 'all' || request.status === filterStatus;
    const matchesPriority = filterPriority === 'all' || request.priority === filterPriority;
    return matchesStatus && matchesPriority;
  });

  const updateRequestStatus = (id: string, status: ServiceRequestStatus) => {
    setRequests(requests.map(r => 
      r.id === id ? { ...r, status } : r
    ));
    toast({
      title: 'Request Updated',
      description: `Service request is now ${status}.`,
    });
  };

  const pendingCount = requests.filter(r => r.status === 'pending').length;
  const inProgressCount = requests.filter(r => r.status === 'in-progress').length;
  const highPriorityCount = requests.filter(r => r.priority === 'high' && r.status !== 'completed').length;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="font-heading text-4xl font-bold text-foreground">Service Requests</h1>
          <p className="text-muted-foreground mt-2">Manage and respond to guest service requests.</p>
        </div>
        {highPriorityCount > 0 && (
          <Card variant="gold" className="px-4 py-3 flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-destructive" />
            <span className="font-medium text-foreground">{highPriorityCount} High Priority</span>
          </Card>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card variant="interactive" className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-warning/20 flex items-center justify-center">
              <Clock className="w-7 h-7 text-warning" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Pending</p>
              <p className="font-heading text-3xl font-bold text-foreground">{pendingCount}</p>
            </div>
          </div>
        </Card>
        <Card variant="interactive" className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-info/20 flex items-center justify-center">
              <Loader2 className="w-7 h-7 text-info" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">In Progress</p>
              <p className="font-heading text-3xl font-bold text-foreground">{inProgressCount}</p>
            </div>
          </div>
        </Card>
        <Card variant="interactive" className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-success/20 flex items-center justify-center">
              <CheckCircle className="w-7 h-7 text-success" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Completed Today</p>
              <p className="font-heading text-3xl font-bold text-foreground">
                {requests.filter(r => r.status === 'completed').length}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card variant="glass">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterPriority} onValueChange={setFilterPriority}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priority</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Requests List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredRequests.map((request, index) => {
          const StatusIcon = statusConfig[request.status].icon;
          return (
            <Card 
              key={request.id} 
              variant="interactive"
              className={request.priority === 'high' && request.status !== 'completed' ? 'border-destructive/50' : ''}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{typeIcons[request.type]}</span>
                    <div>
                      <h3 className="font-heading text-lg font-bold text-foreground capitalize">
                        {request.type.replace('-', ' ')}
                      </h3>
                      <p className="text-sm text-muted-foreground">Room {request.roomNumber}</p>
                    </div>
                  </div>
                  <Badge className={`${priorityColors[request.priority]} capitalize`}>
                    {request.priority}
                  </Badge>
                </div>

                <p className="text-foreground mb-4">{request.description}</p>

                <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                  <span>{request.guestName}</span>
                  <span>{format(new Date(request.createdAt), 'MMM d, h:mm a')}</span>
                </div>

                <div className="flex items-center justify-between">
                  <Badge className={`${statusConfig[request.status].color} border capitalize flex items-center gap-1`}>
                    <StatusIcon className={`w-3 h-3 ${request.status === 'in-progress' ? 'animate-spin' : ''}`} />
                    {request.status}
                  </Badge>
                  <div className="flex gap-2">
                    {request.status === 'pending' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateRequestStatus(request.id, 'in-progress')}
                      >
                        Start
                      </Button>
                    )}
                    {request.status === 'in-progress' && (
                      <Button
                        variant="gold"
                        size="sm"
                        onClick={() => updateRequestStatus(request.id, 'completed')}
                      >
                        Complete
                      </Button>
                    )}
                    {request.status === 'completed' && (
                      <Button variant="ghost" size="sm" disabled>
                        Done
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredRequests.length === 0 && (
        <div className="text-center py-12">
          <Bell className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" />
          <h3 className="font-heading text-xl font-semibold text-foreground mb-2">No requests found</h3>
          <p className="text-muted-foreground">All caught up! No service requests match your filters.</p>
        </div>
      )}
    </div>
  );
};

export default AdminServices;
