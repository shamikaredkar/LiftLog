import React from "react";
import SectionWrapper from "./SectionWrapper";
import ExerciseCard from "./ExerciseCard";
import { exportWorkoutAsPDF } from "../utils/exportWorkoutAsPdf"; // Adjust the path if needed

export default function Workout({ workout, muscleGroups }) {
  return (
    <div className='py-10 my-10'>
      <SectionWrapper
        id={"workout"}
        header={"Welcome"}
        title={["The", "DANGER", "Zone!"]}
      >
        <div className='flex flex-col gap-4'>
          {workout.map((exercise, index) => (
            <ExerciseCard index={index} exercise={exercise} key={index} />
          ))}
        </div>

        {/* Add the Export as PDF Button */}
        <div className='mt-8'>
          <button
            onClick={() => exportWorkoutAsPDF(workout, muscleGroups)}
            className='export-pdf-btn bg-red-500 text-white px-4 py-2 rounded-md'
          >
            Export as PDF
          </button>
        </div>
      </SectionWrapper>
    </div>
  );
}
