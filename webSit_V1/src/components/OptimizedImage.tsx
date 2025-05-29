import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  onLoad?: () => void;
  onError?: () => void;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  width,
  height,
  priority = false,
  onLoad,
  onError
}) => {
  const { i18n } = useTranslation();
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [imageSrc, setImageSrc] = useState<string>('');

  useEffect(() => {
    // Convert the image path to use the optimized version
    const optimizedPath = src.replace(/\.[^/.]+$/, '.webp');
    setImageSrc(optimizedPath);
  }, [src]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setError(true);
    // Fallback to original image if optimized version fails
    if (imageSrc !== src) {
      setImageSrc(src);
    } else {
      onError?.();
    }
  };

  return (
    <div 
      className={`relative overflow-hidden ${className}`}
      style={{ 
        width: width ? `${width}px` : '100%',
        height: height ? `${height}px` : 'auto',
        backgroundColor: '#f3f4f6' // Light gray placeholder
      }}
    >
      <img
        src={imageSrc}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        className={`
          transition-opacity duration-300
          ${isLoaded ? 'opacity-100' : 'opacity-0'}
          ${error ? 'object-contain' : 'object-cover'}
          w-full h-full
        `}
        onLoad={handleLoad}
        onError={handleError}
        width={width}
        height={height}
        dir={i18n.dir()} // Support RTL languages
      />
      {!isLoaded && !error && (
        <div 
          className="absolute inset-0 animate-pulse bg-gray-200"
          aria-hidden="true"
        />
      )}
    </div>
  );
}; 