/**
 * Spinner Component
 * 
 * Reusable loading spinner component with multiple sizes.
 * Used for loading states and async operations.
 */

import React from 'react';
import { cn } from '../../utils';

type SpinnerSize = 'sm' | 'md' | 'lg' | 'xl';

interface SpinnerProps {
  size?: SpinnerSize;
  className?: string;
  color?: 'forest' | 'gold' | 'white';
}

const sizeStyles: Record<SpinnerSize, string> = {
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-8 h-8',
  xl: 'w-12 h-12',
};

const colorStyles = {
  forest: 'text-forest',
  gold: 'text-gold',
  white: 'text-white',
};

export const Spinner: React.FC<SpinnerProps> = ({
  size = 'md',
  className,
  color = 'forest',
}) => {
  return (
    <svg
      className={cn('animate-spin', sizeStyles[size], colorStyles[color], className)}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      role="status"
      aria-label="Loading"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
};

Spinner.displayName = 'Spinner';

// Full Page Loading Spinner
interface LoadingOverlayProps {
  message?: string;
  size?: SpinnerSize;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  message = 'Loading...',
  size = 'lg',
}) => {
  return (
    <div className="fixed inset-0 bg-ivory/90 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="flex flex-col items-center gap-4">
        <Spinner size={size} />
        <p className="text-sm font-label uppercase tracking-widest text-forest/70">
          {message}
        </p>
      </div>
    </div>
  );
};

LoadingOverlay.displayName = 'LoadingOverlay';
