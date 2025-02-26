import React, { useRef } from 'react'
import { IoCloseOutline } from 'react-icons/io5'

function PantryItem({
	id,
	index,
	ingredient,
	amount,
	deleteItem,
	handleIngredientChange,
	handleAmountChange,
}) {
	const inputRef = useRef(null)

	const handleKeyDown = event => {
		if (event.key === 'Enter') {
			inputRef.current.blur() // Unfocus the input field
		}
	}

	return (
		<li
			className={`flex justify-between ${index % 2 == 0 ? 'bg-indigo-50 border-b border-b-gray-200' : 'border-b border-b-white'}`}
		>
			<button
				onClick={() => deleteItem(id)}
				className='flex items-center justify-center size-10 hover:cursor-pointer'
			>
				<IoCloseOutline className='text-2xl text-gray-500 mt-[2px]' />
			</button>
			<div className='flex justify-between w-full'>
				<input
					type='text'
					value={ingredient}
					maxLength={50}
					placeholder='<Click to add ingredient>'
					onChange={e => handleIngredientChange(id, e)}
					onKeyDown={handleKeyDown}
					ref={inputRef}
					className='w-full pl-2 hover:cursor-default focus:hover:cursor-text focus:outline-1 focus:outline-dashed outline-gray-400 '
				/>
				<input
					type='text'
					value={amount}
					maxLength={20}
					placeholder='-'
					onChange={e => handleAmountChange(id, e)}
					onKeyDown={handleKeyDown}
					ref={inputRef}
					className='w-[150px] pr-2 text-right text-gray-600 hover:cursor-default focus:hover:cursor-text focus:outline-1 focus:outline-dashed outline-gray-400'
				/>
			</div>
		</li>
	)
}

export default PantryItem
