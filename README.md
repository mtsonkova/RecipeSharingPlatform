This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Supabase Setup

This project uses [Supabase](https://supabase.com) for authentication and database.

### 1. Environment Variables

Copy `.env.example` to `.env.local` and fill in your Supabase credentials:

```bash
cp .env.example .env.local
```

Get your Supabase credentials from your project settings:
- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anonymous/public key
- `SUPABASE_SERVICE_ROLE_KEY`: Your Supabase service role key (server-side only)

### 2. Database Migration

Run the migration to create the necessary tables:

```bash
# If using Supabase CLI
supabase db push

# Or apply the migration manually through Supabase Dashboard
# Go to SQL Editor and run: supabase/migrations/001_create_profiles_and_recipes.sql
```

### 3. Supabase Clients

The project includes three Supabase client utilities:

- **Browser Client** (`lib/supabase/client.ts`): Use in Client Components
- **Server Client** (`lib/supabase/server.ts`): Use in Server Components, Server Actions, and Route Handlers
- **Admin Client** (`lib/supabase/admin.ts`): Use for server-side operations that bypass RLS (use sparingly)

Example usage:

```typescript
// In a Client Component
import { createClient } from "@/lib/supabase/client";
const supabase = createClient();

// In a Server Component or Server Action
import { createClient } from "@/lib/supabase/server";
const supabase = await createClient();

// Get authenticated user (redirects if not authenticated)
import { getAuthenticatedUser } from "@/lib/supabase/utils";
const user = await getAuthenticatedUser();
```

## Getting Started

First, install dependencies:

```bash
npm install
```

Then, set up your `.env.local` file with Supabase credentials (see Supabase Setup above).

Finally, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
