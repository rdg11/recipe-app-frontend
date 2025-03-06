import React, { useState } from 'react'
import { CiSearch } from 'react-icons/ci'

function RecipeSearchForm({ generateRecipes }) {
	const [userQuery, setUserQuery] = useState('')

	const handleSubmit = e => {
		e.preventDefault()
		if (userQuery === '') return
		generateRecipes(userQuery)
		setUserQuery('')
	}

	return (
		<form
			onSubmit={e => handleSubmit(e)}
			className='flex justify-between w-full max-w-[700px] px-6'
		>
			<div className='flex w-full h-[45px]'>
				<CiSearch className='w-[50px] h-full p-2 text-gray-600 flex items-center justify-center rounded-l-full border-1 border-gray-400 border-r-0 bg-indigo-50' />
				<input
					value={userQuery}
					onChange={e => setUserQuery(e.target.value)}
					maxLength={75}
					placeholder='What do I want to eat...'
					className='w-full text-lg pt-0.5 placeholder-gray-400 border-gray-400 border-1 bg-indigo-50 border-x-0 focus:outline-0 focus:placeholder-gray-300'
				/>
			</div>
			<button className='w-[130px] pr-[10px] text-lg text-gray-600 rounded-r-full border-1 border-gray-400 bg-indigo-50 hover:cursor-pointer hover:bg-indigo-100'>
				Search
			</button>
		</form>
	)
}

export default RecipeSearchForm
