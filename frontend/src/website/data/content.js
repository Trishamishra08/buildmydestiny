export const brand = {
  name: 'BUILD MY DESTINY',
  tagline: 'Building Materials. Made Simple.',
  slogan: 'Construction Made Easy',
  footerBlurb:
    'A simpler way to source essential construction materials for your home, project or business.',
  phone: '+91 12345 67890',
  email: 'info@buildmydestiny.com',
  web: 'www.buildmydestiny.com',
  location: 'India',
};

export const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'All Materials', to: '/products' },
  { label: 'Why Build My Destiny?', to: '/#why' },
  { label: 'Become a Dealer', to: '/#dealers' },
  { label: 'How It Works', to: '/#how-it-works' },
  { label: 'App', to: '/#app' },
  { label: 'About Us', to: '/about' },
  { label: 'FAQ', to: '/faq' },
];

export const footerColumns = [
  {
    title: 'Quick Links',
    links: [
      { label: 'Home', to: '/' },
      { label: 'All Materials', to: '/products' },
      { label: 'Why Build My Destiny?', to: '/#why' },
      { label: 'Become a Dealer', to: '/dealers' },
      { label: 'How It Works', to: '/#how-it-works' },
      { label: 'App', to: '/#app' },
      { label: 'About Us', to: '/about' },
      { label: 'FAQ', to: '/faq' },
    ],
  },
  {
    title: 'For You',
    links: [
      { label: 'For Homeowners', to: '/#audience' },
      { label: 'For Contractors & Builders', to: '/#audience' },
      { label: 'About Us', to: '/about' },
      { label: 'FAQ', to: '/faq' },
      { label: 'Contact Us', to: '/contact' },
    ],
  },
  {
    title: 'Materials',
    links: [
      { label: 'Cement', to: '/products' },
      { label: 'TMT Steel', to: '/products' },
      { label: 'Bricks', to: '/products' },
      { label: 'Aggregates', to: '/products' },
      { label: 'Ready-Mix Concrete', to: '/products' },
      { label: 'Other Materials', to: '/products' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'FAQ', to: '/faq' },
      { label: 'Contact Support', to: '/contact' },
      { label: 'Privacy Policy', to: '/privacy' },
      { label: 'Terms & Conditions', to: '/privacy' },
    ],
  },
];

/** @deprecated use footerColumns */
export const footerLinks = footerColumns.flatMap((col) => col.links);

export const home = {
  eyebrow: 'Build My Destiny',
  title: ['Build Your Dream.', "We'll Help You", 'Build It Right.'],
  lead: 'Everything you need to source building materials, made simpler.',
  description:
    'From cement and TMT steel to bricks, aggregates and other construction essentials, Build My Destiny helps you discover material options, compare what fits your project and place your requirement through one simple platform.',
  closing:
    'Every structure begins with a vision. We help make the material journey simpler so you can build with confidence.',
  quoteCta: 'Get a Quote',
  exploreCta: 'Explore Materials',
  comingSoon: 'Coming Soon',
  stayTuned: 'Stay Tuned!',
  headline: 'Build Your Dream. We’ll Help You Build It Right.',
  intro:
    'Everything you need to source building materials, made simpler.',
  primaryCta: 'Get a Quote',
  materialsCta: 'Explore All Materials on the App',
  whyCta: 'Learn More',
  howCta: 'Start Your Requirement',
  dealerCta: 'Join as a Dealer',
  audienceTitle: 'One Platform. Different Construction Needs.',
  audienceEyebrow: 'For Every Kind of Builder',
  promiseEyebrow: 'Our Promise to You',
  promiseTitle: 'Built Around a Better Construction Experience.',
};

export const features = [
  {
    title: 'Wide Range of Materials',
    text: 'Explore materials for every stage of your project.',
    icon: 'boxes',
  },
  {
    title: 'Simple Ordering',
    text: 'Search, choose and place your requirement with ease.',
    icon: 'cart',
  },
  {
    title: 'Save Time',
    text: 'Spend less time searching and contacting multiple suppliers.',
    icon: 'clock',
  },
  {
    title: 'Delivery to Your Site',
    text: 'Your selected dealer coordinates delivery to your construction site.',
    icon: 'truck',
  },
];

