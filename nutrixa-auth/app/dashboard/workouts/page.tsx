"use client";

import React, { useEffect, useState } from "react";

export default function Workouts() {
  const [suggestions, setSuggestions] = useState(null);

  useEffect(() => {
    const createSuggestions = async () => {
      try {
        const response = await fetch(`/api/gemini`);
        if (!response.ok) {
          throw new Error('Failed to fetch suggestions');
        }
        const data = await response.json();
        console.log(data);
        setSuggestions(data);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      }
    };

    createSuggestions();
  }, []);

  if (!suggestions) {
    return <div>Loading...</div>;
  }

  // Display only the meal plans (assuming they are at index 1)
  const mealPlans = suggestions[0];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Meal Plans</h1>
      <div className="flex flex-wrap gap-4">
        {mealPlans.map((day, dayIndex) => (
          <div key={dayIndex} className="bg-white shadow-md rounded-lg p-4 mb-4">
            <p>{day}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
