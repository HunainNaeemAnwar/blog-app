"use client";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
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
const NavBar = () => {
  const pathname = usePathname();
  if (pathname === "/" || pathname.includes("/studio")) {
    return null;
  }
  return (
    <nav className="navbar absolute left-0 top-0 w-full flex items-center justify-between px-10 py-8 lg:py-8 xl:py-8  border-b font-poppins text-[16px] lg:text-[18px]">
      <div className="flex items-center justify-center gap-6 md:gap-10">
        {navLinks.map((link) => (
          <Link
            key={link?.name}
            href={link?.href}
            className="relative group overflow-hidden"
          >
            {link?.name}
            <span className="absolute w-full h-[2px] bg-white inline-block bottom-0 left-0 -translate-x-[105%] group-hover:translate-x-0 transition-transform duration-500 "></span>
          </Link>
        ))}
      </div>
      <div className="flex items-center justify-center gap-10">
        <button>Log in</button>
      </div>
    </nav>
  );
};

export default NavBar;
