// src/components/Dashboard/Orders/OrderStatusPieChart.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import { CircularProgress, Typography, Box } from '@mui/material';

const OrderStatusPieChart: React.FC = () => {
  const [orderStatusData, setOrderStatusData] = useState<any[]>([]); // Initialize as empty array
  const [loading, setLoading] = useState<boolean>(true); // Track loading state

  useEffect(() => {
    // Fetch order status summary data
    axios.get('/api/orders/status-summary')
      .then((response) => {
        setOrderStatusData(response.data.data || []); // Default to empty array if no data
        setLoading(false); // Set loading to false after fetching data
      })
      .catch((error) => {
        console.error('Error fetching order status data:', error);
        setLoading(false); // Set loading to false on error
      });
  }, []);

  // Prepare chart data only when orderStatusData is available
  const data = {
    labels: orderStatusData.map((item) => item.status),
    datasets: [
      {
        data: orderStatusData.map((item) => item.count),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
      },
    ],
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 400, margin: '0 auto', textAlign: 'center' }}>
      {loading ? (
        <CircularProgress />
      ) : orderStatusData.length > 0 ? (
        <>
          <Typography variant="h6" gutterBottom>
            Order Status Summary
          </Typography>
          <Pie data={data} />
        </>
      ) : (
        <Typography variant="body1" color="textSecondary">
          No order data available.
        </Typography>
      )}
    </Box>
  );
};

export default OrderStatusPieChart;
