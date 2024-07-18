'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const QuizPage = () => {
  const router = useRouter();

  const [vegetarian, setVegetarian] = useState(false);
  const [vegan, setVegan] = useState(false);
  const [halal, setHalal] = useState(false);
  const [kosher, setKosher] = useState(false);
  const [glutenFree, setGlutenFree] = useState(false);
  const [dairyFree, setDairyFree] = useState(false);
  const [nutFree, setNutFree] = useState(false);
  const [other, setOther] = useState(false);
  const [otherText, setOtherText] = useState('');

  const handleFormChange = (e) => {
    const { id, type, value, checked } = e.target;
    if (type === 'checkbox') {
      switch (id) {
        case 'vegetarian':
          setVegetarian(checked);
          break;
        case 'vegan':
          setVegan(checked);
          break;
        case 'halal':
          setHalal(checked);
          break;
        case 'kosher':
          setKosher(checked);
          break;
        case 'glutenFree':
          setGlutenFree(checked);
          break;
        case 'dairyFree':
          setDairyFree(checked);
          break;
        case 'nutFree':
          setNutFree(checked);
          break;
        case 'other':
          setOther(checked);
          break;
        default:
          break;
      }
    } else {
      if (id === 'otherText') {
        setOtherText(value);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/updatePreferences', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ vegetarian, vegan, halal, kosher, glutenFree, dairyFree, nutFree, other, otherText }),
      });

      if (!response.ok) {
        throw new Error('Failed to update preferences');
      }

      const data = await response.json();
      console.log('Form submitted successfully:', data);

      router.push('/quiz-goal');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleSkip = (e) => {
    e.preventDefault();
    setVegetarian(false);
    setVegan(false);
    setHalal(false);
    setKosher(false);
    setGlutenFree(false);
    setDairyFree(false);
    setNutFree(false);
    setOther(false);
    setOtherText('');
    handleSubmit(e);
  };

  return (
    <div className="mt-10">
      <Image className="mx-auto" src="/food.png" width={300} height={300} alt="Food" />
      <div
        className="bg-green-500 rounded-2xl mx-8 p-4 m-4 mt-10"
        style={{
          width: '700px',
          height: '500px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: '20px',
          backgroundColor: "#F9F9F9",
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
        }}
      >
        <h1 style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif', fontSize: '30px', marginBottom: '20px' }}>Select Your Fitness Goals:</h1>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-green-800 rounded-2xl p-4 mx-auto" style={{ width: '200px', height: '60px', marginRight: '50px', backgroundColor: "#FEFEFE", boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <input
              type="checkbox"
              id="vegetarian"
              checked={vegetarian}
              onChange={handleFormChange}
              className="mr-2"
              style={{ width: '18px', height: '18px' }}
            />
            <label htmlFor="vegetarian" className=" text-black mr-4" style={{textAlign:'center'}}>
              Vegetarian
            </label>
          </div>
          <div className="bg-green-800 rounded-2xl p-4 mx-auto" style={{ width: '200px', height: '60px', marginRight: '50px', backgroundColor: "#FEFEFE", boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <input
              type="checkbox"
              id="vegan"
              checked={vegan}
              onChange={handleFormChange}
              className="mr-2"
              style={{ width: '18px', height: '18px' }}
            />
            <label htmlFor="vegan" className="text-lg text-black mr-4"style={{textAlign:'center'}}>
              Vegan
            </label>
          </div>
          <div className="bg-green-800 rounded-2xl p-4 mx-auto" style={{ width: '200px', height: '60px', marginRight: '50px', backgroundColor: "#FEFEFE", boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <input
              type="checkbox"
              id="halal"
              checked={halal}
              onChange={handleFormChange}
              className="mr-2"
              style={{ width: '18px', height: '18px' }}
            />
            <label htmlFor="halal" className="text-black mr-4"style={{textAlign:'center'}}>
              Halal
            </label>
          </div>
          <div className="bg-green-800 rounded-2xl p-4 mx-auto" style={{ width: '200px', height: '60px', marginRight: '50px', backgroundColor: "#FEFEFE", boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <input
              type="checkbox"
              id="kosher"
              checked={kosher}
              onChange={handleFormChange}
              className="mr-2"
              style={{ width: '18px', height: '18px' }}
            />
            <label htmlFor="kosher" className=" text-black mr-4"style={{textAlign:'center'}}>
              Kosher
            </label>
          </div>
          <div className="bg-green-800 rounded-2xl p-4 mx-auto" style={{ width: '200px', height: '60px', marginRight: '50px', backgroundColor: "#FEFEFE", boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <input
              type="checkbox"
              id="glutenFree"
              checked={glutenFree}
              onChange={handleFormChange}
              className="mr-2"
              style={{ width: '18px', height: '18px' }}
            />
            <label htmlFor="glutenFree" className="text-black mr-4"style={{textAlign:'center'}}>
              Gluten Free
            </label>
          </div>
          <div className="bg-green-800 rounded-2xl p-4 mx-auto" style={{ width: '200px', height: '60px', marginRight: '50px', backgroundColor: "#FEFEFE", boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <input
              type="checkbox"
              id="dairyFree"
              checked={dairyFree}
              onChange={handleFormChange}
              className="mr-2"
              style={{ width: '18px', height: '18px' }}
            />
            <label htmlFor="dairyFree" className="text-black mr-4"style={{textAlign:'center'}}>
              Dairy Free
            </label>
          </div>
          <div className="bg-green-800 rounded-2xl p-4 mx-auto" style={{ width: '200px', height: '60px', marginRight: '50px', backgroundColor: "#FEFEFE", boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <input
              type="checkbox"
              id="nutFree"
              checked={nutFree}
              onChange={handleFormChange}
              className="mr-2"
              style={{ width: '18px', height: '18px' }}
            />
            <label htmlFor="nutFree" className="text-black mr-4"style={{textAlign:'center'}}>
              Nut Free
            </label>
          </div>
          <div className="bg-green-800 rounded-2xl p-4 mx-auto" style={{ width: '200px', height: '60px', marginRight: '50px', backgroundColor: "#FEFEFE", boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <input
              type="checkbox"
              id="other"
              checked={other}
              onChange={handleFormChange}
              className="mr-2"
              style={{ width: '18px', height: '18px' }}
            />
            <label htmlFor="other" className="text-black mr-4"style={{textAlign:'center'}}>
              Other
            </label>
            {other && (
              <input
                type="text"
                id="otherText"
                value={otherText}
                onChange={handleFormChange}
                placeholder="Please specify"
                className="ml-2 p-1 border rounded-md"
                style={{ width: '150px' }}
              />
            )}
          </div>
          <div className="col-span-2 mt-4 flex justify-center gap-4">
            <button
              type="submit"
              className="hover:bg-green-900 text-white font-bold py-2 px-4 rounded"
              style={{ width: '200px', height: '50px', backgroundColor: '#5DB075' }}
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
