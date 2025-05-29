import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import { useTranslation } from 'react-i18next';

interface BookingFormData {
  tourId: string;
  date: string;
  time: string;
  adults: number;
  children: number;
  name: string;
  email: string;
  phone: string;
  specialRequests: string;
}

const initialFormData: BookingFormData = {
  tourId: '',
  date: '',
  time: '',
  adults: 1,
  children: 0,
  name: '',
  email: '',
  phone: '',
  specialRequests: ''
};

// Mock tours data - replace with actual data from your backend
const tours = [
  {
    id: '1',
    title: 'Red Sea Snorkeling Adventure',
    price: 50,
    duration: '4 hours'
  },
  {
    id: '2',
    title: 'Desert Safari Experience',
    price: 75,
    duration: '6 hours'
  },
  {
    id: '3',
    title: 'Luxury Yacht Cruise',
    price: 120,
    duration: '8 hours'
  }
];

export default function Booking() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<BookingFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedTour, setSelectedTour] = useState(tours[0]);
  const { t } = useTranslation();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (name === 'tourId') {
      const tour = tours.find(t => t.id === value);
      if (tour) {
        setSelectedTour(tour);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // In a real app, send the booking data to your backend
      console.log('Booking data:', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success message and redirect
      alert('Booking successful! We will contact you shortly.');
      navigate('/');
    } catch (error) {
      console.error('Booking failed:', error);
      alert('Booking failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Book Your Tour</h1>
        <p className="text-xl text-gray-600">
          Fill out the form below to reserve your spot
        </p>
      </div>

      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Tour Selection */}
          <div>
            <label htmlFor="tourId" className="block text-sm font-medium text-gray-700 mb-1">
              Select Tour
            </label>
            <select
              id="tourId"
              name="tourId"
              value={formData.tourId}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">Select a tour</option>
              {tours.map(tour => (
                <option key={tour.id} value={tour.id}>
                  {tour.title} - ${tour.price} ({tour.duration})
                </option>
              ))}
            </select>
          </div>

          {/* Date and Time */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                Date
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
                Time
              </label>
              <input
                type="time"
                id="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>

          {/* Number of Guests */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="adults" className="block text-sm font-medium text-gray-700 mb-1">
                Number of Adults
              </label>
              <input
                type="number"
                id="adults"
                name="adults"
                min="1"
                value={formData.adults}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="children" className="block text-sm font-medium text-gray-700 mb-1">
                Number of Children
              </label>
              <input
                type="number"
                id="children"
                name="children"
                min="0"
                value={formData.children}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Information</h3>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>

          {/* Special Requests */}
          <div>
            <label htmlFor="specialRequests" className="block text-sm font-medium text-gray-700 mb-1">
              Special Requests
            </label>
            <textarea
              id="specialRequests"
              name="specialRequests"
              value={formData.specialRequests}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Booking Summary */}
          {selectedTour && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Booking Summary</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Tour:</span>
                  <span>{selectedTour.title}</span>
                </div>
                <div className="flex justify-between">
                  <span>Duration:</span>
                  <span>{selectedTour.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span>Adults:</span>
                  <span>${selectedTour.price * formData.adults}</span>
                </div>
                {formData.children > 0 && (
                  <div className="flex justify-between">
                    <span>Children:</span>
                    <span>${selectedTour.price * formData.children * 0.5}</span>
                  </div>
                )}
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between font-bold">
                    <span>Total:</span>
                    <span>
                      $
                      {selectedTour.price * formData.adults +
                        selectedTour.price * formData.children * 0.5}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition font-semibold ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isSubmitting ? t('processing') : t('confirm')}
          </button>
        </form>
      </Card>
    </div>
  );
} 