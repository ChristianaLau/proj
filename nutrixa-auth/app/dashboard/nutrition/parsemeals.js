const extractIngredients = (meal) => {
    const excludedWords = ['with', 'and', 'day', 'breakfast', 'lunch', 'dinner', 'snack', 'a', 'of', 'variety', 'stir-fry', 'varieties'];
    const mealTimes = ['breakfast', 'lunch', 'dinner', 'snack'];
    const mealWithoutTime = mealTimes.reduce((result, time) => result.replace(new RegExp(`^${time}:\\s*`, 'i'), ''), meal);
    const words = mealWithoutTime.split(/\s+/);
    const filteredWords = words.filter(word => !excludedWords.includes(word.toLowerCase()));
    return filteredWords;
  };
  
  const extractMealSentence = (meal, type) => {
    const mealphrase = new RegExp(`${type}:([^.]*)`, 'i');
    const match = meal.match(mealphrase);
    return match ? match[1].trim() : null;
  };

  export {extractIngredients, extractMealSentence};