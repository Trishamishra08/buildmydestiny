import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Package,
  Award,
  Truck,
  Headphones,
  ArrowRight,
  Check,
  LayoutGrid,
  ShieldCheck,
  CirclePlay,
} from 'lucide-react';
import NotifyForm from '../components/NotifyForm';
import ScrollReveal from '../components/ScrollReveal';
import ScrollFillHeading from '../components/ScrollFillHeading';
import CategoryCard from '../components/CategoryCard';
import PlayStorePhoneMockup from '../components/PlayStorePhoneMockup';
import HeroBanner from '../components/HeroBanner';
import { useWebsiteContent } from '../cms';
import { getCategoryHref } from '../lib/categories';

const featureIcons = {
  boxes: Package,
  badge: Award,
  truck: Truck,
  support: Headphones,
  shield: ShieldCheck,
};

const Home = () => {
  const { content } = useWebsiteContent();
  const {
    home,
    features,
    benefits,
    howSteps,
    howMantra,
    materials,
    projects,
    appSection,
    heroImages,
    notify,
    dealers,
    promises,
  } = content;
  const [qrUrl, setQrUrl] = useState('');
  const [heroSearch, setHeroSearch] = useState('');
  const heroRef = useRef(null);

  useEffect(() => {
    setQrUrl(window.location.origin);
  }, []);

  const slides =
    heroImages?.slides?.length
      ? heroImages.slides
      : (materials?.categories || []).slice(0, 4).map((cat) => ({
          src: cat.image,
          alt: cat.name,
        }));

  const handleHeroSearch = (e) => {
    e.preventDefault();
    window.location.href = `/products${heroSearch ? `?q=${encodeURIComponent(heroSearch)}` : ''}`;
  };

  const popularSearches = (materials?.categories || []).slice(0, 5).map((c) => c.name);

  return (
    <div className="bg-white">
      {/* Hero banner */}
      <section ref={heroRef} className="relative overflow-hidden bmd-hero-section">
        <div className="absolute inset-0 z-0">
          <HeroBanner slides={slides} minimal />
          <div className="absolute inset-0 bmd-hero-overlay pointer-events-none" />
        </div>

        <div className="relative z-10 max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 py-10 md:py-12 lg:py-14 grid lg:grid-cols-[1.12fr_0.88fr] gap-8 lg:gap-10 items-center min-h-[520px] md:min-h-[560px] lg:min-h-[600px] w-full">
          <div className="flex flex-col justify-center">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 text-[12px] font-semibold tracking-[0.28em] uppercase text-black/70 mb-4"
            >
              <span className="h-[2px] w-8 bg-[#FFB400]" />
              {home.eyebrow}
            </motion.p>

            <ScrollFillHeading
              as="h1"
              variant="hero"
              theme="light"
              triggerRef={heroRef}
              className="text-[34px] sm:text-[42px] md:text-[48px] lg:text-[54px] leading-[1.05] max-w-xl"
            >
              <span className="block">{home.title?.[0]}</span>
              <span className="block bmd-accent">{home.title?.[1]}</span>
              <span className="block">{home.title?.[2]}</span>
            </ScrollFillHeading>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="mt-4 max-w-lg text-black/75 text-[14px] md:text-[15px] leading-relaxed font-medium"
            >
              {home.descriptionBefore ? (
                <>
                  {home.descriptionBefore}
                  <span className="text-[#FFB400] font-semibold">{home.descriptionAccent}</span>
                  {home.descriptionAfter}
                </>
              ) : (
                home.description
              )}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="mt-6 flex flex-wrap items-center gap-3"
            >
              <div className="bmd-coming-soon">
                <div className="bmd-hazard-thin bmd-coming-soon-rail bmd-coming-soon-rail-left bmd-hazard-animated" aria-hidden="true" />
                <div className="bmd-hazard-thin bmd-coming-soon-rail bmd-coming-soon-rail-right bmd-hazard-animated" aria-hidden="true" />
                <div className="bmd-coming-soon-shine" />
                <div className="relative z-[1] text-center px-2">
                  <div className="bmd-display bmd-coming-soon-title text-white text-[18px] md:text-[22px] leading-none">
                    {home.comingSoon}
                  </div>
                  <div className="mt-1 text-white text-[9px] font-bold tracking-[0.22em] uppercase">{home.stayTuned}</div>
                </div>
              </div>
              <Link
                to="/products"
                className="inline-flex items-center gap-2 h-11 px-6 bg-[#FFB400] text-black text-[11px] font-extrabold uppercase tracking-[0.14em] hover:bg-[#ffc433] transition-colors shadow-md"
              >
                {home.exploreCta}
                <ArrowRight size={14} />
              </Link>
              <Link
                to="/how-it-works"
                className="inline-flex items-center gap-2 h-11 px-5 border-2 border-black/75 text-black text-[10px] font-extrabold uppercase tracking-[0.12em] hover:border-[#FFB400] hover:text-[#FFB400] transition-colors bg-white/50 backdrop-blur-sm"
              >
                <CirclePlay size={16} className="text-[#FFB400]" />
                How It Works
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.35 }}
              className="mt-8 md:mt-10 grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 bmd-hero-inline-features"
            >
              {features.map((item) => {
                const Icon = featureIcons[item.icon] || Package;
                return (
                  <div key={item.title} className="flex items-start gap-2 min-w-0">
                    <div className="w-9 h-9 shrink-0 rounded-full border-2 border-[#FFB400] bg-white/85 flex items-center justify-center shadow-sm">
                      <Icon className="text-[#FFB400]" size={16} strokeWidth={2} />
                    </div>
                    <div className="min-w-0 pt-0.5">
                      <p className="text-[10px] md:text-[11px] font-bold text-black leading-tight uppercase tracking-wide">
                        {item.title}
                      </p>
                      <p className="text-[9px] md:text-[10px] text-black/55 leading-snug mt-0.5 line-clamp-2">
                        {item.text}
                      </p>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, delay: 0.3 }}
            className="bmd-hero-search-card rounded-xl p-5 md:p-6 lg:p-7 shadow-2xl lg:ml-auto w-full max-w-[420px]"
          >
            <h3 className="text-[#FFB400] text-sm md:text-base font-extrabold uppercase tracking-wide leading-snug" style={{ fontFamily: "'Oswald', sans-serif" }}>
              {home.trustTitle}
            </h3>
            <p className="mt-2 text-white/75 text-[11px] md:text-xs leading-relaxed">
              {home.intro}
            </p>

            <div className="mt-4 grid grid-cols-3 gap-2">
              {features.slice(0, 3).map((item) => {
                const Icon = featureIcons[item.icon] || Package;
                return (
                  <div key={item.title} className="text-center">
                    <div className="w-8 h-8 mx-auto rounded-full border border-[#FFB400]/50 flex items-center justify-center bg-white/5">
                      <Icon className="text-[#FFB400]" size={14} />
                    </div>
                    <p className="mt-1.5 text-[8px] md:text-[9px] text-white/80 font-semibold leading-tight uppercase">
                      {item.title}
                    </p>
                  </div>
                );
              })}
            </div>

            <form onSubmit={handleHeroSearch} className="mt-5">
              <div className="flex rounded-md overflow-hidden shadow-sm">
                <input
                  type="text"
                  value={heroSearch}
                  onChange={(e) => setHeroSearch(e.target.value)}
                  placeholder="What are you looking for?"
                  className="flex-1 px-4 py-3 bg-white text-black placeholder:text-black/40 text-sm outline-none min-w-0"
                />
                <button type="submit" className="px-4 bg-[#FFB400] text-black text-[10px] font-extrabold uppercase tracking-wider hover:bg-[#ffc433] transition-colors shrink-0">
                  Search
                </button>
              </div>
            </form>

            {popularSearches.length > 0 && (
              <div className="mt-4">
                <p className="text-white/45 text-[10px] font-semibold uppercase tracking-wider mb-2">Popular Searches:</p>
                <div className="flex flex-wrap gap-1.5">
                  {popularSearches.map((tag) => (
                    <Link
                      key={tag}
                      to={getCategoryHref(tag)}
                      className="px-2.5 py-1 rounded border border-white/25 text-white/85 text-[10px] font-medium hover:border-[#FFB400] hover:text-[#FFB400] transition-colors"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Materials grid */}
      <section className="bg-white bmd-section-tight">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12">
          <div className="text-center mb-3 md:mb-4">
            <div className="inline-flex items-center gap-2 justify-center">
              <span className="h-px w-6 bg-[#FFB400] hidden sm:block" aria-hidden="true" />
              <ScrollFillHeading
                as="h2"
                theme="light"
                className="text-lg md:text-xl font-extrabold uppercase text-black"
                style={{ fontFamily: "'Oswald', sans-serif" }}
              >
                {materials.title}
              </ScrollFillHeading>
              <span className="h-px w-6 bg-[#FFB400] hidden sm:block" aria-hidden="true" />
            </div>
            <p className="mt-1 text-black/55 text-xs md:text-sm">{materials.intro}</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-2.5">
            {materials.categories.slice(0, 8).map((cat, idx) => (
              <CategoryCard key={cat.name} name={cat.name} image={cat.image} stagger={idx * 0.06} compact />
            ))}
            <ScrollReveal stagger={0.48} y={18} scale={0.95}>
              <Link to="/products" className="group flex flex-col items-center justify-center h-full min-h-[6.5rem] bg-[#f8f8f8] border-2 border-dashed border-black/15 rounded-md hover:border-[#FFB400] transition-all py-2.5">
                <div className="w-9 h-9 rounded-md border-2 border-black/20 flex items-center justify-center mb-1 group-hover:border-[#FFB400] transition-colors">
                  <LayoutGrid className="text-black/40 group-hover:text-[#FFB400]" size={18} />
                </div>
                <span className="text-[10px] md:text-[11px] font-bold text-black uppercase text-center px-1">View All Categories</span>
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Why choose + projects stats */}
      <section className="bg-[#f5f5f5] bmd-section-tight">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 grid lg:grid-cols-2 gap-6 lg:gap-10 items-start">
          <div>
            <ScrollFillHeading
              as="h2"
              theme="light"
              className="text-xl md:text-2xl font-extrabold uppercase text-black mb-2"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              {home.headline}
            </ScrollFillHeading>
            <p className="text-black/65 text-sm leading-relaxed mb-4">{home.intro}</p>
            <ul className="space-y-2.5">
              {benefits.map((b, idx) => (
                <ScrollReveal key={b.title} stagger={idx * 0.04} y={14} scale={0.98}>
                  <li className="flex items-start gap-2.5">
                    <span className="shrink-0 w-5 h-5 rounded-full bg-[#FFB400] flex items-center justify-center mt-0.5">
                      <Check className="text-black" size={12} strokeWidth={3} />
                    </span>
                    <div>
                      <span className="text-black font-semibold text-sm">{b.title}</span>
                      <p className="text-black/55 text-xs mt-0.5">{b.text}</p>
                    </div>
                  </li>
                </ScrollReveal>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-2.5 md:gap-3">
            {projects.slice(0, 4).map((p, idx) => (
              <ScrollReveal key={p.title} stagger={idx * 0.07} y={20} scale={0.94}>
                <div className="bg-white border border-black/8 rounded-md p-3.5 hover:border-[#FFB400] transition-colors h-full">
                  <div className="w-8 h-8 mb-2 rounded-full bg-[#FFB400]/15 flex items-center justify-center">
                    <Package className="text-[#FFB400]" size={16} />
                  </div>
                  <h3 className="text-xs font-bold text-black uppercase">{p.title}</h3>
                  <p className="text-black/55 text-[11px] mt-0.5 leading-relaxed">{p.text}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Become a dealer */}
      <section className="bg-white bmd-section-tight">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12">
          <ScrollReveal y={16} scale={0.98}>
            <div className="bg-[#0d1b2a] rounded-lg overflow-hidden grid md:grid-cols-[1fr_1.2fr] items-center">
              <div className="relative h-40 md:h-full min-h-[180px]">
                <img src={dealers.image} alt="" className="absolute inset-0 w-full h-full object-cover object-top" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0d1b2a]/80 md:bg-gradient-to-l" />
              </div>
              <div className="p-5 md:p-7">
                <ScrollFillHeading
                  as="h2"
                  theme="dark"
                  className="text-lg md:text-xl font-extrabold uppercase mb-2"
                  style={{ fontFamily: "'Oswald', sans-serif" }}
                >
                  <span className="bmd-accent">{dealers.title}</span>
                </ScrollFillHeading>
                <p className="text-white/70 text-sm mb-4">{dealers.intro}</p>
                <ul className="grid sm:grid-cols-2 gap-1.5 mb-5">
                  {dealers.benefits.slice(0, 4).map((b) => (
                    <li key={b.title} className="flex items-start gap-2">
                      <Check className="text-[#FFB400] shrink-0 mt-0.5" size={13} />
                      <span className="text-white/80 text-[11px]">{b.title}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/dealers" className="inline-flex items-center gap-2 h-10 px-5 bg-[#FFB400] text-black text-[10px] font-extrabold uppercase tracking-[0.14em] hover:bg-[#ffc433] transition-colors">
                  {dealers.cta}
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* How it works — horizontal flow */}
      <section className="bg-white bmd-section-tight border-t border-black/5">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12">
          <div className="text-center mb-4 md:mb-5">
            <ScrollFillHeading
              as="h2"
              theme="light"
              className="text-xl md:text-2xl font-extrabold uppercase text-black"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              {howMantra}
            </ScrollFillHeading>
          </div>
          <div className="grid lg:grid-cols-[1fr_auto] gap-5 items-start">
            <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-3">
              {howSteps.map((step, idx) => (
                <ScrollReveal key={step.n} stagger={idx * 0.08} y={16} scale={0.95} className="flex md:flex-col items-center gap-2 flex-1">
                  <div className="w-12 h-12 rounded-full border-2 border-[#FFB400] bg-white flex items-center justify-center shrink-0">
                    <span className="text-[#FFB400] text-base font-extrabold" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                      {step.n}
                    </span>
                  </div>
                  <div className="text-center md:mt-1.5">
                    <h3 className="text-xs font-bold uppercase text-black">{step.title}</h3>
                    <p className="text-black/50 text-[10px] mt-0.5 max-w-[110px] mx-auto hidden md:block leading-snug">{step.text}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
            <ScrollReveal stagger={0.35} y={14}>
              <div className="bg-[#fff8e6] border border-[#FFB400]/30 rounded-md p-4 max-w-sm">
                <h4 className="text-[#FFB400] text-[10px] font-extrabold uppercase tracking-wider mb-1.5">Please Note</h4>
                <p className="text-black/65 text-[11px] leading-relaxed">{materials.note}</p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* App promotion */}
      <section className="bg-[#fff8e6] bmd-section-tight">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 grid lg:grid-cols-[0.8fr_1.2fr_0.6fr] gap-5 md:gap-6 items-center">
          <ScrollReveal y={20} scale={0.94}>
            <PlayStorePhoneMockup
              appName={content.brand?.name || 'Build My Destiny'}
              developer={content.brand?.name || 'Build My Destiny'}
              tagline={content.brand?.tagline || appSection.body}
              comingSoon={home.comingSoon}
              screenshots={(materials?.categories || []).slice(0, 4).map((c) => c.image)}
            />
          </ScrollReveal>
          <div>
            <ScrollFillHeading
              as="h2"
              theme="light"
              className="text-xl md:text-2xl font-extrabold uppercase text-black"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              {appSection.title}
            </ScrollFillHeading>
            <p className="mt-2 text-black/55 text-sm leading-relaxed max-w-md">{appSection.body}</p>
            <p className="mt-1.5 text-black/70 text-sm font-medium">{appSection.steps}</p>
            <div className="mt-4 flex flex-wrap gap-2.5">
              <div className="h-9 px-4 inline-flex items-center bg-black text-white text-[10px] font-bold rounded cursor-default select-none">
                {home.primaryCta}
              </div>
              <div className="h-9 px-4 inline-flex items-center border-2 border-black text-black text-[10px] font-bold rounded cursor-default select-none">
                Open App
              </div>
            </div>
            <div className="mt-3 flex flex-wrap gap-2.5">
              {promises.slice(0, 4).map((p) => (
                <span key={p.title} className="flex items-center gap-1.5 text-black/60 text-[11px] font-semibold">
                  <Check className="text-[#FFB400]" size={13} />
                  {p.title}
                </span>
              ))}
            </div>
          </div>
          <ScrollReveal stagger={0.12} y={18} scale={0.95}>
            <div className="bg-white p-4 rounded-md border border-black/10 text-center max-w-[160px] mx-auto">
              <img src={`https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(qrUrl)}`} alt="QR" className="w-28 h-28 mx-auto" />
              <p className="mt-2 text-black text-[9px] font-bold uppercase tracking-wider">{appSection.qr}</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Notify */}
      <section id="notify" className="bmd-blueprint relative py-8 md:py-10">
        <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
          <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-black/70">{notify.eyebrow}</p>
          <ScrollFillHeading
            as="h2"
            theme="light"
            className="text-2xl md:text-4xl mt-1 font-extrabold uppercase"
            style={{ fontFamily: "'Oswald', sans-serif" }}
          >
            {notify.titleBefore}{' '}
            <span className="bmd-accent">{notify.titleAccent}</span>
            {' '}{notify.titleAfter}
          </ScrollFillHeading>
          <ScrollReveal y={14}>
            <p className="mt-2 text-black/70 text-sm">{notify.subtitle}</p>
            <div className="mt-4 max-w-2xl mx-auto pb-4">
              <NotifyForm />
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default Home;
