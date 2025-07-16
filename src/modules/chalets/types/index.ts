export interface ChaletBooking {
  checkIn: string;
  checkOut: string;
  status: 'pending' | 'confirmed' | 'cancelled';
}

export interface ChaletInfo {
  id: string;
  name: string;
  price: number;
  rating: number;
  images: string[];
  description: string;
  amenities: string[];
  capacity: number;
  bookings: ChaletBooking[];
}

export interface ChaletsFilterParams {
  page: number;
  perPage: number;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  capacity?: number;
}

export interface ChaletsPaginationData {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

export interface Chalet {
  id: string;
  name: string;
  description: string;
  images: string[];
  price: number;
  capacity: number;
  features: string[];
  rating?: number;
} 