function resolveSiteUrl() {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const vercelHost =
    process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;
  const fallbackUrl = vercelHost
    ? `https://${vercelHost}`
    : 'http://localhost:3000';
  const value = configuredUrl || fallbackUrl;

  return value.replace(/\/$/, '');
}

const siteUrl = resolveSiteUrl();

export const siteConfig = {
  name: 'MiSetup',
  alternateNames: ['Mi Setup', 'misetup.melitacruces.com'],
  title: 'MiSetup | Panel de Inventario Personal',
  description:
    'MiSetup es un gestor de setup e inventario de hardware, software y servicios con wishlist y planner de upgrades.',
  url: siteUrl,
  locale: 'es_CL',
  language: 'es-CL',
  creator: 'Luis Andres Melita Cruces',
  keywords: [
    'MiSetup',
    'Mi Setup',
    'mi setup',
    'gestor de setup',
    'administrador de setup',
    'organizar setup',
    'inventario de setup',
    'inventario personal de hardware',
    'inventario de hardware y software',
    'inventario de equipos informáticos',
    'panel de equipamiento tecnológico',
    'setup manager',
    'upgrade planner',
    'planificador de upgrades',
    'wishlist de hardware',
    'control de garantías de equipos',
    'seguimiento de compras tecnológicas',
    'hardware software y servicios',
    'equipamiento tecnológico',
    'workspace setup',
  ],
  links: {
    github: 'https://github.com/melitacruces',
    repository: 'https://github.com/melitacruces/misetup',
    linkedin: 'https://linkedin.com/in/melitacruces',
  },
};

export function absoluteUrl(path = '/') {
  if (/^https?:\/\//i.test(path)) return path;
  const normalizedPath =
    path === '/' ? '' : `/${String(path).replace(/^\/+/, '')}`;
  return `${siteConfig.url}${normalizedPath}`;
}

export const defaultOpenGraphImage = {
  url: '/og.png',
  width: 1731,
  height: 909,
  alt: 'MiSetup dashboard de inventario para setups',
};

export function buildPageMetadata({
  title,
  description,
  path,
  keywords = [],
}) {
  return {
    title,
    description,
    keywords: [...new Set([...siteConfig.keywords, ...keywords])],
    alternates: {
      canonical: path,
      languages: {
        'es-CL': path,
        'x-default': path,
      },
    },
    openGraph: {
      type: 'website',
      locale: siteConfig.locale,
      url: path,
      siteName: siteConfig.name,
      title,
      description,
      images: [defaultOpenGraphImage],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [defaultOpenGraphImage.url],
    },
  };
}

function websiteSchema() {
  return {
    '@type': 'WebSite',
    '@id': `${siteConfig.url}/#website`,
    name: siteConfig.name,
    alternateName: siteConfig.alternateNames,
    url: absoluteUrl('/'),
    description: siteConfig.description,
    inLanguage: siteConfig.language,
    publisher: {
      '@id': `${siteConfig.url}/#person`,
    },
  };
}

function webApplicationSchema() {
  return {
    '@type': 'WebApplication',
    '@id': `${siteConfig.url}/#webapp`,
    name: siteConfig.name,
    alternateName: siteConfig.alternateNames[0],
    url: absoluteUrl('/'),
    description: siteConfig.description,
    applicationCategory: 'ProductivityApplication',
    applicationSubCategory: 'Personal inventory management',
    operatingSystem: 'Web',
    browserRequirements: 'Requires JavaScript and an HTML5-compatible browser.',
    inLanguage: siteConfig.language,
    isAccessibleForFree: true,
    image: absoluteUrl(defaultOpenGraphImage.url),
    screenshot: absoluteUrl(defaultOpenGraphImage.url),
    featureList: [
      'Inventario de hardware, software y servicios',
      'Wishlist y planner de upgrades',
      'Control de compras y garantías',
      'Organización por secciones personalizables',
      'Timeline de evolución del setup',
      'Exportación del inventario en JSON',
    ],
    creator: {
      '@id': `${siteConfig.url}/#person`,
    },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
  };
}

function personSchema() {
  return {
    '@type': 'Person',
    '@id': `${siteConfig.url}/#person`,
    name: siteConfig.creator,
    url: absoluteUrl('/'),
    sameAs: [siteConfig.links.github, siteConfig.links.linkedin],
  };
}

function webPageSchema({ title, description, path, type = 'WebPage' }) {
  const url = absoluteUrl(path);

  return {
    '@type': type,
    '@id': `${url}#webpage`,
    url,
    name: title,
    description,
    inLanguage: siteConfig.language,
    isPartOf: {
      '@id': `${siteConfig.url}/#website`,
    },
    about: {
      '@id': `${siteConfig.url}/#webapp`,
    },
    primaryImageOfPage: {
      '@type': 'ImageObject',
      url: absoluteUrl(defaultOpenGraphImage.url),
      width: defaultOpenGraphImage.width,
      height: defaultOpenGraphImage.height,
      caption: defaultOpenGraphImage.alt,
    },
  };
}

function breadcrumbSchema(breadcrumbs) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((breadcrumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: breadcrumb.name,
      item: absoluteUrl(breadcrumb.path),
    })),
  };
}

export function buildHomeStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      websiteSchema(),
      webApplicationSchema(),
      webPageSchema({
        title: siteConfig.title,
        description: siteConfig.description,
        path: '/',
      }),
      personSchema(),
    ],
  };
}

export function buildPageStructuredData({
  title,
  description,
  path,
  breadcrumbs,
  type = 'CollectionPage',
}) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      webPageSchema({ title, description, path, type }),
      breadcrumbSchema(breadcrumbs),
    ],
  };
}
