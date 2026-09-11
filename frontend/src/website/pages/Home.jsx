import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Truck,
  ArrowRight,
  Clock,
  ShoppingCart,
  Building2,
  MoreHorizontal,
  UserRound,
  Handshake,
  ShieldCheck,
  User,
  Search,
  ListChecks,
  ClipboardList,
  Users,
  HardHat,
  LayoutGrid,
  House,
  ShoppingBag,
  Shield,
  Crown,
  Files,
  MousePointerClick,
} from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import ScrollFillHeading from '../components/ScrollFillHeading';
import HeroBanner from '../components/HeroBanner';
import CategoryCard from '../components/CategoryCard';
import PlayStorePhoneMockup from '../components/PlayStorePhoneMockup';
import QrScanCard from '../components/QrScanCard';
import { useWebsiteContent } from '../cms';

/** Exact feature row from reference banner */
const HERO_FEATURES = [
  {
    title: 'Wide Range of Materials',
    text: 'Explore materials for every stage of your project.',
    Icon: Building2,
  },
  {
    title: 'Simple Ordering',
    text: 'Search, choose and place your requirement with ease.',
    Icon: ShoppingCart,
  },
  {
    title: 'Save Time',
    text: 'Spend less time searching and contacting multiple suppliers.',
    Icon: Clock,
  },
  {
    title: 'Delivery to Your Site',
    text: 'Your selected dealer coordinates delivery to your construction site.',
    Icon: Truck,
  },
];

/** Photo banners — autoplay ~2.5s (text is separate HTML overlay) */
const HERO_BANNERS = [
  {
    src: '/website/banner_1.jpg?v=8',
    mobileSrc: '/website/banner_1_m.jpg?v=8',
    alt: 'Construction site materials at sunset',
    theme: 'dark',
    script: ['Stronger Homes,', 'Brighter Futures'],
  },
  {
    src: '/website/banner_2.jpg?v=8',
    mobileSrc: '/website/banner_2_m.jpg?v=8',
    alt: 'Construction materials — rebar, cement, bricks and hard hat',
    theme: 'dark',
    script: ['Materials Today', 'Stronger Tomorrow'],
    lead: 'Quality construction materials. Verified suppliers. A simpler way to build.',
    hideBody: true,
  },
  {
    src: '/website/banner_3.jpg?v=8',
    mobileSrc: '/website/banner_3_m.jpg?v=8',
    alt: 'Construction materials at a building site',
    theme: 'light',
    script: ['From Blueprints', 'to Beautiful Spaces'],
  },
];

const WHY_IMAGE = '/website/why-worker-sunset.jpg';

const WHY_FEATURES = [
  {
    title: 'All in One Place',
    text: 'Discover a wide range of construction materials for different project requirements.',
    Icon: Building2,
  },
  {
    title: 'Save Valuable Time',
    text: 'Reduce the need to contact multiple suppliers and search in different places.',
    Icon: Clock,
  },
  {
    title: 'Easy & Convenient Ordering',
    text: 'Find the materials you need and place your requirement through a simple digital experience.',
    Icon: UserRound,
  },
  {
    title: 'Built for Your Construction Journey',
    text: 'Whether you are building a home or managing a larger project, we make material sourcing easier.',
    Icon: ShieldCheck,
  },
  {
    title: 'Convenient Sourcing',
    text: 'Bring material requirements into one organised journey.',
    Icon: Handshake,
  },
  {
    title: 'Customer First',
    text: 'Your project, requirement and convenience remain at the centre of the experience we are building.',
    Icon: User,
  },
];

