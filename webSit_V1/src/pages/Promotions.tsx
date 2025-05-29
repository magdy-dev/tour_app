import Card from '../components/Card';

export default function Promotions() {
  // Placeholder promotions
  const promotions = [
    { id: 1, title: 'Summer Special', description: '20% off all Red Sea tours!', image: '/images/promo1.jpg', valid: 'June 1 - August 31' },
    { id: 2, title: 'Family Package', description: 'Kids go free on select safaris.', image: '/images/promo2.jpg', valid: 'All year' },
  ];
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Current Promotions & Offers</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {promotions.map(promo => (
          <Card key={promo.id} className="overflow-hidden">
            <img src={promo.image} alt={promo.title} className="w-full h-40 object-cover" />
            <div className="p-6">
              <h2 className="text-xl font-bold mb-2">{promo.title}</h2>
              <p className="text-gray-600 mb-2">{promo.description}</p>
              <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs">Valid: {promo.valid}</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
} 