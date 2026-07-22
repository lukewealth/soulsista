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
  journeySteps: { title: string; description: string }[];
  practitionerIds: string[];
  faqs: { question: string; answer: string }[];
}

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

export interface BookItem {
  id: string;
  title: string;
  subtitle: string;
  author: string;
  priceHardcover: number;
  priceDigital: number;
  priceBundle: number;
  coverImage: string;
  previewChapters: {
    number: number;
    title: string;
    excerpt: string;
    fullContent: string;
  }[];
  synopsis: string;
  testimonials: { author: string; role: string; quote: string }[];
  specifications: {
    pages: number;
    language: string;
    publisher: string;
    isbn: string;
  };
}

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
  content: string; // Markdown / styled text
  tags: string[];
  featured?: boolean;
}

export interface PreBookingQuestionnaire {
  intentReason: string;
  emotionalStateScore: number; // 1 to 10
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
  date: string; // YYYY-MM-DD
  timeSlot: string; // HH:MM
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  questionnaire: PreBookingQuestionnaire;
  totalPriceUSD: number;
  status: 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
  googleCalendarUrl: string;
  whatsappShareUrl: string;
  zoomLink: string;
}

export interface OrderRecord {
  id: string;
  bookId: string;
  format: 'hardcover' | 'digital' | 'bundle';
  quantity: number;
  totalUSD: number;
  guestName: string;
  guestEmail: string;
  guestAddress?: string;
  status: 'processing' | 'shipped' | 'delivered';
  createdAt: string;
}

export interface AllyDonation {
  id: string;
  tierName: string;
  amountUSD: number;
  frequency: 'one_time' | 'monthly';
  donorName: string;
  donorEmail: string;
  dedicatedTo?: string;
  createdAt: string;
}

export interface ContactEnquiry {
  id: string;
  type: 'general' | 'speaking' | 'volunteer' | 'partnership' | 'therapy';
  name: string;
  email: string;
  organization?: string;
  message: string;
  createdAt: string;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'error';
  title: string;
  message: string;
}
