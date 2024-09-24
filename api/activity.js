import {API_BASE_URL} from "../constants/api";
import AsyncStorage from '@react-native-async-storage/async-storage';
/**
 * This function creates a new activity.
 *
 * @param {string} activityData.name - The name of the activity.
 * @param {string} activityData.description - The description of the activity.
 * @param {string} activityData.nature - The nature of the activity.
 * @param {boolean} activityData.allDay - Whether the activity is all day or not.
 * @param {Date} activityData.endDate - The end date of the activity.
 * @param {Date} activityData.reminderTime - The reminder time of the activity.
 * @return {Promise<Object>} The created activity object.
 * @throws {Error} If there is an error creating the activity.
 */
export const createActivity = async(activityData) => {
    try{
        console.log(`Attempting to create Activity: ${activityData.name}`)
        console.log(`API URL: ${API_BASE_URL}/activity/create_activity`);
        const token = await AsyncStorage.getItem('token');
        console.log('Token récupéré :', token ? 'Présent' : 'Absent');

        if (!token) {
            throw new Error('No token found');
        }
        console.log('Données à envoyer:', JSON.stringify(activityData, null, 2));
        const response = await fetch(`${API_BASE_URL}/activity/create_activity`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(activityData)
        });
        console.log(`Response status: ${response.status}`);
        const textResponse = await response.text();
        console.log('Raw Response : ', textResponse )

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
}
/**
 * This function fetches all activities from the server.
 *
 * @return {Promise<Array>} An array of activity objects.
 * @throws {Error} If there is an error fetching the activities.
 */
export const getActivity = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/activity/show_activity/${id}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching activities:', error);
        throw error;
    }
};

/**
 * This function fetches activities within a specific date range from the server.
 *
 * @param {Date} startDate - The start date of the range.
 * @param {Date} endDate - The end date of the range.
 * @return {Promise<Array>} An array of activity objects within the specified date range.
 * @throws {Error} If there is an error fetching the activities.
 */
export const getActivitiesByDateRange = async (startDate, endDate) => {
    try {
        console.log('Dates passées à getActivitiesByDateRange:', { startDate, endDate });
        
        const token = await AsyncStorage.getItem('token');
        if (!token) {
            throw new Error('No token found');
        }

        // Ensure startDate and endDate are valid Date objects
        if (!(startDate instanceof Date) || !(endDate instanceof Date)) {
            throw new Error('Invalid date format. startDate and endDate must be Date objects.');
        }

        const url = `${API_BASE_URL}/activity/activities_by_date_range?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`;
        console.log('URL de la requête:', url);

        const response = await fetch(url, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseText = await response.text();
        console.log('Réponse brute du serveur:', responseText);

        if (!responseText) {
            throw new Error('Empty response from server');
        }

let activities;
        try {
            activities = JSON.parse(responseText);
            console.log('Activités parsées:', activities);
        } catch (parseError) {
            console.error('Erreur lors du parsing de la réponse:', parseError);
            throw new Error('Invalid JSON response from server');
        }
        return activities;
    } catch (error) {
        console.error('Error in getActivitiesByDateRange:', error);
        throw error;
    }
};
/**
 * This function deletes an activity from the server.
 *
 * @param {string} id - The ID of the activity to be deleted.
 * @return {Promise<Object>} The response from the server.
 * @throws {Error} If there is an error deleting the activity.
 */
export const deleteActivities = async (activityIds) => {
    try {
        console.log(`Attempting to delete Activities with IDs:`, activityIds);
        const response = await fetch(`${API_BASE_URL}/activity/delete_activities`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ activityIds }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Delete response:', data);
        return data;
    } catch (error) {
        console.error('Error deleting activities:', error);
        throw error;
    }
};
/**
 * This function updates an activity on the server.
 *
 * @param {string} id - The ID of the activity to be updated.
 * @param {Object} updatedData - An object containing the updated fields of the activity.
 * @property {string} updatedData.name - The updated name of the activity.
 * @property {string} updatedData.description - The updated description of the activity.
 * @property {string} updatedData.nature - The updated nature of the activity.
 * @property {boolean} updatedData.allDay - The updated allDay property of the activity.
 * @property {Date} updatedData.endDate - The updated endDate of the activity.
 * @property {Date} updatedData.reminderTime - The updated reminderTime of the activity.
 * 
 * @return {Promise<Object>} The response from the server.
 * @throws {Error} If there is an error updating the activity.
 */
export const updateActivity = async (id, updatedData) => {
    try {
        console.log(`Attempting to update Activity with ID: ${id}`);
        const response = await fetch(`${API_BASE_URL}/activity/update_activity/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Update response:', data);
        return data;
    } catch (error) {
        console.error('Error updating activity:', error);
        throw error;
    }
};

/**
 * This function fetches all activities from the server.
 *
 * @return {Promise<Array>} An array of all activity objects.
 * @throws {Error} If there is an error fetching the activities.
 */
export const getAllActivities = async () => {
    try {
        const token = await AsyncStorage.getItem('token');
        console.log('Token récupéré :', token ? 'Présent' : 'Absent');

        const response = await fetch(`${API_BASE_URL}/activity/all_activities`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const activities = await response.json();
        return activities;
    } catch (error) {
        console.error('Error fetching activities:', error);
        throw error;
    }
};
/**
 * Cette fonction recherche des activités en fonction d'un terme de recherche.
 *
 * @param {string} query - Le terme de recherche.
 * @return {Promise<Array>} Un tableau d'objets d'activités correspondant à la recherche.
 * @throws {Error} Si une erreur se produit lors de la recherche des activités.
 */
export const searchActivities = async (query) => {
    try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
            throw new Error('No token found');
        }

        const response = await fetch(`${API_BASE_URL}/activity/search_activities?query=${encodeURIComponent(query)}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const activities = await response.json();
        return activities;
    } catch (error) {
        console.error('Error searching activities:', error);
        throw error;
    }
};