import { useState, useEffect } from 'react';
import Card from '../components/Card';

interface ImageData {
  src: string;
  alt: string;
  category: string;
}

export default function Photos() {
  const [images, setImages] = useState<ImageData[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    // Use correct Vite public folder glob patterns (must start with '/')
    const photoModules = import.meta.glob('/photo/*.{png,jpg,jpeg,gif,webp}', {
      eager: true,
      query: '?url',
      import: 'default',
    });
    const imageModules = import.meta.glob('/images/*.{png,jpg,jpeg,gif,webp}', {
      eager: true,
      query: '?url',
      import: 'default',
    });
    const galleryModules = import.meta.glob('/gallery/*.{png,jpg,jpeg,gif,webp}', {
      eager: true,
      query: '?url',
      import: 'default',
    });
    const assetsPhotoModules = import.meta.glob('/assets/photos/*.{png,jpg,jpeg,gif,webp}', {
      eager: true,
      query: '?url',
      import: 'default',
    });
    const loadedImages: ImageData[] = [
      ...Object.entries(photoModules),
      ...Object.entries(imageModules),
      ...Object.entries(galleryModules),
      ...Object.entries(assetsPhotoModules),
    ].map(([path, url]) => ({
      src: url as string,
      alt: path.split('/').pop()?.split('.')[0] || '',
      category: path.includes('snorkeling') ? 'snorkeling'
        : path.includes('desert') ? 'desert'
        : path.includes('yacht') ? 'yacht'
        : path.includes('city') ? 'city'
        : path.includes('photo') ? 'photo'
        : path.includes('gallery') ? 'gallery'
        : path.includes('assets/photos') ? 'assets/photos'
        : 'other',
    }));
    setImages(loadedImages);
  }, []);

  const categories = ['all', ...Array.from(new Set(images.map(img => img.category)))];
  const filteredImages = selectedCategory === 'all'
    ? images
    : images.filter(img => img.category === selectedCategory);

  // Modal navigation
  const openModal = (index: number) => setSelectedIndex(index);
  const closeModal = () => setSelectedIndex(null);
  const showPrev = () => setSelectedIndex(i => (i !== null ? (i - 1 + filteredImages.length) % filteredImages.length : null));
  const showNext = () => setSelectedIndex(i => (i !== null ? (i + 1) % filteredImages.length : null));

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="text-center">
        <h1 className="text-4xl font-bold mb-4">Photo Gallery</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Click any photo to view it larger
        </p>
      </section>

      {/* Category Filter */}
      <section className="flex flex-wrap justify-center gap-4">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full capitalize ${
              selectedCategory === category
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category.replace(/\./g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
          </button>
        ))}
      </section>

      {/* Small Thumbnail Grid */}
      <section className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-4 justify-center">
        {filteredImages.map((image, index) => (
          <Card
            key={index}
            className="p-1 bg-white border border-gray-200 rounded-lg shadow-sm flex items-center justify-center cursor-pointer hover:shadow-md hover:border-blue-400 transition group"
            onClick={() => openModal(index)}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-20 h-20 object-cover rounded-md group-hover:scale-105 transition-transform duration-200"
            />
          </Card>
        ))}
      </section>

      {/* Image Modal */}
      {selectedIndex !== null && filteredImages[selectedIndex] && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
          onClick={closeModal}
        >
          <div className="relative max-w-4xl w-full" onClick={e => e.stopPropagation()}>
            {/* Close button */}
            <button
              className="absolute top-4 right-4 text-white text-3xl hover:text-gray-300 z-20"
              onClick={closeModal}
            >
              ×
            </button>
            {/* Prev button */}
            <button
              className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white bg-opacity-60 hover:bg-blue-600 hover:text-white text-blue-600 rounded-full p-2 shadow z-20"
              onClick={e => { e.stopPropagation(); showPrev(); }}
              aria-label="Previous"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            {/* Next button */}
            <button
              className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white bg-opacity-60 hover:bg-blue-600 hover:text-white text-blue-600 rounded-full p-2 shadow z-20"
              onClick={e => { e.stopPropagation(); showNext(); }}
              aria-label="Next"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <img
              src={filteredImages[selectedIndex].src}
              alt={filteredImages[selectedIndex].alt}
              className="w-full h-auto rounded-lg shadow-lg"
            />
            <div className="absolute bottom-4 left-4 text-white bg-black bg-opacity-50 px-4 py-2 rounded-lg">
              <h3 className="text-xl font-semibold capitalize">
                {filteredImages[selectedIndex].alt.replace(/-/g, ' ')}
              </h3>
              <p className="text-sm capitalize">{filteredImages[selectedIndex].category}</p>
              <p className="text-xs mt-1">{selectedIndex + 1} of {filteredImages.length}</p>
            </div>
            {/* Download in modal */}
            <a
              href={filteredImages[selectedIndex].src}
              download
              className="absolute bottom-4 right-4 bg-white bg-opacity-80 rounded-full p-3 shadow hover:bg-blue-600 hover:text-white transition z-20"
              title="Download"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-blue-600">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4" />
              </svg>
            </a>
          </div>
        </div>
      )}
    </div>
  );
} 