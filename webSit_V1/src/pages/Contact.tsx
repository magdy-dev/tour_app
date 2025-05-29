import Card from '../components/Card';

export default function Contact() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      {/* Hero Section */}
      <div className="relative h-[300px] mb-12">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url('/photo/m7.jpg'), linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6))`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundBlendMode: 'overlay'
          }}
        />
        <div className="relative h-full flex items-center justify-center text-white">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-4">Contact Us</h1>
            <p className="text-xl max-w-2xl mx-auto">
              Get in touch with us for any questions about our tours or to make a booking.
              We're here to help make your Red Sea adventure unforgettable.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Information */}
          <Card className="p-8">
            <div className="flex justify-center mb-4">
              <img src="/photo/log.jpg" alt="N_M_Travle Logo" className="rounded-full w-24 h-24 object-cover shadow" />
            </div>
            <h2 className="text-2xl font-bold mb-6 text-blue-800 mt-8">Contact Information</h2>
            
            <div className="space-y-6">
              {/* Location */}
              <div className="flex items-start gap-4">
                <span className="bg-blue-50 text-blue-700 rounded-full p-3 flex items-center justify-center shadow">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </span>
                <div>
                  <h3 className="font-semibold text-gray-800">Location</h3>
                  <p className="text-gray-600">Hurghada, Red Sea, Egypt</p>
                </div>
              </div>

              {/* Phone Numbers */}
              <div className="flex items-start gap-4">
                <span className="bg-blue-50 text-blue-700 rounded-full p-3 flex items-center justify-center shadow">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </span>
                <div>
                  <h3 className="font-semibold text-gray-800">Phone Numbers</h3>
                  <p className="text-gray-600">+381691232565</p>
                  <p className="text-gray-600">+201110083675</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <span className="bg-blue-50 text-blue-700 rounded-full p-3 flex items-center justify-center shadow">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </span>
                <div>
                  <h3 className="font-semibold text-gray-800">Email</h3>
                  <p className="text-gray-600 break-all">Nm.travel.eg@gmail.com</p>
                </div>
              </div>

              {/* Business Hours */}
              <div className="flex items-start gap-4">
                <span className="bg-blue-50 text-blue-700 rounded-full p-3 flex items-center justify-center shadow">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
                <div>
                  <h3 className="font-semibold text-gray-800">Business Hours</h3>
                  <p className="text-gray-600">Open 24 hours, 7 days a week</p>
                </div>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="mt-6">
              <h3 className="font-semibold mb-3 text-blue-800">Follow Us</h3>
              <div className="flex flex-wrap gap-3 justify-center">
                <a href="https://www.facebook.com/Nemanjavujicic" target="_blank" rel="noopener noreferrer" title="Follow us on Facebook" className="transition-transform duration-200 hover:scale-125 hover:shadow-lg group">
                  <img src="/photo/I2.png" alt="Facebook" className="w-10 h-10 rounded-full group-hover:ring-2 group-hover:ring-blue-500" />
                </a>
                <a href="https://wa.me/381691232565" target="_blank" rel="noopener noreferrer" title="Chat with us on WhatsApp" className="transition-transform duration-200 hover:scale-125 hover:shadow-lg group">
                  <img src="/photo/I1.png" alt="WhatsApp" className="w-10 h-10 rounded-full group-hover:ring-2 group-hover:ring-green-500" />
                </a>
                <a href="https://t.me/NM-travel" target="_blank" rel="noopener noreferrer" title="Message us on Telegram" className="transition-transform duration-200 hover:scale-125 hover:shadow-lg group">
                  <img src="/photo/I.png" alt="Telegram" className="w-10 h-10 rounded-full group-hover:ring-2 group-hover:ring-blue-400" />
                </a>
                <a href="https://vk.com/Nemanja-vujicic" target="_blank" rel="noopener noreferrer" title="Connect on VK" className="transition-transform duration-200 hover:scale-125 hover:shadow-lg group">
                  <img src="/photo/vk.png" alt="VK" className="w-10 h-10 rounded-full group-hover:ring-2 group-hover:ring-blue-700" />
                </a>
                <a href="https://www.instagram.com/NEMANJAVU93/" target="_blank" rel="noopener noreferrer" title="See our latest on Instagram" className="transition-transform duration-200 hover:scale-125 hover:shadow-lg group">
                  <img src="/photo/ins.png" alt="Instagram" className="w-10 h-10 rounded-full group-hover:ring-2 group-hover:ring-pink-500" />
                </a>
                <a href="https://www.tiktok.com/@nemanja.vujicic" target="_blank" rel="noopener noreferrer" title="Watch us on TikTok" className="transition-transform duration-200 hover:scale-125 hover:shadow-lg group">
                  <img src="/photo/tek.png" alt="TikTok" className="w-10 h-10 rounded-full group-hover:ring-2 group-hover:ring-black" />
                </a>
              </div>
              <div className="mt-4 flex justify-center">
                <div className="bg-gradient-to-br from-blue-50 via-white to-blue-100 border border-blue-100 rounded-2xl px-8 py-6 flex flex-col items-center gap-4 shadow-lg max-w-2xl w-full relative overflow-hidden">
                  {/* Trusted badge */}
                  <div className="absolute top-4 right-4 flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold shadow-md">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    Trusted
                  </div>
                  {/* Info icon and emoji */}
                  <div className="flex items-center gap-3 mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M12 20a8 8 0 100-16 8 8 0 000 16z" />
                    </svg>
                    <span className="text-4xl">🌴</span>
                  </div>
                  {/* Main message */}
                  <div className="text-lg text-blue-900 font-semibold text-center">Connect with us on social media for updates, offers, and travel inspiration!</div>
                  <div className="text-base text-blue-700 mt-1 mb-2">Typical response time: <span className="font-semibold">within 1 hour</span></div>
                  {/* Join our community CTA */}
                  <div className="text-lg text-blue-700 font-medium mb-2">Join our community for exclusive deals & travel tips! 🎉</div>
                  {/* WhatsApp Chat Now button */}
                  <a href="https://wa.me/381691232565" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full font-semibold shadow-lg transition mb-2 text-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20.52 3.48A12.07 12.07 0 0012 0C5.37 0 0 5.37 0 12a11.93 11.93 0 001.64 6.06L0 24l6.18-1.62A12.07 12.07 0 0012 24c6.63 0 12-5.37 12-12 0-3.21-1.25-6.23-3.48-8.52zM12 22a9.93 9.93 0 01-5.13-1.41l-.37-.22-3.67.96.98-3.58-.24-.37A9.93 9.93 0 012 12c0-5.52 4.48-10 10-10s10 4.48 10 10-4.48 10-10 10zm5.2-7.6c-.28-.14-1.65-.81-1.9-.9-.25-.09-.43-.14-.61.14-.18.28-.7.9-.86 1.08-.16.18-.32.2-.6.07-.28-.14-1.18-.44-2.25-1.4-.83-.74-1.39-1.65-1.55-1.93-.16-.28-.02-.43.12-.57.13-.13.28-.34.42-.51.14-.17.18-.29.28-.48.09-.19.05-.36-.02-.5-.07-.14-.61-1.47-.84-2.01-.22-.53-.45-.46-.62-.47-.16-.01-.35-.01-.54-.01-.19 0-.5.07-.76.34-.26.27-1 1-.97 2.43.03 1.43 1.03 2.81 1.18 3 .15.19 2.03 3.1 4.93 4.23.69.3 1.23.48 1.65.61.69.22 1.32.19 1.81.12.55-.08 1.65-.67 1.89-1.32.23-.65.23-1.2.16-1.32-.07-.12-.25-.19-.53-.33z"/></svg>
                    Chat Now
                  </a>
                  {/* Share button */}
                  <button type="button" onClick={() => {navigator.clipboard.writeText([
                    'https://www.facebook.com/Nemanjavujicic',
                    'https://wa.me/381691232565',
                    'https://t.me/NM-travel',
                    'https://vk.com/Nemanja-vujicic',
                    'https://www.instagram.com/NEMANJAVU93/',
                    'https://www.tiktok.com/@nemanja.vujicic'
                  ].join('\n')); alert('Social links copied!')}}
                    className="inline-flex items-center gap-2 bg-blue-100 hover:bg-blue-200 text-blue-700 px-5 py-2 rounded-full text-base font-semibold shadow transition">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 17l4 4 4-4m0-5V3a1 1 0 00-1-1h-6a1 1 0 00-1 1v9m10 4h-4m0 0H4" /></svg>
                    Share
                  </button>
                </div>
              </div>
            </div>
          </Card>

          {/* Map Section */}
          <div className="space-y-8">
            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-6 text-blue-800">Our Location</h2>
              <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3456.789012345678!2d33.8123!3d27.2579!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjfCsDE1JzI4LjQiTiAzM8KwNDgnNDQuMyJF!5e0!3m2!1sen!2seg!4v1234567890"
                  width="100%"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-lg"
                />
              </div>
            </Card>

            {/* Quick Contact Form */}
            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-6 text-blue-800">Send Us a Message</h2>
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Your message"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
                >
                  Send Message
                </button>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
} 