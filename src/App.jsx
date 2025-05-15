import React, { useState, useEffect } from 'react'
import { createBrowserRouter, Outlet, RouterProvider, Link } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import RecipeSearchPage from './pages/RecipeSearchPage'
import ErrorPage from './pages/ErrorPage'
import PantryPage from './pages/PantryPage'
import FavoritesPage from './pages/FavoritesPage' // Import FavoritesPage
import Navbar from './components/Navbar'
import MealPlanPage from './pages/MealPlanPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import axios from 'axios'
import ProtectedRoute from './components/ProtectedRoute'
import { AuthProvider } from './context/AuthContext'
import Footer from './components/Footer'

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
				element: (
					<ProtectedRoute>
						<RecipeSearchPage />
					</ProtectedRoute>
				),
			},
			{
				path: '/pantry',
				element: (
					<ProtectedRoute>
						<PantryPage />
					</ProtectedRoute>
				),
			},
			{
				path: '/favorites',
				element: (
					<ProtectedRoute>
						<FavoritesPage />
					</ProtectedRoute>
				),
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
				element: (
					<ProtectedRoute>
						<MealPlanPage />
					</ProtectedRoute>
				),
			},
		],
	},
])

function App() {
	return <RouterProvider router={router} />
}

function Root() {
	return (
		<AuthProvider>
			<div className='min-h-[100vh] flex flex-col'>
				<Navbar />
				<Outlet />
				<Footer />
			</div>
		</AuthProvider>
	)
}

export default App