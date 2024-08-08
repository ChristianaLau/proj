'use client'
import { useState } from 'react';
import WaterAnimate from './waterlog';

const WaterLogger: React.FC = () => {
    const [goal, setGoal] = useState<string>(''); 
    const [intake, setIntake] = useState<string>(''); 
    return (
      <div className="min-h-screen bg-white text-black">
        <h1>Water Tracker</h1>
        <div>
          <label>
            Set your goal (oz):
            <input type="text" value={goal} onChange={(e) => setGoal(e.target.value)} />
          </label>
        </div>
        <div>
          <label>
            Water intake (oz):
            <input type="text" value={intake} onChange={(e) => setIntake(e.target.value)} />
          </label>
        </div>
        <WaterAnimate intake={parseInt(intake, 10) || 0} goal={parseInt(goal, 10) || 0} />
      </div>
    );
  };
  
  export default WaterLogger;