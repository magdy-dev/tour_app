import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

interface Language {
  code: string;
  label: string;
  flag: string;
}

const languages: Language[] = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'ar', label: 'العربية', flag: '🇪🇬' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
  { code: 'sr', label: 'Srpski', flag: '🇷🇸' },
  { code: 'ru', label: 'Русский', flag: '🇷🇺' },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const langMenuRef = useRef<HTMLDivElement>(null);
  const currentLang = languages.find(l => l.code === i18n.language) || languages[0];

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Close language menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) {
        setIsLangMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { to: '/', label: t('home') },
    { to: '/about', label: t('about') },
    { to: '/service', label: t('services') },
    { to: '/promotions', label: t('promotions') },
    { to: '/events', label: t('events') },
    { to: '/blog', label: t('blog') },
    { to: '/photos', label: t('photos') },
    { to: '/contact', label: t('contact') },
  ];

  return (
    <nav className="bg-blue-100 border-b border-blue-200 shadow-sm sticky top-0 z-50" role="navigation" aria-label="Main navigation">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <Link to="/" className="flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md">
            <img src="/photo/log.jpg" alt="N_M_Travle Logo" className="h-8 w-8" width={32} height={32} />
            <div>
              <h1 className="text-xl font-bold text-blue-800">N_M_Travle</h1>
              <p className="text-xs text-blue-500">Red Sea Adventures</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`text-blue-800 hover:text-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md px-2 py-1 ${
                  location.pathname === to ? 'font-semibold' : ''
                }`}
              >
                {label}
              </Link>
            ))}
            <Link
              to="/admin"
              className="bg-blue-200 text-blue-800 px-4 py-2 rounded-md text-sm hover:bg-blue-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {t('admin')}
            </Link>
            
            {/* Language Switcher */}
            <div className="relative" ref={langMenuRef}>
              <button
                className="flex items-center gap-1 px-3 py-1 rounded-md border border-blue-200 bg-white text-blue-800 hover:bg-blue-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                aria-expanded={isLangMenuOpen}
                aria-haspopup="true"
              >
                <span className="text-base" role="img" aria-label={currentLang.label}>{currentLang.flag}</span>
                <span className="font-medium text-xs">{currentLang.label}</span>
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isLangMenuOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-white border border-blue-200 rounded-md shadow-lg z-50">
                  {languages.map(lang => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        i18n.changeLanguage(lang.code);
                        setIsLangMenuOpen(false);
                      }}
                      className={`w-full flex items-center gap-2 px-3 py-2 text-left text-xs hover:bg-blue-100 transition-colors duration-200 ${
                        i18n.language === lang.code ? 'font-bold text-blue-600' : 'text-blue-800'
                      }`}
                      role="option"
                      aria-selected={i18n.language === lang.code}
                    >
                      <span className="text-base" role="img" aria-label={lang.label}>{lang.flag}</span>
                      {lang.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-blue-800 p-2 rounded-md hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-label="Toggle menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div 
            className="md:hidden py-4 bg-blue-100 rounded-b-lg border-t border-blue-200"
            role="menu"
            aria-label="Mobile menu"
          >
            <div className="flex flex-col space-y-4">
              {navLinks.map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  className={`text-blue-800 hover:text-blue-600 px-4 py-2 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    location.pathname === to ? 'bg-blue-200 font-semibold' : ''
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                  role="menuitem"
                >
                  {label}
                </Link>
              ))}
              <Link
                to="/admin"
                className="bg-blue-200 text-blue-800 px-4 py-2 rounded-md text-sm hover:bg-blue-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 inline-block w-fit mx-4"
                onClick={() => setIsMenuOpen(false)}
                role="menuitem"
              >
                {t('admin')}
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
} 