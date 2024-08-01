
"use client";
import React from 'react';
import { useState, useRef } from 'react';   
import { fetchFoodData } from '../../api/usda/route';

const NutritionPage = () => {
    const [query, setQuery] = useState('');                             
    const [foodData, setFoodData] = useState<any[]>([]);                
    const [currentResultIndex, setCurrentResultIndex] = useState(0);    
    const [error, setError] = useState<string | null>(null);           
    const inputRef = useRef<HTMLInputElement>(null);                    

    const handleSearch = async () => {                                 
        try {
            const data = await fetchFoodData(query);
            setFoodData(data.foods);                                    
            setCurrentResultIndex(0);                                   
            setError(null);  
                                                       
            
        } catch (error: any) {
            setError(error.message);
            setFoodData([]);
        }
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        handleSearch();
    };

    const handleYes = () => {
        setCurrentResultIndex(-1);                                      
    };

    const handleNo = () => {
        setCurrentResultIndex(prevIndex => prevIndex + 1);              
    };

    return (
        <div className='min-h-screen bg-white text-black p-6'>
            <h1 className='text-2xl font-bold mb-4'>Nutrition Facts</h1>
            <form onSubmit={handleSubmit} className='flex flex-col items-center'>
                <div className="flex flex-col items-center mb-4">
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Enter food item"
                        ref={inputRef}                                       
                        className='p-2 border rounded-lg w-full max-w-xs h-10 mb-2'
                    />
                    <button 
                        type="submit" 
                        className='h-10 w-full max-w-xs bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 active:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400'
                    >
                        Search
                    </button>
                </div>
            </form>
            {error && <p className='text-red-500 mt-4'>{error}</p>}
            {foodData.length > 0 && currentResultIndex >= 0 && currentResultIndex < foodData.length && (
                <div className='mt-4'>
                    <h2 className='text-xl font-semibold'>Results for {query}</h2>
                    <div key={foodData[currentResultIndex].fdcId} className='mt-2 p-4 border rounded-lg bg-white shadow-sm'>
                        <h3 className='text-lg font-semibold'>{foodData[currentResultIndex].description}</h3>
                        <p>Calories: {foodData[currentResultIndex].foodNutrients.find((n: any) => n.nutrientName === 'Energy')?.value} kcal</p>
                        <p>Protein: {foodData[currentResultIndex].foodNutrients.find((n: any) => n.nutrientName === 'Protein')?.value} g</p>
                        <p>Fat: {foodData[currentResultIndex].foodNutrients.find((n: any) => n.nutrientName === 'Total lipid (fat)')?.value} g</p>
                        <p>Carbohydrates: {foodData[currentResultIndex].foodNutrients.find((n: any) => n.nutrientName === 'Carbohydrate, by difference')?.value} g</p>
                    </div>
                    <div className='flex justify-around mt-4'>
                        <button onClick={handleYes} className='bg-green-500 text-white p-2 rounded-lg shadow-md hover:bg-green-600'>Yes</button>
                        <button onClick={handleNo} className='bg-red-500 text-white p-2 rounded-lg shadow-md hover:bg-red-600'>No</button>
                    </div>
                </div>
            )}
            {foodData.length > 0 && currentResultIndex > 0 && currentResultIndex < foodData.length && (
                <div className='mt-4'>
                    <h2 className='text-xl font-semibold'>Additional Results</h2>
                    {foodData.slice(currentResultIndex, currentResultIndex + 2).map((food, index) => (
                        <div key={food.fdcId} className='mt-2 p-4 border rounded-lg bg-white shadow-sm'>
                            <h3 className='text-lg font-semibold'>{food.description}</h3>
                            <p>Calories: {food.foodNutrients.find((n: any) => n.nutrientName === 'Energy')?.value} kcal</p>
                            <p>Protein: {food.foodNutrients.find((n: any) => n.nutrientName === 'Protein')?.value} g</p>
                            <p>Fat: {food.foodNutrients.find((n: any) => n.nutrientName === 'Total lipid (fat)')?.value} g</p>
                            <p>Carbohydrates: {food.foodNutrients.find((n: any) => n.nutrientName === 'Carbohydrate, by difference')?.value} g</p>
                        </div>
                    ))}
                    {currentResultIndex + 2 < foodData.length && (
                        <button onClick={handleNo} className='bg-red-500 text-white p-2 rounded-lg shadow-md hover:bg-red-600 mt-4'>Show More</button>
                    )}
                </div>
            )}
        </div>
    );
};

export default NutritionPage;
