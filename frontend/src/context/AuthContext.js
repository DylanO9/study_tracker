import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        checkAuthStatus();
    }, []);

    const login = async (token, id) => {
        try {
          await localStorage.setItem('userToken', token);
          await localStorage.setItem('id', id);
          setIsAuthenticated(true);
        } catch (error) {
          console.error('Error during login:', error);
        }
      };

    const logout = async () => {
    try {
        await localStorage.removeItem('userToken');
        await localStorage.removeItem('id');
        setIsAuthenticated(false);
    } catch (error) {
        console.error('Error during logout:', error);
    }
    };

    
    const checkAuthStatus = async () => {
        try {
        const token = await localStorage.getItem('userToken');
        setIsAuthenticated(!!token);
        } catch (error) {
        console.error('Error checking auth status:', error);
        }
    };


    return ( <AuthContext.Provider value={{ login, logout, isAuthenticated }}>
        {children}
    </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
