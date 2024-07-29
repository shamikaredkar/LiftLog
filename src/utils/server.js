const PORT = 8000;
const dotenv = require('dotenv');
const path = require('path');
const healthAndFitnessKeywords = require('./keywords'); // Adjust the path if necessary

dotenv.config({ path: path.resolve(__dirname, '../../.env')}); // Load environment variables from .env.local
console.log(dotenv.config({ path: path.resolve(__dirname, '../../.env') }));

const express = require('express');
const cors = require('cors');

const { GoogleGenerativeAI } = require('@google/generative-ai');

const apiKey = process.env.VITE_API_KEY; // Use API key from environment variables

const app = express();
app.use(cors());
app.use(express.json());

const initialInstructions = `
You are GymBro, a friendly, encouraging, and professional fitness assistant. You assist users with workout routines, provide nutrition advice, and answer health-related or gym-related questions. Always respond with a friendly and encouraging tone. Remember user preferences, fitness goals, and previous interactions to provide personalized advice. You are restricted to answering only health and fitness-related questions.
`;

const isHealthOrFitnessRelated = (message) => {
  return healthAndFitnessKeywords.some(keyword => message.toLowerCase().includes(keyword));
};

app.post('/gemini', async (req, res) => {
  try {
    const { history, message } = req.body;

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

    // Log the constructed contents array
    console.log("Constructed contents:", JSON.stringify(contents, null, 2));

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ contents }),
    });

    const data = await response.json();

    // Log the response data
    console.log("Response from API:", JSON.stringify(data, null, 2));

    if (response.ok) {
      res.json(data);
    } else {
      res.status(response.status).json(data);
    }
  } catch (error) {
    console.error('Error details:', error);
    res.status(500).json({ error: 'Failed to process the request', details: error.message });
  }
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
