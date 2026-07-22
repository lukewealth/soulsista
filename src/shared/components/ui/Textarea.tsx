/**
 * Textarea Component
 * 
 * Reusable form textarea component with validation and error handling.
 * Supports auto-resize and character count.
 */

import React, { forwardRef } from 'react';
import { cn } from '../../utils';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  showCharCount?: boolean;
  maxCharCount?: number;
  fullWidth?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      error,
      helperText,
      showCharCount = false,
      maxCharCount,
      fullWidth = true,
      className,
      id,
      value,
      onChange,
      ...props
    },
    ref
  ) => {
    const textareaId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`;
    const charCount = typeof value === 'string' ? value.length : 0;

    return (
      <div className={cn('flex flex-col gap-1.5', fullWidth && 'w-full')}>
        {label && (
          <label
            htmlFor={textareaId}
            className="text-xs font-label uppercase tracking-widest text-forest font-bold"
          >
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        <div className="relative">
          <textarea
            ref={ref}
            id={textareaId}
            value={value}
            onChange={onChange}
            className={cn(
              'w-full px-4 py-3 bg-white border rounded-2xl text-sm text-forest',
              'placeholder:text-forest/40',
              'focus:outline-none focus:ring-2 focus:ring-forest/20 focus:border-forest',
              'transition-all duration-200 resize-none',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              error
                ? 'border-red-500 focus:ring-red-500/20 focus:border-red-500'
                : 'border-forest/10',
              className
            )}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={
              error ? `${textareaId}-error` : helperText ? `${textareaId}-helper` : undefined
            }
            maxLength={maxCharCount}
            {...props}
          />

          {showCharCount && maxCharCount && (
            <div className="absolute bottom-2 right-3 text-xs text-forest/50">
              {charCount}/{maxCharCount}
            </div>
          )}
        </div>

        {error && (
          <p id={`${textareaId}-error`} className="text-xs text-red-500 mt-1" role="alert">
            {error}
          </p>
        )}

        {!error && helperText && (
          <p id={`${textareaId}-helper`} className="text-xs text-forest/60 mt-1">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
