'use client';

import React, { useState } from 'react';
import Image from 'next/image';

const QuizPage = () => {
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
        body: JSON.stringify({ vegetarian, vegan, halal, kosher, glutenFree, dairyFree, nutFree, other, otherText}),
      });

      if (!response.ok) {
        throw new Error('Failed to update preferences');
      }

      const data = await response.json();
      console.log('Form submitted successfully:', data);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="">
      <Image className="mx-auto" src="/food.png" width={300} height={300} alt="Food" />
      <h1 className="font-serif text-3xl text-center">Select Any That Apply:</h1>
      <div className="bg-green-500 rounded-2xl mx-8 p-4 m-4">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-green-800 rounded-2xl p-4 mx-auto">
            <label htmlFor="vegetarian" className="text-white mr-4">
              Vegetarian
            </label>
            <input
              type="checkbox"
              id="vegetarian"
              checked={vegetarian}
              onChange={handleFormChange}
              className="mr-2"
            />
          </div>
          <div className="bg-green-800 rounded-2xl p-4 mx-auto">
            <label htmlFor="vegan" className="text-white mr-4">
              Vegan
            </label>
            <input
              type="checkbox"
              id="vegan"
              checked={vegan}
              onChange={handleFormChange}
              className="mr-2"
            />
          </div>
          <div className="bg-green-800 rounded-2xl p-4 mx-auto">
            <label htmlFor="halal" className="text-white mr-4">
              Halal
            </label>
            <input
              type="checkbox"
              id="halal"
              checked={halal}
              onChange={handleFormChange}
              className="mr-2"
            />
          </div>
          <div className="bg-green-800 rounded-2xl p-4 mx-auto">
            <label htmlFor="kosher" className="text-white mr-4">
              Kosher
            </label>
            <input
              type="checkbox"
              id="kosher"
              checked={kosher}
              onChange={handleFormChange}
              className="mr-2"
            />
          </div>
          <div className="bg-green-800 rounded-2xl p-4 mx-auto">
            <label htmlFor="glutenFree" className="text-white mr-4">
              Gluten Free
            </label>
            <input
              type="checkbox"
              id="glutenFree"
              checked={glutenFree}
              onChange={handleFormChange}
              className="mr-2"
            />
          </div>
          <div className="bg-green-800 rounded-2xl p-4 mx-auto">
            <label htmlFor="dairyFree" className="text-white mr-4">
              Dairy Free
            </label>
            <input
              type="checkbox"
              id="dairyFree"
              checked={dairyFree}
              onChange={handleFormChange}
              className="mr-2"
            />
          </div>
          <div className="bg-green-800 rounded-2xl p-4 mx-auto">
            <label htmlFor="nutFree" className="text-white mr-4">
              Nut Free
            </label>
            <input
              type="checkbox"
              id="nutFree"
              checked={nutFree}
              onChange={handleFormChange}
              className="mr-2"
            />
          </div>
          <div className="bg-green-800 rounded-2xl p-4 mx-auto">
            <label htmlFor="other" className="text-white mr-4">
              Other
            </label>
            <input
              type="checkbox"
              id="other"
              checked={other}
              onChange={handleFormChange}
              className="mr-2"
            />
            <input
              type="text"
              id="otherText"
              value={otherText}
              onChange={handleFormChange}
              className="mt-2 p-2 w-full border border-gray-300 rounded"
              placeholder="Please specify"
            />
          </div>
          <div className="col-span-1 md:col-span-2 flex justify-center">
            <button
              type="submit"
              className="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded"
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
