// Image optimization utilities
import { useState, useEffect } from 'react';

// Lazy load images with Intersection Observer
export const useLazyImage = (src, placeholder = '/image/logo.png') => {
  const [imageSrc, setImageSrc] = useState(placeholder);
  const [imageRef, setImageRef] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let observer;
    let isCancelled = false;

    if (imageRef && imageSrc === placeholder) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !isCancelled) {
              const img = new Image();
              img.src = src;
              img.onload = () => {
                if (!isCancelled) {
                  setImageSrc(src);
                  setIsLoaded(true);
                }
              };
              img.onerror = () => {
                if (!isCancelled) {
                  setImageSrc(placeholder);
                }
              };
              observer.unobserve(imageRef);
            }
          });
        },
        { threshold: 0.01 }
      );
      observer.observe(imageRef);
    }

    return () => {
      isCancelled = true;
      if (observer && imageRef) {
        observer.unobserve(imageRef);
      }
    };
  }, [imageRef, imageSrc, placeholder, src]);

  return [imageSrc, setImageRef, isLoaded];
};

// Image error handler
export const handleImageError = (e, fallback = '/image/logo.png') => {
  if (e.target.src !== fallback) {
    e.target.src = fallback;
    e.target.style.opacity = '0.5';
  }
};

// Optimize image URL (if using CDN)
export const getOptimizedImageUrl = (url, width = 400, quality = 80) => {
  // If using a CDN like Cloudinary, Imgix, etc.
  // return `${url}?w=${width}&q=${quality}`;
  return url;
};

