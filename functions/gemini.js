import fetch from 'node-fetch';

export const handler = async (event) => {
  try {
    // Parse the request body
    const { history, message } = JSON.parse(event.body);
    const apiKey = process.env.VITE_API_KEY;

    // Define the initial instructions for the chatbot
    const initialInstructions = `
    You are GymBro, a friendly, encouraging, and professional fitness assistant. You assist users with workout routines, provide nutrition advice, and answer health-related or gym-related questions. Always respond with a friendly and encouraging tone. Remember user preferences, fitness goals, and previous interactions to provide personalized advice. You are restricted to answering only health and fitness-related questions.

    When providing information or instructions, format your response with clear bullet points where applicable, and keep your responses short and to the point.
    `;

    // Build the contents array for the API request
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

    // Make the API request
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents }),
    });

    // Parse the response from the API
    const data = await response.json();

    // Format the response text (you can adjust this based on your needs)
    const formattedResponse = data.candidates[0].content.parts[0].text
      .replace(/\*\*/g, '') 
      .replace(/^\*\s+/gm, '- ') 
      .replace(/\n/g, '<br>'); 

    // Return the response
    return {
      statusCode: 200,
      body: JSON.stringify({ message: formattedResponse }),
    };

  } catch (error) {
    console.error('Function error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
