import { API_BASE_URL } from '../constants/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
/**
 * Registers a new user with the given username, email, and password.
 * @async
 * @param {string} username - The username of the user.
 * @param {string} email - The email of the user.
 * @param {string} password - The password of the user.
 * @throws {Error} If the server response is not valid JSON or if the request fails.
 * @return {Promise<Object>} The parsed JSON response from the server.
 */
export const registerUser = async (username,email, password) => {
    try {
        console.log(`Attempting to register user: ${email}`);
        console.log(`API URL: ${API_BASE_URL}/auth/register`);

        const response = await fetch(`${API_BASE_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, password }),
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

/**
 * Logs in a user with the given username, email, and password.
 * @async
 * @param {string} username - The username of the user.
 * @param {string} email - The email of the user.
 * @param {string} password - The password of the user.
 * @throws {Error} If the request fails.
 * @return {Promise<Object>} The parsed JSON response from the server containing the token and redirectTo.
 */
export const loginUser = async (username, email, password) => {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, password }),
        });
        return await response.json();
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
};
/**
 * Logs out the current user.
 *
 * @async
 * @return {Promise<Object>} The parsed JSON response from the server containing a success message.
 * @throws {Error} If the request fails.
 */
export const logoutUser = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Logout failed');
    }
    return await response.json();
  } catch (error) {
    console.error('Logout error:', error);
    throw error;
  }
};
/**
 * Fetches user information.
 * @async
 * @throws {Error} If the request fails or the response is not valid JSON.
 * @return {Promise<Object>} The parsed JSON response from the server containing the user's information.
 */
export const getUserInfo = async (userId) => {
    try {
        const token = await AsyncStorage.getItem('token');
        const response = await fetch(`${API_BASE_URL}/auth/me/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });
        if (!response.ok) {
            throw new Error('Failed to fetch user info');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching user info:', error);
        throw error;
    }
};
/**
 * Updates user information.
 * @async
 * @param {Object} updatedData - An object containing the updated user information.
 * @throws {Error} If the request fails or the response is not valid JSON.
 * @return {Promise<Object>} The parsed JSON response from the server containing the updated user's information.
 */
export const updateUserInfo = async (updatedData) => {
    try {
        const token = AsyncStorage.getItem('token');
        const response = await fetch(`${API_BASE_URL}/auth/update`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(updatedData),
        });
        if (!response.ok) {
            throw new Error('Failed to update user info');
        }
        return await response.json();
    } catch (error) {
        console.error('Error updating user info:', error);
        throw error;
    }
};
/**
 * Deletes a user.
 * @async
 * @param {string} userId - The ID of the user to delete.
 * @throws {Error} If the request fails or the response is not valid JSON.
 * @return {Promise<Object>} The parsed JSON response from the server containing a success message.
 */
export const deleteUser = async (userId) => {
    try {
        const token = AsyncStorage.getItem('token');
        const response = await fetch(`${API_BASE_URL}/auth/delete_user/${userId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });
        if (!response.ok) {
            throw new Error('Failed to delete user');
        }
        return await response.json();
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error;
    }
};
// Autres fonctions d'API liées à l'authentification...