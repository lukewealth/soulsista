/**
 * useIntersectionObserver Hook
 * 
 * Tracks when an element enters or exits the viewport.
 * Useful for lazy loading, scroll animations, and infinite scroll.
 */

import { useEffect, useRef, useState, RefObject } from 'react';

interface UseIntersectionObserverOptions {
  threshold?: number | number[];
  root?: Element | null;
  rootMargin?: string;
  triggerOnce?: boolean;
}

interface UseIntersectionObserverReturn {
  ref: RefObject<Element | null>;
  isIntersecting: boolean;
  entry: IntersectionObserverEntry | null;
}

export const useIntersectionObserver = (
  options: UseIntersectionObserverOptions = {}
): UseIntersectionObserverReturn => {
  const {
    threshold = 0,
    root = null,
    rootMargin = '0px',
    triggerOnce = false,
  } = options;

  const ref = useRef<Element | null>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isCurrentlyIntersecting = entry.isIntersecting;
        
        setIsIntersecting(isCurrentlyIntersecting);
        setEntry(entry);

        // If triggerOnce is true and element is intersecting, disconnect observer
        if (triggerOnce && isCurrentlyIntersecting) {
          observer.disconnect();
        }
      },
      {
        threshold,
        root,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, root, rootMargin, triggerOnce]);

  return {
    ref,
    isIntersecting,
    entry,
  };
};

// Convenience hook for fade-in animations
export const useFadeInOnScroll = (
  threshold: number = 0.1
): { ref: RefObject<Element | null>; isVisible: boolean } => {
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold,
    triggerOnce: true,
  });

  return {
    ref,
    isVisible: isIntersecting,
  };
};

// Convenience hook for lazy loading
export const useLazyLoad = (
  rootMargin: string = '200px'
): { ref: RefObject<Element | null>; shouldLoad: boolean } => {
  const { ref, isIntersecting } = useIntersectionObserver({
    rootMargin,
    triggerOnce: true,
  });

  return {
    ref,
    shouldLoad: isIntersecting,
  };
};
