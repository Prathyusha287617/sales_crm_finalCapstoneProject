// CustomerChart.tsx
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Dummy data for customers per branch
const data = [
  { branchShortId: 'PAI001', customerCount: 2 },
  { branchShortId: 'PAI002', customerCount: 2 },
  { branchShortId: 'PAI008', customerCount: 3 },
  { branchShortId: 'PAI004', customerCount: 1 },
  { branchShortId: 'PAI005', customerCount: 2 },
];

const CustomerChart: React.FC = () => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="branchShortId" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="customerCount" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default CustomerChart;
