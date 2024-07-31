const express = require('express');
const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const fetch = require('node-fetch');
const healthAndFitnessKeywords = require('../keywords.js'); // Adjust path if needed

dotenv.config();

const apiKey = process.env.VITE_API_KEY;

const app = express();
app.use(bodyParser.json());

const initialInstructions = `
You are GymBro, a friendly, encouraging, and professional fitness assistant. You assist users with workout routines, provide nutrition advice, and answer health-related or gym-related questions. Always respond with a friendly and encouraging tone. Remember user preferences, fitness goals, and previous interactions to provide personalized advice. You are restricted to answering only health and fitness-related questions.

When providing information or instructions, format your response with clear bullet points where applicable, and keep your responses short and to the point.
`;

const isHealthOrFitnessRelated = (message) => {
  return healthAndFitnessKeywords.some(keyword => message.toLowerCase().includes(keyword));
};

const formatResponseText = (text) => {
  return text
    .replace(/\*\*/g, '') 
    .replace(/^\*\s+/gm, '- ') 
    .replace(/\n/g, '<br>'); 
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
});

module.exports.handler = serverless(app);