import React from 'react'
import RecipeSearchCard from './RecipeSearchCard'

function RecipeSearchGrid({ generatedRecipes }) {
	return (
		<div className='container grid max-w-[1000px] gap-8 mt-12 justify-items-center lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1'>
			{generatedRecipes.map((recipe, index) => (
				<RecipeSearchCard key={index} recipe={recipe} />
			))}
		</div>
	)
}

export default RecipeSearchGrid
