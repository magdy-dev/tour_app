import React, { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X } from 'lucide-react';

interface Image {
  src: string;
  alt: string;
  width: number;
  height: number;
}

// Vite: use import.meta.glob to import all images from /photo and /gallery
const photoImages = import.meta.glob('/photo/*.{jpg,jpeg,png,gif,webp}', { eager: true, query: '?url', import: 'default' });
const galleryImages = import.meta.glob('/gallery/*.{jpg,jpeg,png,gif,webp}', { eager: true, query: '?url', import: 'default' });

const allImages: Image[] = [
  ...Object.values(photoImages),
  ...Object.values(galleryImages),
].map((src, index) => ({
  src: src as string,
  alt: `Gallery image ${index + 1}`,
  width: 400,
  height: 300
}));

export function PhotosGallery() {
  const { t } = useTranslation();
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const [isLoading, setIsLoading] = useState<{ [key: string]: boolean }>({});

  const handleImageClick = useCallback((image: Image) => {
    setSelectedImage(image);
  }, []);

  const handleClose = useCallback(() => {
    setSelectedImage(null);
  }, []);

  const handleImageLoad = useCallback((src: string) => {
    setIsLoading(prev => ({ ...prev, [src]: false }));
  }, []);

  const handleImageError = useCallback((src: string) => {
    console.error(`Failed to load image: ${src}`);
    setIsLoading(prev => ({ ...prev, [src]: false }));
  }, []);

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">{t('gallery.title')}</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {allImages.map((image, idx) => (
          <div 
            key={idx} 
            className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
            role="button"
            tabIndex={0}
            onClick={() => handleImageClick(image)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleImageClick(image);
              }
            }}
            aria-label={t('gallery.viewImage', { number: idx + 1 })}
          >
            <div className="aspect-w-4 aspect-h-3">
              {isLoading[image.src] && (
                <div className="absolute inset-0 bg-gray-200 animate-pulse" />
              )}
              <img 
                src={image.src} 
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                loading="lazy"
                width={image.width}
                height={image.height}
                onLoad={() => handleImageLoad(image.src)}
                onError={() => handleImageError(image.src)}
              />
            </div>
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300" />
          </div>
        ))}
      </div>

      <Dialog open={!!selectedImage} onOpenChange={handleClose}>
        <DialogContent className="max-w-4xl w-full p-0 bg-transparent border-none">
          {selectedImage && (
            <div className="relative">
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 z-10 bg-black/50 text-white rounded-full p-2 hover:bg-black/70 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
                aria-label={t('gallery.close')}
              >
                <X className="w-6 h-6" />
              </button>
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
                loading="eager"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
} 