export const benefits = [
  {
    title: 'Find Materials Easily',
    text: 'Discover cement, bricks, steel, blocks and more in one place.',
    image: '/website/cutout-cement.png',
  },
  {
    title: 'Nearby Options',
    text: 'Find material options around your project location.',
    image: '/website/cutout-bricks.png',
  },
  {
    title: 'Save Time',
    text: 'Spend less time searching and contacting multiple suppliers.',
    image: '/website/cutout-steel.png',
  },
  {
    title: 'Simple Ordering',
    text: 'Search, choose and place your requirement with ease.',
    image: '/website/cutout-blocks.png',
  },
  {
    title: 'Site Delivery',
    text: 'Your selected dealer coordinates delivery to your construction site.',
    image: '/website/cutout-aggregates.png',
  },
];

export const why = {
  title: 'Everything You Need to Build.\nOne Simpler Way.',
  eyebrow: 'Why Build My Destiny?',
  p1: 'Finding the right construction materials can take time and effort.',
  p2: 'Build My Destiny is designed to make the process simpler by bringing material discovery, ordering and dealer connections together in one convenient platform.',
  focus:
    'Your project, requirement and convenience remain at the centre of the experience we are building.',
  cta: 'Learn More',
  features: [
    {
      title: 'All in One Place',
      text: 'Discover a wide range of construction materials for different project requirements.',
    },
    {
      title: 'Save Valuable Time',
      text: 'Reduce the need to contact multiple suppliers and search in different places.',
    },
    {
      title: 'Easy & Convenient Ordering',
      text: 'Find the materials you need and place your requirement through a simple digital experience.',
    },
    {
      title: 'Built for Your Construction Journey',
      text: 'Whether you are building a home or managing a larger project, we make material sourcing easier.',
    },
    {
      title: 'Convenient Sourcing',
      text: 'Bring material requirements into one organised journey.',
    },
    {
      title: 'Customer First',
      text: 'Your project, requirement and convenience remain at the centre of the experience we are building.',
    },
  ],
};

export const howSteps = [
  {
    n: '01',
    title: 'Discover What You Need',
    text: 'Explore materials and identify the products and quantities required for your project.',
  },
  {
    n: '02',
    title: 'Share Your Requirement',
    text: 'Select or submit your material requirement through the available Build My Destiny process.',
  },
  {
    n: '03',
    title: 'Review Your Options',
    text: 'Review relevant material, pricing and supply information available for your requirement.',
  },
  {
    n: '04',
    title: 'Confirm Your Order',
    text: 'The participating dealer reviews the requirement and confirms fulfilment based on availability and delivery feasibility.',
  },
  {
    n: '05',
    title: 'Get It Delivered',
    text: 'Once confirmed, the dealer manages fulfilment and coordinates delivery according to the agreed requirement.',
  },
  {
    n: '06',
    title: 'Keep Building',
    text: 'Spend less time managing material sourcing and more time focusing on your construction project.',
  },
];

export const howMantra = 'Simple From Requirement to Delivery.';

