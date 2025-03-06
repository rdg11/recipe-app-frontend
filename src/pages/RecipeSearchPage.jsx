import React, { useState } from 'react'
import RecipeSearchForm from '../components/RecipeSearchForm'
import RecipeSearchGrid from '../components/RecipeSearchGrid'

function RecipeSearchPage() {
	const [generatedRecipes, setGeneratedRecipes] = useState([])

	function generateRecipes(userQuery) {
		// fetch generate recipes api

		// display recipes in cards
		setGeneratedRecipes(sampleRecipes)

		console.log('userQuery: ', userQuery, 'Generated Recipes: ', sampleRecipes)
	}

	return (
		<div className='max-w-[1000px] flex items-center flex-col mx-auto mt-[100px] mb-10'>
			<RecipeSearchForm generateRecipes={generateRecipes} />
			<RecipeSearchGrid generatedRecipes={generatedRecipes} />
		</div>
	)
}

const sampleRecipe = {
	recipeName: 'Vegetable Stir-Fry',
	description: 'A quick and healthy vegetable stir-fry packed with flavor.',
	steps: [
		'Heat oil in a pan over medium heat.',
		'Add garlic and onions, sauté until fragrant.',
		'Add chopped bell peppers, carrots, and broccoli, stir-fry for 5 minutes.',
		'Mix in soy sauce, sesame oil, and seasonings.',
		'Cook for another 2-3 minutes until vegetables are tender but crisp.',
		'Serve hot with rice or noodles.',
	],
	ingredients: 'Broccoli, Carrot, Bell Pepper, Garlic, Soy Sauce, Sesame Oil, Onion',
	allergyFlags: {
		containsNuts: false,
		containsGluten: true,
		containsDairy: false,
	},
}

const sampleRecipes = [sampleRecipe, sampleRecipe, sampleRecipe, sampleRecipe, sampleRecipe]

export default RecipeSearchPage
