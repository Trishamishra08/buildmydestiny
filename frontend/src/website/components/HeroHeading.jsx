import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const HeroHeading = ({ lines = [], className = '', animateKey = 0 }) => {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <h1 className={`bmd-hero-heading bmd-hero-title ${className}`}>
        {lines.map((line) => (
          <span
            key={line.text}
            className={`block ${line.accent ? 'bmd-accent text-[#FFB400]' : ''}`}
          >
            {line.text}
          </span>
        ))}
      </h1>
    );
  }

  return (
    <motion.h1
      key={animateKey}
      className={`bmd-hero-heading bmd-hero-title ${className}`}
      initial="hidden"
      animate="show"
      variants={{
        hidden: {},
        show: {
          transition: { staggerChildren: 0.12, delayChildren: 0.04 },
        },
      }}
    >
      {lines.map((line) => (
        <span
          key={line.text}
          className={`bmd-hero-line ${line.accent ? 'bmd-accent text-[#FFB400]' : ''}`}
        >
          <motion.span
            className="bmd-hero-line-inner"
            variants={{
              hidden: {},
              show: {
                transition: { staggerChildren: 0.022 },
              },
            }}
          >
            {String(line.text || '')
              .split('')
              .map((char, index) => (
                <motion.span
                  key={`${line.text}-${index}`}
                  className="bmd-hero-char"
                  variants={{
                    hidden: { y: '105%', opacity: 0 },
                    show: {
                      y: 0,
                      opacity: 1,
                      transition: { duration: 0.42, ease: [0.22, 1, 0.36, 1] },
                    },
                  }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              ))}
          </motion.span>
        </span>
      ))}
    </motion.h1>
  );
};

export default HeroHeading;
