"use client";

import React, { useEffect, useState } from "react";
import {fetchFoodData} from "@/app/api/usda/api";

const extractIngredients = (meal) => {
  const excludedWords = ['with', 'and', 'day', 'breakfast', 'lunch', 'dinner', 'snack', 'a', 'of'];
  const mealTimes = ['breakfast', 'lunch', 'dinner', 'snack'];
  const mealWithoutTime = mealTimes.reduce((result, time) => result.replace(new RegExp(`^${time}:\\s*`, 'i'), ''), meal);
  const words = mealWithoutTime.split(/\s+/);
  const filteredWords = words.filter(word => !excludedWords.includes(word.toLowerCase()));
  return filteredWords;
};

const extractMealPart = (meal, type) => {
  const mealonly = new RegExp(`${type}:([^.]*)`, 'i');
  const match = meal.match(mealonly);
  return match ? match[1].trim() : null;
};

export default function Nutrition() {
  const [plan, setPlan] = useState(null);
  const [ingredientData, setIngredientData] = useState({});
  const [showNutritionalFacts, setShowNutritionalFacts] = useState({});
  const [showMealDetails, setShowMealDetails] = useState({});

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

  // Display only the meal plans (assuming they are at index 1)
  const mealPlans = plan[1];

  // Function to format the plan text
  const formatPlanText = (text, dayIndex) => {
    // Remove "Day X:" at the beginning of the text, then remove * characters and replace new lines with <br/>
    return text.replace(new RegExp(`^\\*\\*Day ${dayIndex + 1}:\\*\\*\\n?`), '')
               .replace(/\*/g, '')
               .replace(/\n/g, '<br/>');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Meal Plans</h1>
      <div className="flex flex-wrap gap-4">
        {mealPlans.map((day, dayIndex) => (
          <div key={dayIndex} className="bg-white shadow-md rounded-lg p-4 mb-4">
            <h2 className="text-xl font-semibold mb-2">Day {dayIndex + 1}</h2>
            <p
              className="text-gray-700"
              dangerouslySetInnerHTML={{ __html: formatPlanText(day, dayIndex) }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
