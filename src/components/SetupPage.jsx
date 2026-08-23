import { notFound } from 'next/navigation';
import Dashboard from '@/components/ui/Dashboard';
import StructuredData from '@/components/StructuredData';
import { getPublicSetup } from '@/lib/publicSetup';
import {
  buildHomeStructuredData,
  buildPageStructuredData,
} from '@/lib/seo';
import { getDashboardPath } from '@/lib/routes';

export default async function SetupPage({
  initialView = 'overview',
  initialSection,
  seo,
}) {
  const setup = await getPublicSetup();
  const section = initialSection
    ? setup.sections.find(item => item.slug === initialSection)
    : null;

  if (initialSection && !section) notFound();

  const resolvedSection = section?.slug || setup.sections[0]?.slug || 'core';
  const structuredData =
    initialView === 'overview'
      ? buildHomeStructuredData()
      : buildPageStructuredData({
          title: seo.title,
          description: seo.description,
          path: getDashboardPath(initialView, section?.slug),
          breadcrumbs: seo.breadcrumbs,
        });

  return (
    <>
      <StructuredData data={structuredData} />
      <Dashboard
        preview={setup.mode === 'preview'}
        persistent={setup.mode === 'database'}
        initialData={setup.items}
        initialSections={setup.sections}
        initialProfile={setup.profile}
        initialEvents={setup.events}
        initialView={initialView}
        initialSection={resolvedSection}
        initialRouteSection={section?.slug || null}
      />
    </>
  );
}
