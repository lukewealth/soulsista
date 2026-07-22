/**
 * Shared Hooks Index
 * 
 * Exports all shared hooks for easy importing.
 */

export { useToast } from './useToast';
export { useLocalStorage } from './useLocalStorage';
export { 
  useMediaQuery, 
  useIsMobile, 
  useIsTablet, 
  useIsDesktop, 
  useIsLargeDesktop,
  usePrefersReducedMotion,
  usePrefersDarkMode 
} from './useMediaQuery';
export { 
  useIntersectionObserver, 
  useFadeInOnScroll, 
  useLazyLoad 
} from './useIntersectionObserver';
