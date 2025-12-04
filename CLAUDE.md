# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Commands

### Development
- `bin/setup` - Install dependencies, prepare database, and start dev server
- `bin/dev` - Start development server (Rails + Vite via foreman/overmind)
- `bin/rails s` - Start Rails server only
- `bin/vite dev` - Start Vite dev server only

### Testing & Quality
- `bin/rails test` - Run Rails tests
- `bin/rails test:system` - Run system tests
- `bin/rails test test/models/user_test.rb` - Run a single test file
- `bin/rails test test/models/user_test.rb:10` - Run a specific test by line number
- `bin/rubocop` - Run Ruby linter (Rails Omakase style)
- `bin/brakeman` - Run security scanner
- `bin/bundler-audit` - Check gems for known vulnerabilities
- `npm run check` - Run TypeScript type checking
- `bin/ci` - Run full CI suite (setup, rubocop, security audits, all tests)

### Database
- `bin/rails db:prepare` - Create/migrate database
- `bin/rails db:reset` - Drop, create, migrate, seed

### Deployment
- Uses Kamal for Docker-based deployment
- `bin/kamal deploy` - Deploy to production

## Architecture

This is a Rails 8.1 + React SaaS starter using Inertia.js for seamless frontend-backend integration.

### Tech Stack
- **Backend**: Rails 8.1, PostgreSQL, Puma
- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS 4
- **Integration**: Inertia.js (replaces traditional Rails views with React components)
- **Assets**: Propshaft + Vite Ruby (vite_rails gem)

### Frontend Structure (`app/frontend/`)
- `entrypoints/` - Vite entry points (`application.ts`, `inertia.tsx`, `application.css`)
- `pages/` - Inertia page components (React), organized by controller/action (e.g., `pages/inertia_example/index.tsx`)
- `types/` - TypeScript type definitions including shared props
- `assets/` - Static assets (SVGs, images)

### Inertia.js Pattern
Controllers inherit from `InertiaController` and render React components:
```ruby
class MyController < InertiaController
  def show
    render inertia: { data: @record }
  end
end
```

Props are passed directly to corresponding React components in `app/frontend/pages/`.

Page component resolution: `render inertia: { ... }` in `my_controller#show` renders `app/frontend/pages/my/show.tsx`.

### Shared Props
- `InertiaController` shares `flash` with all Inertia pages via `inertia_share`
- TypeScript types for shared props are in `app/frontend/types/index.ts`
