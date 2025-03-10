import React, { useContext, useState } from 'react'
import { useNavigate } from "react-router-dom";
import axios from "axios";


function RegisterPage() {
    //const {store, actions} = useContext(Context)
    const [fName, setfName] = useState("")
    const [lName, setlName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://127.0.0.1:5000/register", {
                first_name: fName,  // Match database column names
                last_name: lName,
                email,
                password
            });
            alert(response.data.message);
            navigate("/login");
        } catch (error) {
            alert(error.response?.data?.message || "Registration failed");
        }
    };

    return (
     // center the registration form on the screen
     <div className="flex items-center justify-center min-h-screen bg-gray-100">

         {/* Registration form container with background, padding, and shadow */}
         <div className="bg-white p-8 rounded-lg shadow-lg w-96">

             {/* Registration title */}
             <h1 className="text-2xl font-bold text-center mb-6">New User Registration</h1>

             {/* Form container with spacing between elements */}
             <div className="space-y-4">

                 {/* First Name input field */}
                 <input
                     type="text"
                     placeholder="First Name"
                     value={fName}
                     onChange={(e) => setfName(e.target.value)} 
                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                 />

                 {/* Last Name input field */}
                 <input
                     type="text"
                     placeholder="Last Name"
                     value={lName}
                     onChange={(e) => setlName(e.target.value)} 
                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                 />

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

                 {/* Submit button */}
                 <button
                     onClick={handleRegister} 
                     className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                 >
                     Submit
                 </button>
             </div>
         </div>
     </div>
 );

}
export default RegisterPage
