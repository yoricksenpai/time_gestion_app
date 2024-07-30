import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        checkUser();
    }, []);

    const checkUser = async () => {
        setIsLoading(true);
        try {
            const userJson = await AsyncStorage.getItem('user');
            if (userJson) {
                setUser(JSON.parse(userJson));
            }
        } catch (error) {
            console.error('Error checking user:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const login = async (userData) => {
        await AsyncStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
    };

    const logout = async () => {
        await AsyncStorage.removeItem('user');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};