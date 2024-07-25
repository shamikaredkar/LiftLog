import { useState } from "react";
import Hero from "./components/Hero";
import Generator from "./components/Generator";
import Workout from "./components/Workout";
import ErrorModal from "./components/ErrorModal"; // Import ErrorModal
import { generateWorkout } from "./utils/functions";

function App() {
  const [workout, setWorkout] = useState(null);
  const [poison, setPoison] = useState("individual");
  const [muscles, setMuscles] = useState([]);
  const [goals, setGoals] = useState("strength_power");
  const [showModal, setShowModal] = useState(false); // State for modal visibility

  function updateWorkout() {
    if (muscles.length < 1) {
      setShowModal(true); // Show modal if no muscles are selected
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
      {workout && (
        <div className='mt-32'>
          <Workout workout={workout} />
        </div>
      )}
      {showModal && (
        <div className='fixed inset-0 flex items-center justify-center z-50'>
          <div
            className='bg-black opacity-50 fixed inset-0'
            onClick={() => setShowModal(false)}
          ></div>
          <div className='relative z-10'>
            <ErrorModal onClose={() => setShowModal(false)} />
          </div>
        </div>
      )}
    </main>
  );
}

export default App;
