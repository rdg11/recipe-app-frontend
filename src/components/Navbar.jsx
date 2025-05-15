import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai'
import { FaHeart } from 'react-icons/fa'
import { useAuth } from '../context/AuthContext'

function Navbar() {
	const { isAuthenticated, setIsAuthenticated } = useAuth()
	const [nav, setNav] = useState(false)

	const handleNav = () => {
		setNav(!nav)
	}

	const handleLogout = () => {
		localStorage.removeItem('token')
		setIsAuthenticated(false)
		alert('Successfully Logged Out')
	}

	return (
		<div className='sticky top-0 border-gray-200 border-b-1 bg-gray-50'>
			<div className='flex items-center justify-between max-w-[1240px] mx-auto h-22 px-4 text-xl'>
				<div className='flex gap-14'>
					<Link to='/' className='py-4 font-bold text-black'>
						<div className='flex'>
							<p className='text-secondary'>SMART</p>
							<p className='text-primary'>RECIPES</p>
						</div>
					</Link>
					<ul className='hidden gap-10 text-gray-500 md:flex'>
						<Link to='/recipes' className='py-4'>
							Recipes
						</Link>
						<Link to='/pantry' className='py-4'>
							Pantry
						</Link>
						<Link to='/favorites' className='py-4'>
							Favorites
						</Link>
						<Link to='/mealplan' className='py-4'>
							Meal Plan
						</Link>
					</ul>
				</div>
				<ul className='hidden text-gray-500 md:flex'>
					{isAuthenticated ? (
						<button onClick={handleLogout} className='p-4'>
							Logout
						</button>
					) : (
						<>
							<Link to='/login' className='p-4'>
								Login
							</Link>
							<Link to='/register' className='p-4'>
								Signup
							</Link>
						</>
					)}
				</ul>
				<div onClick={handleNav} className={`block md:hidden`}>
					{nav ? <AiOutlineClose size={25} /> : <AiOutlineMenu size={25} />}
				</div>
				<div
					className={
						nav
							? 'fixed top-0 left-0 w-[60%] border-r h-full border-r-gray-900 bg-white ease-in-out duration-500'
							: 'fixed left-[-100%]'
					}
				>
					<ul className='flex flex-col p-4 text-xl uppercase'>
						<Link to='/' className='m-4 font-bold'>
							RECIPE APP
						</Link>
						<Link to='/recipes' className='p-4 border-b'>
							Recipes
						</Link>
						<Link to='/pantry' className='p-4 border-b'>
							Pantry
						</Link>
						<Link to='/favorites' className='p-4 border-b'>
							Favorites
						</Link>
						<Link to='/mealplan' className='p-4 border-b'>
							Meal Plan
						</Link>

						{/* Conditionally show Login/Signup or Logout in the mobile menu */}
						{isAuthenticated ? (
							<button onClick={handleLogout} className='p-4 border-b'>
								Logout
							</button>
						) : (
							<>
								<Link to='/login' className='p-4 border-b'>
									Login
								</Link>
								<Link to='/register' className='p-4 border-b'>
									Signup
								</Link>
							</>
						)}
					</ul>
				</div>
			</div>
		</div>
	)
}

export default Navbar