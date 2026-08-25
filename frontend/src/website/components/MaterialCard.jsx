import React, { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useSpring, useReducedMotion } from 'framer-motion';
import { getGsap } from '../lib/gsapScroll';

const spring = { stiffness: 220, damping: 22, mass: 0.6 };

const useCardTilt = (enabled) => {
  const rotateX = useSpring(0, spring);
  const rotateY = useSpring(0, spring);
  const lift = useSpring(0, spring);

  const onMove = (event) => {
    if (!enabled) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    rotateX.set(y * -7);
    rotateY.set(x * 9);
    lift.set(-8);
  };

  const onLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    lift.set(0);
  };

  return { rotateX, rotateY, lift, onMove, onLeave };
};

const useImageReveal = (wrapRef) => {
  useLayoutEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const { gsap, ScrollTrigger } = getGsap();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        wrap,
        { clipPath: 'inset(110% 0 0 0)' },
        {
          clipPath: 'inset(0% 0 0 0)',
          duration: 1.05,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: wrap,
            start: 'top 90%',
            once: true,
          },
        }
      );
    }, wrap);

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, [wrapRef]);
};

const MaterialCard = ({ image, alt, n, title, text, variant = 'light', delay = 0 }) => {
  const dark = variant === 'dark';
  const reduce = useReducedMotion();
  const wrapRef = useRef(null);
  const { rotateX, rotateY, lift, onMove, onLeave } = useCardTilt(!reduce);
  useImageReveal(wrapRef);

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className="h-full"
    >
      <motion.article
        style={{ rotateX, rotateY, y: lift, transformPerspective: 900 }}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className={`bmd-material-card group h-full overflow-hidden border ${
          dark ? 'bg-[#141414] border-white/10' : 'bg-white border-black/10'
        }`}
      >
        <div className="h-[3px] bg-[#FFB400] origin-left scale-x-50 group-hover:scale-x-100 transition-transform duration-500" />
        {image ? (
          <div ref={wrapRef} className="relative h-32 overflow-hidden bg-neutral-200">
            <img
              src={image}
              alt={alt || title}
              className="bmd-card-img w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
          </div>
        ) : null}
        <div className="p-4">
          {n ? (
            <div className="text-[#FFB400] text-xl leading-none mb-2" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              {n}
            </div>
          ) : null}
          <h3 className={`text-base mb-1.5 transition-transform duration-500 group-hover:-translate-y-0.5 ${dark ? 'text-white' : 'text-black'}`}>
            {title}
          </h3>
          <p className={`text-sm leading-relaxed ${dark ? 'text-white/55' : 'text-black/55'}`}>{text}</p>
        </div>
      </motion.article>
    </motion.div>
  );
};

export const ImageTile = ({ to, image, name, delay = 0, darkLabel = false }) => {
  const reduce = useReducedMotion();
  const wrapRef = useRef(null);
  const { rotateX, rotateY, lift, onMove, onLeave } = useCardTilt(!reduce);
  useImageReveal(wrapRef);

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className="h-full"
    >
      <motion.div
        style={{ rotateX, rotateY, y: lift, transformPerspective: 900 }}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="h-full"
      >
        <Link
          to={to}
          className="bmd-material-card group relative h-36 overflow-hidden block border-2 border-[#FFB400]"
        >
          <div ref={wrapRef} className="absolute inset-0 overflow-hidden">
            <img src={image} alt={name} className="bmd-card-img w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110" />
          </div>
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-500" />
          <div
            className={`absolute bottom-0 left-0 right-0 px-3 py-2 font-bold uppercase tracking-wide text-sm transition-transform duration-500 group-hover:-translate-y-0.5 ${
              darkLabel ? 'bg-black text-[#FFB400]' : 'bg-[#FFB400] text-black'
            }`}
          >
            {name}
          </div>
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default MaterialCard;
