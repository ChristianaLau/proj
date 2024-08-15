"use client";

import React, { useEffect, useState } from "react";

export default function Workout() {
  const [plan, setPlan] = useState(null);

  useEffect(() => {
    const createSuggestions = async () => {
      try {
        const response = await fetch(`/api/getAIplan`);
        if (!response.ok) {
          throw new Error('Failed to fetch suggestions');
        }
        const data = await response.json();
        console.log(data);
        setPlan(data.plan);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      }
    };

    createSuggestions();
  }, []);

  if (!plan) {
    return <div>Loading...</div>;
  }

  // Display only the workout plans (assuming they are at index 0)
  const workoutPlans = plan[0];

  // Function to format the plan text
  const formatPlanText = (text, dayIndex) => {
    // Remove "Day X:" at the beginning of the text, then remove * characters and replace new lines with <br/>
    let formattedText = text.replace(new RegExp(`^\\*\\*Day ${dayIndex + 1}:\\*\\*\\n?`), '')
                            .replace(/\*/g, '')
                            .replace(/\n/g, '<br/>');
    return formattedText;
  };

  const saveWorkoutForDay = (workout) => {
    const selectDate = new Date().toISOString(); // Current date
    let formattedText = workout.replace(new RegExp(`^\\*\\*Today's Workout:\\*\\*\\n?`), '')
    .replace(/\*/g, '')
    .replace(/\n/g, '');

    fetch('/api/workoutsave', { // Adjust the API endpoint as needed
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        date: selectDate,
        workout: formattedText,
      
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to save workout');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Workout saved:', data);
      })
      .catch((error) => {
        console.error('Error saving workout:', error);
      });
  };
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Workout Plans</h1>
      <div className="flex flex-wrap gap-4">
        {workoutPlans.map((day, dayIndex) => (
          <div key={dayIndex} className="bg-white shadow-md rounded-lg p-4 mb-4">
            <h2 className="text-xl font-semibold mb-2">Day {dayIndex + 1}</h2>
            <p
              className="text-gray-700"
              dangerouslySetInnerHTML={{ __html: formatPlanText(day, dayIndex) }}
            />
            <button
                onClick={() => saveWorkoutForDay(day)}
                className="mt-2 px-4 py-2 bg-green-300 text-white rounded-lg"
              >
                Save this Workout
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
