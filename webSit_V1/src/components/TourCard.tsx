import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users } from "lucide-react";
import { useTranslation } from 'react-i18next';

interface Tour {
  id: string;
  title: string;
  description: string;
  price: number;
  duration: string;
  maxGuests: number;
  image: string;
  features: string[];
  rating?: number;
  location?: string;
  category?: string;
}

interface TourCardProps {
  tour: Tour;
  onBook: () => void;
  onViewDetails: () => void;
  className?: string;
}

export const TourCard = ({ tour, onBook, onViewDetails, className = '' }: TourCardProps) => {
  const { t } = useTranslation();

  const handleViewDetails = (e: React.MouseEvent) => {
    e.stopPropagation();
    onViewDetails();
  };

  const handleBook = (e: React.MouseEvent) => {
    e.stopPropagation();
    onBook();
  };

  return (
    <Card 
      className={`group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-white/80 backdrop-blur-sm border-0 shadow-lg overflow-hidden ${className}`}
      onClick={onViewDetails}
      role="article"
      aria-label={tour.title}
    >
      <div className="relative">
        <img 
          src={tour.image} 
          alt={tour.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
          width={400}
          height={192}
        />
        <div className="absolute top-4 right-4">
          <Badge 
            className="bg-gradient-to-r from-blue-600 to-teal-600 text-white border-0"
            aria-label={t('tour.price', { price: tour.price })}
          >
            ${tour.price}
          </Badge>
        </div>
        {tour.category && (
          <div className="absolute top-4 left-4">
            <Badge 
              variant="secondary"
              className="bg-white/90 text-gray-800"
              aria-label={t('tour.category', { category: tour.category })}
            >
              {tour.category}
            </Badge>
          </div>
        )}
      </div>

      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <CardTitle className="text-xl group-hover:text-blue-600 transition-colors">
              {tour.title}
            </CardTitle>
            {tour.location && (
              <p className="text-sm text-gray-500 mt-1">
                {tour.location}
              </p>
            )}
          </div>
          {tour.rating && (
            <div className="flex items-center gap-1" aria-label={t('tour.rating', { rating: tour.rating })}>
              <span className="text-yellow-500">★</span>
              <span className="text-sm font-medium">{tour.rating}</span>
            </div>
          )}
        </div>
        <CardDescription className="text-gray-600 line-clamp-2">
          {tour.description}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="flex justify-between items-center text-sm text-gray-500 mb-2">
          <div className="flex items-center gap-1" aria-label={t('tour.duration', { duration: tour.duration })}>
            <Calendar className="w-4 h-4" aria-hidden="true" />
            {tour.duration}
          </div>
          <div className="flex items-center gap-1" aria-label={t('tour.maxGuests', { max: tour.maxGuests })}>
            <Users className="w-4 h-4" aria-hidden="true" />
            {t('tour.upToGuests', { max: tour.maxGuests })}
          </div>
        </div>

        <div className="flex flex-wrap gap-1 mb-2">
          {tour.features.slice(0, 3).map((feature, index) => (
            <Badge 
              key={index} 
              variant="outline" 
              className="text-xs border-blue-200 text-blue-700"
              aria-label={feature}
            >
              {feature}
            </Badge>
          ))}
          {tour.features.length > 3 && (
            <Badge 
              variant="outline" 
              className="text-xs border-gray-200 text-gray-500"
              aria-label={t('tour.moreFeatures', { count: tour.features.length - 3 })}
            >
              +{tour.features.length - 3} {t('tour.more')}
            </Badge>
          )}
        </div>

        <div className="flex gap-2">
          <Button 
            onClick={handleViewDetails} 
            variant="outline" 
            size="sm"
            aria-label={t('tour.viewDetails')}
          >
            {t('tour.viewDetails')}
          </Button>
          <Button 
            onClick={handleBook} 
            className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white transition-all duration-300" 
            size="sm"
            aria-label={t('tour.bookNow')}
          >
            {t('tour.bookNow')}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}; 