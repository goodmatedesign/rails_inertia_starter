# Rails SaaS Starter

A modern Rails 8.1 + React SaaS starter with authentication, admin panel, and Docker deployment.

## Tech Stack

- **Backend**: Rails 8.1, PostgreSQL, Puma
- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS 4
- **Integration**: Inertia.js (seamless frontend-backend)
- **Auth**: Passwordless magic link + Google OAuth
- **Admin**: Avo admin panel
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
│   └── types/          # TypeScript types
├── models/             # Rails models
├── mailers/            # Email templates
└── avo/                # Admin panel resources
```

## License

MIT
