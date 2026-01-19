# Supabase Client Setup

## Why We Use `@supabase/ssr` Instead of `@supabase/supabase-js` Directly

The Supabase website example shows:

```typescript
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://heolitohyhzaakecubrg.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)
```

**However, for Next.js 16 App Router, we use `@supabase/ssr` instead** because:

1. **Proper Auth State Management**: `@supabase/ssr` handles authentication cookies correctly between client and server
2. **Server Component Support**: Works seamlessly with Next.js Server Components
3. **Cookie Handling**: Automatically manages auth cookies for SSR/SSG
4. **Recommended Approach**: This is the official Supabase recommendation for Next.js App Router

## Client Files Overview

### `client.ts` - Browser Client
- **Use in**: Client Components (`'use client'`)
- **Purpose**: Client-side Supabase operations
- **Auth**: Handles auth state via cookies automatically

### `server.ts` - Server Client  
- **Use in**: Server Components, Server Actions, Route Handlers
- **Purpose**: Server-side Supabase operations with proper cookie handling
- **Auth**: Reads/writes auth cookies for session management

### `admin.ts` - Admin Client
- **Use in**: Server Actions or Route Handlers only (never expose to client)
- **Purpose**: Operations that bypass Row Level Security (RLS)
- **Warning**: Only use when absolutely necessary, as it bypasses security policies

## Environment Variables

Make sure your `.env.local` has:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key  # Server-side only
```

**Important**: 
- `NEXT_PUBLIC_*` variables are exposed to the browser (safe for anon key)
- `SUPABASE_SERVICE_ROLE_KEY` should NEVER be exposed to the client

## Usage Examples

### Client Component
```tsx
'use client'
import { createClient } from '@/lib/supabase/client'

export function MyComponent() {
  const supabase = createClient()
  // Use supabase here
}
```

### Server Component
```tsx
import { createClient } from '@/lib/supabase/server'

export async function MyServerComponent() {
  const supabase = await createClient()
  const { data } = await supabase.from('recipes').select()
  // ...
}
```

### Server Action
```tsx
'use server'
import { createClient } from '@/lib/supabase/server'

export async function myAction() {
  const supabase = await createClient()
  // Use supabase here
}
```
