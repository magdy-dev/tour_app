import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Card from '../components/Card';
import { useInView } from 'react-intersection-observer';
import { tours } from '../data/tours';
import { OptimizedImage } from '../components/OptimizedImage';
import { LanguageSwitcher } from '../components/LanguageSwitcher';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function Home() {
  const { t } = useTranslation();
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [featuresRef, featuresInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [toursRef, toursInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [ctaRef, ctaInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <main className="space-y-12">
      {/* Language Switcher */}
      <div className="fixed top-4 right-4 z-50">
        <LanguageSwitcher />
      </div>

      {/* Hero Section */}
      <motion.section 
        ref={heroRef}
        initial="hidden"
        animate={heroInView ? "visible" : "hidden"}
        variants={fadeInUp}
        transition={{ duration: 0.6 }}
        className="relative h-[60vh] bg-cover bg-center" 
        aria-label="Hero section"
      >
        <OptimizedImage
          src="/photo/hero.jpg"
          alt={t('hero.title')}
          className="absolute inset-0 w-full h-full object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center text-white space-y-4 max-w-3xl px-4">
            <h1 className="text-4xl md:text-6xl font-bold">{t('hero.title')}</h1>
            <p className="text-xl md:text-2xl">{t('hero.subtitle')}</p>
            <Link
              to="/service"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-blue-700 transition focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform hover:scale-105"
              aria-label={t('bookNow')}
            >
              {t('bookNow')}
            </Link>
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section 
        ref={featuresRef}
        initial="hidden"
        animate={featuresInView ? "visible" : "hidden"}
        variants={fadeInUp}
        transition={{ duration: 0.6 }}
        className="py-12 px-4" 
        aria-label="Features"
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">{t('features.title')}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {[
            { icon: '⭐', title: t('features.quality'), desc: t('features.qualityDesc') },
            { icon: '🌊', title: t('features.experience'), desc: t('features.experienceDesc') },
            { icon: '🛟', title: t('features.support'), desc: t('features.supportDesc') }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={featuresInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition transform hover:-translate-y-1"
            >
              <div className="text-4xl mb-4" role="img" aria-label={`${feature.title} icon`}>{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Popular Tours Section */}
      <motion.section 
        ref={toursRef}
        initial="hidden"
        animate={toursInView ? "visible" : "hidden"}
        variants={fadeInUp}
        transition={{ duration: 0.6 }}
        className="py-12 px-4" 
        aria-label="Popular tours"
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">{t('tours.popular')}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">{t('tours.popularDesc')}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {tours.map((tour, index) => (
            <motion.div
              key={tour.id}
              initial={{ opacity: 0, y: 20 }}
              animate={toursInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Card 
                className="flex flex-col"
                interactive
                variant="elevated"
                hoverable
              >
                <OptimizedImage
                  src={tour.image}
                  alt={t(`tours.items.${tour.type}.title`)}
                  className="w-full h-48 object-cover rounded-t-lg"
                  width={400}
                  height={300}
                />
                <div className="p-4 flex-grow">
                  <h3 className="text-xl font-semibold mb-2">{t(`tours.items.${tour.type}.title`)}</h3>
                  <p className="text-gray-600 mb-4">{t(`tours.items.${tour.type}.description`)}</p>
                  <ul className="mb-4 space-y-2">
                    {tour.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-600">
                        <span className="mr-2">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-bold">${tour.price}</span>
                    <span className="text-sm text-gray-500">{tour.duration}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-yellow-500" aria-label={`Rating: ${tour.rating} out of 5`}>
                      ★ {tour.rating}
                    </span>
                    <Link
                      to={`/tour/${tour.id}`}
                      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      aria-label={`${t('tours.viewDetails')} - ${t(`tours.items.${tour.type}.title`)}`}
                    >
                      {t('tours.viewDetails')}
                    </Link>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Call to Action */}
      <motion.section 
        ref={ctaRef}
        initial="hidden"
        animate={ctaInView ? "visible" : "hidden"}
        variants={fadeInUp}
        transition={{ duration: 0.6 }}
        className="py-12 bg-blue-50 px-4" 
        aria-label="Call to action"
      >
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">{t('cta.title')}</h2>
          <p className="text-gray-600 mb-8">{t('cta.description')}</p>
          <Link
            to="/contact"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-blue-700 transition focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform hover:scale-105"
            aria-label={t('cta.button')}
          >
            {t('cta.button')}
          </Link>
        </div>
      </motion.section>
    </main>
  );
} 