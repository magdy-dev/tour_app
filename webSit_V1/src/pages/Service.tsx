import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface Service {
  id: string;
  title: string;
  description: string;
  image: string;
  price: number;
  duration: string;
  section: 'Safari' | 'Culture' | 'Sea' | 'Transfer';
}

export default function Service() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [activeSection, setActiveSection] = useState<'Safari' | 'Culture' | 'Sea' | 'Transfer' | 'All'>('All');
  const { t } = useTranslation();

  const services: Service[] = [
    {
      id: '1',
      title: 'Red Sea Snorkeling Adventure',
      description: 'Explore the vibrant coral reefs and marine life of the Red Sea with our expert guides.',
      image: '/images/snorkeling.jpg',
      price: 50,
      duration: '4 hours',
      section: 'Sea',
    },
    {
      id: '2',
      title: 'Desert Safari Experience',
      description: 'Experience the thrill of dune bashing and enjoy a traditional Bedouin dinner under the stars.',
      image: '/images/desert.jpg',
      price: 75,
      duration: '6 hours',
      section: 'Safari',
    },
    {
      id: '3',
      title: 'Luxury Yacht Cruise',
      description: 'Sail the Red Sea in style on our luxury yacht, complete with gourmet meals and water activities.',
      image: '/images/yacht.jpg',
      price: 150,
      duration: '8 hours',
      section: 'Sea',
    },
    {
      id: '4',
      title: 'Cultural City Tour',
      description: 'Discover the rich history and culture of Egypt with a guided city tour.',
      image: '/images/culture.jpg',
      price: 60,
      duration: '5 hours',
      section: 'Culture',
    },
    {
      id: '5',
      title: 'Airport Transfer',
      description: 'Comfortable and reliable transfer from the airport to your hotel.',
      image: '/images/transfer.jpg',
      price: 30,
      duration: '1 hour',
      section: 'Transfer',
    },
  ];

  const sections = ['All', 'Safari', 'Culture', 'Sea', 'Transfer'] as const;

  // Filter by section and search
  const filteredServices = services.filter(service =>
    (activeSection === 'All' || service.section === activeSection) &&
    (
      service.title.toLowerCase().includes(search.toLowerCase()) ||
      service.description.toLowerCase().includes(search.toLowerCase())
    )
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-2">Our Services</h1>
        <p className="text-gray-600 max-w-2xl mx-auto mb-6">
          Discover our range of exciting tours and activities in Hurghada. From underwater adventures to desert safaris, we have something for everyone.
        </p>
        {/* Section Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {sections.map(section => (
            <button
              key={section}
              className={`px-4 py-2 rounded-full border transition font-semibold text-sm ${activeSection === section ? 'bg-blue-600 text-white shadow' : 'bg-white text-blue-700 border-blue-200 hover:bg-blue-50'}`}
              onClick={() => setActiveSection(section)}
            >
              {section}
            </button>
          ))}
        </div>
        {/* Search Bar */}
        <div className="flex justify-center">
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search services..."
            className="w-full max-w-xs px-4 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
          />
        </div>
      </div>

      {/* Service Cards Grid */}
      {filteredServices.length === 0 ? (
        <div className="text-center text-gray-400 text-lg mt-20">No services found for your search or selected section.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map(service => (
            <Card
              key={service.id}
              className="overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-white/80 backdrop-blur-sm border-0 cursor-pointer group"
            >
              <div>
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300 rounded-t-lg"
                />
                <div className="flex gap-2 mt-3 mb-2 justify-center">
                  <span className="inline-block bg-blue-600 text-white text-xs px-3 py-1 rounded-full shadow">{service.section}</span>
                  <span className="inline-block bg-green-500 text-white text-xs px-3 py-1 rounded-full shadow">${service.price}</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-500 text-sm">{service.duration}</span>
                </div>
                <div className="flex space-x-4">
                  <button
                    onClick={() => navigate(`/tour/${service.id}`)}
                    className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition font-semibold"
                  >
                    {t('learnMore')}
                  </button>
                  <button
                    onClick={() => navigate('/booking')}
                    className="flex-1 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition font-semibold"
                  >
                    {t('bookNow')}
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
} 