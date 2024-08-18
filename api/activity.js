import {API_BASE_URL} from "../constants/api";

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