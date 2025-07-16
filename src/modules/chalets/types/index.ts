export interface Chalet {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  features: string[];
  capacity: number;
  location: string;
  rating?: number;
}

export interface ChaletsFilterParams {
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  capacity?: number;
  page: number;
  perPage: number;
}

export interface ChaletsPaginationData {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
} 