# Paused portal implementation

The public `/login`, `/forgot-password`, `/setup`, `/admin/**`, and `/dashboard/**` routes currently show a Coming soon screen. Their previous page and layout implementations are preserved here under the same `app/` paths. Authentication actions, Supabase helpers, and the interactive workspace components remain in their original locations.

To reactivate the portal, move each preserved file back to its matching root `app/` path, restore the role-aware navigation from `components/auth-nav-links.tsx`, and verify the Supabase environment, schema, RLS policies, login, setup, admin, and client flows before deployment. The Next 16 login route should use an async server wrapper that awaits `searchParams` and renders the preserved `login-screen.tsx` component.

These files are intentionally outside the root `app/` route tree, so they cannot become live routes accidentally.
