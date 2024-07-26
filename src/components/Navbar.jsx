import React from "react";

export default function Navbar() {
  return (
    <header
      class='flex flex-wrap sm:justify-start sm:flex-nowrap w-full bg-white text-sm py-3'
      style={{
        backgroundColor: "#1F0021",
      }}
    >
      <nav class='max-w-[85rem] w-full mx-3 sm:flex sm:items-center sm:justify-between'>
        <p
          class='flex-none font-bold text-xl text-black focus:outline-none focus:opacity-80 dark:text-white'
          href='#'
          aria-label='Brand'
        >
          LiftLog
        </p>
      </nav>
    </header>
  );
}
