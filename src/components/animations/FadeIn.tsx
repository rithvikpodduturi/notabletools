
import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

type FadeInProps = {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number;
  threshold?: number;
  once?: boolean;
  easing?: string;
};

export const FadeIn: React.FC<FadeInProps> = ({
  children,
  delay = 0,
  duration = 500,
  className = '',
  direction = 'up',
  distance = 20,
  threshold = 0.1,
  once = true,
  easing = 'ease-out',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (once) {
              observer.unobserve(entry.target);
            }
          } else if (!once) {
            setIsVisible(false);
          }
        });
      },
      { threshold }
    );

    const { current } = domRef;
    if (current) {
      observer.observe(current);
    }

    return () => {
      if (current) {
        observer.unobserve(current);
      }
    };
  }, [threshold, once]);

  const getDirectionStyles = () => {
    if (!isVisible) {
      switch (direction) {
        case 'up':
          return { transform: `translateY(${distance}px)` };
        case 'down':
          return { transform: `translateY(-${distance}px)` };
        case 'left':
          return { transform: `translateX(${distance}px)` };
        case 'right':
          return { transform: `translateX(-${distance}px)` };
        default:
          return {};
      }
    }
    return {};
  };

  return (
    <div
      ref={domRef}
      className={cn(className)}
      style={{
        opacity: isVisible ? 1 : 0,
        transition: `opacity ${duration}ms ${easing} ${delay}ms, transform ${duration}ms ${easing} ${delay}ms`,
        ...getDirectionStyles(),
      }}
    >
      {children}
    </div>
  );
};

export default FadeIn;
