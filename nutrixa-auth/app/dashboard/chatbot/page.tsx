'use client'
import { useState, useEffect } from 'react';
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI('AIzaSyCsxvRUEvieHX0_TyXDmMhJxqEuOw6XadA');
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export default function Chatbot() {
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<string[]>([]);
  const [chat, setChat] = useState<any>(null); 

  useEffect(() => {
    const initializeChat = async () => {
      const chatInstance = model.startChat({
        history: [
          {
            role: "user",
            parts: [{ text: "Hello, Gemini, this is a pre-introduction to Christiana. This individual is 6'4 tall, 70kg, on a vegan diet and female. Please greet them, then help them with any general health questions. The chat with Christiana will start now." }],
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
    };

    initializeChat();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleSend = async () => {
    if (message.trim() && chat) {
      setMessages([...messages, `You: ${message}`]);
      setMessage('');

      try {
        // Send the message to the chat instance
        const result = await chat.sendMessage(message);
        const response = await result.response;
        const text = response.text();

        setMessages([...messages, `You: ${message}`, `King George III: ${text}`]);
      } catch (error) {
        console.error('Error:', error);
        setMessages([...messages, `You: ${message}`, `King George III: Error occurred`]);
      }
    }
  };

  return (
    <main className="flex flex-col items-center min-h-screen">
      <h1 className="text-2xl mt-24 mb-12 text-center">
        Say hi to your personal fitness buddy, King George III
      </h1>

      <div
        className="p-2 border-4 border-gray-300 rounded text-sm"
        style={{ width: '800px', height: '700px' }}
      >
        {messages.map((msg, index) => (
          <div key={index} className={`p-2 rounded mb-2 ${msg.startsWith('You:') ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}>
            {msg}
          </div>
        ))}
      </div>

      <div
        className="bg-gray-300 border-2 border-gray-700 flex items-center p-2"
        style={{ width: '800px', height: '200px' }}
      >
        <input
          type="text"
          value={message}
          onChange={handleInputChange}
          placeholder="Type Here"
          className="p-2 border border-gray-700 rounded-full text-lg flex-grow"
          style={{ marginRight: '10px', height: '80px' }}
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
