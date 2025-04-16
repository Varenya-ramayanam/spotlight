import SearchForm from "../../components/SearchForm";

export default async function Home({searchParams}: {searchParams: Promise<{query?: string}>}) {
  const query = (await searchParams).query || "";

  return (
    <>
      <section className="flex flex-col items-center justify-center  p-24 bg-pink-600">
        <h1 className="heading">Showcase your skills!!</h1>
        <p className="max-w-3xl">
          Submit ideas and projects to showcase your skills and get hired.
        </p>
        <SearchForm query={query}/>
      </section>

      <section className="flex flex-col items-center justify-center p-24 bg-white text-black">
        <p className="text-30-semibold">
          {query
            ? `Search results for "${query}"`
            : "All projects"}
        </p>
      </section>
    </>
  );
}
