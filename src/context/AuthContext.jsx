import React, { createContext, useContext, useState } from 'react';

// Create the context
const AuthContext = createContext();

// Custom hook to use AuthContext
export const useAuth = () => useContext(AuthContext);

// AuthProvider component to provide authentication state to the app
export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
        {children}
    </AuthContext.Provider>
);
};