const HOW_STEPS = [
  {
    n: '01',
    title: 'Discover What You Need',
    text: 'Explore materials and identify the products and quantities required for your project.',
    Icon: Search,
  },
  {
    n: '02',
    title: 'Share Your Requirement',
    text: 'Select or submit your material requirement through the available Build My Destiny process.',
    Icon: ClipboardList,
  },
  {
    n: '03',
    title: 'Review Your Options',
    text: 'Review relevant material, pricing and supply information available for your requirement.',
    Icon: ListChecks,
  },
  {
    n: '04',
    title: 'Confirm Your Order',
    text: 'The participating dealer reviews the requirement and confirms fulfilment based on availability and delivery feasibility.',
    Icon: Users,
  },
  {
    n: '05',
    title: 'Get It Delivered',
    text: 'Once confirmed, the dealer manages fulfilment and coordinates delivery according to the agreed requirement.',
    Icon: Truck,
  },
  {
    n: '06',
    title: 'Keep Building',
    text: 'Spend less time managing material sourcing and more time focusing on your construction project.',
    Icon: HardHat,
  },
];

const DEALER_POINTS = [
  {
    title: 'Reach More Customers',
    text: 'Showcase your material business to a wider customer base.',
    Icon: Users,
  },
  {
    title: 'Grow Your Business Digitally',
    text: 'Build a stronger digital presence through a modern platform.',
    Icon: ShieldCheck,
  },
  {
    title: 'Showcase Your Products',
    text: 'Present your construction materials and offerings to potential customers.',
    Icon: ClipboardList,
  },
  {
    title: 'Keep Control of Your Operations',
    text: 'Continue managing your own stock, fulfilment and delivery operations.',
    Icon: LayoutGrid,
  },
  {
    title: 'Be Part of a Growing Network',
    text: 'Join a platform built to create more opportunities for construction-material businesses.',
    Icon: Handshake,
  },
];

const PROMISE_IMAGE = '/website/promise-worker.jpg';
const PROMISE_IMAGE_MOBILE = '/website/promise-worker-m.jpg';
const DEALER_IMAGE = '/website/dealer-worker.jpg';

const APP_HIGHLIGHTS = [
  { text: 'Explore a range of materials', Icon: LayoutGrid },
  { text: 'Share your requirement', Icon: ClipboardList },
  { text: 'Get quotes and compare options', Icon: ListChecks },
  { text: 'Track your order', Icon: Clock },
  { text: 'Stay connected with your dealer', Icon: Handshake },
];

const PROMISE_CARDS = [
  {
    title: 'Convenience',
    text: 'A simpler way to discover and order construction materials.',
    Icon: ShoppingBag,
  },
  {
    title: 'Trusted Dealer Network',
    text: 'Connect with a growing network of participating dealers.',
    Icon: Shield,
  },
  {
    title: 'Clear & Organised Information',
    text: 'Access product and requirement information in a more convenient and structured way.',
    Icon: Files,
  },
  {
    title: 'Delivery to Your Site',
    text: 'The selected dealer coordinates delivery based on the confirmed order.',
    Icon: MousePointerClick,
  },
  {
    title: 'Customer-First Approach',
    text: 'We are continuously working to make your material journey easier and better.',
    Icon: Crown,
  },
];

const APP_STEP_ITEMS = ['Search', 'Choose', 'Order', 'Dealer Delivers'];

const StoreButtons = () => (
  <div className="bmd-store-stack">
    <div className="bmd-store-btn">
      <svg viewBox="0 0 24 24" className="w-6 h-6" aria-hidden="true">
        <path fill="#34A853" d="M3 20.5V3.5c0-.59.34-1.11.84-1.35L13.69 12 3.84 21.85c-.5-.24-.84-.76-.84-1.35Z" />
        <path fill="#4285F4" d="M16.81 15.12 6.05 21.34l8.49-8.49 2.27 2.27Z" />
        <path fill="#FBBC04" d="M6.05 2.66 16.81 8.88 14.54 11.15 6.05 2.66Z" />
        <path fill="#EA4335" d="M20.16 10.81c.34.27.59.69.59 1.19s-.22.9-.57 1.18L17.89 14.5 15.39 12l2.5-2.5 2.27 1.31Z" />
      </svg>
      <div className="leading-tight text-left">
        <div className="text-[8px] text-white/55 uppercase tracking-wide">Get it on</div>
        <div className="text-[13px] font-bold text-white">Google Play</div>
      </div>
    </div>
    <div className="bmd-store-btn">
      <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white" aria-hidden="true">
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 15.9 2.94 10.4 5.5 6.9c1.26-1.73 3.3-2.81 5.25-2.81 1.3 0 2.52.87 3.29.87.76 0 2.25-1.05 3.9-.87.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.4 2.88M13 3.5c.73-.83 1.22-2 1.09-3.15-1.05.04-2.32.7-3.07 1.57-.66.78-1.25 2.03-1.1 3.22 1.16.09 2.35-.59 3.08-1.64Z" />
      </svg>
      <div className="leading-tight text-left">
        <div className="text-[8px] text-white/55 uppercase tracking-wide">Download on the</div>
        <div className="text-[13px] font-bold text-white">App Store</div>
      </div>
    </div>
  </div>
);

