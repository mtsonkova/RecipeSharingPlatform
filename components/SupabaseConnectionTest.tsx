import { createClient } from "@/lib/supabase/server";

export async function SupabaseConnectionTest() {
  try {
    const supabase = await createClient();

    // Test connection by fetching profiles count
    const { count, error } = await supabase
      .from("profiles")
      .select("*", { count: "exact", head: true });

    if (error) {
      return (
        <section className="w-full rounded-lg border border-red-200 bg-red-50 px-6 py-4">
          <h3 className="mb-2 text-lg font-semibold text-red-900">
            Supabase Connection Test
          </h3>
          <p className="text-sm text-red-700">
            Connection error: {error.message}
          </p>
        </section>
      );
    }

    return (
      <section className="w-full rounded-lg border border-zinc-200 bg-white px-6 py-4 shadow-sm">
        <h3 className="mb-3 text-lg font-semibold text-zinc-900">
          Supabase Connection Test
        </h3>
        <div className="rounded-md bg-emerald-50 px-4 py-2">
          <p className="text-sm font-medium text-emerald-800">
            Successfully connected to Supabase!
          </p>
        </div>
        <p className="mt-2 text-sm text-zinc-600">
          Found {count ?? 0} profile{count === 1 ? "" : "s"}
        </p>
      </section>
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";

    return (
      <section className="w-full rounded-lg border border-red-200 bg-red-50 px-6 py-4">
        <h3 className="mb-2 text-lg font-semibold text-red-900">
          Supabase Connection Test
        </h3>
        <p className="text-sm text-red-700">Error: {errorMessage}</p>
      </section>
    );
  }
}
