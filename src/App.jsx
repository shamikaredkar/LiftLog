import { useState } from "react";
import Hero from "./components/Hero";
import Generator from "./components/Generator";
import Workout from "./components/Workout";
import { generateWorkout } from "./utils/functions";

function App() {
  const [workout, setWorkout] = useState(null);
  const [poison, setPoison] = useState("individual");
  const [muscles, setMuscles] = useState([]);
  const [goals, setGoals] = useState("strength_power");

  function updateWorkout() {
    if (muscles.length < 1) {
      return;
    }
    let newWorkout = generateWorkout({ poison, muscles, goals });
    setWorkout(newWorkout);

    window.location.href = "#workout";
  }
  return (
    <main
      style={{
        backgroundImage: "linear-gradient(to bottom, #1F0021 50%, #751006)",
      }}
      className='min-h-screen flex flex-col text-[#FDFFFC] text-sm sm:text-base'
    >
      <Hero />
      <Generator
        poison={poison}
        setPoison={setPoison}
        muscles={muscles}
        setMuscles={setMuscles}
        goals={goals}
        setGoals={setGoals}
        updateWorkout={updateWorkout}
      />
      <div className='mt-16 pt-32'>
        {workout && <Workout workout={workout} />}
      </div>
    </main>
  );
}

export default App;
