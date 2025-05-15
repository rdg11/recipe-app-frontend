import React, { useState, useEffect } from 'react'
import { FaClock, FaLeaf, FaBreadSlice, FaTree, FaHeart, FaRegHeart } from 'react-icons/fa'

function RecipeSearchCard({ recipe, onFavoriteToggle, isFavoritesPage = false }) {
  const [showDetails, setShowDetails] = useState(false)
  const [isFavorite, setIsFavorite] = useState(isFavoritesPage)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  // Initialize isFavorite if the recipe is from the favorites page
  useEffect(() => {
    setIsFavorite(isFavoritesPage)
  }, [isFavoritesPage])

  // Get preparation time from recipe or fallback to default
  const prepTime = recipe?.prepTime || "30 min"
  
  // Correctly determine dietary flags using explicit boolean values
  const isVegetarian = recipe?.allergyFlags?.containsVegetarian === true
  const containsMeat = recipe?.allergyFlags?.containsMeat === true
  const containsGluten = recipe?.allergyFlags?.containsGluten === true
  const containsNuts = recipe?.allergyFlags?.containsNuts === true

  // Safely get the recipe ID with null checks
  const getRecipeId = () => {
    return recipe?.id || recipe?.recipe_id || null
  }

  const toggleFavorite = async () => {
    if (isLoading) return
    
    const recipeId = getRecipeId()
    
    // For removing favorites, we need an ID
    if (isFavorite && !recipeId) {
      setErrorMessage('Cannot identify recipe ID')
      return
    }
    
    setIsLoading(true)
    setErrorMessage('')
    setSuccessMessage('')
    
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        setErrorMessage('You must be logged in to save favorites')
        setIsLoading(false)
        return
      }
      
      if (isFavorite) {
        // Remove from favorites
        const response = await fetch(`http://localhost:5000/remove_favorite/${recipeId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        })
        
        const data = await response.json()
        
        if (response.ok) {
          setIsFavorite(false)
          setSuccessMessage('Recipe removed from favorites!')
          
          // Call the callback if provided (for removing from favorites page)
          if (onFavoriteToggle) {
            onFavoriteToggle(recipeId, false)
          }
        } else {
          setErrorMessage(data.message || 'Failed to remove recipe from favorites')
        }
      } else {
        // Add to favorites
        const response = await fetch('http://localhost:5000/save_ai_recipe', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ recipe }),
        })
        
        const data = await response.json()
        
        if (response.ok) {
          setIsFavorite(true)
          setSuccessMessage('Recipe saved to favorites!')
          
          // Call the callback if provided
          if (onFavoriteToggle && data.recipe_id) {
            onFavoriteToggle(data.recipe_id, true)
          }
        } else {
          setErrorMessage(data.message || 'Failed to save recipe')
        }
      }
    } catch (error) {
      console.error('Error saving/removing recipe:', error)
      setErrorMessage('Failed to connect to server')
    } finally {
      setIsLoading(false)
      // Clear success message after 3 seconds
      if (successMessage) {
        setTimeout(() => setSuccessMessage(''), 3000)
      }
    }
  }

  return (
    <div className='bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-all relative'>
      {/* Favorite button in the top-right corner */}
      <button 
        onClick={toggleFavorite} 
        disabled={isLoading}
        className='absolute top-4 right-4 text-xl transition-colors'
        title={isFavorite ? 'Remove from favorites' : 'Save to favorites'}
      >
        {isLoading ? (
          <span className="text-gray-300">...</span>
        ) : isFavorite ? (
          <FaHeart className='text-red-500' />
        ) : (
          <FaRegHeart className='text-gray-400 hover:text-red-500' />
        )}
      </button>

      <h3 className='text-xl font-semibold mb-2 pr-8'>{recipe?.recipeName || recipe?.name || 'Untitled Recipe'}</h3>
      <p className='text-gray-600 mb-3 line-clamp-2'>{recipe?.description || ''}</p>
      
      {errorMessage && (
        <div className='mb-3 text-red-500 text-sm'>{errorMessage}</div>
      )}
      
      {successMessage && (
        <div className='mb-3 text-green-500 text-sm'>{successMessage}</div>
      )}
      
      <div className='flex items-center space-x-3 mb-4 flex-wrap'>
        <div className='flex items-center space-x-1 mb-1 md:mb-0'>
          <FaClock className='text-gray-500' />
          <span className='text-gray-500'>{prepTime}</span>
        </div>
        
        {isVegetarian && (
          <div className='flex items-center space-x-1 text-green-500 mb-1 md:mb-0'>
            <FaLeaf />
            <span>Vegetarian</span>
          </div>
        )}
        
        {!containsGluten && (
          <div className='flex items-center space-x-1 text-blue-500 mb-1 md:mb-0'>
            <FaBreadSlice />
            <span>Gluten-Free</span>
          </div>
        )}
        
        {!containsNuts && (
          <div className='flex items-center space-x-1 text-amber-500 mb-1 md:mb-0'>
            <FaTree />
            <span>Nut-Free</span>
          </div>
        )}
      </div>
      
      {showDetails ? (
        <div className='mt-4'>
          <div className='mb-4'>
            <h4 className='font-medium mb-2'>Ingredients:</h4>
            <p className='text-gray-700'>{recipe?.ingredients || 'No ingredients listed'}</p>
            {recipe?.missingIngredients && recipe.missingIngredients.trim() !== "" && (
              <div className='mt-2'>
                <h4 className='font-medium mb-1'>Missing Ingredients:</h4>
                <p className='text-gray-700'>{recipe.missingIngredients}</p>
              </div>
            )}
          </div>
          
          <div className='mb-4'>
            <h4 className='font-medium mb-2'>Instructions:</h4>
            <ol className='list-decimal pl-5 space-y-1'>
              {Array.isArray(recipe?.steps) ? (
                recipe.steps.map((step, index) => (
                  <li key={index} className='text-gray-700'>{step}</li>
                ))
              ) : recipe?.steps ? (
                <li className='text-gray-700'>{recipe.steps}</li>
              ) : (
                <li className='text-gray-700'>No instructions available</li>
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