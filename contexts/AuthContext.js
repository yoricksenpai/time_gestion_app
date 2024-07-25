import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        checkToken();
    }, []);

    const checkToken = async () => {
        setIsLoading(true);
        try {
            const token = await AsyncStorage.getItem('userToken');
            setIsAuthenticated(!!token);
        } catch (error) {
            console.error('Error checking token:', error);
            setIsAuthenticated(false);
        } finally {
            setIsLoading(false);
        }
    };
    const login = async (token) => {
        await AsyncStorage.setItem('userToken', token);
        setIsAuthenticated(true);
    };

    const logout = async () => {
        await AsyncStorage.removeItem('userToken');
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};