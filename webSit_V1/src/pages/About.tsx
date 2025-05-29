import Card from '../components/Card';

export default function About() {
  return (
    <div className="space-y-12">
      {/* Hero Section with Background Image */}
      <section 
        className="relative h-[400px] flex items-center justify-center text-white"
        style={{
          backgroundImage: `url('/photo/m7.jpg'), linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5))`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'overlay'
        }}
      >
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-4">About N_M_Travle</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Your trusted partner for unforgettable Red Sea adventures since 2010
          </p>
        </div>
      </section>

      {/* Company Story */}
      <section className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="text-2xl font-bold mb-4">Our Story</h2>
          <p className="text-gray-600 mb-4">
            Founded in 2010, N_M_Travle has been at the forefront of providing exceptional
            tour experiences in the Red Sea region. We started with a simple mission: to
            share the beauty and wonder of Egypt's Red Sea with visitors from around the world.
          </p>
          <p className="text-gray-600">
            Over the years, we've grown from a small local tour operator to one of the most
            trusted names in Red Sea tourism, while maintaining our commitment to quality,
            safety, and customer satisfaction.
          </p>
        </div>
        <div className="relative h-96 rounded-lg overflow-hidden shadow-xl">
          <img
            src="/photo/m7.jpg"
            alt="Our Story"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="container mx-auto px-4 grid md:grid-cols-2 gap-8">
        <Card className="p-6">
          <h3 className="text-xl font-bold mb-4">Our Mission</h3>
          <p className="text-gray-600">
            To provide exceptional tour experiences that showcase the natural beauty and
            cultural richness of the Red Sea region, while ensuring the highest standards
            of safety, sustainability, and customer satisfaction.
          </p>
        </Card>
        <Card className="p-6">
          <h3 className="text-xl font-bold mb-4">Our Vision</h3>
          <p className="text-gray-600">
            To be the leading tour operator in the Red Sea region, known for our innovative
            experiences, sustainable practices, and commitment to creating unforgettable
            memories for our guests.
          </p>
        </Card>
      </section>

      {/* Why Choose Us */}
      <section className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6 text-center">Why Choose Us</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="p-6 text-center">
            <div className="text-4xl mb-4">🌟</div>
            <h3 className="font-bold mb-2">Expert Guides</h3>
            <p className="text-gray-600">
              Our team consists of certified professionals with years of experience
            </p>
          </Card>
          <Card className="p-6 text-center">
            <div className="text-4xl mb-4">💫</div>
            <h3 className="font-bold mb-2">Best Prices</h3>
            <p className="text-gray-600">
              Competitive rates with no hidden fees or surprises
            </p>
          </Card>
          <Card className="p-6 text-center">
            <div className="text-4xl mb-4">✨</div>
            <h3 className="font-bold mb-2">Quality Service</h3>
            <p className="text-gray-600">
              Premium experiences with attention to every detail
            </p>
          </Card>
        </div>
      </section>

      {/* Team Section */}
      <section className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6 text-center">Our Team</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="p-6 text-center">
            <img
              src="/photo/log.jpg"
              alt="Team Member"
              className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
            />
            <h3 className="font-bold mb-1">Mohamed abd elma</h3>
            <p className="text-gray-600 mb-2">Founder & CEO</p>
            <p className="text-sm text-gray-500">
              15+ years of experience in tourism
            </p>
          </Card>
          <Card className="p-6 text-center">
            <img
              src="/photo/log.jpg"
              alt="Team Member"
              className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
            />
            <h3 className="font-bold mb-1">Nemanjavujicic</h3>
            <p className="text-gray-600 mb-2">Tour Operations Manager</p>
            <p className="text-sm text-gray-500">
              Certified tour guide with 10+ years experience
            </p>
          </Card>
          <Card className="p-6 text-center">
            <img
              src="/photo/log.jpg"
              alt="Team Member"
              className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
            />
            <h3 className="font-bold mb-1">Nemanjavujicic</h3>
            <p className="text-gray-600 mb-2">Customer Service Manager</p>
            <p className="text-sm text-gray-500">
              Dedicated to ensuring guest satisfaction
            </p>
          </Card>
        </div>
      </section>
    </div>
  );
} 