"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "@/app/actions/auth";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const result = await signIn(email, password);

    if (result.success) {
      router.push("/");
      router.refresh();
    } else {
      setError(result.error.message);
      setIsLoading(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-md">
      <div className="rounded-2xl border border-black/10 bg-white p-8 shadow-sm">
        <h1 className="mb-6 text-2xl font-bold text-black">Log in</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label
              htmlFor="email"
              className="mb-1 block text-sm font-medium text-black"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-md border border-black/10 bg-white px-3 py-2 text-sm text-black placeholder:text-black/40 focus:border-black/30 focus:outline-none focus:ring-1 focus:ring-black/20"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1 block text-sm font-medium text-black"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-md border border-black/10 bg-white px-3 py-2 text-sm text-black placeholder:text-black/40 focus:border-black/30 focus:outline-none focus:ring-1 focus:ring-black/20"
              placeholder="Enter your password"
            />
          </div>

          {error && (
            <div className="rounded-md bg-red-50 border border-red-200 px-3 py-2 text-sm text-red-800">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="mt-2 rounded-md bg-black px-4 py-2 text-sm font-semibold text-white transition hover:bg-black/90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoading ? "Logging in..." : "Log in"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-black/60">
          Don't have an account?{" "}
          <Link
            href="/signup"
            className="font-medium text-black hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
