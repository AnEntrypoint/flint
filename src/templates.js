import rawTemplates from './templates-data.json';

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

export const TEMPLATES = rawTemplates.map((t) => ({
  id: t.id,
  name: t.name,
  category: CATEGORY_LABELS[t.category] || t.category,
  description: 'Community template on v0.dev',
  previewImageUrl: t.previewImageUrl,
  v0Url: t.v0Url,
}));

export const CATEGORIES = [...new Set(TEMPLATES.map((t) => t.category))];
