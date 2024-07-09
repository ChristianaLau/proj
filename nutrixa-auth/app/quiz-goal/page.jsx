'use client';

import React, { useState } from 'react';
import Image from 'next/image';

import { useRouter } from 'next/navigation';

const QuizPage = () => {

  const router = useRouter();

  const [loseWeight, setLoseWeight] = useState(false);
  const [increaseEndurance, setIncreaseEndurance] = useState(false);
  const [improveFlexibility, setImproveFlexibility] = useState(false);
  const [boostEnergyLevels, setBoostEnergyLevels] = useState(false);
  const [maintainHealth, setMaintainHealth] = useState(false);
  const [buildStrength, setBuildStrength] = useState(false);
  const [toneMuscles, setToneMuscles] = useState(false);
  const [improveCardiovascularHealth, setImproveCardiovascularHealth] = useState(false);
  const [reduceStressLevels, setReduceStressLevels] = useState(false);

  const handleFormChange = (e) => {
    const { id, type, checked } = e.target;
    if (type === 'checkbox') {
      switch (id) {
        case 'loseWeight':
          setLoseWeight(checked);
          break;
        case 'increaseEndurance':
          setIncreaseEndurance(checked);
          break;
        case 'improveFlexibility':
          setImproveFlexibility(checked);
          break;
        case 'boostEnergyLevels':
          setBoostEnergyLevels(checked);
          break;
        case 'maintainHealth':
          setMaintainHealth(checked);
          break;
        case 'buildStrength':
          setBuildStrength(checked);
          break;
        case 'toneMuscles':
          setToneMuscles(checked);
          break;
        case 'improveCardiovascularHealth':
          setImproveCardiovascularHealth(checked);
          break;
        case 'reduceStressLevels':
          setReduceStressLevels(checked);
          break;
        default:
          break;
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/updateGoal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          loseWeight,
          increaseEndurance,
          improveFlexibility,
          boostEnergyLevels,
          maintainHealth,
          buildStrength,
          toneMuscles,
          improveCardiovascularHealth,
          reduceStressLevels,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update goals');
      }

      const data = await response.json();
      console.log('Form submitted successfully:', data);
      router.push('quiz-person');

    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="">
      <Image className="mx-auto" src="/target.png" width={300} height={300} alt="Fitness" />
      <h1 className="font-serif text-3xl text-center">Select Your Fitness Goals:</h1>
      <div className="bg-blue-500 rounded-2xl mx-8 p-4 m-4">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-blue-800 rounded-2xl p-4 mx-auto">
            <label htmlFor="loseWeight" className="text-white mr-4">
              Lose Weight
            </label>
            <input
              type="checkbox"
              id="loseWeight"
              checked={loseWeight}
              onChange={handleFormChange}
              className="mr-2"
            />
          </div>
          <div className="bg-blue-800 rounded-2xl p-4 mx-auto">
            <label htmlFor="increaseEndurance" className="text-white mr-4">
              Increase Endurance
            </label>
            <input
              type="checkbox"
              id="increaseEndurance"
              checked={increaseEndurance}
              onChange={handleFormChange}
              className="mr-2"
            />
          </div>
          <div className="bg-blue-800 rounded-2xl p-4 mx-auto">
            <label htmlFor="improveFlexibility" className="text-white mr-4">
              Improve Flexibility
            </label>
            <input
              type="checkbox"
              id="improveFlexibility"
              checked={improveFlexibility}
              onChange={handleFormChange}
              className="mr-2"
            />
          </div>
          <div className="bg-blue-800 rounded-2xl p-4 mx-auto">
            <label htmlFor="boostEnergyLevels" className="text-white mr-4">
              Boost Energy Levels
            </label>
            <input
              type="checkbox"
              id="boostEnergyLevels"
              checked={boostEnergyLevels}
              onChange={handleFormChange}
              className="mr-2"
            />
          </div>
          <div className="bg-blue-800 rounded-2xl p-4 mx-auto">
            <label htmlFor="maintainHealth" className="text-white mr-4">
              Maintain Health
            </label>
            <input
              type="checkbox"
              id="maintainHealth"
              checked={maintainHealth}
              onChange={handleFormChange}
              className="mr-2"
            />
          </div>
          <div className="bg-blue-800 rounded-2xl p-4 mx-auto">
            <label htmlFor="buildStrength" className="text-white mr-4">
              Build Strength
            </label>
            <input
              type="checkbox"
              id="buildStrength"
              checked={buildStrength}
              onChange={handleFormChange}
              className="mr-2"
            />
          </div>
          <div className="bg-blue-800 rounded-2xl p-4 mx-auto">
            <label htmlFor="toneMuscles" className="text-white mr-4">
              Tone Muscles
            </label>
            <input
              type="checkbox"
              id="toneMuscles"
              checked={toneMuscles}
              onChange={handleFormChange}
              className="mr-2"
            />
          </div>
          <div className="bg-blue-800 rounded-2xl p-4 mx-auto">
            <label htmlFor="improveCardiovascularHealth" className="text-white mr-4">
              Improve Cardiovascular Health
            </label>
            <input
              type="checkbox"
              id="improveCardiovascularHealth"
              checked={improveCardiovascularHealth}
              onChange={handleFormChange}
              className="mr-2"
            />
          </div>
          <div className="bg-blue-800 rounded-2xl p-4 mx-auto">
            <label htmlFor="reduceStressLevels" className="text-white mr-4">
              Reduce Stress Levels
            </label>
            <input
              type="checkbox"
              id="reduceStressLevels"
              checked={reduceStressLevels}
              onChange={handleFormChange}
              className="mr-2"
            />
          </div>
          <div className="col-span-1 md:col-span-2 flex justify-center">
            <button
              type="submit"
              className="bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QuizPage;
