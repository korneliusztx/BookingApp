export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
}

export interface Testimonial {
  id: string;
  author: string;
  rating: number;
  comment: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  duration: number; // in minutes
  price: number;
  imageId: string;
  rating: number;
  testimonials: Testimonial[];
}

export interface Booking {
  id: string;
  userId: string;
  serviceId: string;
  customerName: string;
  bookingDate: Date;
  notes?: string;
  status: 'Confirmed' | 'In Progress' | 'Completed' | 'Cancelled';
}
