import React from 'react';
import { motion } from 'framer-motion';
import ScrollFillHeading from './ScrollFillHeading';

const PageHero = ({ eyebrow, title, subtitle, image }) => (
  <section className="relative bg-[#111111] overflow-hidden">
    <div className="absolute inset-0 opacity-30">
      <img src={image || '/website/hero-site.jpg'} alt="" className="w-full h-full object-cover" />
    </div>
    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-black/55" />
    <div className="relative max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 py-10 md:py-14">
      {eyebrow && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/70 mb-2"
        >
          {eyebrow}
        </motion.p>
      )}
      <ScrollFillHeading as="h1" className="text-3xl md:text-5xl max-w-4xl">
        {title}
      </ScrollFillHeading>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.16 }}
          className="mt-3 max-w-2xl text-white/75 text-sm leading-relaxed font-medium"
        >
          {subtitle}
        </motion.p>
      )}
      <div className="mt-4 w-16 h-[3px] bg-[#FFB400]" />
    </div>
  </section>
);

export default PageHero;
