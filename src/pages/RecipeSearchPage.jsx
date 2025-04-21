import React, { useState } from 'react'
import RecipeSearchForm from '../components/RecipeSearchForm'
import RecipeSearchGrid from '../components/RecipeSearchGrid'

function RecipeSearchPage() {
	// Initialize generatedRecipes as null instead of empty array
	// null means "no search has been performed yet"
	// empty array means "search was performed but no recipes were found"
	const [generatedRecipes, setGeneratedRecipes] = useState(null)
	const [isSearching, setIsSearching] = useState(false)

	async function generateRecipes(userQuery) {
		try {
			setIsSearching(true);
			const token = localStorage.getItem("token");
	
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
				setIsSearching(false);
				return;
			}
	
			const data = await response.json();
			setGeneratedRecipes(data.recipes || []); // Handle if recipes is undefined
			console.log("Generated Recipes:", data.recipes);
			setIsSearching(false);
		} catch (err) {
			console.error("Fetch error:", err);
			setIsSearching(false);
		}
	}
	

	return (
		<div className='flex items-center flex-col mt-[100px] mb-10'>
			<RecipeSearchForm generateRecipes={generateRecipes} />
			
			{isSearching ? (
				<div className='mt-10 text-center'>
					<p className='text-gray-600'>Searching for recipes...</p>
				</div>
			) : (
				<RecipeSearchGrid generatedRecipes={generatedRecipes} />
			)}
		</div>
	)
}

export default RecipeSearchPage