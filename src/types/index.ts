
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: "admin" | "assistant" | "coworker";
  avatar?: string;
  phone?: string;
  company?: string;
  position?: string;
  createdAt: string;
}

export interface Space {
  id: string;
  name: string;
  description: string;
  capacity: number;
  pricePerHour: number;
  pricePerDay: number;
  pricePerMonth: number;
  amenities: string[];
  images: string[];
  isAvailable: boolean;
}

export interface Reservation {
  id: string;
  userId: string;
  spaceId: string;
  startTime: string;
  endTime: string;
  status: "pending" | "confirmed" | "cancelled";
  totalPrice: number;
  paymentStatus: "pending" | "paid" | "refunded";
  createdAt: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  location: string;
  capacity: number;
  price: number;
  image?: string;
  organizer: string;
  isPublic: boolean;
  createdAt: string;
}

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  coverImage?: string;
  tags: string[];
  slug: string;
  isPublished: boolean;
  publishedAt?: string;
  createdAt: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  order: number;
}

export interface TeamMember {
  id: string;
  userId: string;
  role: string;
  department: string;
  bio: string;
  socialLinks: {
    linkedin?: string;
    twitter?: string;
    website?: string;
  };
  isPublic: boolean;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  isRead: boolean;
  createdAt: string;
}

export interface Invoice {
  id: string;
  userId: string;
  amount: number;
  status: "draft" | "sent" | "paid" | "overdue" | "cancelled";
  dueDate: string;
  items: {
    description: string;
    quantity: number;
    unitPrice: number;
  }[];
  createdAt: string;
}

export interface PromoCode {
  id: string;
  code: string;
  discountPercentage: number;
  validFrom: string;
  validUntil: string;
  maxUses: number;
  currentUses: number;
  isActive: boolean;
}

export interface Document {
  id: string;
  userId: string;
  name: string;
  type: string;
  url: string;
  size: number;
  createdAt: string;
}

export interface Domiciliation {
  id: string;
  userId: string;
  companyName: string;
  address: string;
  startDate: string;
  endDate: string;
  status: "active" | "expired" | "cancelled";
  documents: Document[];
  createdAt: string;
}
