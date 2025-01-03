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
    <main className="container flex min-h-screen flex-col mx-auto ">
      <div className="mt-20"><BlogContent posts={data} /></div>
    </main>
  );
}
