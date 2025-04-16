"use client";
import React from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Search } from 'lucide-react';
const SearchForm = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get('query') || '';

  return (
    <div className="flex justify-center mt-10">
      <form className="relative w-full max-w-2xl" method="GET" action="/">
        <input
          type="text"
          name="query"
          defaultValue={query}
          placeholder="Search for projects..."
          className="w-full p-4 pr-24 pl-16 border border-black rounded-full bg-white text-black text-2xl focus:outline-none focus:ring-2"
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black text-white px-4 py-2 rounded-full text-xl"
          title="Search"
        >
          <Search />
        </button>

        {/* Reset Button - only shows when query exists */}
        {query && (
          <Link
            href="/"
            title="Reset"
            className="absolute right-20 top-1/2 -translate-y-1/2 bg-black text-white px-4 py-2 rounded-full text-xl"
          >
            X
          </Link>
        )}
      </form>
    </div>
  );
};

export default SearchForm;
