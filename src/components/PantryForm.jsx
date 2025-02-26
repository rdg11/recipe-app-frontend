import React, { useState } from 'react'

function PantryForm({ addItem }) {
	const [newIngredient, setNewIngredient] = useState('')

	// Function to add a new item
	const handleSubmit = e => {
		e.preventDefault()
		if (newIngredient === '') return

		addItem(newIngredient)

		setNewIngredient('')
	}

	return (
		<form className='flex justify-between mt-8'>
			<input
				value={newIngredient}
				onChange={e => setNewIngredient(e.target.value)}
				maxLength={50}
				placeholder='Type in any ingredient...'
				className='h-[48px] w-full flex pl-4 mr-4 bg-gray-100 border-b border-b-gray-400 items-center text-xl focus:outline-0 focus:placeholder-gray-300'
			/>
			<button
				onClick={e => handleSubmit(e)}
				className='w-[140px] flex items-center justify-center hover:cursor-pointer bg-primary tracking-widest text-white '
			>
				ADD ITEM
			</button>
		</form>
	)
}

export default PantryForm
