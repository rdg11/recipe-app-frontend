import React from 'react'
import PantryItem from './PantryItem'

function PantryList({ items, deleteItem, handleQuantityChange, handleUnitChange }) {
	return (
		<ul className='flex flex-col justify-between'>
			{items.length === 0 && (
				<p className='w-full mt-8 text-xl text-center text-gray-400'>No Ingredients</p>
			)}
			{items.map((item, index) => (
				<PantryItem
					key={item.id}
					index={index}
					id={item.id}
					ingredient={item.ingredient}
					quantity={item.quantity}
					unit={item.unit}
					deleteItem={deleteItem}
					handleQuantityChange={handleQuantityChange}
					handleUnitChange={handleUnitChange}
				/>
			))}
		</ul>
	)
}

export default PantryList
