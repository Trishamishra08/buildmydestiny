import React from 'react';
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import Reveal from '../components/Reveal';
import ScrollFillHeading from '../components/ScrollFillHeading';
import { APP_HREF } from '../data/content';
import { useWebsiteContent } from '../cms';

const Materials = () => {
  const { content } = useWebsiteContent();
  const { materials, projects, heroImages } = content;

  return (
    <div className="bg-[#f6f6f4]">
      <PageHero eyebrow="Products" title={materials.title} subtitle={materials.intro} image={heroImages?.slides?.[1]?.src || heroImages?.background} />
      <section className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 py-12 md:py-14">
        <ScrollFillHeading as="h2" theme="light" className="text-2xl md:text-3xl mb-6">Popular Categories</ScrollFillHeading>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {materials.categories.map((cat, idx) => (
            <Reveal key={cat.name} delay={idx * 0.04}>
              <article className="relative h-48 overflow-hidden group border-2 border-[#FFB400]">
                <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <h3 className="absolute bottom-0 left-0 right-0 bg-[#FFB400] px-4 py-3 text-black text-xl">{cat.name}</h3>
              </article>
            </Reveal>
          ))}
        </div>
        <p className="mt-5 text-black/50 text-sm">{materials.note}</p>
      </section>
      <section className="bg-white py-12 md:py-14 border-y border-black/5">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12">
          <ScrollFillHeading as="h2" theme="light" className="text-2xl md:text-4xl mb-8">For Every Construction Project</ScrollFillHeading>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
            {projects.map((item, idx) => (
              <Reveal key={item.title} delay={idx * 0.05}>
                <div className="bmd-card p-4 h-full">
                  <div className="w-8 h-[3px] bg-[#FFB400] mb-3" />
                  <h3 className="text-black text-lg mb-2">{item.title}</h3>
                  <p className="text-black/60 text-sm leading-relaxed">{item.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <a
            href={APP_HREF}
            className="inline-flex mt-8 h-11 px-6 items-center bg-[#FFB400] text-black text-[11px] font-extrabold uppercase tracking-[0.16em]"
          >
            Order on the App
          </a>
          <Link to="/faq" className="ml-6 text-black text-xs font-bold uppercase tracking-[0.16em] hover:text-[#FFB400]">
            Read FAQ →
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Materials;
