import React from 'react'

function Footer() {
	return (
		<div className='mt-auto h-[280px] bg-secondary text-white flex flex-col justify-center items-center gap-7'>
			<h3 className='text-3xl font-bold tracking-wider'>RECIPE APP</h3>
			<div className='bg-white h-[1px] w-[325px]' />
			<div className='flex gap-12 text-gray-400 text-md'>
				<a href='/'>PRIVACY POLICY</a>
				<a href='/'>TERMS AND CONDITIONS</a>
				<a href='/'>CONTACT</a>
			</div>
			<p className='mt-8 text-sm font-extralight'>
				Group Four-Eleven, University of Missouri, Capstone Project
			</p>
		</div>
	)
}

export default Footer
