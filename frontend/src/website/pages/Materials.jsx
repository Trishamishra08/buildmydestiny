import React, { useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import PageHero from '../components/PageHero';
import ScrollReveal from '../components/ScrollReveal';
import ScrollFillHeading from '../components/ScrollFillHeading';
import CategoryCard from '../components/CategoryCard';
import { useWebsiteContent } from '../cms';
import { CATEGORY_NAV, filterCategories, getNavItemActive } from '../lib/categories';

const Materials = () => {
  const { content } = useWebsiteContent();
  const { materials, projects, heroImages } = content;
  const [searchParams] = useSearchParams();
  const categorySlug = searchParams.get('category');
  const query = searchParams.get('q');

  const filteredCategories = useMemo(
    () => filterCategories(materials.categories, { categorySlug, query }),
    [materials.categories, categorySlug, query]
  );

  const activeNav = CATEGORY_NAV.find((item) =>
    getNavItemActive(item, '/products', categorySlug, query)
  );
  const sectionTitle = query
    ? `Results for "${query}"`
    : activeNav && activeNav.label !== 'All Materials' && activeNav.label !== 'Home'
      ? activeNav.label
      : 'Popular Categories';

  return (
    <div className="bg-white">
      <PageHero
        compact
        eyebrow="Products"
        title={materials.title}
        subtitle={materials.intro}
        image={heroImages?.slides?.[1]?.src || heroImages?.background}
      />

      <section className="bmd-section-tight border-b border-black/5">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12">
          <ScrollFillHeading
            as="h2"
            theme="light"
            className="text-lg md:text-xl font-extrabold uppercase text-black mb-3"
            style={{ fontFamily: "'Oswald', sans-serif" }}
          >
            {sectionTitle}
          </ScrollFillHeading>

          {filteredCategories.length === 0 ? (
            <div className="py-8 text-center">
              <p className="text-black/55 text-sm">No categories match your search.</p>
              <Link
                to="/products"
                className="inline-flex mt-3 text-[#FFB400] text-xs font-bold uppercase tracking-wide hover:underline"
              >
                View all materials
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-2.5">
              {filteredCategories.map((cat, idx) => (
                <CategoryCard key={cat.name} name={cat.name} image={cat.image} stagger={idx * 0.05} />
              ))}
            </div>
          )}

          <p className="mt-3 text-black/45 text-[11px] md:text-xs">{materials.note}</p>
        </div>
      </section>

      <section className="bmd-section-tight bg-[#f8f8f8]">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12">
          <ScrollFillHeading
            as="h2"
            theme="light"
            className="text-lg md:text-2xl font-extrabold uppercase text-black mb-4"
            style={{ fontFamily: "'Oswald', sans-serif" }}
          >
            For Every Construction Project
          </ScrollFillHeading>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-2.5 md:gap-3">
            {projects.map((item, idx) => (
              <ScrollReveal key={item.title} stagger={idx * 0.06} y={14} scale={0.97}>
                <div className="bg-white border border-black/8 rounded-md p-3.5 h-full hover:border-[#FFB400] transition-colors">
                  <div className="w-6 h-[2px] bg-[#FFB400] mb-2" />
                  <h3 className="text-black text-sm font-bold uppercase mb-1">{item.title}</h3>
                  <p className="text-black/55 text-[11px] leading-relaxed">{item.text}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <div className="mt-5 flex flex-wrap items-center gap-4">
            <div className="h-10 px-5 inline-flex items-center bg-[#FFB400] text-black text-[10px] font-extrabold uppercase tracking-[0.14em] cursor-default select-none">
              Order on the App
            </div>
            <Link
              to="/faq"
              className="text-black text-[10px] font-bold uppercase tracking-[0.12em] hover:text-[#FFB400] transition-colors"
            >
              Read FAQ →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Materials;
