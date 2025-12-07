import { createInertiaApp, type ResolvedComponent } from '@inertiajs/react'
import createServer from '@inertiajs/react/server'
import ReactDOMServer from 'react-dom/server'
import { type ReactNode, createElement } from "react"
import DefaultLayout from '@/layouts/default-layout'

createServer((page) =>
  createInertiaApp({
    page,
    render: ReactDOMServer.renderToString,
    resolve: (name) => {
      const pages = import.meta.glob<{ default: ResolvedComponent }>('../pages/**/*.tsx', { eager: true })
      const page = pages[`../pages/${name}.tsx`]
      if (!page) {
        console.error(`Missing Inertia page component: '${name}.tsx'`)
      }
      page.default.layout ||= (page: ReactNode) => createElement(DefaultLayout, null, page)
      return page
    },
    setup: ({ App, props }) => createElement(App, props),
  }),
  // By default, the SSR server will run on a single thread.
  // Clustering starts multiple Node servers on the same port,
  // requests are then handled by each thread in a round-robin way.
  // { cluster: true },
)