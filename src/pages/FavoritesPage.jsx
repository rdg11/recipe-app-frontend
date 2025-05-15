import React, { useState, useEffect } from 'react'
import RecipeSearchCard from '../components/RecipeSearchCard'

function FavoritesPage() {
  const [favoriteRecipes, setFavoriteRecipes] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchFavorites()
  }, [])
  
  const fetchFavorites = async () => {
    setIsLoading(true)
    setError(null)
    
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        setError('You must be logged in to view favorites')
        setIsLoading(false)
        return
      }
      
      const response = await fetch('http://localhost:5000/get_favorites', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
      
      if (!response.ok) {
        throw new Error('Failed to fetch favorite recipes')
      }
      
      const data = await response.json()
      setFavoriteRecipes(data.favorites || [])
    } catch (err) {
      console.error('Error fetching favorites:', err)
      setError('Failed to load your favorite recipes')
    } finally {
      setIsLoading(false)
    }
  }
  
  const handleFavoriteToggle = (recipeId, isFavorited) => {
    if (!isFavorited) {
      // Remove recipe from the list when unfavorited
      setFavoriteRecipes(favoriteRecipes.filter(recipe => 
        (recipe.id !== recipeId && recipe.recipe_id !== recipeId)
      ))
    }
  }
  
  if (isLoading) {
    return (
      <div className='flex items-center justify-center mt-20'>
        <p className='text-gray-600'>Loading your favorite recipes...</p>
      </div>
    )
  }
  
  if (error) {
    return (
      <div className='flex items-center justify-center mt-20'>
        <p className='text-red-500'>{error}</p>
      </div>
    )
  }
  
  if (favoriteRecipes.length === 0) {
    return (
      <div className='flex flex-col items-center mt-20'>
        <h1 className='text-2xl font-bold mb-4'>My Favorite Recipes</h1>
        <p className='text-gray-600'>You haven't saved any recipes yet.</p>
      </div>
    )
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-2xl font-bold mb-6 text-center'>My Favorite Recipes</h1>
      
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {favoriteRecipes.map((recipe, index) => (
          <RecipeSearchCard 
            key={recipe.id || index} 
            recipe={recipe} 
            isFavoritesPage={true}
            onFavoriteToggle={handleFavoriteToggle}
          />
        ))}
      </div>
    </div>
  )
}

export default FavoritesPage