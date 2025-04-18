import { client } from "@/sanity/lib/client";
import { STARTUP_VIEWS_QUERY } from "@/sanity/lib/queries";
import { writeClient } from "@/sanity/lib/write-client";
import Ping from "./Ping";
import { Eye } from "lucide-react";

const View = async ({ id }: { id: string }) => {
  const { views: totalViews } = await client
    .withConfig({ useCdn: false })
    .fetch(STARTUP_VIEWS_QUERY, { id });

  await writeClient
    .patch(id)
    .set({ views: totalViews + 1 })
    .commit();

  return (
    <div className="relative mt-10 flex items-center gap-3 px-4 py-2 rounded-md shadow-md border border-gray-200 bg-gray-50">
      <Ping />
      <Eye className="text-gray-700" />
      <span className="text-sm font-medium text-gray-700">Views:</span>
      <span className="text-sm font-bold text-black">{totalViews}</span>
    </div>
  );
};

export default View;
