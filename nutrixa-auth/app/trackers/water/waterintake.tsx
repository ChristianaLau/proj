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

    const handleSubmit = async () => {
        try {
            const response = await fetch('/api/watersave', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    date: new Date().toISOString(),
                    water: parseInt(intake, 10) || 0,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Data submitted successfully:', data);
            } else {
                console.error('Failed to submit data:', response.statusText);
            }
        } catch (error) {
            console.error('Error submitting data:', error);
        }
    };

    const handleCombinedSubmit = async () => {
        await handleUpdate();
        await handleSubmit();
    };

    return (
      <div className="bg-white text-black flex flex-col items-center justify-center" style={{ marginTop: '-20px' }}> 
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
          onClick={handleCombinedSubmit} 
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
        <div className="mt-4 w-full">
          <WaterAnimate intake={parseInt(intake, 10) || 0} goal={parseInt(goal, 10) || 0} />
        </div>
      </div>
    );
};
  
export default WaterLogger;
