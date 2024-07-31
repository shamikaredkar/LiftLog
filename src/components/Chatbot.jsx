import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimesCircle,
  faCircleChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import "./Chatbot.css";
import chatbotAnimation from "../assets/chatbotAnimation.json";
import Lottie from "lottie-react";
import "react-tooltip/dist/react-tooltip.css";

export default function Chatbot() {
  const [error, setError] = useState("");
  const [value, setValue] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const chatContainerRef = useRef(null);
  const chatbotRef = useRef(null);
  const surpriseOptions = [
    "How can I build muscle quickly?",
    "Can you suggest a meal plan for muscle gain?",
    "How many calories should I consume daily?",
    "How often should I change my workout routine?",
    "How do I track my progress?",
    "What should I eat before and after a workout?",
  ];

  const handleSuggestionClick = (suggestion) => {
    setValue(suggestion);
  };

  const getResponse = async () => {
    if (!value) {
      setError("Please ask a question");
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
          history: chatHistory.map((item) => ({
            role: item.role,
            parts: item.parts,
          })),
          message: value,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await fetch("/.netlify/functions/gemini", options);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.message) {
        setChatHistory((oldChatHistory) => [
          ...oldChatHistory.slice(0, -1),
          { role: "model", parts: data.message },
        ]);
      } else {
        setError("No response from the model.");
        setChatHistory((oldChatHistory) => oldChatHistory.slice(0, -1)); // Remove the loader
      }
    } catch (e) {
      setError("Something went wrong");
      setChatHistory((oldChatHistory) => oldChatHistory.slice(0, -1)); // Remove the loader
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
        parts: "Hi there! I'm your go-to Fitness Assistant.",
      },
    ]);
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setChatHistory([
        {
          role: "model",
          parts: "Hi there! I'm your go-to Fitness Assistant.",
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

  // Close chatbot when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (chatbotRef.current && !chatbotRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [chatbotRef, isOpen]);

  return (
    <div className='px-6 fixed bottom-5 right-5 z-50'>
      <div ref={chatbotRef}>
        <button
          className='rounded-full w-14 h-14 shadow-lg'
          onClick={toggleChat}
        >
          <Lottie
            animationData={chatbotAnimation}
            loop={true}
            autoplay={true}
          />
        </button>
        {isOpen && (
          <div className='bg-white border border-gray-300 rounded-lg w-[600px] h-[700px] shadow-lg flex flex-col absolute bottom-20 right-0'>
            <div className='flex items-center pt-4 pb-1 '>
              <div className='ml-4 flex items-center'>
                <span className='font-bold text-lg'>GymBro</span>
              </div>
            </div>
            <div className='flex-1 flex flex-col overflow-hidden'>
              <div
                className='flex-1 overflow-y-auto p-4'
                ref={chatContainerRef}
              >
                {chatHistory.map((chatItem, index) => {
                  const isLoading = chatItem.parts.includes("loader");
                  return (
                    <div
                      key={index}
                      className={`block max-w-max p-2 my-2 rounded-lg ${
                        chatItem.role === "user"
                          ? "bg-red-100 self-end text-right ml-auto"
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

              {/* Suggestions Section */}
              <div className='flex flex-col p-4 space-y-2 overflow-y-auto max-h-32'>
                {surpriseOptions.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(option)}
                    className='text-left bg-gray-100 p-2 rounded-lg shadow-md hover:bg-gray-200'
                  >
                    {option}
                  </button>
                ))}
              </div>

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
    </div>
  );
}
