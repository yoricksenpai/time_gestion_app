import { API_BASE_URL } from '../constants/api';

export const registerUser = async (email, password) => {
    try {
        console.log(`Attempting to register user: ${email}`);
        console.log(`API URL: ${API_BASE_URL}/auth/register`);

        const response = await fetch(`${API_BASE_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        console.log(`Response status: ${response.status}`);

        const textResponse = await response.text();
        console.log('Raw response:', textResponse);

        let data;
        try {
            data = JSON.parse(textResponse);
        } catch (parseError) {
            console.error('Error parsing JSON:', parseError);
            throw new Error('Server response is not valid JSON');
        }

        console.log(`Parsed response data:`, data);

        return data;
    } catch (error) {
        console.error('Detailed register error:', error);
        if (error.message) console.error('Error message:', error.message);
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