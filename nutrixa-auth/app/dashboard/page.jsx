'use client';

import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { useUser } from '@clerk/nextjs';
import WaterLogger from '../trackers/water/waterintake';
import WeightLog from '../trackers/weight/weightlog';

export default function Home() {
  const { user } = useUser();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [showPopup, setShowPopup] = useState(true); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/gemini');
        if (!response.ok) {
          throw new Error('Failed to fetch suggestions');
        }
        const result = await response.json();
        
        // Convert result to string so the API and other stuff are good
        const resultString = typeof result === 'string' ? result : JSON.stringify(result);
        
        setData(resultString);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    //comment from here
    const lastShownDate = localStorage.getItem('popupLastShownDate');
    const today = new Date().toISOString().split('T')[0]; 

    if (lastShownDate !== today) {
      setShowPopup(true);
      localStorage.setItem('popupLastShownDate', today);
    }
    else{
      setShowPopup(false);
    }
    //to here
  }, []);

  const createdAtDate = user ? new Date(user.createdAt).toLocaleDateString() : '';

  return (
    <div className="flex min-h-screen">
      <Sidebar />  
      <main className="flex flex-1 flex-col bg-white">
        <div className="w-full flex mt-4 ml-10">
          <h1 className="text-2xl font-bold text-gray-800">
            Welcome Back, {user?.firstName || 'User'}!
          </h1>
        </div>
        <div className="w-full mt-2 ml-10">
          {user && (
            <h2 className="text-lg text-gray-600">
              Member since: {createdAtDate}
            </h2>
          )}
        </div>
        <div className="w-full mt-4 ml-10">      
        </div>
        <h2 className='flex justify-start'>
            <WaterLogger />
            <WeightLog />
        </h2>

        {/* Pop-up Box */}
        {showPopup && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
            <div className="bg-white p-12 rounded-lg shadow-lg w-96 max-w-lg">
              <h2 className="text-2xl font-bold">Welcome {user?.firstName || 'User'}</h2>
              <p className="mt-4 text-lg">Please fill out the following:</p>
              
              <div className="mt-6">
                <label className="block text-gray-700 text-base font-semibold mb-2" htmlFor="sleep">
                  Hours of Sleep:
                </label>
                <input
                  id="sleep"
                  type="number"
                  min="0"
                  className="border border-gray-300 rounded-lg px-4 py-2 w-full text-lg"
                />
              </div>
              
              <div className="mt-6">
                <label className="block text-gray-700 text-base font-semibold mb-2" htmlFor="water">
                  Water Intake (in cups):
                </label>
                <input
                  id="water"
                  type="number"
                  min="0"
                  step="0.1"
                  className="border border-gray-300 rounded-lg px-4 py-2 w-full text-lg"
                />
              </div>
              
              <div className="mt-6">
                <label className="block text-gray-700 text-base font-semibold mb-2" htmlFor="meditation">
                  Hours of Meditation:
                </label>
                <input
                  id="meditation"
                  type="number"
                  min="0"
                  className="border border-gray-300 rounded-lg px-4 py-2 w-full text-lg"
                />
              </div>
              
              <button 
                className="mt-6 bg-blue-600 text-white px-6 py-3 rounded text-lg"
                onClick={() => setShowPopup(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
