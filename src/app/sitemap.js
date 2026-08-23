import { getSetupData } from '@/lib/actions';
import { getDashboardPath } from '@/lib/routes';
import { absoluteUrl } from '@/lib/seo';

export const dynamic = 'force-dynamic';

function getLastModified(setup) {
  const timestamps = [
    setup.profile?.updated_at,
    ...setup.sections.flatMap(section => [
      section.updated_at,
      section.created_at,
    ]),
    ...setup.items.flatMap(item => [item.updated_at, item.created_at]),
    ...setup.events.map(event => event.created_at),
  ]
    .filter(Boolean)
    .map(value => new Date(value))
    .filter(date => !Number.isNaN(date.getTime()) && date <= new Date());

  if (timestamps.length === 0) return undefined;
  return new Date(Math.max(...timestamps.map(date => date.getTime())));
}

export default async function sitemap() {
  const setup = await getSetupData();
  const lastModified = getLastModified(setup);
  const image = absoluteUrl('/og.png');
  const shared = {
    ...(lastModified ? { lastModified } : {}),
    images: [image],
  };

  return [
    {
      url: absoluteUrl('/'),
      changeFrequency: 'weekly',
      priority: 1,
      ...shared,
    },
    {
      url: absoluteUrl(getDashboardPath('inventory')),
      changeFrequency: 'weekly',
      priority: 0.9,
      ...shared,
    },
    ...setup.sections.map(section => ({
      url: absoluteUrl(getDashboardPath('inventory', section.slug)),
      changeFrequency: 'weekly',
      priority: 0.8,
      ...shared,
    })),
    {
      url: absoluteUrl(getDashboardPath('planner')),
      changeFrequency: 'weekly',
      priority: 0.8,
      ...shared,
    },
  ];
}
