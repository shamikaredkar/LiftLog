import SectionWrapper from "./SectionWrapper";
import { SCHEMES, WORKOUTS } from "../utils/workouts";
import React, { useState } from "react";
import Button from "./Button";

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

export default function Generator({
  poison,
  setPoison,
  muscles,
  setMuscles,
  goals,
  setGoals,
  updateWorkout,
}) {
  const [showmodal, setShowModal] = useState(false);
  function toggleModal() {
    setShowModal(!showmodal); //
  }
  function updateMuscles(muscleGroup) {
    if (poison !== "individual") {
      setMuscles([muscleGroup]);
      setShowModal(false);
      return;
    }
    if (muscles.includes(muscleGroup)) {
      setMuscles(muscles.filter((val) => val !== muscleGroup));
    } else {
      if (muscles.length < 3) {
        setMuscles([...muscles, muscleGroup]);
      }
      if (muscles.length === 3) {
        setShowModal(false);
      }
    }
  }

  return (
    <>
      <SectionWrapper
        id={"generate"}
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
                onClick={() => {
                  setMuscles([]);
                  setPoison(type);
                }}
                className={
                  "px-4 bg-red-950 border border-red-900  py-3 rounded-lg duration-200" +
                  (type === poison
                    ? " border-red-300 redShadow"
                    : " border-red-900 darkRedShadow")
                }
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
        <div className='flex justify-center'>
          <div
            className='flex flex-col m-2 bg-red-950 border border-solid border-red-400 rounded-lg w-5/12'
            style={{ backgroundColor: "#1F0021" }}
          >
            <button
              onClick={toggleModal}
              className=' p-3 relative items-center justify-center'
            >
              <p className='uppercase'>
                {muscles.length == 0
                  ? "Select Muscle Groups"
                  : muscles.join(" ")}
              </p>{" "}
              <i className='fa-solid fa-caret-down absolute right-3 top-1/2 transform -translate-y-1/2 '></i>
            </button>
            {showmodal && (
              <div className='flex flex-col'>
                {(poison === "individual"
                  ? WORKOUTS.individual
                  : Object.keys(WORKOUTS[poison])
                ).map((muscleGroup, index) => (
                  <button
                    onClick={() => updateMuscles(muscleGroup)}
                    className={`hover:text-red-400 hover:duration-200 hover:border hover:border-solid hover:border-white ${
                      muscles.includes(muscleGroup) ? "text-red-300" : ""
                    }`}
                    key={index}
                  >
                    <p className='uppercase p-3'>
                      {muscleGroup.replaceAll("_", " ")}
                    </p>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        <Header
          index={"03"}
          title={"Define Your Goals"}
          description={
            "Set your ultimate objective and kick start your journey"
          }
        />
        <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 p-4'>
          {Object.keys(SCHEMES).map((scheme, index) => {
            return (
              <button
                onClick={() => {
                  setGoals(scheme);
                }}
                className={
                  "px-4 bg-red-950 border border-red-900  py-3 rounded-lg duration-200" +
                  (scheme === goals
                    ? " border-red-300 redShadow"
                    : " border-red-900 darkRedShadow")
                }
                style={{ backgroundColor: "#1F0021" }}
                key={index}
              >
                <p className='capitalize'>{scheme.replaceAll("_", " ")}</p>
              </button>
            );
          })}
        </div>
      </SectionWrapper>
      <div className='flex justify-center py-4'>
        <Button func={updateWorkout} text={"Formulate"} />
      </div>
    </>
  );
}
