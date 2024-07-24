import { useState } from "react";
import Hero from "./components/Hero";
import Generator from "./components/Generator";
import Workout from "./components/Workout";

function App() {
  return (
    <main
      style={{
        backgroundImage: "linear-gradient(to bottom, #1F0021 50%, #751006)",
      }}
      className='min-h-screen flex flex-col text-[#FDFFFC] text-sm sm:text-base'
    >
      <Hero />
      <Generator />
      <Workout />
    </main>
  );
}

export default App;
