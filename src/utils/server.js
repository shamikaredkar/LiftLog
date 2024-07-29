const PORT = 8000;
const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const apiKey = "AIzaSyBinwxa4Silf9eN6MI3e0SUAnkI7DMReMk"; // Hardcoded API key

const app = express();
app.use(cors());
app.use(express.json());

app.post('/gemini', async (req, res) => {
  try {
    const { history, message } = req.body;

    // Construct the contents array with full history
    const contents = history.map(item => ({
      role: item.role,
      parts: [{ text: item.parts }],
    }));
    contents.push({ role: 'user', parts: [{ text: message }] });

    // Log the constructed contents array
    console.log("Constructed contents:", contents);

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ contents }),
    });

    const data = await response.json();

    // Log the response data
    console.log("Response from API:", data);

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