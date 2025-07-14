// Feature Types
export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
}

// Chalet Types
export interface Chalet {
  id: string;
  name: string;
  englishName: string;
  features: string;
  price: number;
  currency: string;
  imageUrl?: string;
}

// Review Types
export interface Review {
  id: number;
  name: string;
  title: string;
  avatar?: string;
}

// Button Types
export interface CTAButton {
  label: string;
  onClick: () => void;
  variant: 'primary' | 'secondary';
}

// Section Types
export interface SectionProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
} 