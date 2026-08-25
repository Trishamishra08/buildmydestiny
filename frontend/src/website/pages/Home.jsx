import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Package, Award, Truck, Headphones } from 'lucide-react';
import HazardStripe from '../components/HazardStripe';
import NotifyForm from '../components/NotifyForm';
import Reveal from '../components/Reveal';
import ScrollFillHeading from '../components/ScrollFillHeading';
import { useWebsiteContent } from '../cms';
import { APP_HREF } from '../data/content';
import { getGsap } from '../lib/gsapScroll';

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

  useLayoutEffect(() => {
    const section = heroRef.current;
    if (!section) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      section.querySelectorAll('[data-parallax]').forEach((el) => {
        const y = Number(el.getAttribute('data-parallax')) || 60;
        gsap.fromTo(
          el,
          { y: 0 },
          {
            y,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top top',
              end: 'bottom top',
              scrub: 1.1,
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, [heroImages]);

  const collage = heroImages?.collage || [];

  return (
    <div>
      <section ref={heroRef} className="relative min-h-screen lg:min-h-[110vh] overflow-hidden bg-black">
        <motion.img
          src={heroImages?.background || '/website/hero-site.jpg'}
          alt="Construction site"
          className="absolute inset-0 w-full h-full object-cover object-center"
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/88 via-black/58 to-black/28" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/15" />

        <div className="relative max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 pt-28 md:pt-36 pb-16 grid lg:grid-cols-[1.05fr_0.95fr] gap-10 items-center min-h-screen lg:min-h-[110vh]">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 mb-4"
            >
              <span className="text-white text-[13px] md:text-[15px] font-semibold tracking-[0.2em] uppercase">
                {home.eyebrow}
              </span>
              <span className="h-[3px] bg-[#FFB400] bmd-pulse-line" />
            </motion.div>

            <ScrollFillHeading
              as="h1"
              variant="hero"
              triggerRef={heroRef}
              className="bmd-stamp text-[56px] sm:text-[72px] md:text-[92px] lg:text-[108px] leading-[0.86]"
            >
              <span className="block">{home.title?.[0]}</span>
              <span className="block">{home.title?.[1]}</span>
              <span className="block text-[36px] sm:text-[48px] md:text-[58px] mt-1">{home.title?.[2]}</span>
            </ScrollFillHeading>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.32 }}
              className="mt-6 max-w-lg text-white/90 text-[15px] md:text-[17px] leading-relaxed font-medium"
            >
              {home.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="relative mt-8 inline-block min-w-[280px] bg-black px-8 py-6"
            >
              <HazardStripe thin className="absolute left-0 right-0 top-0 h-[10px] bmd-hazard-animated" />
              <HazardStripe thin className="absolute left-0 right-0 bottom-0 h-[10px] bmd-hazard-animated" />
              <div className="bmd-display text-white text-[42px] md:text-[52px] leading-none text-center">
                {home.comingSoon}
              </div>
              <div className="mt-2 flex items-center justify-center gap-3">
                <span className="h-px w-8 bg-[#FFB400]" />
                <span className="text-[#FFB400] text-[12px] font-bold tracking-[0.28em] uppercase">
                  {home.stayTuned}
                </span>
                <span className="h-px w-8 bg-[#FFB400]" />
              </div>
            </motion.div>
          </div>

          <div className="relative hidden lg:block h-[560px]">
            {collage[0] && (
              <div data-parallax="-80" className="absolute left-4 top-6 will-change-transform">
                <motion.img
                  src={collage[0].src}
                  alt={collage[0].alt}
                  className="w-56 h-44 object-cover shadow-2xl border-[3px] border-white/90"
                  initial={{ opacity: 0, x: 30, rotate: -7 }}
                  animate={{ opacity: 1, x: 0, rotate: -7 }}
                  transition={{ delay: 0.2 }}
                />
              </div>
            )}
            {collage[1] && (
              <div data-parallax="70" className="absolute right-4 top-16 will-change-transform">
                <motion.img
                  src={collage[1].src}
                  alt={collage[1].alt}
                  className="w-52 h-40 object-cover shadow-2xl border-[3px] border-white/90"
                  initial={{ opacity: 0, x: 30, rotate: 6 }}
                  animate={{ opacity: 1, x: 0, rotate: 6 }}
                  transition={{ delay: 0.32 }}
                />
              </div>
            )}
            {collage[2] && (
              <div data-parallax="-55" className="absolute left-16 bottom-20 will-change-transform">
                <motion.img
                  src={collage[2].src}
                  alt={collage[2].alt}
                  className="w-48 h-36 object-cover shadow-2xl border-[3px] border-white/90"
                  initial={{ opacity: 0, y: 24, rotate: 4 }}
                  animate={{ opacity: 1, y: 0, rotate: 4 }}
                  transition={{ delay: 0.44 }}
                />
              </div>
            )}
            {collage[3] && (
              <div data-parallax="65" className="absolute right-16 bottom-24 will-change-transform">
                <motion.img
                  src={collage[3].src}
                  alt={collage[3].alt}
                  className="w-44 h-36 object-cover shadow-2xl border-[3px] border-white/90"
                  initial={{ opacity: 0, y: 24, rotate: -5 }}
                  animate={{ opacity: 1, y: 0, rotate: -5 }}
                  transition={{ delay: 0.52 }}
                />
              </div>
            )}
            <div data-parallax="-40" className="absolute right-6 bottom-2 will-change-transform">
              <motion.img
                src={heroImages?.circle || '/website/hardhat.jpg'}
                alt="Site highlight"
                className="w-36 h-36 object-cover rounded-full shadow-2xl border-[5px] border-[#FFB400]"
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, type: 'spring', stiffness: 160 }}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#111111] py-10 md:py-12">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((item, idx) => {
            const Icon = featureIcons[item.icon] || Package;
            return (
              <Reveal key={item.title} delay={idx * 0.08}>
                <div className="text-center px-3 hover:-translate-y-1 transition-transform duration-300">
                  <div className="mx-auto mb-4 w-14 h-14 rounded-full border border-[#FFB400]/40 flex items-center justify-center">
                    <Icon className="text-[#FFB400]" size={26} strokeWidth={1.6} />
                  </div>
                  <h3 className="text-white text-lg mb-1.5">{item.title}</h3>
                  <p className="text-white/70 text-sm leading-relaxed">{item.text}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="bg-[#0b0b0b] py-12 md:py-14">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12">
          <Reveal>
            <p className="text-[#FFB400] text-[11px] font-bold tracking-[0.28em] uppercase mb-2">Build My Destiny</p>
            <ScrollFillHeading as="h2" className="text-2xl md:text-4xl max-w-4xl">
              {home.headline}
            </ScrollFillHeading>
            <p className="mt-4 max-w-3xl text-white/70 text-sm md:text-base leading-relaxed">{home.intro}</p>
            <a
              href={APP_HREF}
              className="inline-flex mt-6 h-11 px-6 items-center bg-[#FFB400] text-black text-[11px] font-extrabold uppercase tracking-[0.16em] hover:bg-[#ffc433] transition-colors"
            >
              {home.primaryCta}
            </a>
          </Reveal>

          <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-5 gap-4">
            {benefits.map((item, idx) => (
              <Reveal key={item.title} delay={idx * 0.06}>
                <div className="border border-white/10 p-4 h-full hover:border-[#FFB400]/50 transition-colors">
                  <div className="w-7 h-[3px] bg-[#FFB400] mb-3" />
                  <h3 className="text-white text-base mb-1.5 normal-case tracking-normal" style={{ fontFamily: "'Oswald', sans-serif" }}>
                    {item.title}
                  </h3>
                  <p className="text-white/65 text-sm leading-relaxed">{item.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="mt-8">
            <ScrollFillHeading as="h2" className="text-xl md:text-2xl">{home.closing}</ScrollFillHeading>
          </p>
        </div>
      </section>

      <section className="bg-black py-12 md:py-14">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-8">
            <Reveal>
              <p className="text-[#FFB400] text-[11px] font-bold tracking-[0.28em] uppercase mb-2">How it works</p>
              <ScrollFillHeading as="h2" className="text-2xl md:text-4xl">
                {howMantra}
              </ScrollFillHeading>
            </Reveal>
            <Link to="/how-it-works" className="text-[#FFB400] text-xs font-bold uppercase tracking-[0.18em]">
              See the full flow →
            </Link>
          </div>
          <div className="grid md:grid-cols-5 gap-4">
            {howSteps.map((step, idx) => (
              <Reveal key={step.n} delay={idx * 0.07}>
                <div className="bg-[#111111] p-4 border-t-2 border-[#FFB400] h-full hover:-translate-y-1 transition-transform duration-300">
                  <div className="text-[#FFB400] text-xl mb-2" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                    {step.n}
                  </div>
                  <h3 className="text-white text-lg mb-1.5">{step.title}</h3>
                  <p className="text-white/65 text-sm leading-relaxed">{step.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#111111] py-12 md:py-14">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-8">
            <Reveal>
              <p className="text-[#FFB400] text-[11px] font-bold tracking-[0.28em] uppercase mb-2">Products</p>
              <ScrollFillHeading as="h2" className="text-2xl md:text-4xl">
                {materials.title}
              </ScrollFillHeading>
            </Reveal>
            <Link to="/products" className="text-[#FFB400] text-xs font-bold uppercase tracking-[0.18em]">
              View materials →
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {materials.categories.slice(0, 5).map((cat, idx) => (
              <Reveal key={cat.name} delay={idx * 0.05}>
                <Link to="/products" className="group relative h-36 overflow-hidden block">
                  <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-black/45 group-hover:bg-black/25 transition-colors" />
                  <div className="absolute bottom-3 left-3 right-3 text-white font-bold uppercase tracking-wide text-sm">
                    {cat.name}
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0b0b0b] py-12 md:py-14">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 grid lg:grid-cols-[1.2fr_0.8fr] gap-8 items-center">
          <Reveal>
            <p className="text-[#FFB400] text-[11px] font-bold tracking-[0.28em] uppercase mb-2">The App</p>
            <ScrollFillHeading as="h2" className="text-2xl md:text-4xl max-w-3xl">
              {appSection.title}
            </ScrollFillHeading>
            <p className="mt-4 max-w-2xl text-white/70 text-sm leading-relaxed">{appSection.body}</p>
            <p className="mt-3 text-white font-semibold text-sm">{appSection.steps}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={APP_HREF} className="h-11 px-5 inline-flex items-center bg-[#FFB400] text-black text-[11px] font-extrabold uppercase tracking-[0.14em]">
                Order Now
              </a>
              <a href={APP_HREF} className="h-11 px-5 inline-flex items-center border border-[#FFB400] text-[#FFB400] text-[11px] font-extrabold uppercase tracking-[0.14em]">
                Open App
              </a>
              <a href={APP_HREF} className="h-11 px-5 inline-flex items-center border border-white/20 text-white text-[11px] font-extrabold uppercase tracking-[0.14em]">
                Download App
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="bg-white p-5 w-full max-w-xs mx-auto text-center">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrUrl)}`}
                alt="App QR code"
                className="w-36 h-36 mx-auto"
              />
              <p className="mt-3 text-black text-[11px] font-bold uppercase tracking-[0.16em]">{appSection.qr}</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bmd-blueprint relative py-12 md:py-14">
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
