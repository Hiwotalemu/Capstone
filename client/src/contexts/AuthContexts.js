// src/contexts/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const username = localStorage.getItem('username');
        if (username) {
            console.log("Username found in storage:", username);
            setCurrentUser(username);
            console.log("CurrentUser set to:", username);
        }
    }, []);

    const login = (username) => {
        try {
            localStorage.setItem('username', username);
            setCurrentUser(username);
        } catch (error) {
            console.error("Failed to store user data:", error);
        }
    };

    const logout = () => {
        localStorage.removeItem('username');
        setCurrentUser(null);
    };

    return (
        <AuthContext.Provider value={{ currentUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

