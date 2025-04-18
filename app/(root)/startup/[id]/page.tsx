import { formatDate } from "@/lib/utils";
import { client } from "@/sanity/lib/client";
import { STARTUP_BY_ID_QUERY } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";
import Link from "next/link";
import markdownit from "markdown-it";
import { Skeleton } from "@/components/ui/skeleton";
import View from "@/components/View";

export const experimental_ppr = true;

const md = markdownit();

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const post = await client.fetch(STARTUP_BY_ID_QUERY, { id });

  if (!post) return notFound();

  const parsedContent = md.render(post?.pitch || "");

  return (
    <>
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center px-6 py-24 bg-gradient-to-br from-pink-500 to-red-400 text-white text-center">
        <p className="text-sm bg-amber-300 px-4 py-1 rounded-full mb-2 text-black">
          {formatDate(post?._createdAt)}
        </p>
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
          {post?.title}
        </h1>
        <p className="max-w-2xl text-lg md:text-xl mb-6">{post?.description}</p>
      </section>

      {/* Content Section */}
      <section className="flex flex-col items-center justify-center px-6 py-24 bg-white text-black">
        {/* Thumbnail */}
        <img
          src={post.image}
          alt="thumbnail"
          className="w-full max-w-4xl h-auto rounded-xl shadow-md object-cover"
        />

        <div className="space-y-8 mt-12 max-w-4xl w-full text-left">
          {/* Author and Category */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <Link
              href={`/user/${post.author?.id}`}
              className="flex items-center gap-4"
            >
              <img
                src={post.author?.image}
                alt="author"
                className="w-16 h-16 md:w-20 md:h-20 rounded-full shadow-lg"
              />
              <div>
                <h3 className="text-lg font-semibold">{post.author?.name}</h3>
                <p className="text-gray-500">@{post.author?.username}</p>
              </div>
            </Link>

            <span className="bg-gray-100 text-sm px-4 py-2 rounded-full shadow text-gray-700">
              {post.category}
            </span>
          </div>

          {/* Project Details */}
          <h3 className="text-2xl font-bold border-b pb-2">Project Details</h3>
          {parsedContent ? (
            <article
              className="prose prose-lg mt-4 break-words"
              dangerouslySetInnerHTML={{ __html: parsedContent }}
            />
          ) : (
            <p className="text-gray-500 italic">No details provided.</p>
          )}

          <hr className="my-12 border-t" />

          {/* Views */}
          <div className="fixed bottom-4 left z-50">
            <Suspense fallback={<Skeleton className="h-6 w-32" />}>
              <View id={id} />
            </Suspense>
          </div>
        </div>
      </section>
    </>
  );
};

export default page;
