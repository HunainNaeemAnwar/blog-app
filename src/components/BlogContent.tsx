import { Post } from "@/sanity/types";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import createImageUrlBuilder from "@sanity/image-url";
import { client } from "../sanity/lib/client";

const builder = createImageUrlBuilder(client);

function urlFor(source: any) {
  return builder.image(source);
}

interface Props {
  posts: Post[];
}

const BlogContent = ({ posts }: Props) => {
  return (
    <section className=" py-20 flex flex-col gap-20 items-center  ">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 lg:gap-3 px-10 place-content-start">
        {posts.map((post) => (
          <Link
            href={{
              pathname: `/blog/${post?.slug?.current}`,
              query: { slug: post?.slug.current },
            }}
            key={post?._id}
          >
            <div className="relative flex flex-col bg-gray-800 shadow-md  rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
              {/* Image Section */}
              <div className="group relative overflow-hidden h-52">
                <Image
                  src={urlFor(post?.image).url()}
                  width={300}
                  height={200}
                  alt={post.title}
                  className="object-cover w-full h-full transform transition-transform duration-500 ease-in-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-40 transition-opacity duration-500"></div>
              </div>

              {/* Text Section */}
              <div className=" p-4 flex flex-col gap-2">
                <h3 className="text-lg hover:text-gray-800 font-semibold text-gray-100 transition-colors duration-200 ">
                  {post.title}
                </h3>
                <p className="text-[16px]  xl:text-[18px] font-oswald text-gray-400 hover:text-gray-600 transition-colors duration-200">
                  {post.description}
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  {new Date(post?._createdAt).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default BlogContent;
