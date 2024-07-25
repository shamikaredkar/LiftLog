import React from "react";

export default function ({ children, header, title, id }) {
  return (
    <>
      <section id={id} className='min-h-screen flex flex-col gap-10'>
        <div className='py-10 flex flex-col gap-4 justify-center items-center p-4'>
          <p className='uppercase font-semibold'>{header}</p>
          <h2 className=' glow uppercase font-semibold text-2xl sm:text-3xl md:text-4xl lg:text-5xl'>
            {title[0]}{" "}
            <span className='line-through text-red-400'>
              {title[1]} {title[2]}
            </span>{" "}
            {title[3]} <span className='text-red-400'>{title[4]}</span>
          </h2>
        </div>
        <div className='max-w-[800px] w-full flex flex-col mx-auto gap-10 p-4'></div>
        {children}
      </section>
    </>
  );
}
