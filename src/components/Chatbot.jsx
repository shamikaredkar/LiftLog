import React, { useState, useRef, useEffect } from "react";

export default function Chatbot() {
  const [error, setError] = useState("");
  const [value, setValue] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const chatContainerRef = useRef(null);

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
      const response = await fetch("http://localhost:8000/gemini", options);
      const data = await response.json();

      if (data.candidates && data.candidates.length > 0) {
        const generatedText = data.candidates[0].content.parts[0].text;

        setChatHistory((oldChatHistory) => [
          ...oldChatHistory,
          { role: "user", parts: value },
          { role: "model", parts: generatedText },
        ]);
        setValue("");
      } else {
        setError("No response from the model.");
      }
    } catch (e) {
      setError("Something went wrong");
    }
  };

  const clear = () => {
    setValue("");
    setError("");
    setChatHistory([]);
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  return (
    <div className='fixed bottom-5 right-5 z-50'>
      <button
        className='bg-blue-500 text-white rounded-full w-16 h-16 text-lg shadow-lg'
        onClick={toggleChat}
      >
        Chat
      </button>
      {isOpen && (
        <div className='bg-white border border-gray-300 rounded-lg w-80 h-96 shadow-lg flex flex-col absolute bottom-20 right-0'>
          <section className='p-4 flex-1 flex flex-col overflow-hidden'>
            <p className='mb-2'>
              Hello! I'm your Fitness Assistant, my name is GymBro. How can I
              help you today with your workouts or fitness goals?
              <button
                className='ml-2 px-4 py-2 bg-green-500 text-white rounded'
                onClick={surprise}
              >
                Surprise me
              </button>
            </p>
            <div className='flex mt-2'>
              <input
                className='flex-1 p-2 border border-gray-300 rounded'
                value={value}
                placeholder='Ask me anything about fitness'
                onChange={(e) => setValue(e.target.value)}
              />
              {!error && (
                <button
                  className='ml-2 px-4 py-2 bg-blue-500 text-white rounded'
                  onClick={getResponse}
                >
                  Ask Me
                </button>
              )}
              {error && (
                <button
                  className='ml-2 px-4 py-2 bg-red-500 text-white rounded'
                  onClick={clear}
                >
                  Clear
                </button>
              )}
            </div>
            {error && <p className='text-red-500 mt-2'>{error}</p>}
            <div
              className='flex-1 overflow-y-auto mt-4'
              style={{ maxHeight: "calc(100% - 150px)" }}
              ref={chatContainerRef}
            >
              {chatHistory.map((chatItem, index) => (
                <div
                  key={index}
                  className={`p-2 my-2 rounded-lg ${
                    chatItem.role === "user"
                      ? "bg-blue-100 self-end"
                      : "bg-gray-100 self-start"
                  }`}
                >
                  <p>
                    {chatItem.role === "user" ? "You" : "GymBro"}:{" "}
                    {chatItem.parts}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
