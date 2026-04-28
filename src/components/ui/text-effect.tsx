'use client';

import { cn } from '@/lib/utils';
import React from 'react';

type PresetType = 'blur' | 'shake' | 'scale' | 'fade' | 'slide';

type TextEffectProps = {
  children: string;
  per?: 'word' | 'char' | 'line';
  as?: keyof React.JSX.IntrinsicElements;
  variants?: {
    container?: unknown;
    item?: unknown;
  };
  className?: string;
  preset?: PresetType;
  delay?: number;
  trigger?: boolean;
  onAnimationComplete?: () => void;
  segmentWrapperClassName?: string;
};

const AnimationComponent: React.FC<{
  segment: string;
  per: 'line' | 'word' | 'char';
  segmentWrapperClassName?: string;
}> = React.memo(({ segment, per, segmentWrapperClassName }) => {
  const content =
    per === 'line' ? (
      <span className='block'>
        {segment}
      </span>
    ) : per === 'word' ? (
      <span
        aria-hidden='true'
        className='inline-block whitespace-pre'
      >
        {segment}
      </span>
    ) : (
      <span className='inline-block whitespace-pre'>
        {segment.split('').map((char, charIndex) => (
          <span
            key={`char-${charIndex}`}
            aria-hidden='true'
            className='inline-block whitespace-pre'
          >
            {char}
          </span>
        ))}
      </span>
    );

  if (!segmentWrapperClassName) {
    return content;
  }

  const defaultWrapperClassName = per === 'line' ? 'block' : 'inline-block';

  return (
    <span className={cn(defaultWrapperClassName, segmentWrapperClassName)}>
      {content}
    </span>
  );
});

AnimationComponent.displayName = 'AnimationComponent';

export function TextEffect({
  children,
  per = 'word',
  as = 'p',
  className,
  preset,
  delay = 0,
  trigger = true,
  onAnimationComplete,
  segmentWrapperClassName,
}: TextEffectProps) {
  let segments: string[];

  if (per === 'line') {
    segments = children.split('\n');
  } else if (per === 'word') {
    segments = children.split(/(\s+)/);
  } else {
    segments = children.split('');
  }

  const Tag = as;
  const ariaLabel = per === 'line' ? undefined : children;

  React.useEffect(() => {
    if (trigger) {
      onAnimationComplete?.();
    }
  }, [onAnimationComplete, trigger]);

  if (!trigger) return null;

  return (
    <Tag
      aria-label={ariaLabel}
      data-preset={preset}
      style={{ '--text-effect-delay': `${delay}s` } as React.CSSProperties}
      className={cn('whitespace-pre-wrap', className)}
    >
      {segments.map((segment, index) => (
        <AnimationComponent
          key={`${per}-${index}-${segment}`}
          segment={segment}
          per={per}
          segmentWrapperClassName={segmentWrapperClassName}
        />
      ))}
    </Tag>
  );
}
