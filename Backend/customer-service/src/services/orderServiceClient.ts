// src/services/orderServiceClient.ts
import axios from 'axios';

const orderServiceUrl = process.env.ORDER_SERVICE_URL || 'http://localhost:5004/api/orders';

export const getOrdersByCustomerShortId = async (customerShortId: string) => {
    try {
        const response = await axios.get(`${orderServiceUrl}/customer/shortid/${customerShortId}`);
        return response.data; // Return the fetched orders
    } catch (error) {
        console.error("Error fetching orders from Order Service:", error);
        throw error; // Propagate the error for further handling
    }
};
