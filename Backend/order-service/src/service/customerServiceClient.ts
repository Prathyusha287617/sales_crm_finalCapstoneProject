// src/services/customerServiceClient.ts
import axios from 'axios';

const customerServiceUrl = process.env.CUSTOMER_SERVICE_URL || 'http://localhost:5005/api/customers';

export const getCustomerByShortId = async (customerShortId: string) => {
    try {
        console.log(`Fetching customer with shortId: ${customerShortId}`); // Debugging log
        const response = await axios.get(`${customerServiceUrl}/${customerShortId}`);
        return response.data; // Assuming this returns the customer data or null if not found
    } catch (error: any) {
        console.error(`Unable to fetch customer: ${error.message}`); // Error logging
        throw new Error(`Unable to fetch customer: ${error.message}`); // Rethrowing error with a custom message
    }
};
