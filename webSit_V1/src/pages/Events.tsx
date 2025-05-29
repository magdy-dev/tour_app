import Card from '../components/Card';

export default function Events() {
  // Placeholder events
  const events = [
    { id: 1, title: 'Desert Safari Rally', date: '2024-07-15', description: 'Join our annual desert rally adventure!', image: '/images/event1.jpg' },
    { id: 2, title: 'Red Sea Cleanup', date: '2024-08-10', description: 'Help us keep the Red Sea beautiful.', image: '/images/event2.jpg' },
  ];
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Upcoming Events</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.map(event => (
          <Card key={event.id} className="overflow-hidden">
            <img src={event.image} alt={event.title} className="w-full h-40 object-cover" />
            <div className="p-6">
              <h2 className="text-xl font-bold mb-2">{event.title}</h2>
              <p className="text-gray-600 mb-2">{event.description}</p>
              <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs">{event.date}</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
} 