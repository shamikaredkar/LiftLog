import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimesCircle,
  faCircleChevronRight,
} from "@fortawesome/free-solid-svg-icons"; // Correct icon import
import "./Chatbot.css"; // Import the CSS file
import chatbotAnimation from "../assets/chatbotAnimation.json";
import Lottie from "lottie-react";

export default function Chatbot() {
  const [error, setError] = useState("");
  const [value, setValue] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
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

    // Update chat history with user message
    setChatHistory((oldChatHistory) => [
      ...oldChatHistory,
      { role: "user", parts: value },
      { role: "model", parts: `<div class="loader px-2"></div>` }, // Show loading animation
    ]);
    setValue("");
    setLoading(true);

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
        // Replace loading message with AI response
        setChatHistory((oldChatHistory) => [
          ...oldChatHistory.slice(0, -1),
          { role: "model", parts: generatedText },
        ]);
      } else {
        setError("No response from the model.");
      }
    } catch (e) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const clear = () => {
    setValue("");
    setError("");
    setChatHistory([
      {
        role: "model",
        parts:
          "Hi, I'm GymBro! Your personal fitness assistant. How may I help you today?",
      },
    ]);
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setChatHistory([
        {
          role: "model",
          parts: "Hi there! I'm GymBro, your go-to Fitness Assistant.",
        },
      ]);
    }
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  return (
    <div className='px-6 fixed bottom-5 right-5 z-50'>
      <button className='rounded-full w-14 h-14 shadow-lg' onClick={toggleChat}>
        <Lottie animationData={chatbotAnimation} loop={true} autoplay={true} />
      </button>
      {isOpen && (
        <div className='bg-white border border-gray-300 rounded-lg w-[500px] h-[600px] shadow-lg flex flex-col absolute bottom-20 right-0'>
          <div className='flex-1 flex flex-col overflow-hidden'>
            <div className='flex-1 overflow-y-auto p-4' ref={chatContainerRef}>
              {chatHistory.map((chatItem, index) => {
                const isLoading = chatItem.parts.includes("loader");
                return (
                  <div
                    key={index}
                    className={`p-2 my-2 rounded-lg ${
                      chatItem.role === "user"
                        ? "bg-blue-100 self-end"
                        : !isLoading
                        ? "bg-gray-100 self-start"
                        : ""
                    }`}
                    dangerouslySetInnerHTML={{ __html: chatItem.parts }}
                  ></div>
                );
              })}
            </div>
            {error && <p className='text-red-500 mt-2 p-4'>{error}</p>}
            <div className='flex p-4'>
              <input
                className='flex-1 p-2 border border-gray-300 rounded-lg'
                value={value}
                placeholder='How may I help you today?'
                onChange={(e) => setValue(e.target.value)}
              />
              {!error && (
                <button
                  className='ml-2 px-2 text-white'
                  onClick={getResponse}
                  disabled={loading}
                >
                  <FontAwesomeIcon
                    icon={faCircleChevronRight}
                    style={{ color: "#751006" }}
                    size='2xl'
                  />
                </button>
              )}
              {error && (
                <button className='ml-2 px-2 text-white' onClick={clear}>
                  <FontAwesomeIcon
                    icon={faTimesCircle}
                    style={{ color: "#751006" }}
                    size='2xl'
                  />
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
