import React from 'react'

function RecipeSearchCard({ recipe }) {
	return (
		<div className='w-[300px] h-[130px] flex flex-col justify-center px-4 bg-slate-100 border-b border-b-slate-400 rounded'>
			<h3 className='text-lg'>{recipe.recipeName}</h3>
			<p className='text-xs'>🕒 45 min | 🌱 Vegetarian</p>
			<p className='text-xs  h-[15px] overflow-hidden text-ellipsis whitespace-nowrap'>
				with {recipe.ingredients}
			</p>
			<button className='w-[100px] mt-3 bg-slate-200 p-1 border-b border-b-slate-300 rounded hover:cursor-pointer hover:bg-slate-300'>
				View Recipe
			</button>
		</div>
	)
}

export default RecipeSearchCard
