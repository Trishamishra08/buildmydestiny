import React, { useLayoutEffect, useRef } from 'react';
import { getGsap } from '../lib/gsapScroll';

/**
 * Scroll-scrubbed reveal — tied to scroll position, reverses on scroll up.
 * Same GSAP + ScrollTrigger stack as ScrollFillHeading and Lenis.
 */
const ScrollReveal = ({
  children,
  className = '',
  y = 22,
  scale = 0.96,
  stagger = 0,
  as: Tag = 'div',
}) => {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      el.style.opacity = '1';
      el.style.transform = 'none';
      return undefined;
    }

    const { gsap, ScrollTrigger } = getGsap();
    const startAt = Math.max(78, 94 - stagger * 36);
    const endAt = Math.max(48, 68 - stagger * 36);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y, scale },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: `top ${startAt}%`,
            end: `top ${endAt}%`,
            scrub: 0.65,
            invalidateOnRefresh: true,
          },
        }
      );
    }, el);

    ScrollTrigger.refresh();
    document.fonts?.ready?.then(() => ScrollTrigger.refresh());

    return () => ctx.revert();
  }, [y, scale, stagger]);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
};

export default ScrollReveal;
