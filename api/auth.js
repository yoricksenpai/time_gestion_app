import { API_BASE_URL } from '../constants/api';

export const registerUser = async (email, password) => {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });
        return await response.json();
    } catch (error) {
        console.error('Register error:', error);
        throw error;
    }
};

export const loginUser = async (email, password) => {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });
        return await response.json();
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
};

// Autres fonctions d'API liées à l'authentification...