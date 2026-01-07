import { Room, FoodItem, Booking, ServiceRequest } from '@/types/hotel';
import eggsBenedictImage from '@/assets/eggs-benedict.jpg';

export const mockRooms: Room[] = [
  {
    id: '1',
    number: '101',
    type: 'standard',
    price: 120,
    status: 'available',
    amenities: ['WiFi', 'TV', 'Air Conditioning', 'Mini Bar'],
    capacity: 2,
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800',
    description: 'Comfortable standard room with city view'
  },
  {
    id: '2',
    number: '102',
    type: 'standard',
    price: 120,
    status: 'occupied',
    amenities: ['WiFi', 'TV', 'Air Conditioning', 'Mini Bar'],
    capacity: 2,
    image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800',
    description: 'Cozy standard room with garden view'
  },
  {
    id: '3',
    number: '201',
    type: 'deluxe',
    price: 200,
    status: 'available',
    amenities: ['WiFi', 'TV', 'Air Conditioning', 'Mini Bar', 'Balcony', 'Coffee Machine'],
    capacity: 2,
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800',
    description: 'Spacious deluxe room with panoramic views'
  },
  {
    id: '4',
    number: '202',
    type: 'deluxe',
    price: 200,
    status: 'maintenance',
    amenities: ['WiFi', 'TV', 'Air Conditioning', 'Mini Bar', 'Balcony', 'Coffee Machine'],
    capacity: 2,
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800',
    description: 'Elegant deluxe room with modern amenities'
  },
  {
    id: '5',
    number: '301',
    type: 'suite',
    price: 350,
    status: 'available',
    amenities: ['WiFi', 'TV', 'Air Conditioning', 'Mini Bar', 'Balcony', 'Coffee Machine', 'Jacuzzi', 'Living Room'],
    capacity: 4,
    image: 'https://images.unsplash.com/photo-1591088398332-8a7791972843?w=800',
    description: 'Luxurious suite with separate living area'
  },
  {
    id: '6',
    number: '401',
    type: 'presidential',
    price: 800,
    status: 'reserved',
    amenities: ['WiFi', 'TV', 'Air Conditioning', 'Mini Bar', 'Private Terrace', 'Coffee Machine', 'Jacuzzi', 'Living Room', 'Dining Room', 'Butler Service'],
    capacity: 6,
    image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800',
    description: 'The ultimate luxury experience with panoramic views'
  },
];

export const mockFoodItems: FoodItem[] = [
  {
    id: '1',
    name: 'Continental Breakfast',
    description: 'Fresh croissants, fruits, yogurt, and fresh juice',
    price: 25,
    category: 'breakfast',
    image: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=800',
    available: true
  },
  {
    id: '2',
    name: 'Eggs Benedict',
    description: 'Poached eggs with hollandaise sauce on English muffin',
    price: 18,
    category: 'breakfast',
    image: eggsBenedictImage,
    available: true
  },
  {
    id: '3',
    name: 'Grilled Salmon',
    description: 'Fresh Atlantic salmon with seasonal vegetables',
    price: 35,
    category: 'lunch',
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800',
    available: true
  },
  {
    id: '4',
    name: 'Caesar Salad',
    description: 'Crispy romaine lettuce with parmesan and croutons',
    price: 16,
    category: 'lunch',
    image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=800',
    available: true
  },
  {
    id: '5',
    name: 'Filet Mignon',
    description: 'Premium beef tenderloin with truffle mashed potatoes',
    price: 55,
    category: 'dinner',
    image: 'https://images.unsplash.com/photo-1558030006-450675393462?w=800',
    available: true
  },
  {
    id: '6',
    name: 'Lobster Thermidor',
    description: 'Classic French lobster dish with creamy sauce',
    price: 75,
    category: 'dinner',
    image: 'https://images.unsplash.com/photo-1559737558-2f5a35f4523b?w=800',
    available: true
  },
  {
    id: '7',
    name: 'Fresh Orange Juice',
    description: 'Freshly squeezed orange juice',
    price: 8,
    category: 'beverages',
    image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=800',
    available: true
  },
  {
    id: '8',
    name: 'Champagne',
    description: 'Premium French champagne',
    price: 120,
    category: 'beverages',
    image: 'https://images.unsplash.com/photo-1594372365401-3b5ff14eaaed?w=800',
    available: true
  },
  {
    id: '9',
    name: 'Chocolate Lava Cake',
    description: 'Warm chocolate cake with molten center',
    price: 14,
    category: 'desserts',
    image: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=800',
    available: true
  },
  {
    id: '10',
    name: 'Crème Brûlée',
    description: 'Classic French vanilla custard with caramelized top',
    price: 12,
    category: 'desserts',
    image: 'https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?w=800',
    available: true
  },
];

export const mockBookings: Booking[] = [
  {
    id: '1',
    roomId: '2',
    roomNumber: '102',
    guestName: 'John Smith',
    guestEmail: 'john.smith@email.com',
    checkIn: '2024-12-20',
    checkOut: '2024-12-25',
    status: 'checked-in',
    totalAmount: 600,
    createdAt: '2024-12-15'
  },
  {
    id: '2',
    roomId: '6',
    roomNumber: '401',
    guestName: 'Emma Johnson',
    guestEmail: 'emma.j@email.com',
    checkIn: '2024-12-26',
    checkOut: '2024-12-30',
    status: 'confirmed',
    totalAmount: 3200,
    createdAt: '2024-12-18'
  },
  {
    id: '3',
    roomId: '1',
    roomNumber: '101',
    guestName: 'Michael Brown',
    guestEmail: 'mbrown@email.com',
    checkIn: '2024-12-10',
    checkOut: '2024-12-15',
    status: 'checked-out',
    totalAmount: 600,
    createdAt: '2024-12-05'
  },
  {
    id: '4',
    roomId: '5',
    roomNumber: '301',
    guestName: 'Sarah Davis',
    guestEmail: 'sarah.d@email.com',
    checkIn: '2024-12-22',
    checkOut: '2024-12-28',
    status: 'confirmed',
    totalAmount: 2100,
    createdAt: '2024-12-19'
  },
];

export const mockServiceRequests: ServiceRequest[] = [
  {
    id: '1',
    roomNumber: '102',
    guestName: 'John Smith',
    type: 'cleaning',
    description: 'Daily room cleaning requested',
    status: 'pending',
    priority: 'medium',
    createdAt: '2024-12-24T08:30:00'
  },
  {
    id: '2',
    roomNumber: '102',
    guestName: 'John Smith',
    type: 'towels',
    description: 'Extra towels needed',
    status: 'in-progress',
    priority: 'low',
    createdAt: '2024-12-24T09:15:00'
  },
  {
    id: '3',
    roomNumber: '301',
    guestName: 'Sarah Davis',
    type: 'maintenance',
    description: 'Air conditioning not working properly',
    status: 'pending',
    priority: 'high',
    createdAt: '2024-12-24T07:45:00'
  },
  {
    id: '4',
    roomNumber: '201',
    guestName: 'Robert Wilson',
    type: 'laundry',
    description: 'Express laundry service needed',
    status: 'completed',
    priority: 'medium',
    createdAt: '2024-12-23T14:20:00'
  },
];
