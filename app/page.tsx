type RecipeCard = {
  id: string;
  title: string;
  description: string;
};

const featuredRecipes: readonly RecipeCard[] = [
  {
    id: "1",
    title: "Delicious Recipe 1",
    description:
      "A wonderful description of this amazing recipe that will make your mouth water.",
  },
  {
    id: "2",
    title: "Delicious Recipe 2",
    description:
      "A wonderful description of this amazing recipe that will make your mouth water.",
  },
  {
    id: "3",
    title: "Delicious Recipe 3",
    description:
      "A wonderful description of this amazing recipe that will make your mouth water.",
  },
] as const;

export default function Home() {
  return (
    <div className="flex flex-col items-center gap-12">
      <section className="flex w-full flex-col items-center gap-6 rounded-2xl bg-white px-6 py-16 text-center shadow-sm">
        <h1 className="text-4xl font-bold leading-tight text-black sm:text-5xl">
          Share Your Culinary
          <br />
          Masterpieces
        </h1>
        <p className="max-w-2xl text-lg text-zinc-600">
          Join our community of food lovers. Share recipes, discover new dishes,
          and connect with fellow cooking enthusiasts.
        </p>
        <a
          href="/recipes/new"
          className="mt-2 rounded-md bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-black/90"
        >
          Start Sharing
        </a>
      </section>

      <section className="w-full">
        <h2 className="mb-6 text-center text-2xl font-semibold text-black">
          Featured Recipes
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredRecipes.map((recipe) => (
            <article
              key={recipe.id}
              className="flex h-full flex-col overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm"
            >
              <div className="h-44 w-full bg-gradient-to-br from-zinc-200 to-zinc-300" />
              <div className="flex flex-1 flex-col gap-2 px-4 py-4">
                <h3 className="text-sm font-semibold text-black">
                  {recipe.title}
                </h3>
                <p className="text-sm leading-relaxed text-zinc-600">
                  {recipe.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
