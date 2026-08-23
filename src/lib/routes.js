export const DASHBOARD_ROUTES = {
  overview: '/',
  inventory: '/inventario',
  planner: '/planificador-upgrades',
};

export function getDashboardPath(view, section) {
  if (view === 'planner') return DASHBOARD_ROUTES.planner;
  if (view === 'inventory') {
    return section
      ? `${DASHBOARD_ROUTES.inventory}/${encodeURIComponent(section)}`
      : DASHBOARD_ROUTES.inventory;
  }
  return DASHBOARD_ROUTES.overview;
}

export function getDashboardDocumentMetadata(view, sectionTitle) {
  if (view === 'planner') {
    return {
      title: 'Planner de upgrades y wishlist | MiSetup',
      description:
        'Planifica mejoras en MiSetup con una wishlist de hardware, prioridades, presupuesto, fechas, compatibilidad y comparación de upgrades.',
      path: getDashboardPath('planner'),
    };
  }

  if (view === 'inventory') {
    if (sectionTitle) {
      return {
        title: `${sectionTitle}: inventario del setup | MiSetup`,
        description:
          `Explora ${sectionTitle} en MiSetup: hardware, software, servicios, ` +
          'marcas, modelos, estado, compras y garantías del setup.',
      };
    }

    return {
      title: 'Inventario de hardware y software | MiSetup',
      description:
        'Explora el inventario de MiSetup: hardware, software, servicios, periféricos, compras, garantías y herramientas organizados por secciones.',
      path: getDashboardPath('inventory'),
    };
  }

  return {
    title: 'MiSetup | Panel de Inventario Personal',
    description:
      'MiSetup es un gestor de setup e inventario de hardware, software y servicios con wishlist y planner de upgrades.',
    path: getDashboardPath('overview'),
  };
}

export function parseDashboardPath(pathname) {
  const normalizedPath = `/${String(pathname || '')
    .split('?')[0]
    .split('#')[0]
    .replace(/^\/+|\/+$/g, '')}`;

  if (normalizedPath === DASHBOARD_ROUTES.planner) {
    return { view: 'planner', section: null };
  }

  if (
    normalizedPath === DASHBOARD_ROUTES.inventory ||
    normalizedPath.startsWith(`${DASHBOARD_ROUTES.inventory}/`)
  ) {
    const encodedSection = normalizedPath.slice(
      `${DASHBOARD_ROUTES.inventory}/`.length
    );
    let section = null;

    if (encodedSection && encodedSection !== normalizedPath) {
      try {
        section = decodeURIComponent(encodedSection);
      } catch {
        section = encodedSection;
      }
    }

    return { view: 'inventory', section };
  }

  return { view: 'overview', section: null };
}

export function shouldHandleClientNavigation(event) {
  return (
    event.button === 0 &&
    !event.metaKey &&
    !event.ctrlKey &&
    !event.shiftKey &&
    !event.altKey
  );
}
