import React from 'react'
import food_plate from '../assets/food_plate.png'
import { Link } from 'react-router-dom'

function LandingPage() {
	return (
		<div className='flex flex-col items-center mt-[130px] '>
			<div className='w-[1000px] pb-36'>
				<div className='flex h-[390px] justify-between'>
					<div className='w-[540px] mt-4 flex flex-col justify-between'>
						<div>
							<h1 className='text-6xl font-bold font-roboto w-[400px]'>
								Plan And Prepare Meals Quick & Easy
							</h1>
							<p className='mt-6 text-2xl w-[400px]'>
								This is a section of body text, this is some more body text!
							</p>
						</div>
						<div className='flex justify-between text-xl h-[60px]'>
							<Link to='/register'>
								<button className='w-[250px] h-full bg-primary text-white tracking-widest hover:cursor-pointer'>
									CREATE ACCOUNT
								</button>
							</Link>
							<a href='/recipes'>
								<button className='w-[250px] h-full border-secondary border-3 text-secondary font-bold rounded-full tracking-widest hover:cursor-pointer'>
									SEARCH RECIPES
								</button>
							</a>
						</div>
					</div>
					<img src={food_plate} alt='food image' className='h-full' />
				</div>
			</div>
			<div className='w-full bg-gray-100 h-[800px] flex justify-center'>
				<p className='mt-12 text-2xl font-bold'>
					Pictures & GIFs demonstrating how application works in detail below...
				</p>
			</div>
		</div>
	)
}

export default LandingPage
