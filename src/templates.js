const CATEGORY_SLUGS = [
  'apps-and-games',
  'landing-pages',
  'dashboards',
  'components',
  'login-and-sign-up',
  'blog-and-portfolio',
  'ecommerce',
  'ai',
  'animations',
  'design-systems',
  'layouts',
  'website-templates',
  'agents',
];

const CATEGORY_LABELS = {
  'apps-and-games': 'Apps & Games',
  'landing-pages': 'Landing Pages',
  dashboards: 'Dashboards',
  components: 'Components',
  'login-and-sign-up': 'Login & Sign Up',
  'blog-and-portfolio': 'Blog & Portfolio',
  ecommerce: 'E-commerce',
  ai: 'AI',
  animations: 'Animations',
  'design-systems': 'Design Systems',
  layouts: 'Layouts',
  'website-templates': 'Website Templates',
  agents: 'Agents',
};

const RESERVED_SLUGS = new Set([...CATEGORY_SLUGS, 'categories', 'submissions']);

const categoryCache = new Map();

function parseTemplatesFromHtml(html, categorySlug) {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  const anchors = Array.from(doc.querySelectorAll('a[href^="/templates/"]'));
  const seen = new Map();

  anchors.forEach((a) => {
    const href = a.getAttribute('href') || '';
    const match = href.match(/^\/templates\/([A-Za-z0-9]+)$/);
    if (!match) return;
    const slug = match[1];
    if (RESERVED_SLUGS.has(slug)) return;
    if (seen.has(slug)) return;

    let card = a;
    for (let i = 0; i < 3 && card; i++) card = card.parentElement;
    if (!card) return;

    const linksInCard = Array.from(card.querySelectorAll('a[href^="/templates/"]'));
    const slugsInCard = new Set(
      linksInCard.map((l) => (l.getAttribute('href') || '').replace('/templates/', ''))
    );
    if (slugsInCard.size !== 1) return;

    const img = card.querySelector('img');
    let imgSrc = null;
    if (img) {
      const srcAttr = img.getAttribute('src') || '';
      const urlMatch = srcAttr.match(/url=([^&]+)/);
      imgSrc = urlMatch ? decodeURIComponent(urlMatch[1]) : (img.getAttribute('src') || null);
      if (imgSrc && imgSrc.startsWith('/')) imgSrc = null;
    }
    if (!imgSrc || !/^https:\/\//.test(imgSrc)) return;

    let rawText = card.textContent.trim().replace(/^View Details/, '');
    const name = rawText.replace(/[\d.,]+K?\s*[\d.,]*K?$/, '').trim();
    if (!name) return;

    seen.set(slug, {
      id: slug,
      name: name.length > 90 ? name.slice(0, 87) + '...' : name,
      category: CATEGORY_LABELS[categorySlug] || categorySlug,
      description: 'Community template on v0.dev',
      previewImageUrl: imgSrc,
      v0Url: `https://v0.dev/templates/${slug}`,
    });
  });

  return Array.from(seen.values());
}

async function fetchCategory(categorySlug) {
  if (categoryCache.has(categorySlug)) return categoryCache.get(categorySlug);

  const promise = fetch(`https://v0.app/templates/${categorySlug}`)
    .then((res) => {
      if (!res.ok) throw new Error(`v0.dev fetch failed for ${categorySlug}: ${res.status}`);
      return res.text();
    })
    .then((html) => parseTemplatesFromHtml(html, categorySlug))
    .catch((err) => {
      console.error(`Failed to fetch category ${categorySlug}:`, err);
      return [];
    });

  categoryCache.set(categorySlug, promise);
  return promise;
}

export async function fetchInitialTemplates() {
  const firstCategory = CATEGORY_SLUGS[Math.floor(Math.random() * CATEGORY_SLUGS.length)];
  const templates = await fetchCategory(firstCategory);
  if (templates.length > 0) return templates;

  for (const slug of CATEGORY_SLUGS) {
    if (slug === firstCategory) continue;
    const fallback = await fetchCategory(slug);
    if (fallback.length > 0) return fallback;
  }
  return [];
}

export async function fetchMoreTemplates(excludeSlugs) {
  const excluded = new Set(excludeSlugs);
  const remaining = CATEGORY_SLUGS.filter((slug) => !categoryCache.has(slug));
  if (remaining.length === 0) return [];

  const nextSlug = remaining[Math.floor(Math.random() * remaining.length)];
  const templates = await fetchCategory(nextSlug);
  return templates.filter((t) => !excluded.has(t.id));
}

export function dedupeTemplates(templates) {
  const seen = new Map();
  templates.forEach((t) => {
    if (!seen.has(t.id)) seen.set(t.id, t);
  });
  return Array.from(seen.values());
}

export { CATEGORY_SLUGS, CATEGORY_LABELS };
