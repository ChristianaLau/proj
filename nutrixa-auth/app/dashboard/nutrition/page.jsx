"use client";

import React, { useEffect, useState } from "react";
import { fetchFoodData } from "@/app/api/usda/api";
import { extractIngredients, extractMealSentence } from './parsemeals'
import { ChevronUpIcon } from "@heroicons/react/24/solid";
import {motion} from 'framer-motion';


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

  //for api

  useEffect(() => {
    const fetchIngredientData = async (ingredient) => {
      try {
        const data = await fetchFoodData(ingredient);
        return data.foods[0];
      } catch (error) {
        console.error('Error fetching ingredient data:', error);
        return null;
      }
    };

    if (plan) {
      const mealPlans = plan[1];
      const ingredientFacts = {};

      mealPlans.forEach((meal, dayIndex) => {
        const ingredients = extractIngredients(meal);
        ingredients.forEach((ingredient) => {
          if (!ingredientFacts[ingredient]) {
            ingredientFacts[ingredient] = fetchIngredientData(ingredient);
          }
        });
      });

      Promise.all(Object.values(ingredientFacts)).then((results) => {
        const data = {};
        results.forEach((result, index) => {
          const ingredient = Object.keys(ingredientFacts)[index];
          if (result) {
            data[ingredient] = result;
          }
        });
        setIngredientData(data);
      });
    }
  }, [plan]);

  const toggleNutritionalFacts = (mealType, dayIndex) => {
    setShowNutritionalFacts((prevState) => ({
      ...prevState,
      [`${dayIndex}-${mealType}`]: !prevState[`${dayIndex}-${mealType}`]
    }));
  };

  const toggleMealDetails = (dayIndex) => {
    setShowMealDetails((prevState) => ({
      ...prevState,
      [dayIndex]: !prevState[dayIndex]
    }));
  };
  


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

  //render api data
  const renderNutrient = (nutrients, nutrientName, unit) => {
    const nutrient = nutrients.find((n) => n.nutrientName === nutrientName && n.value > 0);
    return nutrient ? <p>{nutrientName}: {nutrient.value} {unit}</p> : null;
  };

  const hasMicronutrients = (nutrients) => {
    const micronutrients = [
      'Vitamin A, RAE', 'Vitamin C, total ascorbic acid', 'Calcium, Ca',
      'Iron, Fe', 'Potassium, K', 'Sodium, Na'
    ];
    return nutrients.some((n) => micronutrients.includes(n.nutrientName) && n.value > 0);
  };

  //for button 
  const buttonRotate = {
    close: {
      rotate: 0,
    },
    open: {
      rotate: 180,
    },
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

              <button
                onClick={() => toggleMealDetails(dayIndex)}
                className="mt-2 flex items-center text-green-700 "
              >
                {showMealDetails[dayIndex] ? "Hide Nutritional Facts" : "Show Nutritional Facts"}
                <motion.div
                  animate={showMealDetails[dayIndex] ? 'open' : 'close'}
                  variants={buttonRotate}
                  className="ml-1"
                >
                  <ChevronUpIcon className="h-5 w-5 text-green-700" />
                </motion.div>
              </button>
              
              {showMealDetails[dayIndex] && (
                <div className="mt-4">
                
                {['Breakfast', 'Lunch', 'Dinner', 'Snacks'].map((mealType) => {
                  const mealPart = extractMealSentence(day, mealType);
                  return mealPart ? (
                    <div key={mealType}>
                      <h3 className="text-lg font-semibold mb-2">{mealType}</h3>
                      <p>{mealPart}</p>
                      <button
                        onClick={() => toggleNutritionalFacts(mealType, dayIndex)}
                        className="text-green-700 flex items-center"
                      >
                        {showNutritionalFacts[`${dayIndex}-${mealType}`] ? "Hide Nutrition Facts" : "Nutrition Facts"}
                        <motion.div
                          animate={showNutritionalFacts[`${dayIndex}-${mealType}`] ? 'open' : 'close'}
                          variants={buttonRotate}
                          className="ml-1"
                        >
                          <ChevronUpIcon className="h-5 w-5 text-green-700" />
                        </motion.div>
                      </button>
                      {showNutritionalFacts[`${dayIndex}-${mealType}`] && (
                        <div className="mt-4">
                          {extractIngredients(mealPart).map((ingredient, index) => (
                            <div key={index} className="bg-gray-100 p-2 mb-2 rounded-lg shadow-sm">
                              <p className="text-md font-semibold">{ingredient}</p>
                              {ingredientData[ingredient] && (
                                <div className="mt-2">
                                  <h4 className="text-md font-semibold">Macronutrients</h4>
                                  <p>Calories: {ingredientData[ingredient].foodNutrients.find((n) => n.nutrientName === 'Energy')?.value} kcal</p>
                                  <p>Protein: {ingredientData[ingredient].foodNutrients.find((n) => n.nutrientName === 'Protein')?.value} g</p>
                                  <p>Fat: {ingredientData[ingredient].foodNutrients.find((n) => n.nutrientName === 'Total lipid (fat)')?.value} g</p>
                                  <p>Carbohydrates: {ingredientData[ingredient].foodNutrients.find((n) => n.nutrientName === 'Carbohydrate, by difference')?.value} g</p>
                                  {hasMicronutrients(ingredientData[ingredient].foodNutrients) && (
                                    <div className="mt-2">
                                      <h4 className="text-md font-semibold">Micronutrients</h4>
                                      {renderNutrient(ingredientData[ingredient].foodNutrients, 'Vitamin D (D2 + D3)', 'µg')}
                                      {renderNutrient(ingredientData[ingredient].foodNutrients, 'Calcium, Ca', 'mg')}
                                      {renderNutrient(ingredientData[ingredient].foodNutrients, 'Iron, Fe', 'mg')}
                                      {renderNutrient(ingredientData[ingredient].foodNutrients, 'Potassium, K', 'mg')}
                                      {renderNutrient(ingredientData[ingredient].foodNutrients, 'Sodium, Na', 'mg')}
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : null;
                })}
              </div>
              )}
          </div>
        ))}
      </div>
    </div>
  );
}