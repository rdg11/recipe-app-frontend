import React from 'react'
import RecipeSearchCard from './RecipeSearchCard'

function RecipeSearchGrid({ generatedRecipes }) {
  // If no recipes have been searched for yet, don't display anything
  if (!generatedRecipes) {
    return null; // Return nothing if no search has been performed
  }
  
  // If search was performed but no recipes were found
  if (generatedRecipes.length === 0) {
    return (
      <div className='text-center mt-10 p-6'>
        <p className='text-gray-600'>No recipes found. Try a different search query or add more ingredients to your pantry.</p>
      </div>
    )
  }

  // Display actual recipes when available
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10'>
      {generatedRecipes.map((recipe, index) => (
        <RecipeSearchCard key={index} recipe={recipe} />
      ))}
    </div>
  )
}

export default RecipeSearchGrid