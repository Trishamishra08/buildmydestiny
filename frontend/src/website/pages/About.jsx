import React from 'react';
import PageHero from '../components/PageHero';
import Reveal from '../components/Reveal';
import ScrollFillHeading from '../components/ScrollFillHeading';
import { useWebsiteContent } from '../cms';

const About = () => {
  const { content } = useWebsiteContent();
  const { about, promises, why, heroImages } = content;

  return (
    <div className="bg-[#0b0b0b]">
      <PageHero eyebrow="About Us" title={about.title} subtitle={why.focus} image={heroImages?.background} />
      <section className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 py-12 md:py-14 grid lg:grid-cols-2 gap-10 items-center">
        <Reveal>
          <img src={about.image || '/website/about.jpg'} alt="Construction project" className="w-full h-[360px] object-cover" />
        </Reveal>
        <Reveal delay={0.1}>
          <div className="space-y-4 text-white/75 leading-relaxed text-sm md:text-base">
            {about.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </Reveal>
      </section>
      <section className="bg-black py-12">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 grid md:grid-cols-2 gap-6">
          <Reveal>
            <div className="border border-[#FFB400] p-7">
              <p className="text-[#FFB400] text-xs font-bold tracking-[0.2em] uppercase mb-3">Our Vision</p>
              <ScrollFillHeading as="h2" className="text-2xl md:text-3xl">{about.vision}</ScrollFillHeading>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="border border-white/10 p-7">
              <p className="text-[#FFB400] text-xs font-bold tracking-[0.2em] uppercase mb-3">Our Mission</p>
              <ScrollFillHeading as="h2" className="text-2xl md:text-3xl">{about.mission}</ScrollFillHeading>
            </div>
          </Reveal>
        </div>
      </section>
      <section className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 py-12 md:py-14">
        <ScrollFillHeading as="h2" className="text-2xl md:text-4xl mb-8">Customer Promise</ScrollFillHeading>
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
          {promises.map((item, idx) => (
            <Reveal key={item.title} delay={idx * 0.06}>
              <div className="bg-[#111111] p-4 h-full hover:-translate-y-1 transition-transform">
                <div className="w-8 h-[3px] bg-[#FFB400] mb-3" />
                <h3 className="text-white text-lg mb-2">{item.title}</h3>
                <p className="text-white/65 text-sm leading-relaxed">{item.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
