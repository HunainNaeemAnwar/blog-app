import NavHero from "@/components/NavHero";
import { client } from "@/sanity/lib/client";
import BlogContent from "@/components/BlogContent";

async function getData() {
  const data = await client.fetch(`*[_type == "blog"] {
  ...,
title,
longDescription,
description,
image,
}`);
  return data;
}

export default async function Home() {
  const data = await getData();
  return (
    <main className="container items-center justify-center flex min-h-screen flex-col mx-auto">
      <NavHero posts={data} />


      <BlogContent posts={data} />
    </main>
  );
}
