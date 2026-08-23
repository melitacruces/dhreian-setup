import SetupPage from '@/components/SetupPage';
import { buildPageMetadata } from '@/lib/seo';

export const dynamic = 'force-dynamic';

const seo = {
  title: 'Planner de upgrades y wishlist',
  description:
    'Planifica mejoras en MiSetup con una wishlist de hardware, prioridades, presupuesto, fechas, compatibilidad y comparación de upgrades.',
  breadcrumbs: [
    { name: 'MiSetup', path: '/' },
    { name: 'Planner de upgrades', path: '/planificador-upgrades' },
  ],
};

export const metadata = buildPageMetadata({
  title: seo.title,
  description: seo.description,
  path: '/planificador-upgrades',
  keywords: [
    'planner de upgrades de PC',
    'planificar mejoras de hardware',
    'wishlist de componentes',
    'presupuesto para upgrades',
    'comparador de hardware',
  ],
});

export default function UpgradePlannerPage() {
  return <SetupPage initialView="planner" seo={seo} />;
}
