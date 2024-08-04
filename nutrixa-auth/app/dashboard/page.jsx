'use client'; // Indicate that this is a client component

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Sidebar from '../components/Sidebar';
import { useUser } from '@clerk/nextjs';

export default function Home() {
  const { user } = useUser();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/gemini');
        if (!response.ok) {
          throw new Error('Failed to fetch suggestions');
        }
        const result = await response.json();
        setData(result);
        console.log(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center bg-white">
      <header className="w-full flex justify-between items-center p-4 bg-custom-gradient border-b border-gray-300">
        <div className="flex items-center space-x-4">
          <Image
            src="/logo_and_banner.png"
            alt="logo and banner"
            width={500}
            height={50}
            priority
          />
          <nav className="flex space-x-4">
            <Link href="/dashboard/calender" className="text-black text-sm hover:text-gray-700">Calendar</Link>
            <Link href="/dashboard/chatbot" className="text-black text-sm hover:text-gray-700">Chatbot</Link>
            <Link href="/dashboard/nutrition" className="text-black text-sm hover:text-gray-700">Nutrition</Link>
            <Link href="/dashboard/trends" className="text-black text-sm hover:text-gray-700">Trends</Link>
            <Link href="/dashboard/workouts" className="text-black text-sm hover:text-gray-700">Workouts</Link>
            <Link href="/dashboard/LeaderBoardPage" className="text-black text-sm hover:text-gray-700">Leaderboard</Link>
          </nav>
          <div>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="search"
                className="p-1 border border-gray-300 rounded-full text-sm"
              />
              <button className="p-1 bg-gray-300 hover:bg-gray-400 rounded-full text-sm">Search</button>
            </div>
            <Sidebar/>
          </div>
        </div>
      </header>
      <div className="w-full flex mt-4 ml-10">
        <h1 className="text-2xl font-bold text-gray-800">
          Welcome Back, {user?.firstName || 'User'}!
        </h1>
      </div>
      <div className="w-full mt-4 ml-10">
      </div>
    </main>
  );
}
