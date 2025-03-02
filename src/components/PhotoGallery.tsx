
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Photo {
  id: number;
  url: string;
  alt: string;
  caption: string;
}

const PHOTOS: Photo[] = [
  {
    id: 1,
    url: "https://source.unsplash.com/random/600x400?football,ronaldo",
    alt: "Cristiano Ronaldo celebrating",
    caption: "The GOAT in action!"
  },
  {
    id: 2,
    url: "https://source.unsplash.com/random/600x400?realmadrid",
    alt: "Real Madrid celebration",
    caption: "Hala Madrid y nada más!"
  },
  {
    id: 3,
    url: "https://source.unsplash.com/random/600x400?manchesterunited",
    alt: "Manchester United",
    caption: "Glory Glory Man United"
  },
  {
    id: 4,
    url: "https://source.unsplash.com/random/600x400?football,stadium",
    alt: "Football stadium",
    caption: "Where dreams come true"
  },
  {
    id: 5,
    url: "https://source.unsplash.com/random/600x400?football,celebration",
    alt: "Football celebration",
    caption: "Unforgettable moments"
  },
  {
    id: 6,
    url: "https://source.unsplash.com/random/600x400?trophy,football",
    alt: "Football trophy",
    caption: "Champions mentality"
  }
];

const PhotoGallery: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = () => {
    setActiveIndex((current) => (current === PHOTOS.length - 1 ? 0 : current + 1));
  };

  const prevSlide = () => {
    setActiveIndex((current) => (current === 0 ? PHOTOS.length - 1 : current - 1));
  };

  const goToSlide = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <section className="py-20 px-6 bg-secondary/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 animate-on-scroll">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Photo Gallery
          </h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            A collection of unforgettable football moments and celebrations!
          </p>
        </div>
        
        <div className="relative animate-on-scroll animate-delay-100">
          {/* Main carousel */}
          <div className="relative overflow-hidden rounded-2xl shadow-xl aspect-[16/9] mb-4">
            {PHOTOS.map((photo, index) => (
              <div
                key={photo.id}
                className={`absolute inset-0 transition-all duration-500 ease-in-out transform ${
                  index === activeIndex
                    ? 'opacity-100 translate-x-0'
                    : index < activeIndex
                    ? 'opacity-0 -translate-x-full'
                    : 'opacity-0 translate-x-full'
                }`}
              >
                <img
                  src={photo.url}
                  alt={photo.alt}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                  <p className="text-white text-lg font-medium">{photo.caption}</p>
                </div>
              </div>
            ))}
            
            {/* Navigation arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/50 transition-colors z-10"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/50 transition-colors z-10"
              aria-label="Next slide"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
          
          {/* Thumbnails */}
          <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide animate-on-scroll animate-delay-200">
            {PHOTOS.map((photo, index) => (
              <button
                key={photo.id}
                onClick={() => goToSlide(index)}
                className={`relative flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-lg overflow-hidden transition-all ${
                  activeIndex === index 
                    ? 'ring-4 ring-united' 
                    : 'ring-1 ring-white/30 opacity-70 hover:opacity-100'
                }`}
              >
                <img
                  src={photo.url}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </button>
            ))}
          </div>
        </div>
        
        {/* Grid view for larger screens */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-4 mt-12 animate-on-scroll animate-delay-300">
          {PHOTOS.map((photo) => (
            <div 
              key={photo.id}
              className="group relative aspect-[4/3] overflow-hidden rounded-xl card-hover"
            >
              <img
                src={photo.url}
                alt={photo.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <p className="p-4 text-white">{photo.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PhotoGallery;
