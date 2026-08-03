export interface ChaletBooking {
  checkIn: string;
  checkOut: string;
  status: string;
}

export interface ChaletInfo {
  id: string;
  name: string;
  price: number;
  rating: number | null;
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
  location: string;
  description: string;
  images: string[];
  price: number;
  capacity: number;
  features: string[];
  rating?: number | null;
  isActive?: boolean;
}
