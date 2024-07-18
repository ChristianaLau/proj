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
  const handleSkip = (e) => {
    e.preventDefault();
    setLoseWeight(false);
    setIncreaseEndurance(false);
    setImproveFlexibility(false);
    setBoostEnergyLevels(false);
    setMaintainHealth(false);
    setBuildStrength(false);
    setToneMuscles(false);
    setImproveCardiovascularHealth(false);
    setReduceStressLevels(false);
    handleSubmit(e);
  };

  return (
    <div className="flex flex-col items-center ">
      <Image className="mx-auto" src="/target.png" width={300} height={300} alt="Fitness" />
      <div className="bg-blue-500 rounded-2xl mx-8 p-4 m-4"      
        style={{
          width: '850px', // Adjust width as needed
          height: '650px', // Adjust height as needed
          display: 'flex',
          flexDirection: 'column', // Ensure items stack vertically
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: '20px', // Adjust margin bottom as needed
          marginTop: '40px',
          backgroundColor: "#F9F9F9",
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
          textAlign: 'center' // Center aligns content horizontally
        }}>
          <h1 style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif', fontSize: '30px', marginBottom: '20px' }}>Select Your Fitness Goals:</h1>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-4xl p-4">
          <div className="rounded-2xl p-4 mx-auto" style={{ display: 'flex', alignItems: 'center', width: '250px', height: '60px', marginBottom: '5px',backgroundColor: "#FEFEFE", boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)'}}>
            <input
              type="checkbox"
              id="loseWeight"
              checked={loseWeight}
              onChange={handleFormChange}
              className="mr-2"
              style={{ width: '18px', height: '18px' }}
            />
            <label htmlFor="loseWeight" className="text-black">
              Lose Weight
            </label>
          </div>
          <div className="rounded-2xl p-4 mx-auto" style={{ display: 'flex', alignItems: 'center', width: '250px', height: '60px', marginBottom: '5px' ,backgroundColor: "#FEFEFE", boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)'}}>
            <input
              type="checkbox"
              id="increaseEndurance"
              checked={increaseEndurance}
              onChange={handleFormChange}
              className="mr-2"
              style={{ width: '18px', height: '18px' }}
            />
            <label htmlFor="increaseEndurance" className="text-black">
              Increase Endurance
            </label>
          </div>
          <div className="rounded-2xl p-4 mx-auto" style={{ display: 'flex', alignItems: 'center', width: '250px', height: '60px', marginBottom: '5px',backgroundColor: "#FEFEFE", boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)'  }}>
            <input
              type="checkbox"
              id="improveFlexibility"
              checked={improveFlexibility}
              onChange={handleFormChange}
              className="mr-2"
              style={{ width: '18px', height: '18px' }}
            />
            <label htmlFor="improveFlexibility" className="text-black">
              Improve Flexibility
            </label>
          </div>
          <div className="rounded-2xl p-4 mx-auto" style={{ display: 'flex', alignItems: 'center', width: '250px', height: '60px', marginBottom: '5px',backgroundColor: "#FEFEFE", boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)'  }}>
            <input
              type="checkbox"
              id="boostEnergyLevels"
              checked={boostEnergyLevels}
              onChange={handleFormChange}
              className="mr-2"
              style={{ width: '18px', height: '18px' }}
            />
            <label htmlFor="boostEnergyLevels" className="text-black">
              Boost Energy Levels
            </label>
          </div>
          <div className="rounded-2xl p-4 mx-auto" style={{ display: 'flex', alignItems: 'center', width: '250px', height: '60px', marginBottom: '5px',backgroundColor: "#FEFEFE", boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)'  }}>
            <input
              type="checkbox"
              id="maintainHealth"
              checked={maintainHealth}
              onChange={handleFormChange}
              className="mr-2"
              style={{ width: '18px', height: '18px' }}
            />
            <label htmlFor="maintainHealth" className="text-black">
              Maintain Health
            </label>
          </div>
          <div className="rounded-2xl p-4 mx-auto" style={{ display: 'flex', alignItems: 'center', width: '250px', height: '60px', marginBottom: '5px',backgroundColor: "#FEFEFE", boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)'  }}>
            <input
              type="checkbox"
              id="buildStrength"
              checked={buildStrength}
              onChange={handleFormChange}
              className="mr-2"
              style={{ width: '18px', height: '18px' }}
            />
            <label htmlFor="buildStrength" className="text-black">
              Build Strength
            </label>
          </div>
          <div className="rounded-2xl p-4 mx-auto" style={{ display: 'flex', alignItems: 'center', width: '250px', height: '60px', marginBottom: '5px',backgroundColor: "#FEFEFE", boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)'  }}>
            <input
              type="checkbox"
              id="toneMuscles"
              checked={toneMuscles}
              onChange={handleFormChange}
              className="mr-2"
              style={{ width: '18px', height: '18px' }}
            />
            <label htmlFor="toneMuscles" className="text-black">
              Tone Muscles
            </label>
          </div>
          <div className="rounded-2xl p-4 mx-auto" style={{ display: 'flex', alignItems: 'center', width: '300px', height: '60px', marginBottom: '5px',marginLeft:'70px',backgroundColor: "#FEFEFE", boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',marginRight: '20px'  }}>
            <input
              type="checkbox"
              id="improveCardiovascularHealth"
              checked={improveCardiovascularHealth}
              onChange={handleFormChange}
              className="mr-2"
              style={{ width: '18px', height: '18px' }}
            />
            <label htmlFor="improveCardiovascularHealth" className="text-black">
              Improve Cardiovascular Health
            </label>
          </div>
          <div className="bg-blue-800 rounded-2xl p-4 mx-auto" style={{ display: 'flex', alignItems: 'center', width: '250px', height: '60px', marginBottom: '5px',backgroundColor: "#FEFEFE", boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)'  }}>
            <input
              type="checkbox"
              id="reduceStressLevels"
              checked={reduceStressLevels}
              onChange={handleFormChange}
              className="mr-2"
              style={{ width: '18px', height: '18px' }}
            />
            <label htmlFor="reduceStressLevels" className="text-black">
              Reduce Stress Levels
            </label>
          </div>
          <div className="col-span-1 md:col-span-2 flex justify-center"style={{ marginTop: '10px' }}>
            <button
              type="submit"
              className="bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-300 rounded"
              style={{ width: '200px', height: '50px', backgroundColor: "#5DB075" }} // Adjust width and height as needed
            >
              Submit
            </button>
          </div>
        </form>
      </div>
      <h1 className="font-sans text-xl text-center mt-4">I would like to skip for now.</h1>
      <div className="flex justify-center">
          <button
            onClick={handleSkip}
            className="text-black hover:text-white font-bold py-2 px-4 rounded"
            style={{ width: '200px', height: '50px', fontSize: '1rem' }}
          >
            Skip
          </button>
        </div>
    </div>
  );
};

export default QuizPage;
