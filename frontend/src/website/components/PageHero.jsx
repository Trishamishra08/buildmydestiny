import React from 'react';
import { motion } from 'framer-motion';
import ScrollFillHeading from './ScrollFillHeading';

const PageHero = ({ eyebrow, title, subtitle, image }) => (
  <section className="relative bg-white overflow-hidden border-b-4 border-[#FFB400]">
    <div className="absolute right-0 top-0 bottom-0 w-[42%] opacity-20 hidden md:block">
      <img src={image || '/website/material-cement.jpg'} alt="" className="w-full h-full object-cover" />
    </div>
    <div className="relative max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 py-10 md:py-14">
      {eyebrow && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[11px] font-semibold uppercase tracking-[0.28em] text-black/55 mb-2"
        >
          {eyebrow}
        </motion.p>
      )}
      <ScrollFillHeading as="h1" theme="light" className="text-3xl md:text-5xl max-w-4xl">
        {title}
      </ScrollFillHeading>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.16 }}
          className="mt-3 max-w-2xl text-black/65 text-sm leading-relaxed font-medium"
        >
          {subtitle}
        </motion.p>
      )}
      <div className="mt-4 w-16 h-[3px] bg-[#FFB400]" />
    </div>
  </section>
);

export default PageHero;
