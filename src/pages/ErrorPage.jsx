import React from 'react'
import { Link } from 'react-router-dom'

function ErrorPage() {
	return (
		<div id='error-page' className='flex flex-col items-center justify-center h-screen'>
			<h1 className='pb-3 text-3xl'>Oops! Page not found.</h1>
			<Link to={'/'} className='underline'>
				Return to homepage
			</Link>
		</div>
	)
}

export default ErrorPage
