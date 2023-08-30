import Link from "next/link";
import React from "react";
import Particles from "./components/particles";

export const navigation = [
  { name: 'Home', href: "/"},
  { name: "Learn", href: "/learn" },
  { name: "About Me", href: "/about" },
];

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen overflow-hidden bg-gradient-to-tl from-black via-zinc-600/20 to-black">
      <nav className="my-16 animate-fade-in">
        <ul className="flex items-center justify-center gap-4">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-2xl duration-500 text-zinc-500 hover:text-zinc-300"
            >
              {item.name}
            </Link>
          ))}
        </ul>
      </nav>
      <div className="hidden w-screen h-px md:block animate-fade-left bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
      <Particles
        className="absolute inset-0 -z-10 animate-fade-in"
        quantity={500}
        staticity={10}
      />
      <Link
      key={'learn'}
      href={'learn'}
      >
        <h1 className="z-10 text-4xl text-transparent duration-1000 bg-white cursor-hand text-edge-outline animate-title font-display sm:text-6xl md:text-9xl whitespace-nowrap bg-clip-text">
          The Next Data Scientist
        </h1>
      </Link>

      <div className="hidden w-screen h-px md:block animate-fade-right bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
      <div className="my-16 text-center animate-fade-in">
        <h2 className="text-md text-zinc-500">
          Your one-stop solution to becoming the next data scientist!
          <br />
          Unlock the world of data science at "The Next Data Scientist" - Your ultimate resource for mastering the art of data science through insightful blogs and engaging YouTube tutorials.
        </h2>
      </div>
    </div>
  );
}
