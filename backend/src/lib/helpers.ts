import type { Chalet, ChaletImage } from '../generated/prisma/client.js';

export function parseFeatures(features: string): string[] {
  try {
    const parsed = JSON.parse(features);
    return Array.isArray(parsed) ? parsed.map(String) : [];
  } catch {
    return [];
  }
}

export function serializeFeatures(features: string[]): string {
  return JSON.stringify(features);
}

export function mapChalet(chalet: Chalet & { images?: ChaletImage[] }) {
  return {
    id: chalet.id,
    name: chalet.name,
    description: chalet.description,
    location: chalet.location,
    price: Number(chalet.price),
    capacity: chalet.capacity,
    rating: chalet.rating,
    features: parseFeatures(chalet.features),
    isActive: chalet.isActive,
    images: (chalet.images ?? [])
      .sort((a, b) => a.sortOrder - b.sortOrder)
      .map((img) => img.url),
    createdAt: chalet.createdAt,
    updatedAt: chalet.updatedAt,
  };
}

export function nightsBetween(checkIn: Date, checkOut: Date): number {
  const ms = checkOut.getTime() - checkIn.getTime();
  const nights = Math.ceil(ms / (1000 * 60 * 60 * 24));
  return nights;
}

export function toDateOnly(value: string | Date): Date {
  const d = typeof value === 'string' ? new Date(value) : value;
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
}

export function generateBookingCode(): string {
  return `ORD-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
}

export function generateQrToken(): string {
  return `QR-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
}

export function generateTransactionId(): string {
  return `TXN${Date.now()}${Math.floor(Math.random() * 1000)}`;
}
