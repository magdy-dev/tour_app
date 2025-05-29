export interface Tour {
  id: number;
  type: 'snorkeling' | 'desert' | 'yacht';
  image: string;
  price: number;
  duration: string;
  rating: number;
  features: string[];
}

export const tours: Tour[] = [
  {
    id: 1,
    type: 'snorkeling',
    image: '/gallery/g4.jpeg',
    price: 50,
    duration: '4 hours',
    rating: 4.8,
    features: ['Professional guide', 'Equipment included', 'Snacks provided']
  },
  {
    id: 2,
    type: 'desert',
    image: '/gallery/t1.jpeg',
    price: 75,
    duration: '6 hours',
    rating: 4.9,
    features: ['Quad biking', 'Traditional dinner', 'Sunset view']
  },
  {
    id: 3,
    type: 'yacht',
    image: '/gallery/g8.webp',
    price: 120,
    duration: '8 hours',
    rating: 4.7,
    features: ['Private yacht', 'Lunch included', 'Water activities']
  }
]; 