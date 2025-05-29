import Card from '../components/Card';

export default function Blog() {
  // Placeholder blog posts
  const posts = [
    { id: 1, title: 'Top 5 Things to Do in Hurghada', excerpt: 'Discover the best activities for your Red Sea adventure.', image: '/images/blog1.jpg', date: '2024-06-01' },
    { id: 2, title: 'How to Prepare for a Desert Safari', excerpt: 'Tips and tricks for a safe and fun safari experience.', image: '/images/blog2.jpg', date: '2024-06-10' },
  ];
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Travel Blog & Articles</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map(post => (
          <Card key={post.id} className="overflow-hidden">
            <img src={post.image} alt={post.title} className="w-full h-40 object-cover" />
            <div className="p-6">
              <h2 className="text-xl font-bold mb-2">{post.title}</h2>
              <p className="text-gray-600 mb-2">{post.excerpt}</p>
              <span className="inline-block bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs">{post.date}</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
} 