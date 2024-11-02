import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import '../../../styles/components/home/propertyDetail/PropertyDetailCarousel.css'

const PropertyDetailCarousel = ({ images = [], autoScrollInterval = 5000 }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  
  const propertyImages = images.length > 0 ? images : ['/api/placeholder/800/600'];

  useEffect(() => {
    let intervalId;
    
    if (propertyImages.length > 1 && !isHovered) {
      intervalId = setInterval(() => {
        setSelectedImage((prev) => 
          prev === propertyImages.length - 1 ? 0 : prev + 1
        );
      }, autoScrollInterval);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [propertyImages.length, autoScrollInterval, isHovered]);

  const handlePrevImage = () => {
    setSelectedImage((prev) => 
      prev === 0 ? propertyImages.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setSelectedImage((prev) => 
      prev === propertyImages.length - 1 ? 0 : prev + 1
    );
  };

  const handleThumbnailClick = (index) => {
    setSelectedImage(index);
  };

  return (
    <div 
      className="carousel-container"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main Image */}
      <div className="carousel-main-image">
        <img
          src={propertyImages[selectedImage]}
          alt={`Property view ${selectedImage + 1}`}
        />
        
        {/* Navigation Arrows */}
        {propertyImages.length > 1 && (
          <>
            <button 
              onClick={handlePrevImage}
              className="carousel-arrow carousel-arrow-left"
              aria-label="Previous image"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={handleNextImage}
              className="carousel-arrow carousel-arrow-right"
              aria-label="Next image"
            >
              <ChevronRight size={24} />
            </button>
          </>
        )}

        {/* Image Counter */}
        <div className="carousel-counter">
          {selectedImage + 1} / {propertyImages.length}
        </div>
      </div>

      {/* Thumbnails */}
      {propertyImages.length > 1 && (
        <div className="carousel-thumbnails">
          {propertyImages.map((image, index) => (
            <button
              key={index}
              onClick={() => handleThumbnailClick(index)}
              className={`carousel-thumbnail-button ${selectedImage === index ? 'active' : ''}`}
            >
              <img
                src={image}
                alt={`Thumbnail ${index + 1}`}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default PropertyDetailCarousel;
