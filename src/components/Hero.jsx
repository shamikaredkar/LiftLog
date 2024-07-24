import React from "react";
import { useTypewriter } from "react-simple-typewriter";

export default function Hero() {
  const [typeEffect] = useTypewriter({
    words: ["Serious", "Stronger", "Results"],
    loop: {},
    typeSpeed: 120,
    deleteSpeed: 120,
  });
  return (
    <div className='min-h-screen flex flex-col gap-10 items-center justify-center text-center max-w-[800px] w-full mx-auto p-4'>
      <div className='flex flex-col gap-4'>
        <p>IT'S TIME TO GET</p>
        <h1 className='uppercase font-semibold text-4xl sm:text-5xl md:text-6xl lg:text-7xl'>
          <span>{typeEffect}</span>
        </h1>
      </div>
      <p className='text-sm md:text-base font-light'>
        I <span className='text-red-400 font-medium'>solemnly swear to </span>
        log my lifts, crush my goals, and{" "}
        <span className='text-red-400 font-medium'>
          never, ever skip leg day
        </span>{" "}
        (unless it's absolutely necessary). I promise to{" "}
        <span className='text-red-400 font-medium'> celebrate every PR</span> ,
        even if it means doing a victory dance in the gym. And most importantly,
        I vow to{" "}
        <span className='text-red-400 font-medium'>
          have fun and stay motivated{" "}
        </span>{" "}
        and always remember that sweat is just my fat crying . Lift on!
      </p>
      <button
        className='px-8  py-4 rounded-md border-[2px] border-red-400 border-solid redShadow duration-200'
        style={{ backgroundColor: "#1F0021" }}
      >
        <p>Accept & Begin</p>
      </button>
    </div>
  );
}
