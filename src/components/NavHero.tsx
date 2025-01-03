import React from "react";
import Image from "next/image";
import Link from "next/link";
import "../css/vignette.css";
import { BsArrowRight } from "react-icons/bs";

interface Post {
  slug: {
    current: string;
  };
  // Add other properties of Post as needed
}
import { client } from "../sanity/lib/client";

const navLinks = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Blogs",
    href: "/blogs",
  },
  {
    name: "About",
    href: "/about",
  },
];
async function getData() {
  const data = await client.fetch(`*[_type == "heroSection"] {
  heading,
    subtext,
  "imageUrl":image.asset->url
}`);
  return data;
}
interface Props {
  posts: Post[];
}
const Navbar = async ({ posts }: Props) => {
  const data = await getData();
  return (
    <div className="relative h-[900px] ">
      {/* Hero Image */}

      <div className=" absolute vignette block w-full h-full">
        <Image
          src={data[0]?.imageUrl}
          alt="heroPic"
          width={1000}
          height={1000}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Navigation bar */}

      <nav className="navbar absolute left-0 top-0 w-full flex items-center justify-between px-10 py-3 lg:py-6 xl:py-8  font-poppins text-[16px] lg:text-[18px]">
        <div className="flex items-center justify-center gap-10 ">
          {navLinks.map((link) => (
            <Link
              key={link?.name}
              href={link?.href}
              className="relative group overflow-hidden"
            >
              {link?.name}
              <span className="bg-white w-full absolute bottom-0 left-0 inline-block h-[2px] -translate-x-[105%] group-hover:translate-x-0 transition-transform duration-500"></span>
            </Link>
          ))}
        </div>
        <div>
          <button className="hover:border border-white py-1 px-2 rounded-md">
            Log in
          </button>
        </div>
      </nav>
      {/* Hero Text */}
      <div className="absolute left-10 top-[350px] flex flex-col gap-4 w-[400px] md:w-[500px] lg:w-[600px] text-shadow-sm ">
        <p className="font-poppins font-medium text-[20px] lg:text-[24px]  text-shadow-md ">
          Most Popular
        </p>
        <h2 className="font-oswald font-bold text-shadow-md lg:text-shadow-lg lg:text-[64px] text-[50px] uppercase tracking-tight">
          {data[0]?.heading}
        </h2>
        <p className=" text-[16px] lg:text-[18px] font-poppins font-normal text-shadow-md">
          {data[0]?.subtext}
        </p>
        <Link  href={{
              pathname: `/blog/${posts[0]?.slug?.current}`,
              query: { slug: posts[0]?.slug?.current },
            }} className=" mt-4 w-max">
          <div className="flex items-center justify-start gap-2 hover:border border-[#a6a3a3] rounded-md px-3 py-1 ">
            Read More
            <BsArrowRight className="w-5 h-5 lg:w-6 lg:h-6  text-white" />
          </div>
        </Link>
      </div>
    </div>
  );
};
export default Navbar;
