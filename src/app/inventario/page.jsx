import SetupPage from '@/components/SetupPage';
import { buildPageMetadata } from '@/lib/seo';

export const dynamic = 'force-dynamic';

const seo = {
  title: 'Inventario de hardware y software',
  description:
    'Explora el inventario de MiSetup: hardware, software, servicios, periféricos, compras, garantías y herramientas organizados por secciones.',
  breadcrumbs: [
    { name: 'MiSetup', path: '/' },
    { name: 'Inventario', path: '/inventario' },
  ],
};

export const metadata = buildPageMetadata({
  title: seo.title,
  description: seo.description,
  path: '/inventario',
  keywords: [
    'inventario de equipos',
    'inventario de periféricos',
    'catálogo de hardware personal',
    'control de hardware y software',
  ],
});

export default function InventoryPage() {
  return <SetupPage initialView="inventory" seo={seo} />;
}
