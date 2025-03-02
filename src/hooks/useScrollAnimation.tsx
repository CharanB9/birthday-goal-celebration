
import { useEffect, useRef } from 'react';

export function useScrollAnimation() {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Create intersection observer
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          // Once the animation is triggered, we can stop observing this element
          observerRef.current?.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    });

    // Select all elements with animate-on-scroll class
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    // Observe each element
    elements.forEach((element) => {
      observerRef.current?.observe(element);
    });

    // Cleanup observer on unmount
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return null;
}
