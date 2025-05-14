import React, { useState, useEffect } from 'react';

const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const meals = ['Breakfast', 'Lunch', 'Dinner'];

function MealPlanPage() {
  const [mealPlan, setMealPlan] = useState(null);

  // Load from localStorage on mount
  useEffect(() => {
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
  }, []);

  // Save to localStorage when mealPlan changes
  useEffect(() => {
    if (mealPlan) {
      const userEmail = localStorage.getItem("userEmail") || 'guest';
      const storageKey = `mealPlan_${userEmail}`;
      localStorage.setItem(storageKey, JSON.stringify(mealPlan));
    }
  }, [mealPlan]);

  const handleChange = (day, meal, value) => {
    setMealPlan(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [meal]: value
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


      {/* Row 1 – Sunday to Wednesday */}
      <div className='flex flex-wrap justify-between gap-4 mb-6'>
        {daysOfWeek.slice(0, 4).map(day => (
          <div key={day} className='basis-[23%] min-w-[220px] border rounded-lg p-4 shadow-md bg-white'>
            <h2 className='text-xl font-semibold mb-2'>{day}</h2>
            {meals.map(meal => (
              <div key={meal} className='mb-3'>
                <label className='block text-sm font-medium mb-1'>{meal}</label>
                <input
                  type='text'
                  value={mealPlan[day][meal]}
                  onChange={e => handleChange(day, meal, e.target.value)}
                  className='w-full p-2 border rounded-md'
                  placeholder={`Enter ${meal}`}
                />
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
                <input
                  type='text'
                  value={mealPlan[day][meal]}
                  onChange={e => handleChange(day, meal, e.target.value)}
                  className='w-full p-2 border rounded-md'
                  placeholder={`Enter ${meal}`}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default MealPlanPage;
