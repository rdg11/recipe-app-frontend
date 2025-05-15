import React, { useState, useEffect } from 'react';

const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const meals = ['Breakfast', 'Lunch', 'Dinner'];

function MealPlanPage() {
  const [mealPlan, setMealPlan] = useState(null);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load favorites and meal plan on mount
  useEffect(() => {
    const fetchFavorites = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const token = localStorage.getItem('token');
        
        if (!token) {
          setError('You must be logged in to access your favorites');
          setIsLoading(false);
          return;
        }
        
        const response = await fetch('http://localhost:5000/get_favorites', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch favorite recipes');
        }
        
        const data = await response.json();
        setFavoriteRecipes(data.favorites || []);
        
        // Now load meal plan from localStorage after favorites are loaded
        loadMealPlan();
      } catch (err) {
        console.error('Error fetching favorites:', err);
        setError('Failed to load your favorite recipes');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchFavorites();
  }, []);
  
  // Load meal plan from localStorage
  const loadMealPlan = () => {
    const userEmail = localStorage.getItem("userEmail") || 'guest';
    const storageKey = `mealPlan_${userEmail}`;

    const saved = localStorage.getItem(storageKey);
    if (saved) {
      setMealPlan(JSON.parse(saved));
    } else {
      const defaultPlan = Object.fromEntries(
        daysOfWeek.map(day => [day, { Breakfast: '', Lunch: '', Dinner: '' }])
      );
      setMealPlan(defaultPlan);
    }
  };

  // Save to localStorage when mealPlan changes
  useEffect(() => {
    if (mealPlan) {
      const userEmail = localStorage.getItem("userEmail") || 'guest';
      const storageKey = `mealPlan_${userEmail}`;
      localStorage.setItem(storageKey, JSON.stringify(mealPlan));
    }
  }, [mealPlan]);

  const handleChange = (day, meal, recipeId) => {
    setMealPlan(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [meal]: recipeId
      }
    }));
  };

  const handleClear = () => {
    const defaultPlan = Object.fromEntries(
      daysOfWeek.map(day => [day, { Breakfast: '', Lunch: '', Dinner: '' }])
    );
    setMealPlan(defaultPlan);
    const userEmail = localStorage.getItem("userEmail") || 'guest';
    const storageKey = `mealPlan_${userEmail}`;
    localStorage.setItem(storageKey, JSON.stringify(defaultPlan));
  };

  // Get recipe name from its ID
  const getRecipeName = (recipeId) => {
    if (!recipeId) return "";
    const recipe = favoriteRecipes.find(r => r.id === recipeId || r.recipe_id === recipeId);
    return recipe ? (recipe.recipeName || recipe.name) : "";
  };

  if (isLoading) {
    return (
      <div className='max-w-[1000px] mx-auto mt-[100px] px-6 mb-10 text-center'>
        <p className='text-gray-600'>Loading your meal plan...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className='max-w-[1000px] mx-auto mt-[100px] px-6 mb-10 text-center'>
        <p className='text-red-500'>{error}</p>
      </div>
    );
  }

  if (!mealPlan) return null;

  return (
    <div className='max-w-[1000px] mx-auto mt-[100px] px-6 mb-10'>
      <div className='flex items-center justify-between mb-6'>
        <h1 className='text-4xl font-bold'>Meal Plan</h1>
        <button
          onClick={handleClear}
          className='px-4 py-2 bg-red-500 text-white font-semibold rounded hover:bg-red-600'
        >
          Clear All Meals
        </button>
      </div>
      
      {favoriteRecipes.length === 0 ? (
        <div className='text-center p-4 bg-yellow-50 border border-yellow-200 rounded-md mb-6'>
          <p className='text-yellow-700'>
            You don't have any favorite recipes yet. 
            <a href='/recipes' className='text-indigo-600 ml-1 font-medium hover:underline'>
              Find and save some recipes first!
            </a>
          </p>
        </div>
      ) : null}

      {/* Row 1 – Sunday to Wednesday */}
      <div className='flex flex-wrap justify-between gap-4 mb-6'>
        {daysOfWeek.slice(0, 4).map(day => (
          <div key={day} className='basis-[23%] min-w-[220px] border rounded-lg p-4 shadow-md bg-white'>
            <h2 className='text-xl font-semibold mb-2'>{day}</h2>
            {meals.map(meal => (
              <div key={meal} className='mb-3'>
                <label className='block text-sm font-medium mb-1'>{meal}</label>
                <select
                  value={mealPlan[day][meal]}
                  onChange={e => handleChange(day, meal, e.target.value)}
                  className='w-full p-2 border rounded-md bg-white'
                >
                  <option value="">Select a recipe...</option>
                  {favoriteRecipes.map(recipe => (
                    <option 
                      key={recipe.id || recipe.recipe_id} 
                      value={recipe.id || recipe.recipe_id}
                    >
                      {recipe.recipeName || recipe.name}
                    </option>
                  ))}
                </select>
                {mealPlan[day][meal] && (
                  <p className='text-xs text-gray-500 mt-1'>
                    Selected: {getRecipeName(mealPlan[day][meal])}
                  </p>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Row 2 – Thursday to Saturday */}
      <div className='flex flex-wrap justify-between gap-4'>
        {daysOfWeek.slice(4).map(day => (
          <div key={day} className='flex-1 min-w-[220px] border rounded-lg p-4 shadow-md bg-white'>
            <h2 className='text-xl font-semibold mb-2'>{day}</h2>
            {meals.map(meal => (
              <div key={meal} className='mb-3'>
                <label className='block text-sm font-medium mb-1'>{meal}</label>
                <select
                  value={mealPlan[day][meal]}
                  onChange={e => handleChange(day, meal, e.target.value)}
                  className='w-full p-2 border rounded-md bg-white'
                >
                  <option value="">Select a recipe...</option>
                  {favoriteRecipes.map(recipe => (
                    <option 
                      key={recipe.id || recipe.recipe_id} 
                      value={recipe.id || recipe.recipe_id}
                    >
                      {recipe.recipeName || recipe.name}
                    </option>
                  ))}
                </select>
                {mealPlan[day][meal] && (
                  <p className='text-xs text-gray-500 mt-1'>
                    Selected: {getRecipeName(mealPlan[day][meal])}
                  </p>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default MealPlanPage;