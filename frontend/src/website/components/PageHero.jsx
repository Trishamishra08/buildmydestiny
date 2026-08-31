import React from 'react';
import { motion } from 'framer-motion';
import ScrollFillHeading from './ScrollFillHeading';

const PageHero = ({ eyebrow, title, subtitle, image, compact = false }) => (
  <section className="relative bg-white overflow-hidden border-b-2 border-[#FFB400]">
    <div className="absolute right-0 top-0 bottom-0 w-[38%] opacity-15 hidden md:block">
      <img src={image || '/website/material-cement.jpg'} alt="" className="w-full h-full object-cover" />
    </div>
    <div
      className={`relative max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 ${
        compact ? 'py-5 md:py-7' : 'py-8 md:py-11'
      }`}
    >
      {eyebrow && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[11px] font-semibold uppercase tracking-[0.28em] text-black/55 mb-2"
        >
          {eyebrow}
        </motion.p>
      )}
      <ScrollFillHeading as="h1" theme="light" className={`max-w-4xl ${compact ? 'text-2xl md:text-4xl' : 'text-3xl md:text-5xl'}`}>
        {title}
      </ScrollFillHeading>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.16 }}
          className={`max-w-2xl text-black/65 leading-relaxed font-medium ${compact ? 'mt-2 text-xs md:text-sm' : 'mt-3 text-sm'}`}
        >
          {subtitle}
        </motion.p>
      )}
      <div className={`bg-[#FFB400] ${compact ? 'mt-2 w-12 h-[2px]' : 'mt-4 w-16 h-[3px]'}`} />
    </div>
  </section>
);

export default PageHero;
