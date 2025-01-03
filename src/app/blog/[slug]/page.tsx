import React from "react";
import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import Image from "next/image";

const builder = imageUrlBuilder(client);

function urlFor(source: any) {
  return builder.image(source);
}

interface Post {
  title: string;
  summary: string;
  image: any;
  longDescription: string;
  slug: {
    current: string;
  };
  body: any;
  author: any;
}

export const generateStaticParams = async () => {
  const query = groq`*[_type == 'blog']{
    slug
  }`;
  const slugs: Post[] = await client.fetch(query);
  const slugRoutes = slugs.map((slug) => slug?.slug?.current);
  return slugRoutes?.map((slug) => ({
    slug,
  }));
};

interface Props {
  params: {
    slug: string;
  };
}

const SlugPage: React.FC<Props> = async ({ params }: Props) => {
  const { slug } = await params; // Destructure `slug` here

  const query = groq`*[_type == 'blog' && slug.current == $slug][0]{
    title,
    image,
    summary,
    longDescription,
  }`;
  const post: Post = await client.fetch(query, { slug });

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className="post flex flex-col items-center justify-center gap-10 mt-48 pb-20 relative container">
      <div className=" mb-20 border px-6 py-2 ">
        <h1 className="   tracking-tight font-sans font-semibold uppercase text-[45px] md:text-[64px]    ">
          {post.title}
        </h1>
      </div>

      <Image
        src={urlFor(post.image).url()}
        alt={post.title}
        width={800}
        height={500}
        className="border "
      />
      <div className="relative bg-slate-500 w-full px-28  md:px-12 lg:px-20 mb-10">
        <div className="absolute flex justify-start item-start">
          <div className="  flex flex-row gap-6 items-center  ">
            <div className="w-5 h-10 bg-white rounded-sm"></div>
            <div>
              <h2 className="font-poppins text-[40px]">Blog </h2>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col  gap-10  ">
        <div className=" px-6 lg:px-20 text-center text-[20px] font-poppins leading-[40px]">
          {post.longDescription}
        </div>
        <div className=" flex flex-row gap-6  items-center  ">
          <div className="w-5 h-10 relative left-20 md:left-12 lg:left-20 bg-white rounded-sm"></div>
          <div>
            <h2 className="font-poppins text-[40px] relative left-20 md:left-12 lg:left-20">
              Summary{" "}
            </h2>
          </div>
        </div>
        <div className="px-6 lg:px-20 text-center text-[20px] font-poppins leading-[40px] ">
          {post.summary}
        </div>
      </div>
    </div>
  );
};

export default SlugPage;
