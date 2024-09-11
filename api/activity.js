import {API_BASE_URL} from "../constants/api";

/**
 * This function creates a new activity.
 *
 * @param {string} name - The name of the activity.
 * @param {string} description - The description of the activity.
 * @param {string} nature - The nature of the activity.
 * @param {boolean} allDay - Whether the activity is all day or not.
 * @param {Date} endDate - The end date of the activity.
 * @param {Date} creationDate - The creation date of the activity.
 * @param {Date} reminderTime - The reminder time of the activity.
 * @return {Promise<Object>} The created activity object.
 * @throws {Error} If there is an error creating the activity.
 */
export const createActivity = async(name, description, nature, allDay, endDate, creationDate, reminderTime) => {
    try{
        console.log(`Attempting to create Activity: ${name}`)
        console.log(`API URL: ${API_BASE_URL}/activity/create_activity`);

        const response = await fetch(`${API_BASE_URL}/activity/create_activity`,{
            method:"POST",
            headers:{
                'Content-Type':'application/json',

            },
            body: JSON.stringify({name, description, nature,allDay, endDate, creationDate, reminderTime})

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
export const getActivities = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/activity/show_activity`, {
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
 * This function deletes an activity from the server.
 *
 * @param {string} id - The ID of the activity to be deleted.
 * @return {Promise<Object>} The response from the server.
 * @throws {Error} If there is an error deleting the activity.
 */
export const deleteActivity = async (id) => {
    try {
        console.log(`Attempting to delete Activity with ID: ${id}`);
        const response = await fetch(`${API_BASE_URL}/activity/delete_activity/${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Delete response:', data);
        return data;
    } catch (error) {
        console.error('Error deleting activity:', error);
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
 * @property {Date} updatedData.creationDate - The updated creationDate of the activity.
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
        const response = await fetch(`${API_BASE_URL}/activity/all_activities`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
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