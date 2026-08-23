import SetupPage from '@/components/SetupPage';
import { getPublicSetup } from '@/lib/publicSetup';
import { getDashboardPath } from '@/lib/routes';
import { buildPageMetadata } from '@/lib/seo';

export const dynamic = 'force-dynamic';

function getSectionSeo(section) {
  const path = getDashboardPath('inventory', section.slug);
  const title = `${section.title}: inventario del setup`;
  const description =
    `Explora ${section.title} en MiSetup: hardware, software, servicios, ` +
    'marcas, modelos, estado, compras y garantías del setup.';

  return {
    title,
    description,
    path,
    breadcrumbs: [
      { name: 'MiSetup', path: '/' },
      { name: 'Inventario', path: '/inventario' },
      { name: section.title, path },
    ],
  };
}

export async function generateMetadata({ params }) {
  const { section: sectionSlug } = await params;
  const setup = await getPublicSetup();
  const section = setup.sections.find(item => item.slug === sectionSlug);

  if (!section) {
    return {
      title: 'Sección no encontrada',
      robots: { index: false, follow: false },
    };
  }

  const seo = getSectionSeo(section);
  return buildPageMetadata({
    title: seo.title,
    description: seo.description,
    path: seo.path,
    keywords: [
      `inventario ${section.title}`,
      `equipamiento ${section.title}`,
      `${section.title} setup`,
    ],
  });
}

export default async function InventorySectionPage({ params }) {
  const { section: sectionSlug } = await params;
  const setup = await getPublicSetup();
  const section = setup.sections.find(item => item.slug === sectionSlug);
  const seo = section ? getSectionSeo(section) : null;

  return (
    <SetupPage
      initialView="inventory"
      initialSection={sectionSlug}
      seo={seo}
    />
  );
}
