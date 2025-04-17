import SearchForm from "../../components/SearchForm";
import StartupCard from "../../components/StartupCard";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query || "";

  const posts = [
    {
      _createdAt: new Date(),
      views: 55,
      author: {
        _id: 1,
        name: "John Doe",
        image: "https://via.placeholder.com/150",
      },
      _id: 1,
      description: "This is a test project that demonstrates how to use modern React components beautifully.",
      image:
        "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?cs=srgb&dl=pexels-souvenirpixels-417074.jpg&fm=jpg",
      title: "Test Project",
      tags: ["test", "project"],
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center px-6 py-24 bg-gradient-to-br from-pink-500 to-red-400 text-white text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Showcase Your Skills</h1>
        <p className="max-w-2xl text-lg md:text-xl mb-6">
          Submit your ideas and projects to impress recruiters and land your dream job.
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
    </>
  );
}