const AUDIENCE_CARDS = [
  {
    title: 'For Homeowners',
    text: 'Build your home with a simpler material-sourcing journey.',
    image: '/website/audience-homeowners.jpg?v=8',
    Icon: House,
  },
  {
    title: 'For Contractors',
    text: 'Make regular material procurement easier to organise and manage.',
    image: '/website/audience-contractors.jpg?v=8',
    Icon: HardHat,
  },
  {
    title: 'For Builders & Developers',
    text: 'Support project requirements with a more connected material-sourcing experience.',
    image: '/website/audience-builders.jpg?v=8',
    Icon: Building2,
  },
  {
    title: 'For Construction Professionals',
    text: 'A straightforward way to connect material requirements with available supply options.',
    image: '/website/audience-construction.jpg?v=8',
    Icon: HardHat,
  },
];

const Home = () => {
  const { content } = useWebsiteContent();
  const {
    home,
    materials,
    appSection,
  } = content;
  const [qrUrl, setQrUrl] = useState('');
  const [heroSlide, setHeroSlide] = useState(0);
  const heroRef = useRef(null);
  const activeBanner = HERO_BANNERS[heroSlide] || HERO_BANNERS[0];
  const isLightHero = activeBanner?.theme === 'light';
  const scriptLines = activeBanner?.script || ['Stronger Homes,', 'Brighter Futures'];

  useEffect(() => {
    setQrUrl(window.location.origin);
  }, []);

  // Hard guarantee on open/refresh: start at hero (hash jumps handled in ScrollToTop)
  useEffect(() => {
    if (window.location.hash) return;
    const goTop = () => {
      if (window.lenis) window.lenis.scrollTo(0, { immediate: true });
      window.scrollTo(0, 0);
    };
    goTop();
    const t = window.setTimeout(goTop, 120);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <div className="bg-white overflow-x-clip">
      {/* Hero — clean photo carousel + separate HTML text overlay */}
      <section
        ref={heroRef}
        className={`relative overflow-x-clip overflow-y-hidden bmd-hero-section bmd-hero-section--overlay flex flex-col${
          isLightHero ? ' bmd-hero-section--light' : ' bmd-hero-section--dark'
        }`}
      >
        <div className="absolute inset-0 z-0">
          <HeroBanner
            slides={HERO_BANNERS}
            delay={2500}
            onSlideChange={setHeroSlide}
          />
          <div className="absolute inset-0 bmd-hero-overlay pointer-events-none" />
        </div>

        <motion.div
          key={`script-${heroSlide}`}
          initial={{ opacity: 0, y: 10, rotate: -6 }}
          animate={{ opacity: 1, y: 0, rotate: -8 }}
          transition={{ duration: 0.5, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          className={`bmd-hero-script${isLightHero ? ' bmd-hero-script--on-light' : ''}`}
          aria-hidden="true"
        >
          {scriptLines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
          <span className="bmd-hero-script__stroke" />
        </motion.div>

        <div className="relative z-10 flex-1 max-w-[1440px] mx-auto px-4 sm:px-6 md:px-10 lg:px-14 xl:px-16 w-full flex flex-col justify-center py-3 md:py-7 min-w-0 pointer-events-none bmd-hero-copy">
          <div className="max-w-3xl min-w-0">
            <motion.div
              key={`eyebrow-${heroSlide}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="bmd-hero-eyebrow"
            >
              <span className="bmd-hero-eyebrow__line" aria-hidden="true" />
              <span>Build Material Sourcing Platform</span>
            </motion.div>

            <ScrollFillHeading
              as="h1"
              variant="hero"
              theme={isLightHero ? 'light' : 'dark'}
              triggerRef={heroRef}
              className={`bmd-type-h1 bmd-hero-title mt-1.5 md:mt-3 ${
                isLightHero ? 'text-black' : 'text-white'
              }`}
            >
              <span className="block">Build Your Dream.</span>
              <span className="block bmd-accent">We&apos;ll Help You</span>
              <span className="block">Build It Right.</span>
            </ScrollFillHeading>

            <motion.p
              key={`lead-${heroSlide}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.45 }}
              className={`bmd-type-lead mt-1.5 md:mt-3 ${isLightHero ? 'text-black' : 'text-white'}`}
            >
              {activeBanner?.lead ||
                'Everything you need to source building materials, made simpler.'}
            </motion.p>

            {activeBanner?.hideBody ? null : (
              <motion.p
                key={`body-${heroSlide}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.52 }}
                className={`bmd-type-body mt-1.5 max-w-xl bmd-hero-body ${
                  isLightHero ? 'text-black/70' : 'text-white/90'
                }`}
              >
                From cement and TMT steel to bricks, aggregates and other construction essentials,
                Build My Destiny helps you discover material options, compare what fits your project
                and place your requirement through one simple platform.
              </motion.p>
            )}

            <motion.div
              key={`cta-${heroSlide}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.58 }}
              className="mt-3 md:mt-5 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-2 sm:gap-3 pointer-events-auto bmd-hero-cta"
            >
              <Link to="/contact" className="bmd-hero-btn bmd-hero-btn--primary">
                Get a Quote
                <ArrowRight size={15} strokeWidth={2.5} className="bmd-hero-btn__icon" />
              </Link>
              <Link
                to="/products"
                className={`bmd-hero-btn ${
                  isLightHero ? 'bmd-hero-btn--ghost-dark' : 'bmd-hero-btn--ghost'
                }`}
              >
                Explore Materials
                <ArrowRight size={15} strokeWidth={2.5} className="bmd-hero-btn__icon" />
              </Link>
            </motion.div>
          </div>
        </div>

        <div className="relative z-10 w-full bmd-hero-features-bar shrink-0 pointer-events-none">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-10 lg:px-14 xl:px-16 py-2 md:py-4">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5 bmd-hero-features-grid">
              {HERO_FEATURES.map((item, idx) => {
                const Icon = item.Icon;
                return (
                  <motion.div
                    key={`${item.title}-${heroSlide}`}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.62 + idx * 0.06, duration: 0.35 }}
                    className="bmd-hero-feature"
                  >
                    <Icon
                      className={`shrink-0 mt-0.5 ${
                        isLightHero ? 'text-[#E6A000]' : 'text-[#FFB400]'
                      }`}
                      size={26}
                      strokeWidth={1.6}
                    />
                    <div className="min-w-0">
                      <p
                        className={`bmd-type-h3 ${
                          isLightHero ? 'text-black' : 'text-white'
                        }`}
                      >
                        {item.title}
                      </p>
                      <p
                        className={`bmd-type-caption mt-1 bmd-hero-feature__text ${
                          isLightHero ? 'text-black/55' : 'text-white/65'
                        }`}
                      >
                        {item.text}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* All Materials */}
      <section id="materials" className="bg-white pt-4 pb-4 md:pt-8 md:pb-8">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12">
          <div className="text-center mb-3 md:mb-5">
            <div className="flex items-center justify-center gap-3 mb-2">
              <span className="w-8 h-[2px] bg-[#FFB400]" />
              <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#FFB400]">
                All Materials
              </span>
              <span className="w-8 h-[2px] bg-[#FFB400]" />
            </div>
            <ScrollFillHeading as="h2" theme="light" className="bmd-type-h2 text-black max-w-3xl mx-auto">
              Everything You Need for Your Construction Project.
            </ScrollFillHeading>
            <p className="mt-2 text-black/50 text-sm max-w-2xl mx-auto leading-relaxed">
              {materials.intro ||
                'From the foundation to the finishing stage, discover a growing range of construction materials in one convenient place.'}
            </p>
            {materials.note ? (
              <p className="mt-1.5 text-black/40 text-[11px] max-w-2xl mx-auto leading-relaxed">
                {materials.note}
              </p>
            ) : null}
          </div>
          <div className="grid grid-cols-3 md:grid-cols-5 xl:grid-cols-9 gap-2.5 md:gap-3">
            {materials.categories.slice(0, 8).map((cat, idx) => (
              <CategoryCard
                key={cat.name}
                name={cat.name}
                image={cat.image}
                stagger={idx * 0.04}
                variant="catalog"
              />
            ))}
            <ScrollReveal stagger={0.35} y={16} scale={0.96}>
              <Link
                to="/products"
                className="bmd-material-tile flex flex-col items-center justify-center h-full py-4"
              >
                <MoreHorizontal className="text-black/35 mb-1.5" size={22} strokeWidth={1.75} />
                <span className="text-[12px] font-semibold text-black text-center px-1 leading-snug">
                  More Construction Materials
                </span>
                <span className="mt-1.5 w-6 h-[2px] bg-[#FFB400]" />
              </Link>
            </ScrollReveal>
          </div>
          <div className="mt-5 md:mt-6 text-center">
            <a
              href="#app"
              className="bmd-type-btn inline-flex h-11 px-6 items-center gap-2 bg-[#FFB400] text-black hover:bg-[#ffc433] transition-colors rounded-md"
            >
              Explore All Materials on the App
              <ArrowRight size={15} strokeWidth={2.5} />
            </a>
          </div>
        </div>
      </section>

      {/* Why Build My Destiny */}
      <section id="why" className="bmd-why-section py-4 md:py-6">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-4 lg:gap-10 items-start">
            <div className="bmd-why-intro">
              <div className="bmd-why-copy">
                <div className="flex items-center gap-3 mb-2">
                  <span className="w-8 h-[2px] bg-[#FFB400]" />
                  <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-black">
                    Why Build My Destiny?
                  </span>
                </div>
                <ScrollFillHeading as="h2" theme="light" className="bmd-type-h2 text-black">
                  Everything You Need to Build.
                  <span className="block">One Simpler Way.</span>
                </ScrollFillHeading>
                <p className="mt-2.5 text-[#4a4a4a] text-[13px] leading-relaxed">
                  Finding the right construction materials can take time and effort. Build My Destiny
                  is designed to make the process simpler by bringing material discovery, ordering and
                  dealer connections together in one convenient platform.
                </p>
                <Link
                  to="/about"
                  className="bmd-type-btn mt-4 inline-flex w-fit h-10 px-5 items-center gap-2 bg-black text-white hover:bg-black/85 transition-colors rounded-md"
                >
                  Learn More
                  <ArrowRight size={14} strokeWidth={2.5} />
                </Link>
              </div>
              <div className="bmd-why-photo">
                <img
                  src={WHY_IMAGE}
                  alt="Construction worker looking over a site at sunrise"
                />
                <span className="bmd-why-photo-fade" aria-hidden="true" />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-x-4 gap-y-3 md:gap-x-6 md:gap-y-5">
              {WHY_FEATURES.map((item, idx) => {
                const Icon = item.Icon;
                return (
                  <ScrollReveal key={item.title} stagger={idx * 0.04} y={10} className="flex items-start gap-2.5">
                    <span className="bmd-why-icon shrink-0">
                      <Icon size={16} strokeWidth={1.7} />
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-[13px] font-semibold text-black leading-snug">{item.title}</h3>
                      <p className="mt-0.5 text-[12px] text-[#5a5a5a] leading-snug">{item.text}</p>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="bg-white py-4 md:py-8">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12">
          <div className="text-center mb-3.5 md:mb-6">
            <div className="flex items-center justify-center gap-3 mb-2">
              <span className="w-8 h-[2px] bg-[#FFB400]" />
              <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-black">
                How It Works
              </span>
              <span className="w-8 h-[2px] bg-[#FFB400]" />
            </div>
            <ScrollFillHeading as="h2" theme="light" className="bmd-type-h2 text-black">
              Simple From Requirement to Delivery.
            </ScrollFillHeading>
          </div>

          <div className="bmd-how-track relative grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4 lg:gap-3">
            {HOW_STEPS.map((step, idx) => {
              const Icon = step.Icon;
              return (
                <ScrollReveal key={step.n} stagger={idx * 0.04} y={12} className="relative text-center px-1">
                  <div className="bmd-how-icon mx-auto">
                    <span className="bmd-how-badge">{step.n}</span>
                    <Icon size={22} strokeWidth={1.6} />
                  </div>
                  <h3 className="mt-2.5 text-[12px] md:text-[13px] font-semibold text-black leading-snug">
                    {step.title}
                  </h3>
                  <p className="mt-1 text-[11px] text-black/50 leading-snug max-w-[150px] mx-auto">
                    {step.text}
                  </p>
                </ScrollReveal>
              );
            })}
          </div>

          <div className="mt-4 md:mt-6 text-center">
            <Link
              to="/contact"
              className="bmd-type-btn inline-flex h-11 px-6 items-center gap-2 bg-[#FFB400] text-black hover:bg-[#ffc433] transition-colors rounded-md"
            >
              Start Your Requirement
              <ArrowRight size={15} strokeWidth={2.5} />
            </Link>
          </div>
        </div>
      </section>

      {/* Become a dealer */}
      <section id="dealers" className="bmd-dealer-section">
        <div className="bmd-dealer-inner">
          <div className="bmd-dealer-copy">
            <div className="flex items-center gap-3 mb-2">
              <span className="w-7 h-[2px] bg-[#FFB400]" />
              <span className="bmd-type-footer-h text-white/90">
                Become a Dealer
              </span>
            </div>
            <h2 className="bmd-dealer-heading text-white max-w-full">
              Grow Your Construction-Material Business with Build My Destiny.
            </h2>
            <p className="bmd-dealer-lead mt-2 text-white/70 max-w-full md:max-w-[320px]">
              Join a growing platform designed to help construction-material businesses reach more
              customers and explore new opportunities.
            </p>
            <div className="mt-3 w-full sm:w-fit">
              <Link
                to="/dealers"
                className="bmd-type-btn inline-flex h-9 px-4 items-center justify-center gap-1.5 bg-[#FFB400] text-black hover:bg-[#ffc433] transition-colors rounded-md w-full sm:w-auto"
              >
                Join as a Dealer
                <ArrowRight size={14} strokeWidth={2.5} />
              </Link>
            </div>
          </div>

          <div className="bmd-dealer-points">
            {DEALER_POINTS.map((item) => {
              const Icon = item.Icon;
              return (
                <div key={item.title} className="bmd-dealer-point">
                  <Icon className="text-[#FFB400] mx-auto" size={18} strokeWidth={1.55} />
                  <h3 className="bmd-dealer-point__title">
                    {item.title}
                  </h3>
                  <p className="bmd-dealer-point__text">
                    {item.text}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="bmd-dealer-photo">
            <img src={`${DEALER_IMAGE}?v=2`} alt="Build My Destiny dealer" />
          </div>
        </div>
      </section>

      {/* Audience — For Every Kind of Builder */}
      <section id="audience" className="bg-[#f2f2f2] py-4 md:py-8">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12">
          <div className="text-center mb-3.5 md:mb-6">
            <div className="flex items-center justify-center gap-3 mb-2">
              <span className="w-8 h-[2px] bg-[#FFB400]" />
              <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-black">
                For Every Kind of Builder
              </span>
              <span className="w-8 h-[2px] bg-[#FFB400]" />
            </div>
            <ScrollFillHeading as="h2" theme="light" className="bmd-type-h2 text-black text-center mx-auto">
              One Platform. Different Construction Needs.
            </ScrollFillHeading>
          </div>
          <div className="bmd-audience-grid">
            {AUDIENCE_CARDS.map((card, idx) => {
              const Icon = card.Icon;
              return (
                <article key={card.title} className="bmd-audience-card">
                  <div className="bmd-audience-card__copy">
                    <Icon className="bmd-audience-card__icon" size={18} strokeWidth={1.5} />
                    <h3>{card.title}</h3>
                    <p>{card.text}</p>
                  </div>
                  <div
                    className="bmd-audience-card__media"
                    style={{ backgroundImage: `url(${card.image})` }}
                    role="img"
                    aria-label={card.title}
                  >
                    <img
                      src={card.image}
                      alt={card.title}
                      className="bmd-audience-card__img"
                      width={900}
                      height={560}
                      loading={idx < 2 ? 'eager' : 'lazy'}
                      decoding="async"
                      onError={(e) => {
                        const fallback = '/website/hardhat.jpg?v=8';
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = fallback;
                        if (e.currentTarget.parentElement) {
                          e.currentTarget.parentElement.style.backgroundImage = `url(${fallback})`;
                        }
                      }}
                    />
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* App — phone + scanner, copy, store buttons */}
      <section id="app" className="bmd-app-section">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 bmd-app-grid">
          <div className="bmd-app-device">
            <PlayStorePhoneMockup
              className="bmd-app-phone"
              appName={content.brand?.name || 'Build My Destiny'}
              developer={content.brand?.name || 'Build My Destiny'}
              tagline={content.brand?.tagline || appSection.body}
              comingSoon={home.comingSoon}
              screenshots={[
                '/website/cutout-bricks.png',
                '/website/cutout-blocks.png',
                '/website/cutout-cement.png',
                '/website/cutout-steel.png',
              ]}
            />
            <QrScanCard url={qrUrl} caption="Scan to Download" size={84} className="bmd-app-qr" />
          </div>

          <div className="bmd-app-copy">
            <ScrollFillHeading as="h2" theme="dark" className="bmd-app-copy__heading">
              Build My Destiny App
            </ScrollFillHeading>
            <p className="bmd-app-copy__title">Your Construction Journey, Made Simple.</p>
            <div className="bmd-app-steps">
              {APP_STEP_ITEMS.map((step, i) => (
                <span key={step} className="bmd-app-steps__item">
                  {i > 0 ? <ArrowRight className="bmd-app-steps__arrow" size={14} /> : null}
                  {step}
                </span>
              ))}
            </div>
            <p className="bmd-app-copy__body">
              {appSection.body ||
                'Search materials, explore options, place your requirement and stay connected with order updates through the app.'}
            </p>
            <div className="bmd-app-highlights">
              {APP_HIGHLIGHTS.map((item) => {
                const Icon = item.Icon;
                return (
                  <div key={item.text} className="bmd-app-highlight">
                    <Icon size={18} strokeWidth={1.7} />
                    <span>{item.text}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <StoreButtons />
        </div>
      </section>

      {/* Our Promise */}
      <section className="bmd-promise-section">
        <div className="bmd-promise-photo">
          <picture>
            <source media="(max-width: 767px)" srcSet={`${PROMISE_IMAGE_MOBILE}?v=3`} />
            <img
              src={`${PROMISE_IMAGE}?v=2`}
              alt="Build My Destiny construction specialist"
            />
          </picture>
        </div>
        <div className="bmd-promise-inner max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12">
          <div className="bmd-promise-main">
            <div className="bmd-promise-eyebrow">
              <span className="bmd-promise-eyebrow__line" />
              <span className="bmd-promise-eyebrow__label">Our Promise to You</span>
            </div>
            <ScrollFillHeading as="h2" theme="light" className="bmd-promise-heading">
              Built Around a Better Construction Experience.
            </ScrollFillHeading>
            <div className="bmd-promise-cards">
              {PROMISE_CARDS.map((item) => {
                const Icon = item.Icon;
                return (
                  <article key={item.title} className="bmd-promise-card">
                    <div className="bmd-promise-card__top">
                      <span className="bmd-promise-card__icon" aria-hidden="true">
                        <Icon size={18} strokeWidth={1.75} />
                      </span>
                      <h3>{item.title}</h3>
                    </div>
                    <p>{item.text}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
