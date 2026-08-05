const CATEGORIES = ['Portfolio', 'SaaS', 'Landing', 'Blog', 'Dashboard', 'E-commerce', 'Agency', 'Docs'];

function hue(seed) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) % 360;
  return h;
}

function svgPreview(name, category) {
  const h = hue(name);
  const h2 = (h + 40) % 360;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 560">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="hsl(${h},70%,55%)"/>
        <stop offset="100%" stop-color="hsl(${h2},70%,40%)"/>
      </linearGradient>
    </defs>
    <rect width="400" height="560" fill="url(#g)"/>
    <rect x="24" y="24" width="352" height="48" rx="8" fill="rgba(255,255,255,0.25)"/>
    <rect x="24" y="96" width="352" height="200" rx="8" fill="rgba(255,255,255,0.18)"/>
    <rect x="24" y="312" width="168" height="16" rx="4" fill="rgba(255,255,255,0.35)"/>
    <rect x="24" y="340" width="220" height="12" rx="4" fill="rgba(255,255,255,0.25)"/>
    <rect x="24" y="360" width="180" height="12" rx="4" fill="rgba(255,255,255,0.25)"/>
    <rect x="24" y="400" width="120" height="36" rx="18" fill="rgba(255,255,255,0.4)"/>
    <text x="200" y="500" font-family="sans-serif" font-size="22" font-weight="700" fill="rgba(255,255,255,0.9)" text-anchor="middle">${category}</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

function buildTemplate(id, name, category, description) {
  return {
    id,
    name,
    category,
    description,
    previewImageUrl: svgPreview(name, category),
  };
}

export const TEMPLATES = [
  buildTemplate('t1', 'Nova', 'Portfolio', 'Minimal dark portfolio with grid case studies.'),
  buildTemplate('t2', 'Ember', 'Landing', 'Bold gradient hero landing page for launches.'),
  buildTemplate('t3', 'Slate', 'SaaS', 'Clean SaaS marketing site with pricing tiers.'),
  buildTemplate('t4', 'Wren', 'Blog', 'Editorial blog layout with large type.'),
  buildTemplate('t5', 'Cobalt', 'Dashboard', 'Data-dense admin dashboard with charts.'),
  buildTemplate('t6', 'Marrow', 'E-commerce', 'Product grid storefront with cart drawer.'),
  buildTemplate('t7', 'Lumen', 'Agency', 'Creative agency site with scroll animations.'),
  buildTemplate('t8', 'Basalt', 'Docs', 'Developer documentation with sidebar nav.'),
  buildTemplate('t9', 'Origami', 'Portfolio', 'Card-based portfolio with soft shadows.'),
  buildTemplate('t10', 'Halcyon', 'Landing', 'Product launch page with video hero.'),
  buildTemplate('t11', 'Quartz', 'SaaS', 'B2B SaaS site with testimonial carousel.'),
  buildTemplate('t12', 'Petrol', 'Blog', 'Long-form writing blog with reading time.'),
  buildTemplate('t13', 'Circuit', 'Dashboard', 'Analytics dashboard with dark mode.'),
  buildTemplate('t14', 'Willow', 'E-commerce', 'Boutique storefront with lookbook.'),
  buildTemplate('t15', 'Kindle', 'Agency', 'Studio site with case study showcase.'),
  buildTemplate('t16', 'Fathom', 'Docs', 'API reference docs with code samples.'),
  buildTemplate('t17', 'Prism', 'Portfolio', 'Photography portfolio, full-bleed images.'),
  buildTemplate('t18', 'Solace', 'Landing', 'App landing page with feature grid.'),
  buildTemplate('t19', 'Granite', 'SaaS', 'Enterprise SaaS site with logo wall.'),
  buildTemplate('t20', 'Verdant', 'Blog', 'Nature/lifestyle blog with warm palette.'),
];

export { CATEGORIES };
