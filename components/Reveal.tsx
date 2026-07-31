import { useEffect, useRef, useState, type ReactNode } from 'react';

interface RevealProps {
  children: ReactNode;
  /** Stagger in ms, applied as a transition delay once the element enters view. */
  delay?: number;
  /** Entrance direction. `up` is the default lift; `left`/`right` slide in. */
  from?: 'up' | 'left' | 'right' | 'scale';
  className?: string;
  as?: 'div' | 'li' | 'section' | 'article' | 'header';
}

/**
 * Fade-and-move on first entry into the viewport.
 *
 * The hidden state lives behind `[data-js='ready']` in globals.css, so content
 * stays visible if JavaScript never runs. Users who prefer reduced motion get
 * the final state immediately, and a failsafe timer guarantees nothing is ever
 * stranded invisible if the observer fails to fire.
 */
export default function Reveal({
  children,
  delay = 0,
  from = 'up',
  className = '',
  as = 'div',
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (
      typeof IntersectionObserver === 'undefined' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.05 }
    );

    observer.observe(node);
    const failsafe = window.setTimeout(() => setVisible(true), 2500);

    return () => {
      observer.disconnect();
      window.clearTimeout(failsafe);
    };
  }, []);

  const Tag = as as 'div';

  return (
    <Tag
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`reveal reveal--${from} ${visible ? 'is-visible' : ''} ${className}`.trim()}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
