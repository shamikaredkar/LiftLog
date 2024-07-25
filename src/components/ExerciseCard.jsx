import React, { useState } from "react";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

export default function ExerciseCard({ exercise, index }) {
  const [setsCompleted, setSetsCompleted] = useState(0);
  function handleSetIncrement() {
    setSetsCompleted((setsCompleted + 1) % 5);
  }
  return (
    <div
      className='p-4 m-4 rounded-lg flex flex-col gap-4 sm:flex-wrap'
      style={{ backgroundColor: "#1F0021" }}
    >
      <div className='flex flex-col sm:flex-row sm:items-center sm:flex-wrap gap-x-4'>
        <h4 className='text-3xl hidden sm:inline sm:text-2xl md:text-3xl font-semibold text-red-200'>
          0{index + 1}
        </h4>
        <h2 className='capitalize whitespace-nowrap truncate max-w-full text-lg sm:text-xl md:text-2xl flex-1 sm:text-center'>
          {exercise.name.replaceAll("_", " ")}
        </h2>

        <p className='text-sm text-red-400 capitalize font-semibold'>
          {exercise.type}
        </p>
      </div>
      <div className='flex flex-col'>
        <h3 className='text-red-200 text-sm'>Muscle Group</h3>
        <p className='capitalize'>{exercise.muscles.join("&")}</p>
      </div>
      <div className='flex flex-col rounded gap-2'>
        {exercise.description.split("___").map((val) => {
          return <div className='text-sm'>{val}</div>;
        })}
      </div>
      <div className='grid grid-cols-2 sm:gri-cols-4 sm:place-items-center gap-2'>
        {["reps", "rest", "tempo"].map((info) => {
          return (
            <div
              className={`flex flex-col p-2 rounded border-[1.5px] border-solid border-red-900 w-full`}
            >
              <a className={`tooltip-${info}`}>
                <h3 className='capitalize text-white text-sm'>
                  {info === "reps" ? `${exercise.unit}` : info}
                </h3>
              </a>
              <p className='font-medium'>{exercise[info]}</p>
            </div>
          );
        })}
        <button
          onClick={handleSetIncrement}
          className='flex flex-col p-5 rounded border-[1.5px] duration-200 border-solid border-red-900 hover:border-red-400 w-full duration-200'
        >
          <h3 className='text-red-400 text-sm capitalize'>{setsCompleted}/5</h3>
        </button>
      </div>
      {exercise.variants && (
        <div className='flex flex-col rounded gap-2 mt-4'>
          <h3 className='text-red-200 text-sm font-semibold'>Variants</h3>
          {Object.entries(exercise.variants).map(
            ([variant, description], idx) => (
              <div key={idx} className='text-sm'>
                <details>
                  <summary>
                    {" "}
                    <em className='capitalize'>
                      {variant.replaceAll("_", " ")}:{" "}
                    </em>
                  </summary>

                  {description}
                </details>
              </div>
            )
          )}
        </div>
      )}
      {exercise.substitutes && (
        <div className='flex flex-col rounded gap-2 mt-4'>
          <h3 className='text-red-200 text-sm'>Substitutes</h3>
          <p className='capitalize'>
            {exercise.substitutes.join(",  ").replaceAll("_", " ")}
          </p>
        </div>
      )}
      <Tooltip anchorSelect='.tooltip-reps' place='top'>
        Reps: The number of times you perform a specific exercise.
      </Tooltip>
      <Tooltip anchorSelect='.tooltip-rest' place='top'>
        Rest: The amount of time(seconds) you rest between sets.
      </Tooltip>
      <Tooltip anchorSelect='.tooltip-tempo' place='top'>
        Tempo: The speed at which you perform each rep of an exercise.
      </Tooltip>
    </div>
  );
}
