'use client';
import React from 'react';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type PresetType =
  | 'fade'
  | 'slide'
  | 'scale'
  | 'blur'
  | 'blur-slide'
  | 'zoom'
  | 'flip'
  | 'bounce'
  | 'rotate'
  | 'swing';

type AnimatedGroupProps = {
  children: ReactNode;
  className?: string;
  variants?: unknown;
  preset?: PresetType;
};

function AnimatedGroup({
  children,
  className,
  preset,
}: AnimatedGroupProps) {
  return (
    <div
      data-preset={preset}
      className={cn('animate-enter-stagger', className)}
    >
      {React.Children.map(children, (child, index) => (
        <div
          key={index}
          className="animate-enter-item"
          style={{ '--enter-index': index } as React.CSSProperties}
        >
          {child}
        </div>
      ))}
    </div>
  );
}

export { AnimatedGroup };
