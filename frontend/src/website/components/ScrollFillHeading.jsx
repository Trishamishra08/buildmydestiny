import React, { useLayoutEffect, useMemo, useRef } from 'react';
import { getGsap } from '../lib/gsapScroll';

const DIM = {
  dark: '#5a5a5a',
  light: 'rgba(17,17,17,0.22)',
};

const LIT = {
  dark: '#ffffff',
  light: '#111111',
};

const ACCENT = '#FFB400';

const flattenKey = (node) => {
  if (node == null || typeof node === 'boolean') return '';
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(flattenKey).join('');
  if (React.isValidElement(node)) {
    const accent = String(node.props.className || '').includes('bmd-accent') ? '#A' : '';
    return `${accent}(${flattenKey(node.props.children)})`;
  }
  return '';
};

const splitString = (text, inAccent, theme, keyPrefix, variant) => {
  const lit = variant === 'hero' ? '#FFFFFF' : inAccent ? ACCENT : LIT[theme] || LIT.dark;
  return text.split(/(\s+)/).map((part, index) => {
    if (!part) return null;
    if (/^\s+$/.test(part)) {
      return (
        <span key={`${keyPrefix}-s-${index}`} className="bmd-word-space">
          {part}
        </span>
      );
    }
    return (
      <span key={`${keyPrefix}-w-${index}`} className="bmd-word">
        <span className="bmd-word-dim">{part}</span>
        <span className="bmd-word-lit" aria-hidden="true" data-lit={lit}>
          {part}
        </span>
      </span>
    );
  });
};

const splitNodes = (children, inAccent, theme, keyPrefix = 'h', variant = 'section') =>
  React.Children.map(children, (child, index) => {
    if (child == null || typeof child === 'boolean') return child;
    const key = `${keyPrefix}-${index}`;
    if (typeof child === 'string' || typeof child === 'number') {
      return splitString(String(child), inAccent, theme, key, variant);
    }
    if (React.isValidElement(child)) {
      const className = child.props.className || '';
      const nextAccent = inAccent || String(className).includes('bmd-accent');
      return React.cloneElement(
        child,
        { key: child.key ?? key },
        splitNodes(child.props.children, nextAccent, theme, key, variant)
      );
    }
    return child;
  });

const ScrollFillHeading = ({
  children,
  className = '',
  as = 'h2',
  theme = 'dark',
  style = {},
  variant = 'section',
  triggerRef,
}) => {
  const ref = useRef(null);
  const Tag = as;
  const contentKey = `${flattenKey(children)}|${theme}|${variant}`;
  const split = useMemo(() => splitNodes(children, false, theme, 'h', variant), [contentKey]);

  useLayoutEffect(() => {
    const root = ref.current;
    if (!root) return undefined;

    const words = root.querySelectorAll('.bmd-word-lit');
    if (!words.length) return undefined;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      words.forEach((word) => {
        if (variant === 'hero') {
          word.style.clipPath = 'inset(0 100% 0 0)';
          word.style.webkitClipPath = 'inset(0 100% 0 0)';
          word.style.opacity = '1';
          return;
        }
        word.style.clipPath = 'inset(0 0% 0 0)';
        word.style.webkitClipPath = 'inset(0 0% 0 0)';
        word.style.opacity = '1';
        word.style.color = word.getAttribute('data-lit') || LIT[theme];
      });
      return undefined;
    }

    const { gsap, ScrollTrigger } = getGsap();
    const trigger = triggerRef?.current || (variant === 'hero' ? root.closest('section') : root) || root;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger,
          start: variant === 'hero' ? 'top top' : 'top 88%',
          end: variant === 'hero' ? '+=75%' : 'top 28%',
          scrub: 0.75,
          invalidateOnRefresh: true,
        },
      });

      words.forEach((word, index) => {
        const isHero = variant === 'hero';
        tl.fromTo(
          word,
          {
            color: isHero ? '#FFB400' : DIM[theme] || DIM.dark,
            opacity: isHero ? 1 : 0.35,
            clipPath: 'inset(0 100% 0 0)',
            webkitClipPath: 'inset(0 100% 0 0)',
          },
          {
            color: word.getAttribute('data-lit') || LIT[theme],
            opacity: 1,
            clipPath: 'inset(0 0% 0 0)',
            webkitClipPath: 'inset(0 0% 0 0)',
            duration: 1,
          },
          index * 0.32
        );
      });
    }, root);

    ScrollTrigger.refresh();
    document.fonts?.ready?.then(() => ScrollTrigger.refresh());

    return () => ctx.revert();
  }, [contentKey, theme, variant, triggerRef]);

  return (
    <Tag
      ref={ref}
      className={`bmd-scroll-heading bmd-scroll-heading-${theme}${variant === 'hero' ? ' bmd-scroll-heading-hero' : ''} ${className}`}
      style={style}
    >
      {split}
    </Tag>
  );
};

export default ScrollFillHeading;
