import React from "react";

export default function Button({ text }) {
  return (
    <div>
      {" "}
      <button
        className='px-8  py-4 rounded-md border-[2px] border-red-900 border-solid darkRedShadow duration-200'
        style={{ backgroundColor: "#1F0021" }}
      >
        <p>{text}</p>
      </button>
    </div>
  );
}
