import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const lineVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.032 },
  },
};

const letterVariants = {
  hidden: { y: '115%', opacity: 0 },
  show: {
    y: '0%',
    opacity: 1,
    transition: { duration: 0.62, ease: [0.16, 1, 0.3, 1] },
  },
};

const HeroHeading = ({ lines = [], className = '' }) => {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <h1 className={`bmd-stamp text-white ${className}`}>
        {lines.map((line) => (
          <span key={line.text} className={`block ${line.accent ? 'text-[#FFB400]' : ''}`}>
            {line.text}
          </span>
        ))}
      </h1>
    );
  }

  return (
    <motion.h1
      className={`bmd-stamp text-white ${className}`}
      initial="hidden"
      animate="show"
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.16, delayChildren: 0.12 } },
      }}
    >
      {lines.map((line) => (
        <motion.span
          key={line.text}
          className={`block overflow-hidden ${line.accent ? 'text-[#FFB400] bmd-heading-accent' : ''}`}
          variants={lineVariants}
        >
          {String(line.text || '')
            .split('')
            .map((char, index) => (
              <motion.span key={`${char}-${index}`} className="inline-block" variants={letterVariants}>
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
        </motion.span>
      ))}
    </motion.h1>
  );
};

export default HeroHeading;
