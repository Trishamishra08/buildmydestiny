import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import { getCategoryHref } from '../lib/categories';

const CategoryCard = ({ name, image, stagger = 0, compact = false }) => (
  <ScrollReveal stagger={stagger} y={16} scale={0.96}>
    <Link
      to={getCategoryHref(name)}
      className="group block bg-white border border-black/10 rounded-md overflow-hidden hover:border-[#FFB400] hover:shadow-md transition-colors duration-300 h-full"
    >
      <div
        className={`overflow-hidden bg-neutral-100 ${
          compact ? 'h-20 sm:h-24 md:h-[6.5rem]' : 'h-28 sm:h-32 md:h-36'
        }`}
      >
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className={`text-center ${compact ? 'px-2 py-1.5' : 'px-3 py-2.5'}`}>
        <h3
          className={`font-bold text-black uppercase leading-tight ${
            compact ? 'text-[10px] md:text-[11px]' : 'text-xs md:text-sm'
          }`}
          style={{ fontFamily: "'Oswald', sans-serif" }}
        >
          {name}
        </h3>
        <span className="inline-flex items-center gap-0.5 mt-0.5 text-[#FFB400] text-[9px] md:text-[10px] font-bold uppercase tracking-wide group-hover:gap-1 transition-all">
          Explore <ArrowRight size={10} />
        </span>
      </div>
    </Link>
  </ScrollReveal>
);

export default CategoryCard;
