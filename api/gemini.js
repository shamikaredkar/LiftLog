import dotenv from 'dotenv';
import fetch from 'node-fetch';
import healthAndFitnessKeywords from '../keywords.js'; // Adjust the path if necessary

// Load environment variables
dotenv.config();

const apiKey = process.env.VITE_API_KEY; // Ensure this is set in your Vercel environment variables

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { history, message } = req.body;

    // Check if the message is related to health or fitness
    if (!isHealthOrFitnessRelated(message)) {
      return res.json({
        candidates: [{
          content: {
            parts: [{
              text: "I'm sorry, I can only answer questions related to health and fitness. Please ask me something about workouts, nutrition, or general fitness."
            }]
          }
        }]
      });
    }

    // Construct the contents for the API call
    const contents = [
      {
        role: 'model',
        parts: [{ text: initialInstructions }]
      },
      ...history.map(item => ({
        role: item.role,
        parts: [{ text: item.parts }],
      })),
      {
        role: 'user',
        parts: [{ text: message }]
      }
    ];

    try {
      // Fetch response from Google's Gemini model
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ contents }),
      });

      const data = await response.json();

      if (response.ok) {
        const formattedResponse = formatResponseText(data.candidates[0].content.parts[0].text);

        res.json({
          candidates: [{
            content: {
              parts: [{
                text: formattedResponse
              }]
            }
          }]
        });
      } else {
        res.status(response.status).json(data);
      }
    } catch (error) {
      console.error('Error details:', error);
      res.status(500).json({ error: 'Failed to process the request', details: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}

// Initial instructions for the model
const initialInstructions = `
You are GymBro, a friendly, encouraging, and professional fitness assistant. You assist users with workout routines, provide nutrition advice, and answer health-related or gym-related questions. Always respond with a friendly and encouraging tone. Remember user preferences, fitness goals, and previous interactions to provide personalized advice. You are restricted to answering only health and fitness-related questions.

When providing information or instructions, format your response with clear bullet points where applicable, and keep your responses short and to the point.
`;

// Function to check if the message is health or fitness-related
const isHealthOrFitnessRelated = (message) => {
  return healthAndFitnessKeywords.some(keyword => message.toLowerCase().includes(keyword));
};

// Function to format the response text
const formatResponseText = (text) => {
  return text
    .replace(/\*\*/g, '') 
    .replace(/^\*\s+/gm, '- ') 
    .replace(/\n/g, '<br>'); 
};
