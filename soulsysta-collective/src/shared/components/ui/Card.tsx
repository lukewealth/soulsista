/**
 * Card Component
 * 
 * Reusable card container component with consistent styling.
 * Supports hover effects and custom styling.
 */

import React from 'react';
import { cn } from '../../utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  onClick?: () => void;
}

const paddingStyles = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
  xl: 'p-12',
};

export const Card: React.FC<CardProps> = ({
  children,
  className,
  hoverable = false,
  padding = 'md',
  onClick,
}) => {
  const Component = onClick ? 'button' : 'div';

  return (
    <Component
      onClick={onClick}
      className={cn(
        'bg-white rounded-3xl border border-forest/10',
        'transition-all duration-300',
        paddingStyles[padding],
        hoverable && 'hover:border-forest hover:shadow-xl cursor-pointer',
        onClick && 'focus:outline-none focus:ring-2 focus:ring-forest/20',
        className
      )}
      {...(onClick && { type: 'button' })}
    >
      {children}
    </Component>
  );
};

Card.displayName = 'Card';

// Card Header Subcomponent
interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export const CardHeader: React.FC<CardHeaderProps> = ({ children, className }) => {
  return (
    <div className={cn('mb-4', className)}>
      {children}
    </div>
  );
};

CardHeader.displayName = 'CardHeader';

// Card Title Subcomponent
interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export const CardTitle: React.FC<CardTitleProps> = ({
  children,
  className,
  as: Component = 'h3',
}) => {
  return (
    <Component
      className={cn(
        'font-serif text-xl font-bold text-forest',
        className
      )}
    >
      {children}
    </Component>
  );
};

CardTitle.displayName = 'CardTitle';

// Card Description Subcomponent
interface CardDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

export const CardDescription: React.FC<CardDescriptionProps> = ({ children, className }) => {
  return (
    <p className={cn('text-sm text-forest/70', className)}>
      {children}
    </p>
  );
};

CardDescription.displayName = 'CardDescription';

// Card Content Subcomponent
interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

export const CardContent: React.FC<CardContentProps> = ({ children, className }) => {
  return <div className={cn('space-y-4', className)}>{children}</div>;
};

CardContent.displayName = 'CardContent';

// Card Footer Subcomponent
interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

export const CardFooter: React.FC<CardFooterProps> = ({ children, className }) => {
  return (
    <div className={cn('mt-6 pt-4 border-t border-forest/10', className)}>
      {children}
    </div>
  );
};

CardFooter.displayName = 'CardFooter';
