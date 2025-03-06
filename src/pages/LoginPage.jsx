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
            alert(error.response?.data?.message || "Login failed");
        }
    };

    return (
    <div>
        <h1>Login</h1>
        <div>
            <input type = "text" placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)} ></input>
            <input type = "password" placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)}></input>
            <button onClick={handleClick}>Login</button>
        </div>
    </div>
    )

}
export default LoginPage

