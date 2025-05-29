import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Card from '../components/Card';

interface Tour {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  price: number;
  duration: string;
  rating: number;
  features: string[];
  itinerary: string[];
  included: string[];
  gallery: string[];
  reviews: {
    name: string;
    rating: number;
    comment: string;
    date: string;
  }[];
}

// Mock data - replace with actual data from your backend
const mockTour: Tour = {
  id: 1,
  title: 'Red Sea Snorkeling Adventure',
  description: 'Experience the vibrant marine life of the Red Sea with our guided snorkeling tour.',
  longDescription: `Join us for an unforgettable snorkeling adventure in the crystal-clear waters of the Red Sea. 
    Our expert guides will take you to the best snorkeling spots where you'll encounter colorful coral reefs and 
    diverse marine life. Perfect for both beginners and experienced snorkelers.`,
  image: '/images/snorkeling.jpg',
  price: 50,
  duration: '4 hours',
  rating: 4.8,
  features: [
    'Professional guide',
    'Quality snorkeling equipment',
    'Small group size',
    'Safety briefing',
    'Refreshments included',
    'Hotel pickup and drop-off'
  ],
  itinerary: [
    '09:00 AM - Hotel pickup',
    '09:30 AM - Arrival at snorkeling site',
    '10:00 AM - Safety briefing and equipment fitting',
    '10:30 AM - First snorkeling session',
    '12:00 PM - Lunch break',
    '01:00 PM - Second snorkeling session',
    '02:30 PM - Return to shore',
    '03:00 PM - Hotel drop-off'
  ],
  included: [
    'Snorkeling equipment',
    'Professional guide',
    'Hotel transfers',
    'Lunch and refreshments',
    'Insurance',
    'Photos (optional)'
  ],
  gallery: [
    '/images/snorkeling-1.jpg',
    '/images/snorkeling-2.jpg',
    '/images/snorkeling-3.jpg',
    '/images/snorkeling-4.jpg'
  ],
  reviews: [
    {
      name: 'John Smith',
      rating: 5,
      comment: 'Amazing experience! The coral reefs were beautiful and the guide was very knowledgeable.',
      date: '2024-02-15'
    },
    {
      name: 'Sarah Johnson',
      rating: 4,
      comment: 'Great tour, but the water was a bit cold. Otherwise, everything was perfect!',
      date: '2024-02-10'
    }
  ]
};

export default function TourDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('overview');

  // In a real app, fetch tour data based on id
  const tour = mockTour;

  if (!tour) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold mb-4">Tour Not Found</h1>
        <button
          onClick={() => navigate('/')}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Return Home
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="relative h-96">
        <img
          src={tour.image}
          alt={tour.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold mb-4">{tour.title}</h1>
            <div className="flex items-center justify-center space-x-4">
              <span className="text-yellow-400">★ {tour.rating}</span>
              <span>{tour.duration}</span>
              <span>${tour.price}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4">
        {/* Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="flex space-x-8">
            {['overview', 'itinerary', 'gallery', 'reviews'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-1 border-b-2 font-medium text-sm capitalize ${
                  activeTab === tab
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="space-y-8">
          {activeTab === 'overview' && (
            <>
              <div className="prose max-w-none">
                <p className="text-lg text-gray-600">{tour.longDescription}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <Card className="p-6">
                  <h3 className="text-xl font-bold mb-4">Features</h3>
                  <ul className="space-y-2">
                    {tour.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <span className="text-green-500 mr-2">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </Card>

                <Card className="p-6">
                  <h3 className="text-xl font-bold mb-4">What's Included</h3>
                  <ul className="space-y-2">
                    {tour.included.map((item, index) => (
                      <li key={index} className="flex items-center">
                        <span className="text-green-500 mr-2">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>
            </>
          )}

          {activeTab === 'itinerary' && (
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-4">Tour Itinerary</h3>
              <div className="space-y-4">
                {tour.itinerary.map((item, index) => (
                  <div key={index} className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold">
                      {index + 1}
                    </div>
                    <p className="ml-4 text-gray-600">{item}</p>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {activeTab === 'gallery' && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {tour.gallery.map((image, index) => (
                <div
                  key={index}
                  className="relative aspect-w-1 aspect-h-1 cursor-pointer"
                  onClick={() => setSelectedImage(image)}
                >
                  <img
                    src={image}
                    alt={`Gallery image ${index + 1}`}
                    className="absolute inset-0 w-full h-full object-cover rounded-lg"
                  />
                </div>
              ))}
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-6">
              {tour.reviews.map((review, index) => (
                <Card key={index} className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="font-bold">{review.name}</h4>
                      <div className="text-yellow-400">★ {review.rating}</div>
                    </div>
                    <span className="text-gray-500 text-sm">{review.date}</span>
                  </div>
                  <p className="text-gray-600">{review.comment}</p>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Booking Section */}
        <div className="mt-12 bg-gray-50 p-6 rounded-lg">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <h3 className="text-2xl font-bold mb-2">Ready to Book?</h3>
              <p className="text-gray-600">Join us for an unforgettable experience!</p>
            </div>
            <button
              onClick={() => navigate('/booking')}
              className="mt-4 md:mt-0 bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl w-full">
            <button
              className="absolute top-4 right-4 text-white text-2xl hover:text-gray-300"
              onClick={() => setSelectedImage(null)}
            >
              ×
            </button>
            <img
              src={selectedImage}
              alt="Gallery"
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
} 