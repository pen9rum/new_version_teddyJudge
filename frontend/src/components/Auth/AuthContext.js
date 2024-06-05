import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [id, setId] = useState(null); // Add this line

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, id, setId }}>
            {children}
        </AuthContext.Provider>
    );
};
