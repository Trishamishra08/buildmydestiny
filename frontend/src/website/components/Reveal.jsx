import React from 'react';
import { motion } from 'framer-motion';

const Reveal = ({ children, delay = 0, y = 22, className = '', once = true }) => (
  <motion.div
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once, amount: 0.18 }}
    transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

export default Reveal;
