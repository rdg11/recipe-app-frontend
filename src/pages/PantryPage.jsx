import React, { useEffect, useState } from 'react'
import PantryForm from '../components/PantryForm'
import PantryList from '../components/PantryList'

/* -- Temporarily using local storage to test -- */

function PantryPage() {
	const [items, setItems] = useState(() => {
		const localValue = localStorage.getItem('ITEMS')
		if (localValue == null) return []

		return JSON.parse(localValue)
	})

	useEffect(() => {
		localStorage.setItem('ITEMS', JSON.stringify(items))
		// localStorage.clear()
	}, [items])

	// Function to update the value of an Ingredient field
	function handleIngredientChange(id, event) {
		setItems(currentItems =>
			currentItems.map(item =>
				item.id === id ? { ...item, ingredient: event.target.value } : item,
			),
		)
	}

	// Function to update the value of an Amount field
	function handleAmountChange(id, event) {
		setItems(currentItems =>
			currentItems.map(item =>
				item.id === id ? { ...item, amount: event.target.value } : item,
			),
		)
	}

	// Function to add new ingredient
	function addItem(newIngredient) {
		setItems(currentItems => {
			return [
				...currentItems,
				{ id: crypto.randomUUID(), ingredient: newIngredient, amount: '' },
			]
		})
	}

	// Function to delete item
	function deleteItem(id) {
		setItems(currentItems => {
			return currentItems.filter(item => item.id !== id)
		})
	}

	return (
		<div className='max-w-[1000px] flex flex-col mx-auto mt-[100px] px-8 mb-10'>
			<h1 className='text-6xl font-bold font-roboto'>My Pantry</h1>
			<PantryForm onSubmit={addItem} />
			<div className='mt-8'>
				<div className='flex justify-between mb-1.5 mt-4 text-gray-600'>
					<h3 className='ml-[45px] '>Ingredient Name</h3>
					<h3 className='mr-[10px]'>Amount</h3>
				</div>
				<PantryList
					items={items}
					deleteItem={deleteItem}
					handleIngredientChange={handleIngredientChange}
					handleAmountChange={handleAmountChange}
				/>
			</div>
		</div>
	)
}

export default PantryPage
