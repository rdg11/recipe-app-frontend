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
	const input1Ref = useRef(null)
	const input2Ref = useRef(null)

	const handleKeyDown = (event, inputRef) => {
		if (event.key === 'Enter') {
			inputRef.current.blur() // Unfocus the input field
		}
	}

	const handleFocus = inputRef => {
		const input = inputRef.current
		setTimeout(() => {
			// Move the caret to the end of the text
			input.setSelectionRange(input.value.length, input.value.length)
		}, 10) // Slight delay to ensure focus happens first
	}

	return (
		<li
			className={`flex justify-between border-b ${index % 2 == 0 ? 'bg-indigo-50 border-b-gray-200' : 'border-b-white'}`}
		>
			<button
				onClick={() => deleteItem(id)}
				className='flex items-center justify-center size-10 hover:cursor-pointer group'
			>
				<IoCloseOutline className='text-2xl text-gray-500 mt-[2px] group-hover:text-gray-900' />
			</button>
			<div className='flex justify-between w-full'>
				<input
					type='text'
					value={ingredient}
					maxLength={50}
					placeholder='<Click to add ingredient>'
					onChange={e => handleIngredientChange(id, e)}
					onKeyDown={e => handleKeyDown(e, input1Ref)}
					onFocus={() => handleFocus(input1Ref)}
					ref={input1Ref}
					className='w-full pl-2 hover:cursor-default focus:hover:cursor-text focus:outline-1 focus:outline-dashed outline-gray-400 '
				/>
				<input
					type='text'
					value={amount}
					maxLength={20}
					placeholder='-'
					onChange={e => handleAmountChange(id, e)}
					onKeyDown={e => handleKeyDown(e, input2Ref)}
					onFocus={() => handleFocus(input2Ref)}
					ref={input2Ref}
					className='w-[150px] pr-2 text-right text-gray-600 hover:cursor-default focus:hover:cursor-text focus:outline-1 focus:outline-dashed outline-gray-400'
				/>
			</div>
		</li>
	)
}

export default PantryItem
