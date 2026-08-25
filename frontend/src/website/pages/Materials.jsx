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
    <div className="bg-[#0b0b0b]">
      <PageHero eyebrow="Products" title={materials.title} subtitle={materials.intro} image={heroImages?.background} />
      <section className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 py-12 md:py-14">
        <ScrollFillHeading as="h2" className="text-2xl md:text-3xl mb-6">Popular Categories</ScrollFillHeading>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {materials.categories.map((cat, idx) => (
            <Reveal key={cat.name} delay={idx * 0.04}>
              <article className="relative h-48 overflow-hidden group">
                <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                <h3 className="absolute bottom-4 left-4 text-white text-xl">{cat.name}</h3>
              </article>
            </Reveal>
          ))}
        </div>
        <p className="mt-5 text-white/50 text-sm">{materials.note}</p>
      </section>
      <section className="bg-black py-12 md:py-14">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12">
          <ScrollFillHeading as="h2" className="text-2xl md:text-4xl mb-8">For Every Construction Project</ScrollFillHeading>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
            {projects.map((item, idx) => (
              <Reveal key={item.title} delay={idx * 0.05}>
                <div className="border border-white/10 p-4 h-full hover:border-[#FFB400]/40 transition-colors">
                  <div className="w-8 h-[3px] bg-[#FFB400] mb-3" />
                  <h3 className="text-white text-lg mb-2">{item.title}</h3>
                  <p className="text-white/65 text-sm leading-relaxed">{item.text}</p>
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
          <Link to="/faq" className="ml-6 text-[#FFB400] text-xs font-bold uppercase tracking-[0.16em]">
            Read FAQ →
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Materials;
