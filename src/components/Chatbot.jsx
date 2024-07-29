import React, { useState } from "react";

export default function Chatbot() {
  const [error, setError] = useState("");
  const [value, setValue] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  const surpriseOptions = [
    "What is my workout plan for today?",
    "Can you suggest a meal plan for muscle gain?",
    "How many calories should I consume daily?",
    "What exercises are best for strengthening my core?",
    "How do I track my progress?",
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

      if (data.candidates && data.candidates.length > 0) {
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
      } else {
        setError("No response from the model.");
      }
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
          Hello! I'm your Fitness Assistant, my name is GymBro. How can I help
          you today with your workouts or fitness goals?
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
            placeholder='Ask me anything about fitness'
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
