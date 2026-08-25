import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Package, Award, Truck, Headphones, ArrowRight, ShieldCheck } from 'lucide-react';
import NotifyForm from '../components/NotifyForm';
import Reveal from '../components/Reveal';
import ScrollFillHeading from '../components/ScrollFillHeading';
import HeroBanner from '../components/HeroBanner';
import MaterialCard, { ImageTile } from '../components/MaterialCard';
import { useWebsiteContent } from '../cms';
import { APP_HREF } from '../data/content';

const featureIcons = {
  boxes: Package,
  badge: Award,
  truck: Truck,
  support: Headphones,
};

const Home = () => {
  const { content } = useWebsiteContent();
  const { home, features, benefits, howSteps, howMantra, materials, appSection, heroImages, notify } = content;
  const [qrUrl, setQrUrl] = useState(APP_HREF);
  const heroRef = useRef(null);

  useEffect(() => {
    setQrUrl(`${window.location.origin}${APP_HREF}`);
  }, []);

  const slides =
    heroImages?.slides?.length
      ? heroImages.slides
      : (materials?.categories || []).slice(0, 4).map((cat) => ({
          src: cat.image,
          alt: cat.name,
          label: cat.name,
        }));
  const heroFallback = slides[0]?.src || '/website/material-cement.jpg';

  return (
    <div>
      <section
        ref={heroRef}
        className="relative min-h-[100svh] h-[100svh] overflow-hidden bg-black"
        style={{ backgroundImage: `url(${heroFallback})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <HeroBanner slides={slides} />
        <div className="absolute inset-y-0 left-0 z-[1] w-full md:w-[58%] pointer-events-none bg-gradient-to-r from-black via-black/70 to-transparent" />
        <div className="absolute inset-x-0 top-0 z-[1] h-32 pointer-events-none bg-gradient-to-b from-black/50 to-transparent" />

        <div className="relative z-[2] max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 pt-24 md:pt-28 pb-16 grid lg:grid-cols-[1.05fr_0.95fr] gap-8 items-center min-h-[100svh] pointer-events-none">
          <div className="max-w-xl pointer-events-auto">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 mb-5"
            >
              <span className="h-[2px] w-8 bg-[#FFB400]" />
              <span className="text-white text-[12px] md:text-[13px] font-semibold tracking-[0.28em] uppercase">
                {home.eyebrow}
              </span>
            </motion.div>

            <ScrollFillHeading
              as="h1"
              variant="hero"
              triggerRef={heroRef}
              className="text-[52px] sm:text-[68px] md:text-[84px] lg:text-[96px] leading-[0.9] bg-transparent"
            >
              <span className="block">{home.title?.[0]}</span>
              <span className="block bmd-accent">{home.title?.[1]}</span>
              <span className="block">{home.title?.[2]}</span>
            </ScrollFillHeading>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.28 }}
              className="mt-6 max-w-md text-white/85 text-[15px] md:text-[16px] leading-relaxed font-medium"
            >
              {home.descriptionBefore ? (
                <>
                  {home.descriptionBefore}
                  <span className="text-[#FFB400]">{home.descriptionAccent}</span>
                  {home.descriptionAfter}
                </>
              ) : (
                home.description
              )}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 22, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.55, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="mt-7 flex flex-wrap items-stretch gap-3"
            >
              <div className="bmd-coming-soon">
                <div className="bmd-hazard-thin bmd-coming-soon-rail bmd-coming-soon-rail-left bmd-hazard-animated" aria-hidden="true" />
                <div className="bmd-hazard-thin bmd-coming-soon-rail bmd-coming-soon-rail-right bmd-hazard-animated" aria-hidden="true" />
                <div className="bmd-coming-soon-shine" />
                <div className="relative z-[1] text-center">
                  <div className="bmd-display bmd-coming-soon-title text-white text-[22px] md:text-[26px] leading-none">
                    {home.comingSoon}
                  </div>
                  <div className="mt-1 flex items-center justify-center gap-2">
                    <span className="h-px w-5 bg-[#FFB400]" />
                    <span className="text-white text-[9px] font-bold tracking-[0.22em] uppercase">
                      {home.stayTuned}
                    </span>
                    <span className="h-px w-5 bg-[#FFB400]" />
                  </div>
                </div>
              </div>
              <Link to="/products" className="bmd-hero-explore self-stretch">
                {home.exploreCta}
                <span>
                  <ArrowRight size={14} />
                </span>
              </Link>
            </motion.div>

            <aside className="bmd-trust-card mt-8 p-5 lg:hidden">
              <ShieldCheck className="text-[#FFB400] mb-3" size={28} />
              <h3 className="text-white text-lg mb-3">{home.trustTitle}</h3>
              <ul className="space-y-1.5 text-white/80 text-sm">
                {(home.trustItems || []).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </aside>
          </div>

          <div className="relative hidden lg:block h-[420px] pointer-events-none">
            <motion.aside
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55, delay: 0.4 }}
              className="bmd-trust-card absolute right-2 top-16 w-[230px] p-5 pointer-events-auto"
            >
              <ShieldCheck className="text-[#FFB400] mb-3" size={28} />
              <h3 className="text-white text-lg mb-3 normal-case tracking-normal" style={{ fontFamily: "'Oswald', sans-serif" }}>
                {home.trustTitle}
              </h3>
              <ul className="space-y-1.5 text-white/80 text-sm">
                {(home.trustItems || []).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </motion.aside>
          </div>
        </div>
      </section>

      <section className="bg-black py-10 md:py-12 border-y border-[#FFB400]/40">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((item, idx) => {
            const Icon = featureIcons[item.icon] || Package;
            return (
              <Reveal key={item.title} delay={idx * 0.08}>
                <div className="text-center px-3 hover:-translate-y-1 transition-transform duration-300">
                  <div className="mx-auto mb-4 w-14 h-14 rounded-full border border-[#FFB400] bg-[#111] flex items-center justify-center">
                    <Icon className="text-[#FFB400]" size={26} strokeWidth={1.6} />
                  </div>
                  <h3 className="text-[#FFB400] text-lg mb-1.5">{item.title}</h3>
                  <p className="text-white/70 text-sm leading-relaxed">{item.text}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="bg-[#fff8e6] py-12 md:py-14">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12">
          <Reveal>
            <p className="text-[#111111] text-[11px] font-bold tracking-[0.28em] uppercase mb-2">
              <span className="text-[#FFB400]">Build My Destiny</span>
            </p>
            <ScrollFillHeading as="h2" theme="light" className="text-2xl md:text-4xl max-w-4xl">
              {home.headline}
            </ScrollFillHeading>
            <p className="mt-4 max-w-3xl text-black/65 text-sm md:text-base leading-relaxed">{home.intro}</p>
            <a
              href={APP_HREF}
              className="inline-flex mt-6 h-11 px-6 items-center bg-[#FFB400] text-black text-[11px] font-extrabold uppercase tracking-[0.16em] hover:bg-[#ffc433] transition-colors"
            >
              {home.primaryCta}
            </a>
          </Reveal>

          <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-5 gap-4">
            {benefits.map((item, idx) => (
              <MaterialCard
                key={item.title}
                image={item.image}
                alt={item.title}
                title={item.title}
                text={item.text}
                delay={idx * 0.07}
              />
            ))}
          </div>
          <p className="mt-8">
            <ScrollFillHeading as="h2" theme="light" className="text-xl md:text-2xl">{home.closing}</ScrollFillHeading>
          </p>
        </div>
      </section>

      <section className="bg-black py-12 md:py-14">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-8">
            <Reveal>
              <p className="text-[#FFB400] text-[11px] font-bold tracking-[0.28em] uppercase mb-2">How it works</p>
              <ScrollFillHeading as="h2" theme="dark" className="text-2xl md:text-4xl">
                {howMantra}
              </ScrollFillHeading>
            </Reveal>
            <Link to="/how-it-works" className="text-white text-xs font-bold uppercase tracking-[0.18em] hover:text-[#FFB400]">
              See the full flow →
            </Link>
          </div>
          <div className="grid md:grid-cols-5 gap-4">
            {howSteps.map((step, idx) => (
              <MaterialCard
                key={step.n}
                image={step.image}
                alt={step.title}
                n={step.n}
                title={step.title}
                text={step.text}
                variant="dark"
                delay={idx * 0.07}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#fff8e6] py-12 md:py-14">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-8">
            <Reveal>
              <p className="text-black/50 text-[11px] font-bold tracking-[0.28em] uppercase mb-2">Products</p>
              <ScrollFillHeading as="h2" theme="light" className="text-2xl md:text-4xl">
                {materials.title}
              </ScrollFillHeading>
            </Reveal>
            <Link to="/products" className="text-black text-xs font-bold uppercase tracking-[0.18em] hover:text-[#FFB400]">
              View materials →
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {materials.categories.slice(0, 5).map((cat, idx) => (
              <ImageTile
                key={cat.name}
                to="/products"
                image={cat.image}
                name={cat.name}
                delay={idx * 0.06}
                darkLabel={idx % 2 === 1}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-black py-12 md:py-14">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 grid lg:grid-cols-[1.2fr_0.8fr] gap-8 items-center">
          <div>
            <p className="text-[#FFB400] text-[11px] font-bold tracking-[0.28em] uppercase mb-2">The App</p>
            <ScrollFillHeading as="h2" theme="dark" className="text-2xl md:text-4xl max-w-3xl">
              {appSection.title}
            </ScrollFillHeading>
            <p className="mt-4 max-w-2xl text-white/70 text-sm leading-relaxed">{appSection.body}</p>
            <p className="mt-3 text-white font-semibold text-sm">{appSection.steps}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={APP_HREF} className="h-11 px-5 inline-flex items-center bg-[#FFB400] text-black text-[11px] font-extrabold uppercase tracking-[0.14em]">
                Order Now
              </a>
              <a href={APP_HREF} className="h-11 px-5 inline-flex items-center border border-white text-white text-[11px] font-extrabold uppercase tracking-[0.14em]">
                Open App
              </a>
              <a href={APP_HREF} className="h-11 px-5 inline-flex items-center border border-[#FFB400] text-[#FFB400] text-[11px] font-extrabold uppercase tracking-[0.14em]">
                Download App
              </a>
            </div>
          </div>
          <div className="bg-white p-5 w-full max-w-xs mx-auto text-center border border-white/10">
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrUrl)}`}
              alt="App QR code"
              className="w-36 h-36 mx-auto"
            />
            <p className="mt-3 text-black text-[11px] font-bold uppercase tracking-[0.16em]">{appSection.qr}</p>
          </div>
        </div>
      </section>

      <section id="notify" className="bmd-blueprint relative py-12 md:py-14">
        <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
          <Reveal>
            <p className="text-[12px] font-semibold tracking-[0.2em] uppercase text-black/70">{notify.eyebrow}</p>
            <ScrollFillHeading as="h2" theme="light" className="text-3xl md:text-5xl mt-2">
              {notify.titleBefore} <span className="bmd-accent">{notify.titleAccent}</span> {notify.titleAfter}
            </ScrollFillHeading>
            <p className="mt-3 text-black/70 text-sm">{notify.subtitle}</p>
            <div className="mt-6 relative max-w-2xl mx-auto pb-8">
              <NotifyForm />
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
};

export default Home;
