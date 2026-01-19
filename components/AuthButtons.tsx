"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { signOut } from "@/app/actions/auth";

type AuthButtonsProps = {
  username: string | null;
};

export function AuthButtons({ username }: AuthButtonsProps) {
  const router = useRouter();

  async function handleSignOut() {
    await signOut();
    router.refresh();
  }

  if (username) {
    return (
      <div className="flex items-center gap-3">
        <span className="text-sm text-black/70">@{username}</span>
        <button
          onClick={handleSignOut}
          className="rounded-md px-3 py-2 text-sm text-black/70 hover:bg-black/5 hover:text-black"
        >
          Sign out
        </button>
      </div>
    );
  }

  return (
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
  );
}
