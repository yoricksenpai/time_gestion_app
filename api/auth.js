import { API_BASE_URL } from '../constants/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const handleResponse = async (response) => {
  const textResponse = await response.text();
  let data;
  try {
    data = JSON.parse(textResponse);
  } catch (parseError) {
    console.error('Error parsing JSON:', parseError);
    throw new Error('Server response is not valid JSON');
  }

  if (!response.ok) {
    throw new Error(data.message || `HTTP error! status: ${response.status}`);
  }
  return data;
};

export const registerUser = async (username, email, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password }),
    });
    return await handleResponse(response);
  } catch (error) {
    console.error('Register error:', error);
    throw error;
  }
};

export const loginUser = async (email, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await handleResponse(response);
    if (data.token) {
      await AsyncStorage.setItem('token', data.token);
      return data;
    } else {
      throw new Error('No token received');
    }
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/auth/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });
    await AsyncStorage.removeItem('token');
    return await handleResponse(response);
  } catch (error) {
    console.error('Logout error:', error);
    throw error;
  }
};

export const getUserInfo = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('User not found');
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await handleResponse(response);
  } catch (error) {
    console.error('Get user info error:', error);
    throw error;
  }
};

export const updateUserInfo = async (updatedData) => {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/auth/update`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(updatedData),
    });
    return await handleResponse(response);
  } catch (error) {
    console.error('Update user info error:', error);
    throw error;
  }
};

export const deleteUser = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/auth/delete_user`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });
    await AsyncStorage.removeItem('token');
    return await handleResponse(response);
  } catch (error) {
    console.error('Delete user error:', error);
    throw error;
  }
};
