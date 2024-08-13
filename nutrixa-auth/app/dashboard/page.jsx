'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Sidebar from '../components/Sidebar';
import { useUser } from '@clerk/nextjs';
import WaterLogger from '../trackers/water/waterintake';

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
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex min-h-screen">
      <Sidebar />  {/* Ensure Sidebar is visible */}
      <main className="flex flex-1 flex-col bg-white">
        <div className="w-full flex mt-4 ml-10">
          <h1 className="text-2xl font-bold text-gray-800">
            Welcome Back, {user?.firstName || 'User'}!
          </h1>
        </div>
        <div className="w-full mt-4 ml-10">      
          {/* Content */}
        </div>
        <h2 className='flex justify-start'>
            <WaterLogger />
        </h2>
      </main>
    </div>
  );
}
