export const extractIngredients = (meal) => {
  const excludedWords = ['with', 'and', 'day', 'breakfast', 'lunch', 'dinner', 'a', '**', 'of'];
  //add some phrases from my output
  const knownPhrases = [
    'black bean burger', 
    'whole-wheat bread', 
    'tofu stir-fry', 
    'brown rice', 
    'apple slices', 
    'almond butter', 
    'trail mix',
    'protein powder',
    'carrot sticks'
    // Add more known phrases as needed
  ];

  //meal times
  const mealTimes = ['breakfast', 'lunch', 'dinner', 'snack'];
  const mealWithoutTime = mealTimes.reduce((result, time) => result.replace(new RegExp(`^${time}:\\s*`, 'i'), ''), meal);

  // split by words
  const words = mealWithoutTime.toLowerCase().split(/\s+/);

  // grpup phrases
  let groupedWords = [];
  for (let i = 0; i < words.length; i++) {
    const twoWordPhrase = `${words[i]} ${words[i + 1] || ''}`.trim();
    const threeWordPhrase = `${words[i]} ${words[i + 1] || ''} ${words[i + 2] || ''}`.trim();

    if (knownPhrases.includes(threeWordPhrase)) {
      groupedWords.push(threeWordPhrase);
      i += 2; // skip the next two words
    } else if (knownPhrases.includes(twoWordPhrase)) {
      groupedWords.push(twoWordPhrase);
      i += 1; // skip the next word
    } else if (!excludedWords.includes(words[i])) {
      groupedWords.push(words[i]);
    }
  }

  return groupedWords;
};

export const extractMealSentence = (meal, type) => {
  const mealTypesPattern = ['breakfast', 'lunch', 'dinner', 'snacks'].join('|');
  const mealphrase = new RegExp(`${type}:([^]*?)(?=(${mealTypesPattern}):|$)`, 'i');
  const match = meal.match(mealphrase);
  if (match) {
    // get rid or asterisks
    return match[1].replace(/\*/g, '').trim();
  }
  return null;
};