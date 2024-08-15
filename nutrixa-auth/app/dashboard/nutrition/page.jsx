"use client";

import React, { useEffect, useState } from "react";
import { fetchFoodData } from "@/app/api/usda/api";
import { extractIngredients, extractMealSentence } from './parsemeals'
import { ChevronUpIcon } from "@heroicons/react/24/solid";
import {motion} from 'framer-motion';
import { PlusCircleIcon } from "@heroicons/react/16/solid";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { FaXmark } from "react-icons/fa6";
import { ArrowUturnLeftIcon } from "@heroicons/react/24/solid";
import dayjs from "dayjs";



export default function Nutrition() {
  const [plan, setPlan] = useState(null);
  const [ingredientData, setIngredientData] = useState({});
  const [showNutritionalFacts, setShowNutritionalFacts] = useState({});
  const [showMealDetails, setShowMealDetails] = useState({});
  const [searchIngredient, setSearchIngredient] = useState(null);
  const [searchResults, setSearchResults] = useState(null);
  const [ingredientToReplace, setIngredientToReplace] = useState(null);
  const [deletedIngredients, setDeletedIngredients] = useState([]);
  const [lastDeletedIngredient, setLastDeletedIngredient] = useState(null);

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
    if (typeof text !== 'string') {
      console.error('Expected text to be a string but got', typeof text);
      return ''; // Return an empty string or handle the error as appropriate
    }
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

//for ingredients
  //if delete ingredient
  const handleDeleteIngredient = (ingredient) => {
    setIngredientData((prevData) => {
      const newData = { ...prevData };
      if (newData[ingredient]) {
        setLastDeletedIngredient(ingredient); 
        delete newData[ingredient];
      }
      return newData;
    });
  };
  //for replace ingredient
  const handleSearchQuery = async (ingredient) => {
    setSearchIngredient(ingredient);
    setIngredientToReplace(ingredient); 
    try {
      const data = await fetchFoodData(ingredient);
      setSearchResults(data.foods);
    } catch (error) {
      console.error('Error searching for ingredient:', error);
      setSearchResults(null);
    }
  };
  //popup for ingredients
  const closeSearchOverlay = () => {
    setSearchIngredient(null);
    setSearchResults(null);
    setIngredientToReplace(null);
  };
//replace old w new
  const handleReplaceIngredient = (newIngredientData) => {
    setIngredientData((prevData) => {
      const newData = { ...prevData };
      newData[ingredientToReplace] = newIngredientData;
      return newData;
    });
    closeSearchOverlay();
  };
  //undo delete
  const handleUndoDelete = () => {
    const lastDeleted = deletedIngredients.pop();
    if (lastDeleted) {
      setIngredientData((prevData) => ({
        ...prevData,
        [lastDeleted.ingredient]: lastDeleted.data,
      }));
      setDeletedIngredients([...deletedIngredients]);
    }
  };
  //save meal
  const saveMealForDay = (meal) => {
    const selectDate = dayjs(); // Current date

    fetch('/api/mealsave', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        date: selectDate.toISOString(),
        meal: meal,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to save meal');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Meal saved:', data);
      })
      .catch((error) => {
        console.error('Error saving meal:', error);
      });
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
              className="mt-2 flex items-center text-green-700"
            >

              {showMealDetails[dayIndex] ? "Hide Nutritional Facts" : "Show Nutritional Facts"}
              <motion.div
                animate={showMealDetails[dayIndex] ? 'open' : 'close'}
                variants={{ open: { rotate: 180 }, close: { rotate: 0 } }}
                className="ml-1"
              >
                <ChevronUpIcon className="h-5 w-5 text-green-700" />
              </motion.div>
            </button>
            <button className="text-green-700 flex items-center"
                      onClick={() => saveMealForDay(mealPart)}>
                        Save this Meal
                        <PlusCircleIcon className="w-5 h-5 ml-1" />
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
                          variants={{ open: { rotate: 180 }, close: { rotate: 0 } }}
                          className="ml-1"
                        >
                          <ChevronUpIcon className="h-5 w-5 text-green-700" />
                        </motion.div>
                      </button>
                      <button className="text-green-700 flex items-center">
                        Save this Meal
                        <PlusCircleIcon className="w-5 h-5 ml-1" />
                      </button>
                      {showNutritionalFacts[`${dayIndex}-${mealType}`] && (

                        <div className="mt-4">
                          {extractIngredients(mealPart).map((ingredient, index) => (
                            <div key={index} className="bg-gray-100 p-2 mb-2 rounded-lg shadow-sm">
                              <p className="text-md font-semibold">{ingredient}</p>
                              {ingredientData[ingredient] && (
                                <div className="mt-2">
                                  {/* buttons */}


                                  <button className="text-green-700" onClick={() => handleSearchQuery(ingredient)}>
                                    <FaMagnifyingGlass className="w-5 h-5 ml-1" />
                                  </button>

                                  <button className="text-red-700" onClick={() => handleDeleteIngredient(ingredient)}>
                                    <FaXmark className="w-5 h-5 ml-1" />
                                  </button>
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
      {searchIngredient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-4 rounded-lg shadow-lg relative max-w-lg w-full max-h-80 overflow-y-auto">
      <button
        className="absolute top-2 right-2 text-gray-700"
        onClick={closeSearchOverlay}
      >
        <FaXmark className="w-5 h-5" />
      </button>
      <h3 className="text-xl font-semibold mb-4">Search Results for "{searchIngredient}"</h3>
      {searchResults ? (
        <div>
          {searchResults.map((result, index) => (
            <div key={index} className="mb-2 p-2 border rounded-lg">
              <p className="font-semibold">{result.description}</p>
              <p>Calories: {result.foodNutrients.find((n) => n.nutrientName === 'Energy')?.value} kcal</p>
              <button
                className="mt-2 px-4 py-2 bg-green-300 text-white rounded-lg"
                onClick={() => handleReplaceIngredient(result)}
              >
                Replace Ingredient
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>No addition ingredients found.</p>
      )}
    </div>
  </div>
  )}
    </div>
  );
};