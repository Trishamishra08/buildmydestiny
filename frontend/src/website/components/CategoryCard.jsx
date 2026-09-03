import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import { getCategoryHref } from '../lib/categories';

const CategoryCard = ({ name, image, stagger = 0, compact = false, variant = 'explore' }) => {
  const isCatalog = variant === 'catalog';

  return (
    <ScrollReveal stagger={stagger} y={16} scale={0.96}>
      <Link
        to={getCategoryHref(name)}
        className={
          isCatalog
            ? 'group bmd-material-tile flex flex-col items-center text-center h-full'
            : 'group block bg-white border border-black/10 rounded-md overflow-hidden hover:border-[#FFB400] hover:shadow-md transition-colors duration-300 h-full'
        }
      >
        <div
          className={
            isCatalog
              ? 'w-full flex items-end justify-center px-1.5 pt-3 pb-0 bg-transparent overflow-hidden'
              : `overflow-hidden bg-neutral-100 ${
                  compact ? 'h-20 sm:h-24 md:h-[6.5rem]' : 'h-28 sm:h-32 md:h-36'
                }`
          }
        >
          <img
            src={image}
            alt={name}
            className={
              isCatalog
                ? 'bmd-material-cutout h-[6.25rem] md:h-[7.25rem] w-[94%] object-contain object-bottom group-hover:scale-105 transition-transform duration-500'
                : 'w-full h-full object-cover group-hover:scale-105 transition-transform duration-500'
            }
          />
        </div>
        <div className={isCatalog ? 'px-2 pb-3 pt-0.5' : `text-center ${compact ? 'px-2 py-1.5' : 'px-3 py-2.5'}`}>
          <h3
            className={
              isCatalog
                ? 'text-[12px] font-semibold text-black leading-tight'
                : `bmd-type-cat text-black ${compact ? 'text-[10px] md:text-[11px]' : ''}`
            }
          >
            {name}
          </h3>
          {isCatalog ? (
            <span className="mt-1.5 mx-auto block w-6 h-[2px] bg-[#FFB400]" />
          ) : (
            <span className="inline-flex items-center gap-0.5 mt-0.5 text-[#FFB400] text-[9px] md:text-[10px] font-bold uppercase tracking-wide group-hover:gap-1 transition-all">
              Explore <ArrowRight size={10} />
            </span>
          )}
        </div>
      </Link>
    </ScrollReveal>
  );
};

export default CategoryCard;
