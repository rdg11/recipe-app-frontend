import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { useAuth } from '../context/AuthContext';

function Navbar() {
	const { isAuthenticated, setIsAuthenticated } = useAuth();
    const [nav, setNav] = useState(false);

    const handleNav = () => {
        setNav(!nav);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
		alert("Successfully Logged Out");
    };

    return (
        <div className="flex sticky top-0 text-xl items-center justify-between h-24 max-w-[1240px] px-4 mx-auto border-b-2 border-black bg-white">
            <Link to="/" className="font-bold">
                LOGO
            </Link>
            <ul className="hidden md:flex">
                <Link to="/recipes" className="p-4">
                    Recipes
                </Link>
                <Link to="/pantry" className="p-4">
                    Pantry
                </Link>
                <Link to="/mealplan" className="p-4">
                    Meal Plan
                </Link>
                {isAuthenticated ? (
                    <button onClick={handleLogout} className="p-4">
                        Logout
                    </button>
                ) : (
                    <>
                        <Link to="/login" className="p-4">
                            Login
                        </Link>
                        <Link to="/register" className="p-4">
                            Signup
                        </Link>
                    </>
                )}
            </ul>
            <div onClick={handleNav} className="block md:hidden">
                {nav ? <AiOutlineClose size={25} /> : <AiOutlineMenu size={25} />}
            </div>
            <div
                className={
                    nav
                        ? 'fixed top-0 left-0 w-[60%] border-r h-full border-r-gray-900 bg-white ease-in-out duration-500'
                        : 'fixed left-[-100%]'
                }
            >
                <ul className="flex flex-col p-4 text-xl uppercase">
                    <Link to="/" className="m-4 font-bold">
                        LOGO
                    </Link>
                    <Link to="/recipes" className="p-4 border-b">
                        Recipes
                    </Link>
                    <Link to="/pantry" className="p-4 border-b">
                        Pantry
                    </Link>
                    <Link to="/mealplan" className="p-4 border-b">
                        Meal Plan
                    </Link>

                    {/* Conditionally show Login/Signup or Logout in the mobile menu */}
                    {isAuthenticated ? (
                        <button onClick={handleLogout} className="p-4 border-b">
                            Logout
                        </button>
                    ) : (
                        <>
                            <Link to="/login" className="p-4 border-b">
                                Login
                            </Link>
                            <Link to="/register" className="p-4 border-b">
                                Signup
                            </Link>
                        </>
                    )}
                </ul>
            </div>
        </div>
    );
}

export default Navbar;
