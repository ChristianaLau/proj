export const extractIngredients = (meal) => {
  //exclude types of meals and articles
  const excludedWords = ['with', 'and', 'day', 'breakfast', 'lunch', 'dinner', 'a', '**'];
  const mealTimes = ['breakfast', 'lunch', 'dinner', 'snack'];

  //get rid of time in output
  const mealWithoutTime = mealTimes.reduce((result, time) => 
    result.replace(new RegExp(`^${time}:\\s*`, 'i'), ''), meal
  );

  //split by comma
  const ingPhrase = mealWithoutTime.split(/,\s*/);

  //split more
  const ingredients = ingPhrase.flatMap(ingredient =>
    ingredient.split(/\s+and\s+|\s+with\s+/).map(word => word.trim())
  );

  //filer
  const filteredIngredients = ingredients.filter(ingredient => {
    const words = ingredient.split(/\s+/);
    return words.some(word => !excludedWords.includes(word.toLowerCase()));
  });
  
  return filteredIngredients;

};

export const extractMealSentence = (day, meal) => {
  const regex = new RegExp(`${meal}: ([^*]+)`);
  const match = day.match(regex);
  return match ? match[1].trim() : null;
};