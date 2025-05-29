import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      welcome: 'Welcome to N_M_Travel',
      home: 'Home',
      about: 'About',
      services: 'Services',
      promotions: 'Promotions',
      events: 'Events',
      blog: 'Blog',
      photos: 'Photos',
      contact: 'Contact',
      admin: 'Admin',
      followUs: 'Follow Us',
      // ...add more keys as needed
    },
  },
  ar: {
    translation: {
      welcome: 'مرحبًا بكم في N_M_Travle',
      home: 'الرئيسية',
      about: 'من نحن',
      services: 'الخدمات',
      promotions: 'العروض',
      events: 'الفعاليات',
      blog: 'المدونة',
      photos: 'الصور',
      contact: 'اتصل بنا',
      admin: 'لوحة التحكم',
      followUs: 'تابعنا',
      // ...add more keys as needed
    },
  },
  de: {
    translation: {
      welcome: 'Willkommen bei N_M_Travle',
      home: 'Startseite',
      about: 'Über uns',
      services: 'Dienstleistungen',
      promotions: 'Angebote',
      events: 'Veranstaltungen',
      blog: 'Blog',
      photos: 'Fotos',
      contact: 'Kontakt',
      admin: 'Admin',
      followUs: 'Folge uns',
    },
  },
  sr: {
    translation: {
      welcome: 'Dobrodošli u N_M_Travle',
      home: 'Početna',
      about: 'O nama',
      services: 'Usluge',
      promotions: 'Promocije',
      events: 'Događaji',
      blog: 'Blog',
      photos: 'Fotografije',
      contact: 'Kontakt',
      admin: 'Admin',
      followUs: 'Pratite nas',
    },
  },
  ru: {
    translation: {
      welcome: 'Добро пожаловать в N_M_Travle',
      home: 'Главная',
      about: 'О нас',
      services: 'Услуги',
      promotions: 'Акции',
      events: 'События',
      blog: 'Блог',
      photos: 'Фото',
      contact: 'Контакты',
      admin: 'Админ',
      followUs: 'Подписывайтесь',
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n; 