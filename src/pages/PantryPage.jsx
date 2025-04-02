import React, { useEffect, useState } from 'react'
import PantryForm from '../components/PantryForm'
import PantryList from '../components/PantryList'
import { useQuery } from '@tanstack/react-query'
import { testFetchPantry } from '../api/pantry'

/* -- Temporarily using local storage to test -- */

function PantryPage() {
	const { data, isPending, isError } = useQuery({
		queryKey: ['ingredients'],
		queryFn: () => testFetchPantry(1),
	})

	// const [items, setItems] = useState(() => {
	// 	const localValue = localStorage.getItem('ITEMS')
	// 	if (localValue == null) return []

	// 	return JSON.parse(localValue)
	// })
	// useEffect(() => {
	// 	localStorage.setItem('ITEMS', JSON.stringify(items))
	// 	console.log('ITEMS: ', items)
	// }, [items])

	const [items, setItems] = useState([])

	useEffect(() => {
		if (data) {
			setItems(data)
		}
	}, [data])

	// Function to update the value of an Quantity field
	function handleQuantityChange(id, event) {
		setItems(currentItems =>
			currentItems.map(item =>
				item.id === id ? { ...item, quantity: event.target.value } : item,
			),
		)
	}

	// Function to update the value of an Unit field
	function handleUnitChange(id, event) {
		setItems(currentItems =>
			currentItems.map(item =>
				item.id === id ? { ...item, unit: event.target.value } : item,
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

	function saveItems() {}

	console.log('DATA: ', data)

	if (isPending) return <h1>Loading...</h1>
	if (isError) return <h1>error</h1>

	return (
		<div className='flex flex-col items-center mt-[100px] px-6 mb-96'>
			<div className='max-w-[1000px] w-full'>
				<h1 className='text-6xl font-bold font-roboto'>My Pantry</h1>
				<PantryForm addItem={addItem} />
				<div className='w-full mt-8'>
					<button>SAVE</button>
					<div className='flex justify-between mb-1.5 mt-4 text-gray-600'>
						<h3 className='ml-[45px] mr-auto'>Ingredient Name</h3>
						<h3 className='mr-[40px]'>Quantity</h3>
						<h3 className='mr-[50px]'>Unit</h3>
					</div>
					<PantryList
						items={items}
						deleteItem={deleteItem}
						handleQuantityChange={handleQuantityChange}
						handleUnitChange={handleUnitChange}
					/>
				</div>
			</div>
		</div>
	)
}

export default PantryPage
