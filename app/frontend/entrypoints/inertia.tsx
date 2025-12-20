import { createInertiaApp, type ResolvedComponent } from '@inertiajs/react'
import { type ReactNode, createElement } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'

import DefaultLayout from '@/layouts/default-layout'
import { initializeTheme } from '@/hooks/use-appearance'

// Initialize theme before React hydration to prevent flash
initializeTheme()

void createInertiaApp({
  // Set default page title
  // see https://inertia-rails.dev/guide/title-and-meta
  //
  // title: title => title ? `${title} - App` : 'App',

  // Disable progress bar
  //
  // see https://inertia-rails.dev/guide/progress-indicators
  // progress: false,

  resolve: (name) => {
    const pages = import.meta.glob<{ default: ResolvedComponent }>('../pages/**/*.tsx', {
      eager: true,
    })
    const page = pages[`../pages/${name}.tsx`]
    if (!page) {
      console.error(`Missing Inertia page component: '${name}.tsx'`)
    }

    // Use default layout for all pages
    page.default.layout ||= (page: ReactNode) => <DefaultLayout>{page}</DefaultLayout>

    return page
  },

  setup({ el, App, props }) {
    if (el.hasChildNodes()) {
      hydrateRoot(el, createElement(App, props))
      return
    }
    createRoot(el).render(createElement(App, props))
  },

  defaults: {
    form: {
      forceIndicesArrayFormatInFormData: false,
    },
    future: {
      useDataInertiaHeadAttribute: true,
      useDialogForErrorModal: true,
      preserveEqualProps: true,
    },
  },
}).catch((error) => {
  // This ensures this entrypoint is only loaded on Inertia pages
  // by checking for the presence of the root element (#app by default).
  // Feel free to remove this `catch` if you don't need it.
  if (document.getElementById("app")) {
    throw error
  } else {
    console.error(
      "Missing root element.\n\n" +
      "If you see this error, it probably means you loaded Inertia.js on non-Inertia pages.\n" +
      'Consider moving <%= vite_typescript_tag "inertia.tsx" %> to the Inertia-specific layout instead.',
    )
  }
})
