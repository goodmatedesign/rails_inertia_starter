# Rails SaaS Starter

A modern Rails 8.1 + React SaaS starter with authentication, admin panel, and Docker deployment.

## Tech Stack

- **Backend**: Rails 8.1, PostgreSQL, Puma
- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS 4
- **Integration**: Inertia.js (seamless frontend-backend)
- **Auth**: Passwordless magic link + Google OAuth
- **Admin**: Avo admin panel
- **I18n**: Rails i18n + i18n-js (URL-based locale switching)
- **Deployment**: Kamal (Docker-based)

## Quick Start

### Prerequisites

- Ruby 3.4+
- Node.js 20+
- PostgreSQL

### Setup

```bash
# Clone and install dependencies
git clone <repo-url>
cd rails_saas_starter
bin/setup
```

### Development

```bash
bin/dev  # Starts Rails + Vite
```

Visit http://localhost:3000

## Configuration

### Rails Credentials

Edit credentials with:

```bash
bin/rails credentials:edit
```

Add these keys:

```yaml
# Google OAuth (required for Google sign-in)
google:
  client_id: your_google_client_id
  client_secret: your_google_client_secret
```

### Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Create a new project or select existing
3. Go to "Credentials" > "Create Credentials" > "OAuth client ID"
4. Choose "Web application"
5. Add authorized redirect URIs:
   - Development: `http://localhost:3000/auth/google_oauth2/callback`
   - Production: `https://yourdomain.com/auth/google_oauth2/callback`
6. Copy Client ID and Client Secret to Rails credentials

### Database

Development uses PostgreSQL with default settings. Configure in `config/database.yml` if needed.

```bash
bin/rails db:prepare  # Create and migrate
bin/rails db:reset    # Reset database
```

## Authentication

### Magic Link (Email)

Users enter email, receive a sign-in link valid for 1 hour.

### Google OAuth

"Continue with Google" button on sign-in page.

### Account Linking

If a user signs up with email first, then uses Google (same email), accounts are automatically linked.

### Admin Access

Make a user admin via Rails console:

```bash
bin/rails console
> User.find_by(email: "you@example.com").update!(admin: true)
```

Admin panel available at `/avo` (admin users only).

## Deployment

### Kamal Setup

1. Configure `.kamal/secrets`:

```bash
RAILS_MASTER_KEY=<your-master-key>
POSTGRES_PASSWORD=<secure-password>
```

2. Update `config/deploy.yml`:
   - Set your server IP
   - Set your domain
   - Configure registry settings

3. Deploy:

```bash
bin/kamal setup   # First deploy
bin/kamal deploy  # Subsequent deploys
```

### Production Credentials

For production, create separate credentials:

```bash
EDITOR="code --wait" bin/rails credentials:edit --environment production
```

Add the same keys as development credentials.

### Environment Variables

Required in production:

- `RAILS_MASTER_KEY` - Rails credentials key
- `POSTGRES_PASSWORD` - Database password
- `DB_HOST` - Database host (set in deploy.yml)

## Internationalization (i18n)

This app supports multiple languages using Rails i18n on the backend and i18n-js on the frontend.

### Supported Locales

- English (`en`) - default
- Chinese (`zh`)

### How It Works

- **URL-based**: Locale is determined by URL prefix (`/en/...`, `/zh/...`)
- **Session persistence**: Locale is stored in session for non-localized routes (e.g., OAuth callbacks)
- **Shared translations**: Rails YAML translations are exported to JSON for React

### Adding Translations

1. Add translations to `config/locales/en.yml` and `config/locales/zh.yml`:

```yaml
# config/locales/en.yml
en:
  my_feature:
    title: "My Feature"
    description: "Feature description"
```

2. Export translations to frontend:

```bash
bundle exec i18n export
```

3. Use in React components:

```tsx
import { useI18n } from '@/hooks/use-i18n'

export default function MyComponent() {
  const { t } = useI18n()

  return <h1>{t("my_feature.title")}</h1>
}
```

4. Use in Rails controllers/views:

```ruby
flash[:notice] = t("flash.signed_in")
```

### Adding a New Locale

1. Add locale to `config/application.rb`:

```ruby
config.i18n.available_locales = [:en, :zh, :es]  # Add :es
```

2. Create locale file `config/locales/es.yml`

3. Update `app/frontend/types/index.ts`:

```typescript
export type Locale = "en" | "zh" | "es"
```

4. Update `app/frontend/components/locale-switcher.tsx`:

```typescript
const localeNames: Record<string, string> = {
  en: "EN",
  zh: "中文",
  es: "ES",
}
```

5. Import new locale in `app/frontend/lib/i18n.ts`:

```typescript
import es from "@/locales/es.json"

const i18n = new I18n({
  ...en,
  ...zh,
  ...es,
})
```

6. Export translations:

```bash
bundle exec i18n export
```

### Auto-Export During Development

Add to `config/initializers/i18n.rb`:

```ruby
Rails.application.config.after_initialize do
  require "i18n-js/listen"
  I18nJS.listen
end
```

This auto-exports translations when locale files change.

### Localized Links in React

Always include the locale in links:

```tsx
import { usePage } from '@inertiajs/react'
import type { SharedProps } from '@/types'

const { locale } = usePage<SharedProps>().props

<Link href={`/${locale}/posts`}>Posts</Link>
```

## Testing

```bash
bin/rails test          # Run all tests
bin/rails test:system   # System tests
npm run check           # TypeScript check
bin/ci                  # Full CI suite
```

## Project Structure

```
app/
├── controllers/        # Rails controllers
├── frontend/           # React frontend
│   ├── components/     # Shared components
│   ├── pages/          # Inertia pages
│   ├── hooks/          # React hooks
│   ├── locales/        # Exported JSON translations
│   ├── lib/            # Utilities (i18n setup, etc.)
│   └── types/          # TypeScript types
├── models/             # Rails models
├── mailers/            # Email templates
└── avo/                # Admin panel resources
config/
├── locales/            # Rails YAML translations (en.yml, zh.yml)
└── i18n.yml            # i18n-js export configuration
```

## License

MIT
