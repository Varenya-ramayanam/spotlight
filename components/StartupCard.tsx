import { formatDate } from "@/lib/utils";
import { EyeIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import { Author } from "@/sanity/type";
import { Startup } from "@/sanity/type";


export type StartupCardType = Omit<Startup, "author"> & {author?:Author}


const StartupCard = ({ post }: { post: StartupCardType }) => {
  return (
    <li className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-4 max-w-md w-full">
      {/* Top Image */}
      <Link href={`/startup/${post._id}`}>
        <img
          src={post?.image}
          alt={post?.title}
          className="rounded-xl object-cover w-full h-48 mb-4"
        />
      </Link>

      {/* Metadata */}
      <div className="flex justify-between items-center text-sm text-gray-500 mb-2">
        <p>{formatDate(post._createdAt)}</p>
        <div className="flex items-center gap-1">
          <EyeIcon className="w-4 h-4" />
          <span>{post.views}</span>
        </div>
      </div>

      {/* Title & Author */}
      <div className="mb-3">
        <Link href={`/startup/${post._id}`}>
          <h3 className="text-xl font-semibold text-black hover:text-blue-600 line-clamp-1">
            {post.title}
          </h3>
        </Link>
        <div className="flex items-center gap-3 mt-2">
          <Link href={`/user/${post?.author?._id}`}>
            <Image
              src="https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?cs=srgb&dl=pexels-souvenirpixels-417074.jpg&fm=jpg"
              alt="Author"
              width={36}
              height={36}
              className="rounded-full object-cover"
            />
          </Link>
          <Link
            href={`/user/${post?.author?._id}`}
            className="text-blue-600 hover:underline font-medium"
          >
            {post?.author?.name}
          </Link>
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-700 text-sm mb-4 line-clamp-3">{post?.description}</p>
 
      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
      <Link href={`/?query=${post?.category?.toLowerCase()}`}>
          <p className="text-16-medium">{post?.category}</p>
        </Link>
      </div>

      {/* Call to Action */}
      <div className="text-right">
        <Button className="bg-black">
          <Link href={`/startup/${post._id}`}>View Details</Link>
        </Button>
      </div>
    </li>
  );
};

export default StartupCard;
