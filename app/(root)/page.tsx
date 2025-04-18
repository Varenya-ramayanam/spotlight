
import SearchForm from "../../components/SearchForm";
import StartupCard, { StartupCardType } from "../../components/StartupCard";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;

  const params = {search:query||null};



  const { data: posts } = await sanityFetch({
    query: STARTUPS_QUERY,
    params
  });
  // console.log(JSON.stringify(posts, null, 2));

  return (
    <>
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center px-6 py-24 bg-gradient-to-br from-pink-500 to-red-400 text-white text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
          Showcase Your Skills
        </h1>
        <p className="max-w-2xl text-lg md:text-xl mb-6">
          Submit your ideas and projects to impress recruiters and land your
          dream job.
        </p>
        <SearchForm query={query} />
      </section>

      {/* Search Results Heading */}
      <section className="flex flex-col items-center justify-center px-6 py-12 bg-white text-black">
        <p className="text-2xl font-semibold">
          {query ? `Search results for "${query}"` : "Explore All Projects"}
        </p>
      </section>

      {/* Projects Grid */}
      <section className="px-6 pb-24 bg-gray-50">
        <ul className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {posts?.length > 0 ? (
            posts.map((post: StartupCardType) => (
              <StartupCard key={post?._id} post={post} />
            ))
          ) : (
            <div className="col-span-full text-center py-10">
              <h2 className="text-xl font-semibold mb-2">No projects found</h2>
              <p className="text-gray-600">Try searching for something else.</p>
            </div>
          )}
        </ul>
      </section>

      <SanityLive/>
    </>
  );
}
