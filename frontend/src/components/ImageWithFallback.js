import React, { useState, useEffect } from 'react';
import { getRestaurantImage, getFoodImage } from '../utils/imageUtils';

const ImageWithFallback = ({ 
  src, 
  alt, 
  type = 'food', 
  name, 
  className = '', 
  fallbackClassName = '',
  children,
  ...props 
}) => {
  const [imageSrc, setImageSrc] = useState(src);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Get appropriate fallback image based on type and name
  const getFallbackImage = () => {
    if (type === 'restaurant' && name) {
      return getRestaurantImage(name);
    } else if (type === 'food' && name) {
      return getFoodImage(name);
    }
    return null;
  };

  useEffect(() => {
    setImageSrc(src || getFallbackImage());
    setHasError(false);
    setIsLoading(true);
  }, [src, name, type]);

  const handleError = () => {
    if (!hasError) {
      const fallbackImage = getFallbackImage();
      if (fallbackImage && imageSrc !== fallbackImage) {
        setImageSrc(fallbackImage);
      } else {
        setHasError(true);
      }
      setIsLoading(false);
    }
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  // Show fallback content if image fails to load
  if (hasError || !imageSrc) {
    return (
      <div className={`flex items-center justify-center bg-gradient-to-br ${type === 'restaurant' ? 'from-primary-400 to-primary-600' : 'from-secondary-400 to-secondary-600'} ${className} ${fallbackClassName}`}>
        {children || (
          <div className="text-white text-center">
            <div className={`text-4xl mb-2 ${type === 'restaurant' ? '🍽️' : '🍕'}`}></div>
            <span className="text-sm font-medium">{alt || 'Image not available'}</span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 animate-pulse">
          <div className="text-gray-400 text-2xl">⏳</div>
        </div>
      )}
      <img
        src={imageSrc}
        alt={alt}
        className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        onError={handleError}
        onLoad={handleLoad}
        {...props}
      />
    </div>
  );
};

export default ImageWithFallback;
