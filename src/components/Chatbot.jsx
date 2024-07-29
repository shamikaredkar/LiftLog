import React, { useState } from "react";

export default function Chatbot() {
  const [error, setError] = useState("");
  const [value, setValue] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  const surpriseOptions = [
    "Who won the latest Nobel Peace Prize?",
    "Where does pizza come from?",
    "How do you make a BLT sandwich?",
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
      console.log("Sending request to backend:", options);
      const response = await fetch("http://localhost:8000/gemini", options);
      const data = await response.json();
      console.log("Response from backend:", data);

      // Extract the generated text from the response
      const generatedText = data.candidates[0].content.parts[0].text;

      setChatHistory((oldChatHistory) => [
        ...oldChatHistory,
        {
          role: "user",
          parts: value,
        },
        {
          role: "model",
          parts: generatedText,
        },
      ]);
      setValue("");
    } catch (e) {
      console.error(e);
      setError("Something went wrong");
    }
  };

  const clear = () => {
    setValue("");
    setError("");
    setChatHistory([]);
  };

  return (
    <div className='app'>
      <section className='search-section'>
        <p>
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
          {!error && <button onClick={getResponse}>Ask Me</button>}
          {error && <button onClick={clear}>Clear</button>}
        </div>
        {error && <p>{error}</p>}
        <div className='search-result'>
          {chatHistory.map((chatItem, index) => (
            <div key={index}>
              <p className='answer'>
                {chatItem.role}: {chatItem.parts}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