export const materials = {
  title: 'Everything You Need for Your Construction Project.',
  intro:
    'From the foundation to the finishing stage, discover a growing range of construction materials in one convenient place.',
  note: 'Material availability, brands and product options may vary by location and participating dealer.',
  cta: 'Explore All Materials on the App',
  categories: [
    {
      name: 'Bricks',
      text: 'Reliable masonry materials for construction needs.',
      image: '/website/cutout-bricks.png',
    },
    {
      name: 'AAC Blocks',
      text: 'Modern wall-building materials for efficient construction.',
      image: '/website/cutout-blocks.png',
    },
    {
      name: 'Paver Blocks',
      text: 'Practical solutions for pathways and outdoor surfaces.',
      image: '/website/cutout-pavers.png',
    },
    {
      name: 'Precast Products',
      text: 'Ready-to-use construction products for multiple applications.',
      image: '/website/cutout-precast.png',
    },
    {
      name: 'Cement',
      text: 'For foundations, structures and dependable construction.',
      image: '/website/cutout-cement.png',
    },
    {
      name: 'TMT Steel',
      text: 'Essential reinforcement material for structural strength.',
      image: '/website/cutout-steel.png',
    },
    {
      name: 'Sand',
      text: 'An essential material for multiple construction applications.',
      image: '/website/cutout-sand.png',
    },
    {
      name: 'Aggregates',
      text: 'Important materials for concrete and structural work.',
      image: '/website/cutout-aggregates.png',
    },
    {
      name: 'More Construction Materials',
      text: 'Explore additional categories or share your requirement.',
      image: '/website/cutout-blocks.png',
    },
  ],
};

export const projects = [
  {
    title: 'For Homeowners',
    text: 'Build your home with a simpler material-sourcing journey.',
  },
  {
    title: 'For Contractors',
    text: 'Make regular material procurement easier to organise and manage.',
  },
  {
    title: 'For Builders & Developers',
    text: 'Support project requirements with a more connected material-sourcing experience.',
  },
  {
    title: 'For Construction Professionals',
    text: 'A straightforward way to connect material requirements with available supply options.',
  },
];

export const appSection = {
  heading: 'Build My Destiny App',
  title: 'Your Construction Journey, Made Simple.',
  body: 'Search materials, explore options, place your requirement and stay connected with order updates through the app.',
  steps: 'Search → Choose → Order → Dealer Delivers',
  qr: 'Scan to Download the App',
  highlights: [
    'Explore a range of materials',
    'Share your requirement',
    'Get quotes and compare options',
    'Track your order',
    'Stay connected with your dealer',
  ],
};

export const about = {
  title: 'We’re Making Construction Easier.',
  image: '/website/cutout-cement.png',
  paragraphs: [
    'Construction is a big part of everyday life — from building a home to developing commercial spaces and infrastructure.',
    'But getting the right materials at the right time can often become complicated.',
    'Build My Destiny is being built to simplify that experience.',
    'We are creating a digital connection between customers and construction-material dealers so that finding and ordering materials becomes more convenient, organized and accessible.',
    'Dealers handle fulfilment and delivery after confirming the requirement — so you get a marketplace experience focused on material options and participating dealers.',
  ],
  vision: 'Make construction-material buying easier for everyone.',
  mission:
    'Use technology to connect construction needs with local material supply and make the buying experience simpler.',
};

export const promises = [
  {
    title: 'Convenience',
    text: 'A simpler way to discover and order construction materials.',
  },
  {
    title: 'Trusted Dealer Network',
    text: 'Connect with a growing network of participating dealers.',
  },
  {
    title: 'Clear & Organised Information',
    text: 'Access product and requirement information in a more convenient and structured way.',
  },
  {
    title: 'Delivery to Your Site',
    text: 'The selected dealer coordinates delivery based on the confirmed order.',
  },
  {
    title: 'Customer-First Approach',
    text: 'We are continuously working to make your material journey easier and better.',
  },
];

export const dealers = {
  title: 'Grow Your Construction-Material Business with Build My Destiny.',
  intro:
    'Join a growing platform designed to help construction-material businesses reach more customers and explore new opportunities.',
  image: '/website/dealer-worker.jpg',
  cta: 'Join as a Dealer',
  benefits: [
    {
      title: 'Reach More Customers',
      text: 'Showcase your material business to a wider customer base.',
    },
    {
      title: 'Grow Your Business Digitally',
      text: 'Build a stronger digital presence through a modern platform.',
    },
    {
      title: 'Showcase Your Products',
      text: 'Present your construction materials and offerings to potential customers.',
    },
    {
      title: 'Keep Control of Your Operations',
      text: 'Continue managing your own stock, fulfilment and delivery operations.',
    },
    {
      title: 'Be Part of a Growing Network',
      text: 'Join a platform built to create more opportunities for construction-material businesses.',
    },
  ],
};

