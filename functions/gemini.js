import axios from 'axios';
import dotenv from 'dotenv';
import healthAndFitnessKeywords from '../src/utils/keywords'; // Adjust the path if necessary

dotenv.config();

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

export const handler = async (event) => {
  try {
    // Check if the request body exists
    if (!event.body) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Request body is missing' }),
      };
    }

    const { history, message } = JSON.parse(event.body);
    const apiKey = process.env.VITE_API_KEY;

    if (!isHealthOrFitnessRelated(message)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Message not related to health or fitness' }),
      };
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

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`,
      { contents },
      { headers: { 'Content-Type': 'application/json' } }
    );

    const formattedResponse = formatResponseText(response.data.candidates[0].content.parts[0].text);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: formattedResponse }),
    };

  } catch (error) {
    console.error('Error details:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to process the request', details: error.message }),
    };
  }
};
