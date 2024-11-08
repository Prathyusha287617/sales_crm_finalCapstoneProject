// src/components/CustomerPage.tsx
import React from 'react';

interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  totalOrders: number;
}

const dummyCustomers: Customer[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', phone: '123-456-7890', totalOrders: 5 },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '098-765-4321', totalOrders: 3 },
  { id: 3, name: 'Alice Johnson', email: 'alice@example.com', phone: '555-123-4567', totalOrders: 10 },
];

const CustomerPage: React.FC = () => {
  return (
    <div className="bg-gray-100 py-24 sm:py-32 min-h-screen">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">Customers</h2>
        <p className="mt-2 text-lg text-gray-600">Manage your customer database.</p>
        
        <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {dummyCustomers.map((customer) => (
            <div key={customer.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-semibold text-gray-900">{customer.name}</h3>
              <p className="text-gray-600">Email: {customer.email}</p>
              <p className="text-gray-600">Phone: {customer.phone}</p>
              <p className="text-gray-800 font-semibold">Total Orders: {customer.totalOrders}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomerPage;
