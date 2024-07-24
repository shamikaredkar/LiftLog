import React from "react";
import SectionWrapper from "./SectionWrapper";

export default function Workout({ workout }) {
  return (
    <SectionWrapper header={"Welcome"} title={["The", "DANGER", "Zone!"]}>
      <div className='flex flex-col gap-4'>
        {workout.map((exercise, index) => {})}
      </div>
    </SectionWrapper>
  );
}
