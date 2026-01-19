import Link from "next/link";

type NavItem = {
  href: string;
  label: string;
};

const NAV_ITEMS: readonly NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/recipes", label: "Explore" },
  { href: "/recipes/new", label: "Upload" },
  { href: "/profile", label: "Profile" },
] as const;

export function Header() {
  return (
    <header className="border-b border-black/10 bg-background">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-6 px-4 py-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-base font-semibold tracking-tight">
            RecipeShare
          </span>
          <span className="rounded-full border border-black/10 px-2 py-0.5 text-xs text-black/60">
            MVP
          </span>
        </Link>

        <nav className="hidden items-center gap-1 sm:flex" aria-label="Primary">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 text-sm text-black/70 hover:bg-black/5 hover:text-black"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/login"
            className="rounded-md px-3 py-2 text-sm text-black/70 hover:bg-black/5 hover:text-black"
          >
            Log in
          </Link>
          <Link
            href="/signup"
            className="rounded-md bg-black px-3 py-2 text-sm font-medium text-white hover:bg-black/90"
          >
            Sign up
          </Link>
        </div>
      </div>

      <nav
        className="mx-auto flex w-full max-w-5xl items-center gap-1 overflow-x-auto px-2 pb-3 sm:hidden"
        aria-label="Primary"
      >
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="shrink-0 rounded-md px-3 py-2 text-sm text-black/70 hover:bg-black/5 hover:text-black"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}

