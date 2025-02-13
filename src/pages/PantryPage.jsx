import React from 'react'

function PantryPage() {
	return (
		<div className='max-w-[1000px] flex flex-col mx-auto mt-[100px] px-8'>
			<h1 className='text-6xl font-bold font-roboto'>My Pantry</h1>
			<div className='flex justify-between mt-8'>
				<div className='h-[48px] flex flex-auto pl-4 mr-4 bg-gray-100 border-b border-b-gray-400 items-center'>
					<p className='text-xl text-gray-400'>Type in any ingredient...</p>
				</div>
				<div className='w-[115px] flex items-center justify-center bg-primary'>
					<p className='tracking-widest text-white '>ADD ITEM</p>
				</div>
			</div>
		</div>
	)
}

export default PantryPage
