'use client';
import { useState } from 'react';
import WaterAnimate from './waterlog';

const WaterLogger: React.FC = () => {
    const [goal, setGoal] = useState<string>(''); 
    const [intake, setIntake] = useState<string>('');

    const handleUpdate = async () => {
        try {
            const response = await fetch('/api/updateWaterIntake', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    intake: parseInt(intake, 10),
                    goal: parseInt(goal, 10),
                    daysGoalMet: parseInt(intake, 10) >= parseInt(goal, 10),
                }),
            });

            if (!response.ok) {
                console.error('Failed to update water intake');
            } else {
                const data = await response.json();
                console.log('Water intake updated:', data);
            }
        } catch (error) {
            console.error('Error updating water intake:', error);
        }
    };

    return (
      <div className="bg-white text-black flex flex-col items-center justify-center">
        <h1 className="text-lg font-bold mb-4">Water Tracker</h1>
        <div className='mb-4 w-full'>
          <label className="block text-sm text-gray-700">
            Set your water goal (oz):
            <input 
              type="text" 
              value={goal} 
              onChange={(e) => setGoal(e.target.value)} 
              className="w-full p-2 mt-1 border-2 border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </label>
        </div>
        <div className="w-full">
          <label className="block text-sm text-gray-700">
            Water intake (oz):
            <input 
              type="text" 
              value={intake} 
              onChange={(e) => setIntake(e.target.value)} 
              className="w-full p-2 mt-1 border-2 border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </label>
        </div>
        <button 
          onClick={handleUpdate} 
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
        >
          Update
        </button>
        <div className="mt-4 w-full">
          <WaterAnimate intake={parseInt(intake, 10) || 0} goal={parseInt(goal, 10) || 0} />
        </div>
      </div>
    );
};
  
export default WaterLogger;
