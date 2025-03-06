import React from 'react'
import { createBrowserRouter, Outlet, RouterProvider, Link } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import RecipeSearchPage from './pages/RecipeSearchPage'
import ErrorPage from './pages/ErrorPage'
import PantryPage from './pages/PantryPage'
import Navbar from './components/Navbar'
import MealPlanPage from './pages/MealPlanPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import axios from 'axios'


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
			{
				path: '/login',
				element: <LoginPage />,
			},
			{
				path: '/register',
				element: <RegisterPage />,
			},
			{
				path: '/mealplan',
				element: <MealPlanPage />,
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
