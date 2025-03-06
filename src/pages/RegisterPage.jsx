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
    <div>
        <h1>Login</h1>
        <div>
            <input type = "text" placeholder='First Name' value={fName} onChange={(e) => setfName(e.target.value)} ></input>
            <input type = "text" placeholder='Last Name' value={lName} onChange={(e) => setlName(e.target.value)} ></input>
            <input type = "text" placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)} ></input>
            <input type = "password" placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)}></input>
            <button onClick={handleRegister}>Submit</button>
        </div>
    </div>
    )

}
export default RegisterPage