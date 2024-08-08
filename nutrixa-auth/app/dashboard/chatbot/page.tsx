'use client';

import { useState, useEffect } from 'react';
const { GoogleGenerativeAI } = require("@google/generative-ai");
import { useRouter } from "next/navigation";

console.log('API Key:', process.env.NEXT_PUBLIC_GOOGLE_KEY);

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GOOGLE_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export default function Chatbot() {
  const router = useRouter(); // Initialize the router

  const goToDashboard = () => {
    router.push("/dashboard"); // Function to navigate to the dashboard page
  };
  
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<string[]>([]);
  const [chat, setChat] = useState<any>(null);
  const [diets, setDiets] = useState<any>(null);
  const [goal, setGoal] = useState<any>(null);
  const [person, setPerson] = useState<any>(null);
  const [firstName, setFirstName] = useState<string>('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('/api/generateData');
        const data = await response.json();
  
        if (response.ok) {
          // Set state first before using it in chat_text
          setDiets(data.diets);
          setGoal(data.goal);
          setPerson(data.person);
          setFirstName(data.firstName);
        } else {
          console.error('Error fetching user data:', data.message);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
  
    fetchUserData();
  }, []);
  
  // Initialize chat only after states are updated
  useEffect(() => {
    if (person && diets && goal) {
      const initializeChat = async () => {
        try {
          const chatInstance = await model.startChat({
            history: [
              {
                role: "user",
                parts: [
                  {
                    text: `Hi Gemini, this is ${firstName}. They are ${person.gender}, aged: ${new Date().getFullYear() - new Date(person.dob).getFullYear()} years old, 
                    weighing: ${person.weight}, height: ${person.height}, with the following dietary restrictions: ${JSON.stringify(diets)} and the goal: ${JSON.stringify(goal)}. Please help them with any fitness/health questions`
                  }
                ],
              },
              {
                role: "model",
                parts: [{ text: "I'm Ready" }],
              },
            ],
            generationConfig: {
              maxOutputTokens: 1000,
            },
          });
          setChat(chatInstance);
        } catch (error) {
          console.error('Error initializing chat:', error);
        }
      };

      initializeChat();
    }
  }, [person, diets, goal]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleSend = async () => {
    if (message.trim() && chat) {
      setMessages([...messages, `You: ${message}`]);
      setMessage('');

      try {
        const result = await chat.sendMessage(message);
        const response = await result.response;
        const text = await response.text();

        // Format response text for better readability
        const formattedText = text
          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Convert **bold** to <strong>
          .replace(/\*(.*?)\*/g, '<em>$1</em>') // Convert *italic* to <em>
          .replace(/\n/g, '<br/>'); // Replace new lines with <br> for better readability

        setMessages([...messages, `You: ${message}`, `King George III: ${formattedText}`]);
      } catch (error) {
        console.error('Error occurred while sending message:', error);
        setMessages([...messages, `You: ${message}`, `King George III: Error occurred`]);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent the default behavior of the Enter key (e.g., form submission)
      handleSend();
    }
  };

  return (
    <main className="flex flex-col items-center min-h-screen">
      <h1 className="text-2xl mt-24 mb-12 text-center">
        Say hi to your personal fitness buddy, King George III
      </h1>

      <div
        className="p-2 border-4 border-gray-300 rounded text-sm"
        style={{ width: '700px', height: '500px', overflowY: 'scroll' }}
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 rounded mb-2 ${msg.startsWith('You:') ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
            dangerouslySetInnerHTML={{ __html: msg.replace(/^King George III: /, '') }} // Render HTML safely
          />
        ))}
      </div>

      <div
        className="bg-gray-300 border-2 border-gray-700 flex items-center p-2"
        style={{ width: '700px', height: '200px' }}
      >
        <input
          type="text"
          value={message}
          onChange={handleInputChange}
          placeholder="Type Here"
          className="p-2 border border-gray-700 rounded-full text-lg flex-grow"
          style={{ marginRight: '10px', height: '80px' }}
          onKeyDown={handleKeyDown} // Attach the onKeyDown handler
        />
        <img
          src="/send.png"
          onClick={handleSend}
          style={{ width: '50px', height: '50px', cursor: 'pointer' }}
          alt="Send Icon"
        />
      </div>
      <img 
        src="/bot_icon.gif" 
        className="w-full h-full object-cover"
        style={{ height: '100%', width: '100%' }}
        alt="Bot Icon"
      />
    </main>
  );
}
