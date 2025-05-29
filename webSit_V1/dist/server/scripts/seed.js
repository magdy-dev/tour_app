import mongoose from 'mongoose';
import { Tour } from '../models/Tour.js';
import dotenv from 'dotenv';
dotenv.config();
const tours = [
    {
        type: 'snorkeling',
        image: '/gallery/g4.jpeg',
        price: 50,
        duration: '4 hours',
        rating: 4.8,
        features: ['Professional guide', 'Equipment included', 'Snacks provided'],
        translations: {
            en: {
                title: 'Snorkeling Adventure',
                description: 'Discover the vibrant underwater world with our expert guides'
            },
            ar: {
                title: 'مغامرة الغوص',
                description: 'اكتشف العالم المائي النابض بالحياة مع مرشدينا الخبراء'
            },
            de: {
                title: 'Schnorchel-Abenteuer',
                description: 'Entdecken Sie die lebendige Unterwasserwelt mit unseren erfahrenen Guides'
            },
            sr: {
                title: 'Avantura ronjenja',
                description: 'Otkrijte živopisni podvodni svet sa našim stručnim vodičima'
            },
            ru: {
                title: 'Приключение сноркелинга',
                description: 'Откройте для себя яркий подводный мир с нашими опытными гидами'
            }
        }
    },
    {
        type: 'desert',
        image: '/gallery/t1.jpeg',
        price: 75,
        duration: '6 hours',
        rating: 4.9,
        features: ['Quad biking', 'Traditional dinner', 'Sunset view'],
        translations: {
            en: {
                title: 'Desert Safari',
                description: 'Experience the thrill of desert adventures and traditional entertainment'
            },
            ar: {
                title: 'رحلة الصحراء',
                description: 'استمتع بإثارة مغامرات الصحراء والترفيه التقليدي'
            },
            de: {
                title: 'Wüstensafari',
                description: 'Erleben Sie den Nervenkitzel von Wüstenabenteuern und traditioneller Unterhaltung'
            },
            sr: {
                title: 'Pustinjska safari tura',
                description: 'Iskusite uzbuđenje pustinjskih avantura i tradicionalne zabave'
            },
            ru: {
                title: 'Пустынное сафари',
                description: 'Испытайте острые ощущения от приключений в пустыне и традиционных развлечений'
            }
        }
    },
    {
        type: 'yacht',
        image: '/gallery/g8.webp',
        price: 120,
        duration: '8 hours',
        rating: 4.7,
        features: ['Private yacht', 'Lunch included', 'Water activities'],
        translations: {
            en: {
                title: 'Luxury Yacht Tour',
                description: 'Enjoy a day of luxury and water activities on our private yacht'
            },
            ar: {
                title: 'جولة يخت فاخر',
                description: 'استمتع بيوم من الفخامة والأنشطة المائية على يختنا الخاص'
            },
            de: {
                title: 'Luxus-Yacht-Tour',
                description: 'Genießen Sie einen Tag voller Luxus und Wassersportaktivitäten auf unserer privaten Yacht'
            },
            sr: {
                title: 'Luksuzna jahta tura',
                description: 'Uživajte u danu luksuza i vodenih aktivnosti na našoj privatnoj jahti'
            },
            ru: {
                title: 'Тур на роскошной яхте',
                description: 'Насладитесь днем роскоши и водных развлечений на нашей частной яхте'
            }
        }
    }
];
async function seed() {
    try {
        const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/tour_app';
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB');
        // Clear existing tours
        await Tour.deleteMany({});
        console.log('Cleared existing tours');
        // Insert new tours
        await Tour.insertMany(tours);
        console.log('Seeded database with tours');
        process.exit(0);
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}
seed();
