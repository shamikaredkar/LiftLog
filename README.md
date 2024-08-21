<div align="center"><h2>LiftLog - <a href="https://liftlog-shamikaredkar.netlify.app/"> Demo</a></h2>
</div>

## Overview

https://github.com/user-attachments/assets/e8990577-397d-4fd0-a04f-b6e7e9a53c90

LiftLog is a comprehensive fitness application designed to assist users in generating personalized workouts that fit their goals. With a user-friendly interface and an integrated chatbot named GymBro, LiftLog offers personalized fitness advice, workout plan generation, and the ability to export workout routines as PDF files for offline usage. 

## Features

### Home Page
- **Overview:** Provides users with an introduction to the app and its core features.
- **Navigation:** Easy access to different sections like workout generation and chatbot

### Workout Generator
- **Personalized Plans:** Generate workout routines based on user preferences and goals.
- **Export Functionality:** Export the generated workout plans as PDF files for offline use.
- **Responsive Design:** Works seamlessly on mobile and desktop devices.

### GymBro Chatbot
- **Real-time Assistance:** The GymBro chatbot assists users by providing workout routines, nutrition advice, and answering health-related queries.
- **Natural Language Processing:** GymBro understands and responds to user queries in natural language, making interactions smooth and intuitive.

### Responsive Design
- **Mobile-Friendly:** The app is fully responsive and works on all screen sizes, from mobile phones to large desktop monitors.
- **Consistent UX:** Ensures a consistent user experience across all devices.

## Built With

- [![React.js][React.js]][React-url]
- [![Node.js][Nodejs]][Node-url]
- [![Express][Express.js]][Express-url]
- [![Vite][Vite]][Vite-url]
- [![Netlify][Netlify]][Netlify-url]
- [![Gemini][Gemini]][Gemini-url]
- [![Tailwind][Tailwind]][Tailwind-url]

## Project Directory
 ```
LiftLog
│── functions
│   │   └── gemini.js         # Serverless function handling chatbot requests
├── public
│   ├── gym.png               # Assets used in the app
│   └── vite.svg              # Vite logo asset
├── src
│   ├── assets
        ├── chatbotAnimation.json
        ├── react.svg                
│   ├── components            # React components used in the application
│   │   ├── Button.jsx
│   │   ├── Chatbot.jsx       
│   │   ├── ErrorModal.jsx
│   │   ├── ExerciseCard.jsx
│   │   ├── Generator.jsx     
│   │   ├── Hero.jsx
│   │   ├── Navbar.jsx
│   │   ├── SectionWrapper.jsx
│   │   └── Workout.jsx
│   ├── utils                 # Utility files
│   │   ├── exportWorkoutAsPdf.js # PDF export functionality
│   │   ├── functions.js      
│   │   ├── keywords.js       # Keywords for chatbot filtering
│   │   ├── server.js         # Express server configuration (local dev)
│   │   └── workouts.js       # Workout data management
│   ├── App.jsx               # Main App component
│   ├── index.css             # Global styles
│   └── main.jsx              # Entry point for the React application
├── .env                      # Environment variables
├── .gitignore                # Git ignore file
├── index.html                # Main HTML template
├── netlify.toml              # Netlify configuration file
├── package-lock.json         # Dependency tree
└── package.json              # Project metadata and dependencies
```
<!-- MARKDOWN LINKS & IMAGES -->
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Nodejs]: https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white
[Node-url]: https://nodejs.org/
[Express.js]: https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white
[Express-url]: https://expressjs.com/
[Vite]: https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white
[Vite-url]: https://vitejs.dev/
[Netlify]: https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white
[Netlify-url]: https://www.netlify.com/
[Gemini]: https://img.shields.io/badge/Gemini-4285F4?style=for-the-badge&logo=google&logoColor=white
[Gemini-url]: https://cloud.google.com/vertex-ai/docs/generative-ai/gemini
[Tailwind]: https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white
[Tailwind-url]: https://tailwindcss.com/

