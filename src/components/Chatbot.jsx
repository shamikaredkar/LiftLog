import React from "react";
import { useState } from "react";

export default function Chatbot() {
  const [error, setError] = useState("");
  const [value, setValue] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  const surpriseOptions = [
    "Who won the latest nobel peace prize",
    "Where does pizza come from?",
    "How do you make a BLT sandwhich",
  ];

  const surprise = () => {
    const randomValue =
      surpriseOptions[Math.floor(Math.random() * surpriseOptions.length)];
    setValue(randomValue);
  };

  const getResponse = async () => {
    if (!value) {
      setError("Error! Please ask a question");
      return;
    }
    try {
      const options = {
        method: "POST",
        body: JSON.stringify({
          history: chatHistory,
          message: value,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await fetch("http://localhost:8000/gemini", options);
      const data = await response.text();
      console.log(data);
    } catch (e) {
      console.error(e);
      setError("Something went wrong");
    }
  };

  return (
    <>
      <div className='app'>
        <section className='search-section'>
          <p>
            {" "}
            What do you want to know?
            <button
              className='surprise'
              onClick={surprise}
              disabled={!chatHistory}
            >
              Surprise me
            </button>
          </p>
          <div className='input-container'>
            <input
              value={value}
              placeholder='When is Christmas'
              onChange={(e) => setValue(e.target.value)}
            ></input>
            {!error && <button>Ask Me</button>}
            {error && <button>Ask Me</button>}
          </div>
          {error && <p>{error}</p>}
          <div className='search-result'>
            <div key={""}>
              <p className='answer'></p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
