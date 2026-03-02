# Sync Automations - AI Coordination Platform

An enterprise SaaS monorepo built for high-end agencies to eliminate revenue leakage from manual coordination. Built using open-source minimal-cost stack constraints.

## Architecture

- **Monorepo**: Turborepo + pnpm
- **Frontend App**: Next.js 16.x (App Router), Tailwind CSS
- **Backend App**: Next.js 16.x (Route Handlers acting as API)
- **Validation**: Zod
- **Testing**: Jest, Supertest, Playwright + Axe-core
- **CI/CD**: GitHub Actions (Lint, Typecheck, Test, Coverage, Lighthouse, npm audit)

## Prerequisites

- Node.js >= 18
- pnpm >= 8

## Local Setup

1. Install dependencies:

   ```bash
   pnpm install
   ```

2. Run development servers (Web and API):
   ```bash
   pnpm run dev
   ```

   - Web App will be available at `http://localhost:3000`
   - API App will be available at `http://localhost:3001`

## Running Tests

- **Unit Tests (Jest)**:
  ```bash
  pnpm run test
  ```
- **E2E Tests & Accessibility (Playwright + Axe-core)**:
  ```bash
  npx playwright install --with-deps
  npx playwright test
  ```

## Deployment Steps

This project uses free tiers for Vercel (Frontend) and Render (Backend).

### 1. Deploying Backend to Render (Free Tier)

1. Create an account on [Render](https://render.com/).
2. Click "New" -> "Web Service".
3. Connect your GitHub repository.
4. Configure the service:
   - **Name**: `sync-automations-api`
   - **Root Directory**: `apps/api`
   - **Environment**: `Node`
   - **Build Command**: `pnpm install && next build`
   - **Start Command**: `next start -p $PORT` (Render handles port injection)
5. Set Environment Variables:
   - `FRONTEND_URL`: `https://sync-automations-web.vercel.app` (or your actual Vercel domain)
   - `NODE_ENV`: `production`
6. Click "Create Web Service".

### 2. Deploying Frontend to Vercel (Free Tier)

1. Create an account on [Vercel](https://vercel.com/).
2. Click "Add New..." -> "Project".
3. Import your GitHub repository.
4. Vercel automatically detects the Turborepo/Next.js setup. Set up the project configuration:
   - **Framework Preset**: Next.js
   - **Root Directory**: `apps/web`
5. Click "Deploy".
6. Ensure the backend URL is properly configured in your deployment settings or hardcoded (for now we rewrite/fetch based on domain/API).

## Security & Rate Limiting (Free tier built-ins)

All Next.js API endpoints use in-memory rate limiting and employ strict CORS filtering ensuring `api` routes only process requests originating from the `web` domain.

## Continous Integration

GitHub Actions validates every Pull Request and Push to main. It runs:

- `npm audit`
- Lighthouse performance metrics checks
- Playwright End to End tests & Axe-core accessibility validations
- Jest code coverage
