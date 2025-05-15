import React, { useState } from 'react'
import { FaClock, FaLeaf, FaBreadSlice, FaTree } from 'react-icons/fa'

function RecipeSearchCard({ recipe }) {
  const [showDetails, setShowDetails] = useState(false)

  // Get preparation time from recipe or fallback to default
  const prepTime = recipe.prepTime || "30 min"
  
  // Correctly determine dietary flags using explicit boolean values
  const isVegetarian = recipe.allergyFlags?.containsVegetarian === true
  const containsMeat = recipe.allergyFlags?.containsMeat === true
  const containsGluten = recipe.allergyFlags?.containsGluten === true
  const containsNuts = recipe.allergyFlags?.containsNuts === true

  return (
    <div className='bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-all'>
      <h3 className='text-xl font-semibold mb-2'>{recipe.recipeName || recipe.name}</h3>
      <p className='text-gray-600 mb-3 line-clamp-2'>{recipe.description}</p>
      
      <div className='flex items-center space-x-3 mb-4'>
        <div className='flex items-center space-x-1'>
          <FaClock className='text-gray-500' />
          <span className='text-gray-500'>{prepTime}</span>
        </div>
        
        {isVegetarian && (
          <div className='flex items-center space-x-1 text-green-500'>
            <FaLeaf />
            <span>Vegetarian</span>
          </div>
        )}
        
        {!containsGluten && (
          <div className='flex items-center space-x-1 text-blue-500'>
            <FaBreadSlice />
            <span>Gluten-Free</span>
          </div>
        )}
        
        {!containsNuts && (
          <div className='flex items-center space-x-1 text-amber-500'>
            <FaTree />
            <span>Nut-Free</span>
          </div>
        )}
      </div>
      
      {showDetails ? (
        <div className='mt-4'>
          <div className='mb-4'>
            <h4 className='font-medium mb-2'>Ingredients:</h4>
            <p className='text-gray-700'>{recipe.ingredients}</p>
            {recipe.missingIngredients && recipe.missingIngredients.trim() !== "" && (
              <div className='mt-2'>
                <h4 className='font-medium mb-1'>Missing Ingredients:</h4>
                <p className='text-gray-700'>{recipe.missingIngredients}</p>
              </div>
            )}
          </div>
          
          <div className='mb-4'>
            <h4 className='font-medium mb-2'>Instructions:</h4>
            <ol className='list-decimal pl-5 space-y-1'>
              {Array.isArray(recipe.steps) ? (
                recipe.steps.map((step, index) => (
                  <li key={index} className='text-gray-700'>{step}</li>
                ))
              ) : (
                <li className='text-gray-700'>{recipe.steps}</li>
              )}
            </ol>
          </div>
          
          <button 
            className='w-full mt-2 px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50'
            onClick={() => setShowDetails(false)}
          >
            Hide Details
          </button>
        </div>
      ) : (
        <button 
          className='w-full px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50'
          onClick={() => setShowDetails(true)}
        >
          View Recipe
        </button>
      )}
    </div>
  )
}

export default RecipeSearchCard