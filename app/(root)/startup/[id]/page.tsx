import { Suspense } from "react";
import { client } from "@/sanity/lib/client";
import {
  PLAYLIST_BY_SLUG_QUERY,
  STARTUP_BY_ID_QUERY,
} from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import { formatDate } from "@/lib/utils";
import Link from "next/link";


import markdownit from "markdown-it";
import { Skeleton } from "@/components/ui/skeleton";
import View from "@/components/View";
import StartupCard, { StartupCardType } from "@/components/StartupCard";

const md = markdownit();

export const experimental_ppr = true;

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;

  const [post, { select: editorPosts }] = await Promise.all([
    client.fetch(STARTUP_BY_ID_QUERY, { id }),
    client.fetch(PLAYLIST_BY_SLUG_QUERY, {
      slug: "editor-picks-new",
    }),
  ]);

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
              href={`/user/${post.author?._id}`}
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
          {/* Editor Picks */}
          {editorPosts?.length > 0 && (
            <div className="editor-picks max-w-4xl mx-auto">
              <p className="text-2xl font-semibold text-gray-800">
                Editor Picks
              </p>

              <ul className="card-grid mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {editorPosts.map((post: StartupCardType, i: number) => (
                  <StartupCard key={i} post={post} />
                ))}
              </ul>
            </div>
          )}

          {/* Views */}
          <div className="fixed bottom-4 right-4 z-50">
            <Suspense fallback={<Skeleton className="h-6 w-32" />}>
              <View id={id} />
            </Suspense>
          </div>
        </div>
      </section>
    </>
  );
};

export default Page;
