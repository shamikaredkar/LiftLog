import React from "react";
import SectionWrapper from "./SectionWrapper";
import { WORKOUTS } from "../utils/workouts";

const Header = ({ index, title, description }) => {
  return (
    <div className='flex flex-col gap-4'>
      <div className='flex items-center justify-center gap-2'>
        <p className='text-3xl sm:text-2xl md:text-3xl font-semibold text-red-300'>
          {index}
        </p>
        <h4 className='font-light underline underline-offset-8 text-xl sm:text-2xl md:text-3xl'>
          {title}
        </h4>
      </div>
      <p className='text-sm sm:text-base mx-auto'>{description}</p>
    </div>
  );
};

export default function Generator() {
  return (
    <SectionWrapper
      header={"Generate Your Workout"}
      title={["There's", "No", "Tomorrow.", "Start", "Today!"]}
    >
      <Header
        index={"01"}
        title={"Select Your Session"}
        description={"Choose the workout that suits you best."}
      />
      <div className='grid grid-cols-2 sm:grid-cols-4 gap-4 p-4'>
        {Object.keys(WORKOUTS).map((type, index) => {
          return (
            <button
              className=' bg-red-950 border border-red-300 py-3 rounded-lg duration-200 redShadow'
              style={{ backgroundColor: "#1F0021" }}
              key={index}
            >
              <p className='capitalize'>{type.replaceAll("_", " ")}</p>
            </button>
          );
        })}
      </div>
      <Header
        index={"02"}
        title={"Target Your Muscles"}
        description={"Select the muscle groups you want to work on today."}
      />
      <div
        className='p-3 m-2  bg-red-950 border border-solid border-red-300 rounded-lg'
        style={{ backgroundColor: "#1F0021" }}
      >
        <div className='relative flex items-center justify-center'>
          <p>Select Muscle Groups</p>{" "}
          <i className='fa-solid fa-caret-down absolute right-3 top-1/2 transform -translate-y-1/2 '></i>
        </div>
      </div>
    </SectionWrapper>
  );
}
