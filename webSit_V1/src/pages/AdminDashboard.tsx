import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import Tabs from '../components/Tabs';
import Badge from '../components/Badge';

interface Tour {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  price: number;
  duration: string;
  status: 'active' | 'inactive';
  section: 'Safari' | 'Culture' | 'Sea' | 'Transfer';
  features?: string[];
  itinerary?: string;
  included?: string[];
  gallery?: string[];
  image?: string;
}

interface Booking {
  id: string;
  tourId: string;
  tourTitle: string;
  date: string;
  time: string;
  name: string;
  email: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  userId: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  whatsapp?: string;
}

interface Photo {
  src: string;
  alt: string;
}

const initialTour: Omit<Tour, 'id'> = {
  title: '',
  description: '',
  longDescription: '',
  price: 0,
  duration: '',
  status: 'active',
  section: 'Safari',
  features: [],
  itinerary: '',
  included: [],
  gallery: [],
  image: '',
};

const initialBooking: Omit<Booking, 'id' | 'tourTitle'> = {
  tourId: '',
  date: '',
  time: '',
  name: '',
  email: '',
  status: 'pending',
  userId: '',
};

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('tours');
  const [search, setSearch] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [modal, setModal] = useState<null | 'createTour' | 'editTour' | 'deleteTour' | 'createBooking' | 'editBooking' | 'deleteBooking'>(null);
  const [editTour, setEditTour] = useState<Tour | null>(null);
  const [editBooking, setEditBooking] = useState<Booking | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [tourImagePreview, setTourImagePreview] = useState<string | null>(null);
  const navigate = useNavigate();

  // Mock data - in a real app, this would come from an API
  const [tours, setTours] = useState<Tour[]>([
    {
      id: '1',
      title: 'Red Sea Snorkeling Adventure',
      description: 'Explore the vibrant coral reefs and marine life of the Red Sea with our expert guides.',
      price: 50,
      duration: '4 hours',
      status: 'active',
      section: 'Sea',
      image: '',
    },
    {
      id: '2',
      title: 'Desert Safari Experience',
      description: 'Experience the thrill of dune bashing and enjoy a traditional Bedouin dinner under the stars.',
      price: 75,
      duration: '6 hours',
      status: 'active',
      section: 'Safari',
      image: '',
    },
    {
      id: '3',
      title: 'Luxury Yacht Cruise',
      description: 'Sail the Red Sea in style on our luxury yacht, complete with gourmet meals and water activities.',
      price: 150,
      duration: '8 hours',
      status: 'inactive',
      section: 'Sea',
      image: '',
    },
  ]);

  const [users] = useState<User[]>([
    { id: 'u1', name: 'John Doe', email: 'john@example.com', whatsapp: '+381691232565' },
    { id: 'u2', name: 'Jane Smith', email: 'jane@example.com', whatsapp: '+201110083675' },
    { id: 'u3', name: 'Ahmed Ali', email: 'ahmed@example.com' },
  ]);

  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: '1',
      tourId: '1',
      tourTitle: 'Red Sea Snorkeling Adventure',
      date: '2024-03-20',
      time: '09:00',
      name: 'John Doe',
      email: 'john@example.com',
      status: 'confirmed',
      userId: 'u1',
    },
    {
      id: '2',
      tourId: '2',
      tourTitle: 'Desert Safari Experience',
      date: '2024-03-21',
      time: '14:00',
      name: 'Jane Smith',
      email: 'jane@example.com',
      status: 'pending',
      userId: 'u2',
    },
    {
      id: '3',
      tourId: '1',
      tourTitle: 'Red Sea Snorkeling Adventure',
      date: '2024-03-22',
      time: '10:00',
      name: 'Ahmed Ali',
      email: 'ahmed@example.com',
      status: 'cancelled',
      userId: 'u3',
    },
  ]);

  const [photos, setPhotos] = useState<Photo[]>([
    // Example initial photos (simulate loading from /public/photo)
    { src: '/photo/example1.jpg', alt: 'example1' },
    { src: '/photo/example2.jpg', alt: 'example2' },
  ]);

  // Promotions state and handlers
  const [promotions, setPromotions] = useState([
    { id: '1', title: 'Summer Special', description: '20% off all Red Sea tours!', image: '/images/promo1.jpg', valid: 'June 1 - August 31' },
    { id: '2', title: 'Family Package', description: 'Kids go free on select safaris.', image: '/images/promo2.jpg', valid: 'All year' },
  ]);
  const [newPromotion, setNewPromotion] = useState({ title: '', description: '', image: '', valid: '' });
  const addPromotion = (e: any) => {
    e.preventDefault();
    setPromotions([...promotions, { ...newPromotion, id: Date.now().toString() }]);
    setNewPromotion({ title: '', description: '', image: '', valid: '' });
  };
  const deletePromotion = (id: string) => setPromotions(promotions.filter(p => p.id !== id));

  // Events state and handlers
  const [events, setEvents] = useState([
    { id: '1', title: 'Desert Safari Rally', date: '2024-07-15', description: 'Join our annual desert rally adventure!', image: '/images/event1.jpg' },
    { id: '2', title: 'Red Sea Cleanup', date: '2024-08-10', description: 'Help us keep the Red Sea beautiful.', image: '/images/event2.jpg' },
  ]);
  const [newEvent, setNewEvent] = useState({ title: '', description: '', image: '', date: '' });
  const addEvent = (e: any) => {
    e.preventDefault();
    setEvents([...events, { ...newEvent, id: Date.now().toString() }]);
    setNewEvent({ title: '', description: '', image: '', date: '' });
  };
  const deleteEvent = (id: string) => setEvents(events.filter(ev => ev.id !== id));

  // Blog state and handlers
  const [posts, setPosts] = useState([
    { id: '1', title: 'Top 5 Things to Do in Hurghada', excerpt: 'Discover the best activities for your Red Sea adventure.', image: '/images/blog1.jpg', date: '2024-06-01' },
    { id: '2', title: 'How to Prepare for a Desert Safari', excerpt: 'Tips and tricks for a safe and fun safari experience.', image: '/images/blog2.jpg', date: '2024-06-10' },
  ]);
  const [newPost, setNewPost] = useState({ title: '', excerpt: '', image: '', date: '' });
  const addPost = (e: any) => {
    e.preventDefault();
    setPosts([...posts, { ...newPost, id: Date.now().toString() }]);
    setNewPost({ title: '', excerpt: '', image: '', date: '' });
  };
  const deletePost = (id: string) => setPosts(posts.filter(p => p.id !== id));

  const handlePrint = () => {
    window.print();
  };

  const handleLogout = () => {
    navigate('/admin/login');
  };

  const tabs = [
    { id: 'tours', label: 'Tours' },
    { id: 'bookings', label: 'Bookings' },
    { id: 'users', label: 'Users' },
    { id: 'photos', label: 'Photos' },
    { id: 'promotions', label: 'Promotions' },
    { id: 'events', label: 'Events' },
    { id: 'blog', label: 'Blog' },
  ];

  // Filter logic
  const filteredTours = tours.filter(tour =>
    tour.title.toLowerCase().includes(search.toLowerCase())
  );
  const filteredBookings = bookings.filter(booking =>
    booking.tourTitle.toLowerCase().includes(search.toLowerCase()) ||
    booking.name.toLowerCase().includes(search.toLowerCase()) ||
    booking.email.toLowerCase().includes(search.toLowerCase())
  );
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase())
  );

  // User bookings
  const userBookings = selectedUser
    ? bookings.filter(b => b.userId === selectedUser.id)
    : [];

  // CRUD handlers for Tours
  const openCreateTour = () => { setEditTour(null); setModal('createTour'); };
  const openEditTour = (tour: Tour) => { setEditTour(tour); setModal('editTour'); };
  const openDeleteTour = (id: string) => { setDeleteId(id); setModal('deleteTour'); };

  const handleTourSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as typeof e.target & {
      title: { value: string };
      description: { value: string };
      longDescription: { value: string };
      price: { value: string };
      duration: { value: string };
      status: { value: 'active' | 'inactive' };
      section: { value: 'Safari' | 'Culture' | 'Sea' | 'Transfer' };
      features: { value: string };
      itinerary: { value: string };
      included: { value: string };
      gallery: { value: string };
      image: { files: FileList };
    };
    let imageData = tourImagePreview || editTour?.image || '';
    if (form.image.files && form.image.files[0]) {
      // If a new image is uploaded, use the preview (already set by onChange)
      imageData = tourImagePreview || '';
    }
    if (editTour) {
      setTours(tours.map(t => t.id === editTour.id ? { ...editTour, ...{
        title: form.title.value,
        description: form.description.value,
        longDescription: form.longDescription.value,
        price: Number(form.price.value),
        duration: form.duration.value,
        status: form.status.value,
        section: form.section.value,
        features: form.features.value.split(',').map((f: string) => f.trim()).filter(Boolean),
        itinerary: form.itinerary.value,
        included: form.included.value.split(',').map((f: string) => f.trim()).filter(Boolean),
        gallery: form.gallery.value.split(',').map((f: string) => f.trim()).filter(Boolean),
        image: imageData,
      }} : t));
    } else {
      setTours([...tours, {
        id: (Math.random() * 100000).toFixed(0),
        title: form.title.value,
        description: form.description.value,
        longDescription: form.longDescription.value,
        price: Number(form.price.value),
        duration: form.duration.value,
        status: form.status.value,
        section: form.section.value,
        features: form.features.value.split(',').map((f: string) => f.trim()).filter(Boolean),
        itinerary: form.itinerary.value,
        included: form.included.value.split(',').map((f: string) => f.trim()).filter(Boolean),
        gallery: form.gallery.value.split(',').map((f: string) => f.trim()).filter(Boolean),
        image: imageData,
      }]);
    }
    setTourImagePreview(null);
    setModal(null);
  };
  const handleTourDelete = () => {
    setTours(tours.filter(t => t.id !== deleteId));
    setModal(null);
  };

  // CRUD handlers for Bookings
  const openCreateBooking = () => { setEditBooking(null); setModal('createBooking'); };
  const openEditBooking = (booking: Booking) => { setEditBooking(booking); setModal('editBooking'); };
  const openDeleteBooking = (id: string) => { setDeleteId(id); setModal('deleteBooking'); };

  const handleBookingSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as typeof e.target & {
      tourId: { value: string };
      date: { value: string };
      time: { value: string };
      name: { value: string };
      email: { value: string };
      status: { value: 'pending' | 'confirmed' | 'cancelled' };
      userId: { value: string };
    };
    const tour = tours.find(t => t.id === form.tourId.value);
    if (editBooking) {
      setBookings(bookings.map(b => b.id === editBooking.id ? {
        ...editBooking,
        tourId: form.tourId.value,
        tourTitle: tour ? tour.title : '',
        date: form.date.value,
        time: form.time.value,
        name: form.name.value,
        email: form.email.value,
        status: form.status.value,
        userId: form.userId.value,
      } : b));
    } else {
      setBookings([...bookings, {
        id: (Math.random() * 100000).toFixed(0),
        tourId: form.tourId.value,
        tourTitle: tour ? tour.title : '',
        date: form.date.value,
        time: form.time.value,
        name: form.name.value,
        email: form.email.value,
        status: form.status.value,
        userId: form.userId.value,
      }]);
    }
    setModal(null);
  };
  const handleBookingDelete = () => {
    setBookings(bookings.filter(b => b.id !== deleteId));
    setModal(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <div className="space-x-4">
          <button
            onClick={handlePrint}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Print
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </div>

      <Tabs tabs={tabs} activeTab={activeTab} onTabChange={(tab: string) => { setActiveTab(tab); setSearch(''); setSelectedUser(null); }} />

      {/* Search/filter input */}
      <div className="my-6 max-w-md">
        <input
          type="text"
          placeholder={`Search ${activeTab}...`}
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div className="mt-8">
        {activeTab === 'tours' && (
          <div className="space-y-4">
            <button
              className="mb-4 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
              onClick={openCreateTour}
            >
              + Create Tour
            </button>
            {filteredTours.map((tour) => (
              <Card key={tour.id} className="p-6 flex items-center gap-6">
                {tour.image && (
                  <img src={tour.image} alt={tour.title} className="w-24 h-24 object-cover rounded-lg border border-gray-200" />
                )}
                <div className="flex-1 min-w-0">
                  <h3 className="text-2xl font-bold truncate">{tour.title}</h3>
                  <p className="text-base text-gray-600 truncate mb-2">{tour.description}</p>
                  <p className="text-lg text-gray-500">
                    ${tour.price} • {tour.duration}
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <Badge
                    variant={tour.status === 'active' ? 'success' : 'secondary'}
                  >
                    {tour.status}
                  </Badge>
                  <button className="text-base text-blue-600 hover:text-blue-700 px-3 py-2" onClick={() => openEditTour(tour)}>Edit</button>
                  <button className="text-base text-red-600 hover:text-red-700 px-3 py-2" onClick={() => openDeleteTour(tour.id)}>Delete</button>
                </div>
              </Card>
            ))}
          </div>
        )}

        {activeTab === 'bookings' && (
          <div className="space-y-4">
            <button
              className="mb-4 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
              onClick={openCreateBooking}
            >
              + Create Booking
            </button>
            {filteredBookings.map((booking) => (
              <Card key={booking.id} className="p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-semibold">{booking.tourTitle}</h3>
                    <p className="text-gray-600">
                      {booking.date} at {booking.time}
                    </p>
                    <p className="text-gray-600">
                      {booking.name} • {booking.email}
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Badge
                      variant={
                        booking.status === 'confirmed'
                          ? 'success'
                          : booking.status === 'pending'
                          ? 'warning'
                          : 'error'
                      }
                    >
                      {booking.status}
                    </Badge>
                    <button className="text-blue-600 hover:text-blue-700" onClick={() => openEditBooking(booking)}>Edit</button>
                    <button className="text-red-600 hover:text-red-700" onClick={() => openDeleteBooking(booking.id)}>Delete</button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {activeTab === 'users' && !selectedUser && (
          <div className="space-y-4">
            {filteredUsers.map((user) => (
              <Card key={user.id} className="p-6 cursor-pointer" onClick={() => setSelectedUser(user)} whatsapp={user.whatsapp}>
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-semibold">{user.name}</h3>
                    <p className="text-gray-600">{user.email}</p>
                  </div>
                  <button className="text-blue-600 hover:text-blue-700">View Bookings</button>
                </div>
              </Card>
            ))}
          </div>
        )}

        {activeTab === 'users' && selectedUser && (
          <div>
            <button
              className="mb-4 text-blue-600 hover:text-blue-700"
              onClick={() => setSelectedUser(null)}
            >
              ← Back to Users
            </button>
            <h2 className="text-2xl font-bold mb-4">Bookings for {selectedUser.name}</h2>
            <div className="space-y-4">
              {userBookings.length === 0 && (
                <p className="text-gray-600">No bookings found for this user.</p>
              )}
              {userBookings.map((booking) => (
                <Card key={booking.id} className="p-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-xl font-semibold">{booking.tourTitle}</h3>
                      <p className="text-gray-600">
                        {booking.date} at {booking.time}
                      </p>
                      <p className="text-gray-600">
                        {booking.name} • {booking.email}
                      </p>
                    </div>
                    <Badge
                      variant={
                        booking.status === 'confirmed'
                          ? 'success'
                          : booking.status === 'pending'
                          ? 'warning'
                          : 'error'
                      }
                    >
                      {booking.status}
                    </Badge>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'photos' && (
          <div>
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold">Manage Photos</h2>
              <label className="bg-blue-600 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-blue-700">
                Upload Photo
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={e => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (ev) => {
                        setPhotos(prev => [
                          ...prev,
                          { src: ev.target?.result as string, alt: file.name.split('.')[0] }
                        ]);
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </label>
            </div>
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-4">
              {photos.map((photo, idx) => (
                <div key={idx} className="relative group">
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    className="w-20 h-20 object-cover rounded-md border border-gray-200 shadow-sm"
                  />
                  <button
                    className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 opacity-80 hover:opacity-100 z-10"
                    title="Delete"
                    onClick={() => setPhotos(photos.filter((_, i) => i !== idx))}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-4">(This is a demo. Uploaded/deleted photos are not saved after reload.)</p>
          </div>
        )}

        {/* Promotions Tab */}
        {activeTab === 'promotions' && (
          <div className="space-y-6">
            <form onSubmit={addPromotion} className="flex flex-wrap gap-4 items-end mb-6">
              <input value={newPromotion.title} onChange={e => setNewPromotion({ ...newPromotion, title: e.target.value })} placeholder="Title" className="border px-2 py-1 rounded" required />
              <input value={newPromotion.description} onChange={e => setNewPromotion({ ...newPromotion, description: e.target.value })} placeholder="Description" className="border px-2 py-1 rounded" required />
              <input value={newPromotion.image} onChange={e => setNewPromotion({ ...newPromotion, image: e.target.value })} placeholder="Image URL" className="border px-2 py-1 rounded" required />
              <input value={newPromotion.valid} onChange={e => setNewPromotion({ ...newPromotion, valid: e.target.value })} placeholder="Valid Dates" className="border px-2 py-1 rounded" required />
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Add Promotion</button>
            </form>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {promotions.map(promo => (
                <Card key={promo.id} className="overflow-hidden">
                  <img src={promo.image} alt={promo.title} className="w-full h-32 object-cover" />
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-1">{promo.title}</h3>
                    <p className="text-gray-600 mb-1">{promo.description}</p>
                    <span className="inline-block bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs mb-2">Valid: {promo.valid}</span>
                    <button onClick={() => deletePromotion(promo.id)} className="text-red-600 hover:underline text-xs">Delete</button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Events Tab */}
        {activeTab === 'events' && (
          <div className="space-y-6">
            <form onSubmit={addEvent} className="flex flex-wrap gap-4 items-end mb-6">
              <input value={newEvent.title} onChange={e => setNewEvent({ ...newEvent, title: e.target.value })} placeholder="Title" className="border px-2 py-1 rounded" required />
              <input value={newEvent.description} onChange={e => setNewEvent({ ...newEvent, description: e.target.value })} placeholder="Description" className="border px-2 py-1 rounded" required />
              <input value={newEvent.image} onChange={e => setNewEvent({ ...newEvent, image: e.target.value })} placeholder="Image URL" className="border px-2 py-1 rounded" required />
              <input value={newEvent.date} onChange={e => setNewEvent({ ...newEvent, date: e.target.value })} placeholder="Date (YYYY-MM-DD)" className="border px-2 py-1 rounded" required />
              <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Add Event</button>
            </form>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map(event => (
                <Card key={event.id} className="overflow-hidden">
                  <img src={event.image} alt={event.title} className="w-full h-32 object-cover" />
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-1">{event.title}</h3>
                    <p className="text-gray-600 mb-1">{event.description}</p>
                    <span className="inline-block bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs mb-2">{event.date}</span>
                    <button onClick={() => deleteEvent(event.id)} className="text-red-600 hover:underline text-xs">Delete</button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Blog Tab */}
        {activeTab === 'blog' && (
          <div className="space-y-6">
            <form onSubmit={addPost} className="flex flex-wrap gap-4 items-end mb-6">
              <input value={newPost.title} onChange={e => setNewPost({ ...newPost, title: e.target.value })} placeholder="Title" className="border px-2 py-1 rounded" required />
              <input value={newPost.excerpt} onChange={e => setNewPost({ ...newPost, excerpt: e.target.value })} placeholder="Excerpt" className="border px-2 py-1 rounded" required />
              <input value={newPost.image} onChange={e => setNewPost({ ...newPost, image: e.target.value })} placeholder="Image URL" className="border px-2 py-1 rounded" required />
              <input value={newPost.date} onChange={e => setNewPost({ ...newPost, date: e.target.value })} placeholder="Date (YYYY-MM-DD)" className="border px-2 py-1 rounded" required />
              <button type="submit" className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">Add Post</button>
            </form>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map(post => (
                <Card key={post.id} className="overflow-hidden">
                  <img src={post.image} alt={post.title} className="w-full h-32 object-cover" />
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-1">{post.title}</h3>
                    <p className="text-gray-600 mb-1">{post.excerpt}</p>
                    <span className="inline-block bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full text-xs mb-2">{post.date}</span>
                    <button onClick={() => deletePost(post.id)} className="text-red-600 hover:underline text-xs">Delete</button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* --- MODALS --- */}
      {/* Tour Create/Edit Modal */}
      {(modal === 'createTour' || modal === 'editTour') && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <form
            onSubmit={handleTourSubmit}
            className="bg-white rounded-lg p-4 w-full max-w-xs shadow-lg space-y-2 relative text-sm max-h-[80vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <h2 className="text-lg font-bold mb-2">{modal === 'createTour' ? 'Create Tour' : 'Edit Tour'}</h2>
            <div>
              <label className="block mb-0.5 font-medium">Title</label>
              <input name="title" defaultValue={editTour?.title || ''} required className="w-full border px-2 py-1 rounded text-xs" />
            </div>
            <div>
              <label className="block mb-0.5 font-medium">Description</label>
              <textarea name="description" defaultValue={editTour?.description || ''} required className="w-full border px-2 py-1 rounded text-xs" rows={2} />
            </div>
            <div>
              <label className="block mb-0.5 font-medium">Long Description</label>
              <textarea name="longDescription" defaultValue={editTour?.longDescription || ''} className="w-full border px-2 py-1 rounded text-xs" rows={3} />
            </div>
            <div>
              <label className="block mb-0.5 font-medium">Features <span className='text-gray-400'>(comma separated)</span></label>
              <input name="features" defaultValue={editTour?.features?.join(', ') || ''} className="w-full border px-2 py-1 rounded text-xs" />
            </div>
            <div>
              <label className="block mb-0.5 font-medium">Itinerary</label>
              <textarea name="itinerary" defaultValue={editTour?.itinerary || ''} className="w-full border px-2 py-1 rounded text-xs" rows={3} />
            </div>
            <div>
              <label className="block mb-0.5 font-medium">What's Included <span className='text-gray-400'>(comma separated)</span></label>
              <input name="included" defaultValue={editTour?.included?.join(', ') || ''} className="w-full border px-2 py-1 rounded text-xs" />
            </div>
            <div>
              <label className="block mb-0.5 font-medium">Gallery Images <span className='text-gray-400'>(comma separated URLs)</span></label>
              <input name="gallery" defaultValue={editTour?.gallery?.join(', ') || ''} className="w-full border px-2 py-1 rounded text-xs" />
            </div>
            <div>
              <label className="block mb-0.5 font-medium">Price</label>
              <input name="price" type="number" min="0" defaultValue={editTour?.price || 0} required className="w-full border px-2 py-1 rounded text-xs" />
            </div>
            <div>
              <label className="block mb-0.5 font-medium">Duration</label>
              <input name="duration" defaultValue={editTour?.duration || ''} required className="w-full border px-2 py-1 rounded text-xs" />
            </div>
            <div>
              <label className="block mb-0.5 font-medium">Status</label>
              <select name="status" defaultValue={editTour?.status || 'active'} className="w-full border px-2 py-1 rounded text-xs">
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <div>
              <label className="block mb-0.5 font-medium">Section</label>
              <select name="section" defaultValue={editTour?.section || 'Safari'} className="w-full border px-2 py-1 rounded text-xs">
                <option value="Safari">Safari</option>
                <option value="Culture">Culture</option>
                <option value="Sea">Sea</option>
                <option value="Transfer">Transfer</option>
              </select>
            </div>
            <div>
              <label className="block mb-0.5 font-medium">Image</label>
              <input
                name="image"
                type="file"
                accept="image/*"
                className="w-full border px-2 py-1 rounded text-xs"
                onChange={e => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = (ev) => {
                      setTourImagePreview(ev.target?.result as string);
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />
              {(tourImagePreview || editTour?.image) && (
                <img
                  src={tourImagePreview || editTour?.image}
                  alt="Preview"
                  className="w-12 h-12 object-cover rounded border mt-1"
                />
              )}
            </div>
            <div className="flex justify-end space-x-2 mt-3">
              <button type="button" onClick={() => { setTourImagePreview(null); setModal(null); }} className="px-2 py-1 rounded bg-gray-200 text-xs">Cancel</button>
              <button type="submit" className="px-2 py-1 rounded bg-blue-600 text-white text-xs">{modal === 'createTour' ? 'Create' : 'Save'}</button>
            </div>
          </form>
        </div>
      )}
      {/* Tour Delete Modal */}
      {modal === 'deleteTour' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 w-full max-w-md shadow-lg space-y-4 relative">
            <h2 className="text-2xl font-bold mb-4">Delete Tour</h2>
            <p>Are you sure you want to delete this tour?</p>
            <div className="flex justify-end space-x-2 mt-6">
              <button type="button" onClick={() => setModal(null)} className="px-4 py-2 rounded bg-gray-200">Cancel</button>
              <button type="button" onClick={handleTourDelete} className="px-4 py-2 rounded bg-red-600 text-white">Delete</button>
            </div>
          </div>
        </div>
      )}
      {/* Booking Create/Edit Modal */}
      {(modal === 'createBooking' || modal === 'editBooking') && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <form
            onSubmit={handleBookingSubmit}
            className="bg-white rounded-lg p-8 w-full max-w-md shadow-lg space-y-4 relative"
            onClick={e => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold mb-4">{modal === 'createBooking' ? 'Create Booking' : 'Edit Booking'}</h2>
            <div>
              <label className="block mb-1 font-medium">Tour</label>
              <select name="tourId" defaultValue={editBooking?.tourId || ''} required className="w-full border px-3 py-2 rounded">
                <option value="">Select Tour</option>
                {tours.map(tour => (
                  <option key={tour.id} value={tour.id}>{tour.title}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block mb-1 font-medium">Date</label>
              <input name="date" type="date" defaultValue={editBooking?.date || ''} required className="w-full border px-3 py-2 rounded" />
            </div>
            <div>
              <label className="block mb-1 font-medium">Time</label>
              <input name="time" type="time" defaultValue={editBooking?.time || ''} required className="w-full border px-3 py-2 rounded" />
            </div>
            <div>
              <label className="block mb-1 font-medium">Name</label>
              <input name="name" defaultValue={editBooking?.name || ''} required className="w-full border px-3 py-2 rounded" />
            </div>
            <div>
              <label className="block mb-1 font-medium">Email</label>
              <input name="email" type="email" defaultValue={editBooking?.email || ''} required className="w-full border px-3 py-2 rounded" />
            </div>
            <div>
              <label className="block mb-1 font-medium">Status</label>
              <select name="status" defaultValue={editBooking?.status || 'pending'} className="w-full border px-3 py-2 rounded">
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            <div>
              <label className="block mb-1 font-medium">User</label>
              <select name="userId" defaultValue={editBooking?.userId || ''} required className="w-full border px-3 py-2 rounded">
                <option value="">Select User</option>
                {users.map(user => (
                  <option key={user.id} value={user.id}>{user.name} ({user.email})</option>
                ))}
              </select>
            </div>
            <div className="flex justify-end space-x-2 mt-6">
              <button type="button" onClick={() => setModal(null)} className="px-4 py-2 rounded bg-gray-200">Cancel</button>
              <button type="submit" className="px-4 py-2 rounded bg-blue-600 text-white">{modal === 'createBooking' ? 'Create' : 'Save'}</button>
            </div>
          </form>
        </div>
      )}
      {/* Booking Delete Modal */}
      {modal === 'deleteBooking' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 w-full max-w-md shadow-lg space-y-4 relative">
            <h2 className="text-2xl font-bold mb-4">Delete Booking</h2>
            <p>Are you sure you want to delete this booking?</p>
            <div className="flex justify-end space-x-2 mt-6">
              <button type="button" onClick={() => setModal(null)} className="px-4 py-2 rounded bg-gray-200">Cancel</button>
              <button type="button" onClick={handleBookingDelete} className="px-4 py-2 rounded bg-red-600 text-white">Delete</button>
            </div>
          </div>
        </div>
      )}
      {/* --- END MODALS --- */}
    </div>
  );
} 