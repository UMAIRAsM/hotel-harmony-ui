export type RoomType = 'standard' | 'deluxe' | 'suite' | 'presidential';
export type RoomStatus = 'available' | 'occupied' | 'maintenance' | 'reserved';
export type BookingStatus = 'confirmed' | 'checked-in' | 'checked-out' | 'cancelled';
export type ServiceRequestStatus = 'pending' | 'in-progress' | 'completed';
export type UserRole = 'admin' | 'customer';

export interface Room {
  id: string;
  number: string;
  type: RoomType;
  price: number;
  status: RoomStatus;
  amenities: string[];
  capacity: number;
  image: string;
  description: string;
}

export interface FoodItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'breakfast' | 'lunch' | 'dinner' | 'beverages' | 'desserts';
  image: string;
  available: boolean;
}

export interface Booking {
  id: string;
  roomId: string;
  roomNumber: string;
  guestName: string;
  guestEmail: string;
  checkIn: string;
  checkOut: string;
  status: BookingStatus;
  totalAmount: number;
  createdAt: string;
}

export interface ServiceRequest {
  id: string;
  roomNumber: string;
  guestName: string;
  type: 'cleaning' | 'laundry' | 'towels' | 'room-service' | 'maintenance' | 'other';
  description: string;
  status: ServiceRequestStatus;
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
}

export interface FoodOrder {
  id: string;
  roomNumber: string;
  items: { itemId: string; name: string; quantity: number; price: number }[];
  total: number;
  status: 'pending' | 'preparing' | 'delivered';
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  roomNumber?: string;
}
