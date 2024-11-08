// TotalSalesChart.tsx
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Title } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Title);

interface Order {
  totalPrice: number;
  orderDate: string; // Format: YYYY-MM-DD
}

const TotalSalesChart: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:5004/api/orders');
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }
        const data = await response.json();
        setOrders(data);
      } catch (err) {
        setError('Failed to load data');
      }
    };

    fetchOrders();
  }, []);

  // Group orders by month for total sales
  const salesData = orders.reduce((acc, order) => {
    const month = new Date(order.orderDate).toLocaleString('default', { month: 'short', year: 'numeric' });
    acc[month] = (acc[month] || 0) + order.totalPrice;
    return acc;
  }, {} as { [key: string]: number });

  const chartData = {
    labels: Object.keys(salesData),
    datasets: [
      {
        label: 'Total Sales',
        data: Object.values(salesData),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <Bar data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
      )}
    </div>
  );
};

export default TotalSalesChart;
