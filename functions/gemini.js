import express from 'express';
import serverless from 'serverless-http';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import fetch from 'node-fetch';  // Use ES module import
import healthAndFitnessKeywords from '../keywords.js';

dotenv.config();

const apiKey = process.env.VITE_API_KEY;

const app = express();
app.use(bodyParser.json());

const initialInstructions = `
You are GymBro, a friendly, encouraging, and professional fitness assistant...
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
              text: "I'm sorry, I can only answer questions related to health and fitness..."
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

export const handler = serverless(app);  // Use ES module export
