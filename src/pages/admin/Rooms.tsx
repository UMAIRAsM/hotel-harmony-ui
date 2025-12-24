import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Bed, Plus, Pencil, Trash2, Search, Filter } from 'lucide-react';
import { mockRooms } from '@/data/mockData';
import { Room, RoomType, RoomStatus } from '@/types/hotel';
import { useToast } from '@/hooks/use-toast';

const statusColors: Record<RoomStatus, string> = {
  available: 'bg-success/20 text-success border-success/30',
  occupied: 'bg-destructive/20 text-destructive border-destructive/30',
  maintenance: 'bg-warning/20 text-warning border-warning/30',
  reserved: 'bg-info/20 text-info border-info/30',
};

const typeLabels: Record<RoomType, string> = {
  standard: 'Standard',
  deluxe: 'Deluxe',
  suite: 'Suite',
  presidential: 'Presidential',
};

const AdminRooms = () => {
  const [rooms, setRooms] = useState<Room[]>(mockRooms);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingRoom, setEditingRoom] = useState<Room | null>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    number: '',
    type: 'standard' as RoomType,
    price: '',
    status: 'available' as RoomStatus,
    capacity: '',
    description: '',
  });

  const filteredRooms = rooms.filter((room) => {
    const matchesSearch = room.number.includes(searchTerm) || 
                         room.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || room.type === filterType;
    const matchesStatus = filterStatus === 'all' || room.status === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const handleAddRoom = () => {
    const newRoom: Room = {
      id: Date.now().toString(),
      number: formData.number,
      type: formData.type,
      price: parseFloat(formData.price),
      status: formData.status,
      capacity: parseInt(formData.capacity),
      description: formData.description,
      amenities: ['WiFi', 'TV', 'Air Conditioning'],
      image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800',
    };
    setRooms([...rooms, newRoom]);
    setIsAddDialogOpen(false);
    resetForm();
    toast({
      title: 'Room Added',
      description: `Room ${newRoom.number} has been added successfully.`,
    });
  };

  const handleEditRoom = () => {
    if (!editingRoom) return;
    setRooms(rooms.map(r => 
      r.id === editingRoom.id 
        ? { ...r, ...formData, price: parseFloat(formData.price), capacity: parseInt(formData.capacity) }
        : r
    ));
    setEditingRoom(null);
    resetForm();
    toast({
      title: 'Room Updated',
      description: `Room ${formData.number} has been updated.`,
    });
  };

  const handleDeleteRoom = (id: string) => {
    const room = rooms.find(r => r.id === id);
    setRooms(rooms.filter(r => r.id !== id));
    toast({
      title: 'Room Deleted',
      description: `Room ${room?.number} has been removed.`,
      variant: 'destructive',
    });
  };

  const resetForm = () => {
    setFormData({
      number: '',
      type: 'standard',
      price: '',
      status: 'available',
      capacity: '',
      description: '',
    });
  };

  const openEditDialog = (room: Room) => {
    setEditingRoom(room);
    setFormData({
      number: room.number,
      type: room.type,
      price: room.price.toString(),
      status: room.status,
      capacity: room.capacity.toString(),
      description: room.description,
    });
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="font-heading text-4xl font-bold text-foreground">Manage Rooms</h1>
          <p className="text-muted-foreground mt-2">Add, edit, or remove rooms from your hotel.</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="gold" size="lg" onClick={resetForm}>
              <Plus className="w-5 h-5" />
              Add Room
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle className="font-heading text-2xl">Add New Room</DialogTitle>
              <DialogDescription>Fill in the details for the new room.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="number">Room Number</Label>
                  <Input
                    id="number"
                    value={formData.number}
                    onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                    placeholder="101"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Price/Night ($)</Label>
                  <Input
                    id="price"
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="120"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Room Type</Label>
                  <Select value={formData.type} onValueChange={(v) => setFormData({ ...formData, type: v as RoomType })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">Standard</SelectItem>
                      <SelectItem value="deluxe">Deluxe</SelectItem>
                      <SelectItem value="suite">Suite</SelectItem>
                      <SelectItem value="presidential">Presidential</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="capacity">Capacity</Label>
                  <Input
                    id="capacity"
                    type="number"
                    value={formData.capacity}
                    onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                    placeholder="2"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select value={formData.status} onValueChange={(v) => setFormData({ ...formData, status: v as RoomStatus })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="available">Available</SelectItem>
                    <SelectItem value="occupied">Occupied</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                    <SelectItem value="reserved">Reserved</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Comfortable room with city view"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
              <Button variant="gold" onClick={handleAddRoom}>Add Room</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card variant="glass">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search rooms..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Room Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="standard">Standard</SelectItem>
                <SelectItem value="deluxe">Deluxe</SelectItem>
                <SelectItem value="suite">Suite</SelectItem>
                <SelectItem value="presidential">Presidential</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="occupied">Occupied</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
                <SelectItem value="reserved">Reserved</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Rooms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRooms.map((room, index) => (
          <Card 
            key={room.id} 
            variant="interactive"
            className="overflow-hidden"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={room.image}
                alt={`Room ${room.number}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute top-4 left-4">
                <Badge className={`${statusColors[room.status]} border capitalize`}>
                  {room.status}
                </Badge>
              </div>
              <div className="absolute top-4 right-4">
                <Badge variant="secondary" className="bg-card/90 backdrop-blur-sm">
                  {typeLabels[room.type]}
                </Badge>
              </div>
            </div>
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-heading text-xl font-bold text-foreground">Room {room.number}</h3>
                  <p className="text-sm text-muted-foreground">{room.description}</p>
                </div>
                <p className="font-heading text-2xl font-bold text-accent">${room.price}</p>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                <Bed className="w-4 h-4" />
                <span>Capacity: {room.capacity} guests</span>
              </div>
              <div className="flex gap-2">
                <Dialog open={editingRoom?.id === room.id} onOpenChange={(open) => !open && setEditingRoom(null)}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="flex-1" onClick={() => openEditDialog(room)}>
                      <Pencil className="w-4 h-4" />
                      Edit
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                      <DialogTitle className="font-heading text-2xl">Edit Room {room.number}</DialogTitle>
                      <DialogDescription>Update the room details.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="edit-number">Room Number</Label>
                          <Input
                            id="edit-number"
                            value={formData.number}
                            onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="edit-price">Price/Night ($)</Label>
                          <Input
                            id="edit-price"
                            type="number"
                            value={formData.price}
                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Room Type</Label>
                          <Select value={formData.type} onValueChange={(v) => setFormData({ ...formData, type: v as RoomType })}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="standard">Standard</SelectItem>
                              <SelectItem value="deluxe">Deluxe</SelectItem>
                              <SelectItem value="suite">Suite</SelectItem>
                              <SelectItem value="presidential">Presidential</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="edit-capacity">Capacity</Label>
                          <Input
                            id="edit-capacity"
                            type="number"
                            value={formData.capacity}
                            onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Status</Label>
                        <Select value={formData.status} onValueChange={(v) => setFormData({ ...formData, status: v as RoomStatus })}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="available">Available</SelectItem>
                            <SelectItem value="occupied">Occupied</SelectItem>
                            <SelectItem value="maintenance">Maintenance</SelectItem>
                            <SelectItem value="reserved">Reserved</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="edit-description">Description</Label>
                        <Input
                          id="edit-description"
                          value={formData.description}
                          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setEditingRoom(null)}>Cancel</Button>
                      <Button variant="gold" onClick={handleEditRoom}>Save Changes</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                <Button 
                  variant="destructive" 
                  size="sm" 
                  onClick={() => handleDeleteRoom(room.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredRooms.length === 0 && (
        <div className="text-center py-12">
          <Bed className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" />
          <h3 className="font-heading text-xl font-semibold text-foreground mb-2">No rooms found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filters.</p>
        </div>
      )}
    </div>
  );
};

export default AdminRooms;