export const contact = {
  title: 'Need Help?',
  intro:
    'Have a question about Build My Destiny, your requirement or becoming a dealer? We’re here to help.',
  options: ['Customer Support', 'Dealer Support', 'Business Enquiry'],
};

export const faqs = [
  {
    q: 'What is Build My Destiny?',
    a: 'A digital marketplace platform designed to make construction-material buying easier by connecting customers with participating material dealers.',
  },
  {
    q: 'Where can I place an order?',
    a: 'Product discovery, requirements and ordering are available through the Build My Destiny app.',
  },
  {
    q: 'What materials are available?',
    a: 'Bricks, AAC blocks, paver blocks, precast products, cement, TMT steel, sand, aggregates and other construction materials — depending on location and participating dealers.',
  },
  {
    q: 'How is delivery handled?',
    a: 'Participating dealers handle fulfilment and coordinate delivery after confirming the requirement. Build My Destiny does not personally perform all deliveries.',
  },
  {
    q: 'Can dealers join?',
    a: 'Yes. Construction-material dealers can register through the Become a Dealer section.',
  },
];

export const APP_HREF = '/#app';
export const DEALER_HREF = '/dealers';

export const ECOMMERCE_PATHS = [
  '/shop',
  '/product',
  '/blog',
  '/offers',
  '/consultation',
  '/bag',
  '/privacy-policy',
  '/return-policy',
  '/terms-conditions',
  '/cancellation-policy',
  '/shipping-policy',
  '/login',
  '/register',
  '/profile',
  '/reviews',
  '/coupons',
  '/notifications',
  '/change-password',
  '/settings',
  '/orders',
  '/wishlist',
  '/checkout',
  '/track-order',
  '/support',
];

export const isLegacyEcommercePath = (pathname) =>
  ECOMMERCE_PATHS.some((path) => pathname === path || pathname.startsWith(`${path}/`));

export const heroImages = {
  background: '/website/hero-banner-main.jpg',
  slides: [
    { src: '/website/hero-banner-main.jpg', alt: 'Cement, bricks and blocks at sunset' },
    { src: '/website/hero-banner-cement.jpg', alt: 'Cement bags for construction' },
    { src: '/website/hero-banner-bricks.jpg', alt: 'Bricks and concrete blocks' },
    { src: '/website/hero-banner-steel.jpg', alt: 'TMT steel and cement' },
  ],
  collage: [
    { src: '/website/cutout-cement.png', alt: 'Cement' },
    { src: '/website/cutout-bricks.png', alt: 'Bricks' },
    { src: '/website/cutout-steel.png', alt: 'TMT steel' },
    { src: '/website/cutout-blocks.png', alt: 'AAC blocks' },
  ],
  circle: '/website/cutout-cement.png',
};

export const notify = {
  eyebrow: 'Get notified when',
  titleBefore: 'We',
  titleAccent: 'Go',
  titleAfter: 'Live!',
  subtitle: 'Subscribe and be the first to know when we launch.',
};

export const faqPage = {
  title: 'Questions, answered.',
  subtitle: 'Everything you need to know about Build My Destiny.',
};

export const privacy = {
  p1: 'Build My Destiny collects only the information you choose to share — such as your name, mobile number, email and enquiry details — so we can respond to support requests, dealer applications and launch notifications.',
  p2: 'Contact form submissions are stored so our team can follow up. We do not sell this information. Product discovery, ordering and account data live in the Build My Destiny app experience. Participating dealers manage fulfilment and delivery for confirmed requirements.',
};

export const buildDefaultContent = () =>
  JSON.parse(
    JSON.stringify({
      brand,
      home,
      features,
      benefits,
      why,
      howSteps,
      howMantra,
      materials,
      projects,
      appSection,
      about,
      promises,
      dealers,
      contact,
      faqs,
      heroImages,
      notify,
      faqPage,
      privacy,
      footerColumns,
    })
  );
