"use client";

import React, { useEffect, useState } from "react";

export default function Nutrition() {
  const [suggestions, setSuggestions] = useState();

  useEffect(() => {
    const createSugguestions = async () => {
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

    createSugguestions();
  }, []);

  console.log(suggestions);
  
  if (!suggestions) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Your Suggested Plans</h1>
      {/* Render suggestions here */}

    </div>
  );
}
