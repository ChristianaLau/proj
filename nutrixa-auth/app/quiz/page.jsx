'use client';

import React, { useState } from 'react';
import Image from 'next/image';

const QuizPage = () => {
  const [formState, setFormState] = useState({
    vegetarian: false,
    vegan: false,
    halal: false,
    kosher: false,
    glutenFree: false,
    dairyFree: false,
    nutFree: false,
    other: false,
    otherText: '',
  });

  const handleFormChange = (e) => {
    const { id, type, value, checked } = e.target;
    setFormState({
      ...formState,
      [id]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted:', formState);
    // Add your form submission logic here

    // Auth the user & get their corresponding clerk ID 
    // Match that clerk ID / user ID with the user
    // Call the corresponding user & update their fields

    try {
      const response = await fetch('/api/updatePreferences', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ dietaryPreferences: formState }),
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
              checked={formState.vegetarian}
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
              checked={formState.vegan}
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
              checked={formState.halal}
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
              checked={formState.kosher}
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
              checked={formState.glutenFree}
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
              checked={formState.dairyFree}
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
              checked={formState.nutFree}
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
              checked={formState.other}
              onChange={handleFormChange}
              className="mr-2"
            />
            <input
              type="text"
              id="otherText"
              value={formState.otherText}
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
