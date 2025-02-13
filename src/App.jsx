import React from 'react'
import { createBrowserRouter, Outlet, RouterProvider, Link } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import RecipeSearchPage from './pages/RecipeSearchPage'
import ErrorPage from './pages/ErrorPage'
import PantryPage from './pages/PantryPage'
import Navbar from './components/Navbar'

const router = createBrowserRouter([
	{
		path: '/',
		element: <Root />,
		errorElement: <ErrorPage />,
		children: [
			{
				index: true,
				element: <LandingPage />,
			},
			{
				path: '/recipes',
				element: <RecipeSearchPage />,
			},
			{
				path: '/pantry',
				element: <PantryPage />,
			},
		],
	},
])

function App() {
	return <RouterProvider router={router} />
}

function Root() {
	return (
		<div>
			<Navbar />
			<Outlet />
		</div>
	)
}

export default App
