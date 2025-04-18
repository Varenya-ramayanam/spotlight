import { auth } from "@/auth";
import { client } from "@/sanity/lib/client";
import { AUTHOR_BY_ID_QUERY } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import Image from "next/image";
import UserStartups from "../../../../components/UserStartups";
import { Suspense } from "react";
import { StartupCardSkeleton } from "@/components/StartupCard";

export const experimental_ppr = true;

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const session = await auth();

  const user = await client.fetch(AUTHOR_BY_ID_QUERY, { id });
  if (!user) return notFound();

  return (
    <section className="profile-container bg-gradient-to-br from-[#f0f4ff] to-[#e4ecff] py-10">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl p-8">
        <div className="profile-card text-center mb-8">
          <div className="profile-title mb-4">
            <h3 className="text-3xl font-semibold text-gray-800 capitalize">{user.name}</h3>
          </div>

          <div className="profile-image mb-4">
            <Image
              src={user.image}
              alt={user.name}
              width={220}
              height={220}
              className="rounded-full mx-auto border-4 border-indigo-600"
            />
          </div>

          <p className="text-2xl font-bold text-indigo-600">@{user?.username}</p>
          <p className="text-gray-500 text-lg mt-2">{user?.bio}</p>
        </div>

        <div className="user-startups mt-8">
          <p className="text-2xl font-bold text-gray-800">
            {session?.id === id ? "Your" : "All"} Projects
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            <Suspense fallback={<StartupCardSkeleton />}>
              <UserStartups id={id} />
            </Suspense>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Page;
