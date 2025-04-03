import React, { useState } from 'react'
import RecipeSearchForm from '../components/RecipeSearchForm'
import RecipeSearchGrid from '../components/RecipeSearchGrid'

function RecipeSearchPage() {
	const [generatedRecipes, setGeneratedRecipes] = useState([])

	async function generateRecipes(userQuery) {
		try {
			const token = localStorage.getItem("access_token");
	
			const response = await fetch("http://localhost:5000/recipe/generate", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({ user_query: userQuery }),
			});
	
			if (!response.ok) {
				const error = await response.json();
				console.error("Error from backend:", error);
				return;
			}
	
			const data = await response.json();
			setGeneratedRecipes(data.recipes);
			console.log("Generated Recipes:", data.recipes);
		} catch (err) {
			console.error("Fetch error:", err);
		}
	}
	

	return (
		<div className='flex items-center flex-col mt-[100px] mb-10'>
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
