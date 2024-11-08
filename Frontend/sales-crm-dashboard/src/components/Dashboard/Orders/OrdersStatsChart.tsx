import React, { useEffect, useState } from 'react';
import { ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface OrderStats {
  branchShortId: string;
  totalOrders: number;
  totalRevenue: number;
}

const OrderStatsChart: React.FC = () => {
  const [orderStats, setOrderStats] = useState<OrderStats[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Get role and branchShortId from sessionStorage
  const role = sessionStorage.getItem('role');
  const branchShortId = sessionStorage.getItem('branchShortId');

  useEffect(() => {
    const fetchOrderStats = async () => {
      try {
        // Determine endpoint based on user role
        const endpoint =
          role === 'business_retailer'
            ? 'http://localhost:5004/api/orders/order-stats' // Fetch all order stats for business retailer
            : `http://localhost:5004/api/orders/order-stats/${branchShortId}`; // Fetch branch-specific stats for branch retailer

        const response = await fetch(endpoint);
        
        if (!response.ok) {
          throw new Error('Failed to fetch order stats');
        }

        const data = await response.json();
        setOrderStats(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderStats();
  }, [role, branchShortId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>
        {role === 'business_retailer'
          ? 'Order Statistics for All Branches'
          : `Order Statistics for Branch: ${branchShortId}`}
      </h2>
      <ResponsiveContainer width="100%" height={400}>
        <ComposedChart data={orderStats}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="branchShortId" /> {/* This should be something like "date" if showing trends */}
          <YAxis yAxisId="left" />
          <YAxis yAxisId="right" orientation="right" />
          <Tooltip />
          <Legend />
          <Bar yAxisId="left" dataKey="totalOrders" barSize={20} fill="#8884d8" />
          <Line yAxisId="right" type="monotone" dataKey="totalRevenue" stroke="#82ca9d" />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default OrderStatsChart;
