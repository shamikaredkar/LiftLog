import React from "react";
import SectionWrapper from "./SectionWrapper";
import ExerciseCard from "./ExerciseCard";
import { exportWorkoutAsPDF } from "../utils/exportWorkoutAsPdf";

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
          <button
            onClick={() => exportWorkoutAsPDF(workout, muscleGroups)}
            className=''
          >
            Export as PDF
          </button>
        </div>
      </SectionWrapper>
    </div>
  );
}
