import type { Service, Testimonial } from './types';
import { PlaceHolderImages } from './placeholder-images';

// Helper to get image URL from placeholder data
export const placeHolderImages = PlaceHolderImages;

const getImageUrl = (id: string) => {
  const image = placeHolderImages.find((img) => img.id === id);
  return image ? image.imageUrl : 'https://picsum.photos/seed/placeholder/400/300';
};

const testimonials: Testimonial[] = [
  { id: 't1', author: 'Jane Doe', rating: 5, comment: 'Absolutely amazing! Best haircut I have ever had.' },
  { id: 't2', author: 'John Smith', rating: 4, comment: 'Great service and friendly staff. Will come again.' },
  { id: 't3', author: 'Emily White', rating: 5, comment: 'The color is vibrant and exactly what I wanted. Thank you!' },
  { id: 't4', author: 'Michael Brown', rating: 5, comment: 'So relaxing and professional. My nails look fantastic.' },
];

export const services: Service[] = [
  {
    id: '1',
    name: 'Precision Haircut & Style',
    description: 'Our signature service. A consultation, precision haircut, and professional styling to give you the perfect look that suits your lifestyle. Includes a relaxing shampoo and conditioning treatment.',
    duration: 60,
    price: 75,
    imageId: 'haircut-style',
    rating: 4.8,
    testimonials: [testimonials[0], testimonials[1]],
  },
  {
    id: '2',
    name: 'Creative Hair Coloring',
    description: 'From subtle highlights to bold new colors, our expert colorists use premium products to achieve stunning, long-lasting results. Service includes a post-color treatment to lock in shine.',
    duration: 120,
    price: 150,
    imageId: 'hair-coloring',
    rating: 4.9,
    testimonials: [testimonials[2]],
  },
  {
    id: '3',
    name: 'Luxury Manicure & Pedicure',
    description: 'Indulge in our luxury nail service. Includes nail shaping, cuticle care, a soothing massage, and your choice of high-quality polish. A true treat for your hands and feet.',
    duration: 90,
    price: 90,
    imageId: 'manicure-pedicure',
    rating: 4.7,
    testimonials: [testimonials[3]],
  },
  {
    id: '4',
    name: 'Rejuvenating Facial',
    description: 'Refresh and revitalize your skin with our custom facial treatment. Tailored to your skin type, this service cleanses, exfoliates, and nourishes, leaving you with a healthy, radiant glow.',
    duration: 75,
    price: 120,
    imageId: 'facial-treatment',
    rating: 4.8,
    testimonials: [
        { id: 't5', author: 'Sarah Green', rating: 5, comment: 'My skin has never felt better. So refreshing!'},
    ],
  },
  {
    id: '5',
    name: 'Bridal Makeup & Hair',
    description: 'Look your absolute best on your special day. Our bridal package includes a full consultation, trial run, and on-the-day professional makeup and hair styling.',
    duration: 180,
    price: 350,
    imageId: 'bridal-makeup',
    rating: 5.0,
    testimonials: [
        { id: 't6', author: 'Olivia Williams', rating: 5, comment: 'Felt like a princess! The look lasted all day and night.'},
    ],
  },
];
