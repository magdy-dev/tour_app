import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Whether the card is interactive (clickable)
   */
  interactive?: boolean;
  /**
   * Whether to show a hover effect
   */
  hoverable?: boolean;
  /**
   * Whether to show a loading state
   */
  loading?: boolean;
  /**
   * Whether to show a disabled state
   */
  disabled?: boolean;
  /**
   * The variant of the card
   */
  variant?: 'default' | 'bordered' | 'elevated';
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ 
    className, 
    interactive = false,
    hoverable = true,
    loading = false,
    disabled = false,
    variant = 'default',
    children,
    ...props 
  }, ref) => {
    const baseStyles = "rounded-lg bg-white";
    const variantStyles = {
      default: "shadow-sm",
      bordered: "border border-gray-200",
      elevated: "shadow-lg"
    };
    const interactiveStyles = interactive && !disabled ? "cursor-pointer" : "";
    const hoverStyles = hoverable && !disabled ? "transition-all duration-200 hover:shadow-md" : "";
    const disabledStyles = disabled ? "opacity-50 cursor-not-allowed" : "";

    const cardContent = (
      <div
        ref={ref}
        className={cn(
          baseStyles,
          variantStyles[variant],
          interactiveStyles,
          hoverStyles,
          disabledStyles,
          className
        )}
        role={interactive ? "button" : undefined}
        tabIndex={interactive && !disabled ? 0 : undefined}
        aria-disabled={disabled}
        {...props}
      >
        {loading ? (
          <div className="animate-pulse space-y-4 p-4">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          </div>
        ) : (
          children
        )}
      </div>
    );

    if (interactive && !disabled) {
      return (
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          {cardContent}
        </motion.div>
      );
    }

    return cardContent;
  }
);

Card.displayName = "Card";

export default Card; 