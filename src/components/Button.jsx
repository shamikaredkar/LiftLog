import React from "react";

export default function Button({ text }) {
  return (
    <div>
      {" "}
      <button
        className='px-8 mx-auto py-4 rounded-md border-[2px] border-red-400 border-solid redShadow duration-200'
        style={{ backgroundColor: "#1F0021" }}
      >
        <p>{text}</p>
      </button>
    </div>
  );
}
