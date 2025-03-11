import React, { useContext, useState } from 'react'
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoginPage() {
    //const {store, actions} = useContext(Context)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://127.0.0.1:5000/login", {
                email,
                password
            });
            localStorage.setItem("token", response.data.access_token);
            alert("Login successful!");
            navigate("/");
        } catch (error) {
            localStorage.removeItem("token");
            alert(error.response?.data?.message || "Login failed");
        }
    };

    return (
        //centers login form
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            {/* Container for the login form with styling for background, padding, and shadow */}
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                {/* Login title */}
                <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
                {/* Input fields and button wrapped in a container with spacing */}
                <div className="space-y-4">
                    {/* Email input field */}
                    <input
                        type="text"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {/* Password input field */}
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {/* Login button */}
                    <button
                        onClick={handleClick}
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                    >
                        Login
                    </button>
                </div>
            </div>
        </div>
    );
}

export default LoginPage

