/**
 * Shared Types for Soulsysta Collective
 * 
 * Central type definitions used across all features.
 * Ensures type safety and consistency throughout the application.
 */

// ============================================================================
// Service Types
// ============================================================================

export type ServiceCategory = 'therapy' | 'wellness' | 'spa' | 'youth' | 'speaking';

export interface Service {
  id: string;
  category: ServiceCategory;
  title: string;
  subtitle: string;
  shortDescription: string;
  fullDescription: string;
  durationMinutes: number;
  priceUSD: number;
  imageUrl: string;
  benefits: string[];
  recommendedFor: string[];
  journeySteps: JourneyStep[];
  practitionerIds: string[];
  faqs: FAQ[];
}

export interface JourneyStep {
  title: string;
  description: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

// ============================================================================
// Practitioner Types
// ============================================================================

export interface Practitioner {
  id: string;
  name: string;
  title: string;
  role: string;
  bio: string;
  fullBio: string;
  specialties: string[];
  imageUrl: string;
  availableDays: string[];
  rating: number;
  reviewCount: number;
  location: string;
}

// ============================================================================
// Booking Types
// ============================================================================

export interface PreBookingQuestionnaire {
  intentReason: string;
  emotionalStateScore: number;
  sessionMode: 'online' | 'in_person';
  goals: string[];
  additionalNotes?: string;
}

export interface BookingRecord {
  id: string;
  serviceId: string;
  serviceTitle: string;
  practitionerId: string;
  practitionerName: string;
  date: string;
  timeSlot: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  questionnaire: PreBookingQuestionnaire;
  totalPriceUSD: number;
  status: BookingStatus;
  createdAt: string;
  googleCalendarUrl: string;
  whatsappShareUrl: string;
  zoomLink: string;
}

export type BookingStatus = 'confirmed' | 'completed' | 'cancelled';

// ============================================================================
// Book Types
// ============================================================================

export interface BookItem {
  id: string;
  title: string;
  subtitle: string;
  author: string;
  priceHardcover: number;
  priceDigital: number;
  priceBundle: number;
  coverImage: string;
  previewChapters: PreviewChapter[];
  synopsis: string;
  testimonials: Testimonial[];
  specifications: BookSpecifications;
}

export interface PreviewChapter {
  number: number;
  title: string;
  excerpt: string;
  fullContent: string;
}

export interface Testimonial {
  author: string;
  role: string;
  quote: string;
}

export interface BookSpecifications {
  pages: number;
  language: string;
  publisher: string;
  isbn: string;
}

export type BookFormat = 'hardcover' | 'digital' | 'bundle';

export interface CartItem {
  id: string;
  format: BookFormat;
  price: number;
  title: string;
  quantity: number;
}

// ============================================================================
// Order Types
// ============================================================================

export interface OrderRecord {
  id: string;
  bookId: string;
  format: BookFormat;
  quantity: number;
  totalUSD: number;
  guestName: string;
  guestEmail: string;
  guestAddress?: string;
  status: OrderStatus;
  createdAt: string;
}

export type OrderStatus = 'processing' | 'shipped' | 'delivered';

// ============================================================================
// Donation Types
// ============================================================================

export interface AllyDonation {
  id: string;
  tierName: string;
  amountUSD: number;
  frequency: DonationFrequency;
  donorName: string;
  donorEmail: string;
  dedicatedTo?: string;
  createdAt: string;
}

export type DonationFrequency = 'one_time' | 'monthly';

// ============================================================================
// Contact Types
// ============================================================================

export interface ContactEnquiry {
  id: string;
  type: ContactType;
  name: string;
  email: string;
  organization?: string;
  message: string;
  createdAt: string;
}

export type ContactType = 'general' | 'speaking' | 'volunteer' | 'partnership' | 'therapy';

// ============================================================================
// Article Types
// ============================================================================

export interface Article {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  authorName: string;
  authorRole: string;
  authorAvatar: string;
  publishedDate: string;
  readTimeMinutes: number;
  coverImage: string;
  content: string;
  tags: string[];
  featured?: boolean;
}

// ============================================================================
// UI Types
// ============================================================================

export interface ToastMessage {
  id: string;
  type: ToastType;
  title: string;
  message: string;
}

export type ToastType = 'success' | 'info' | 'error';

export interface HeroSlide {
  id: number;
  title: string;
  subtitle: string;
  badge: string;
  imageUrl: string;
  ctaPrimary: string;
  ctaSecondary: string;
  targetCategory: string;
}

// ============================================================================
// Navigation Types
// ============================================================================

export type TabId = 
  | 'home' 
  | 'therapy' 
  | 'wellness' 
  | 'spa' 
  | 'youth' 
  | 'speaking' 
  | 'book' 
  | 'founder' 
  | 'initiative' 
  | 'journal';

// ============================================================================
// Form Types
// ============================================================================

export interface BookingFormData {
  serviceId: string;
  practitionerId: string;
  date: string;
  timeSlot: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  questionnaire: PreBookingQuestionnaire;
}

export interface ContactFormData {
  type: ContactType;
  name: string;
  email: string;
  organization?: string;
  message: string;
}

export interface DonationFormData {
  tierName: string;
  amountUSD: number;
  frequency: DonationFrequency;
  donorName: string;
  donorEmail: string;
  dedicatedTo?: string;
}
