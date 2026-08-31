/** Slug for URL ?category= — matches header nav and product cards */
const SLUG_OVERRIDES = {
  'TMT & Steel': 'tmt-steel',
  'Precast Products': 'precast',
  'Other Construction Materials': 'more',
};

export const slugifyCategory = (name) => {
  if (SLUG_OVERRIDES[name]) return SLUG_OVERRIDES[name];
  return String(name || '')
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
};

/**
 * Dark category bar (reference PDF / marketplace header).
 * `filter`: category names from content.js materials.categories — null = show all.
 */
export const CATEGORY_NAV = [
  { label: 'Home', to: '/', filter: null },
  { label: 'All Materials', to: '/products', filter: null },
  { label: 'Bricks', to: '/products?category=bricks', filter: ['Bricks'] },
  { label: 'AAC Blocks', to: '/products?category=aac-blocks', filter: ['AAC Blocks'] },
  { label: 'Paver Blocks', to: '/products?category=paver-blocks', filter: ['Paver Blocks'] },
  { label: 'Precast', to: '/products?category=precast', filter: ['Precast Products'] },
  { label: 'TMT & Steel', to: '/products?category=tmt-steel', filter: ['TMT & Steel'] },
  { label: 'Cement', to: '/products?category=cement', filter: ['Cement'] },
  {
    label: 'Sand & Aggregates',
    to: '/products?category=sand-aggregates',
    filter: ['Sand', 'Aggregates'],
  },
  {
    label: 'More',
    to: '/products?category=more',
    filter: ['Other Construction Materials'],
  },
];

export const NAV_SLUG_TO_NAMES = Object.fromEntries(
  CATEGORY_NAV.filter((item) => item.to.includes('category=')).map((item) => {
    const slug = item.to.split('category=')[1];
    return [slug, item.filter];
  })
);

export const getCategoryHref = (name) => `/products?category=${slugifyCategory(name)}`;

export const filterCategories = (categories, { categorySlug, query } = {}) => {
  let list = categories || [];
  if (categorySlug) {
    const names = NAV_SLUG_TO_NAMES[categorySlug];
    if (names) {
      list = list.filter((cat) => names.includes(cat.name));
    } else {
      list = list.filter((cat) => slugifyCategory(cat.name) === categorySlug);
    }
  } else if (query?.trim()) {
    const q = query.trim().toLowerCase();
    list = list.filter((cat) => cat.name.toLowerCase().includes(q));
  }
  return list;
};

export const getNavItemActive = (link, pathname, categorySlug, query) => {
  if (link.label === 'Home') return pathname === '/';
  if (pathname !== '/products') return false;
  if (!link.to.includes('category=')) {
    return !categorySlug && !query;
  }
  const slug = link.to.split('category=')[1];
  return categorySlug === slug;
};
