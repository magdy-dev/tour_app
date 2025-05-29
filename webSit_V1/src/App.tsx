import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Booking from './pages/Booking';
import { AdminLogin } from './components/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import About from './pages/About';
import Photos from './pages/Photos';
import Service from './pages/Service';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import TourDetails from './pages/TourDetails';
import WhatsAppFloatingButton from './components/WhatsAppFloatingButton';
import './i18n';
import { Link } from 'react-router-dom';

function App() {
  const { i18n, t } = useTranslation();

  useEffect(() => {
    // Update document direction based on language
    document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return (
    <Router>
      <div className={`min-h-screen ${i18n.language === 'ar' ? 'font-arabic' : 'font-sans'}`}>
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/about" element={<About />} />
            <Route path="/photos" element={<Photos />} />
            <Route path="/service" element={<Service />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/tour/:id" element={<TourDetails />} />
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <WhatsAppFloatingButton />
        <footer className="bg-gray-800 text-white py-4 text-xs">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <h3 className="text-base font-bold mb-2">N_M_Travle</h3>
                <p className="text-gray-300 leading-tight">{t('subtitle')}</p>
              </div>
              <div>
                <h3 className="text-base font-bold mb-2">{t('quickLinks')}</h3>
                <ul className="space-y-1">
                  <li><Link to="/" className="text-gray-300 hover:text-white">{t('home')}</Link></li>
                  <li><Link to="/about" className="text-gray-300 hover:text-white">{t('about')}</Link></li>
                  <li><Link to="/service" className="text-gray-300 hover:text-white">{t('services')}</Link></li>
                  <li><Link to="/contact" className="text-gray-300 hover:text-white">{t('contact')}</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-base font-bold mb-2">{t('contact.title')}</h3>
                <ul className="space-y-1 text-gray-300">
                  <li>Hurghada, Red Sea, Egypt</li>
                  <li>{t('contact.phone')}: +381691232565, +201110083675</li>
                  <li>{t('contact.email')}: Nm.travel.eg@gmail.com</li>
                </ul>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-700 text-center text-gray-400 text-xs">
              <p>&copy; {new Date().getFullYear()} N_M_Travle. {t('footer.rights')}</p>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App; 