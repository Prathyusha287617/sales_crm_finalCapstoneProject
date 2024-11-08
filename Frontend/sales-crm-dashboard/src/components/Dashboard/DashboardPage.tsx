// src/components/Dashboard/DashboardPage.tsx
import React, { useEffect, useState } from 'react';

const DashboardPage: React.FC = () => {
  // State variables to hold totals
  const [totalCustomers, setTotalCustomers] = useState<number>(0);
  const [totalProducts, setTotalProducts] = useState<number>(0);
  const [totalOrders, setTotalOrders] = useState<number>(0);

  // Loading states for each fetch call
  const [loadingCustomers, setLoadingCustomers] = useState<boolean>(true);
  const [loadingProducts, setLoadingProducts] = useState<boolean>(true);
  const [loadingOrders, setLoadingOrders] = useState<boolean>(true);

  // Error states to capture fetch issues
  const [errorCustomers, setErrorCustomers] = useState<string | null>(null);
  const [errorProducts, setErrorProducts] = useState<string | null>(null);
  const [errorOrders, setErrorOrders] = useState<string | null>(null);

  // Get role and branchShortId from sessionStorage
  const role = sessionStorage.getItem('role');
  const branchShortId = sessionStorage.getItem('branchShortId');

  // Check if the user is a business retailer
  const isBusinessRetailer = role === 'business_retailer';

  useEffect(() => {
    // Fetch customers, products, and orders data
    const fetchCustomers = async () => {
      try {
        // Determine API endpoint based on user role
        const url = isBusinessRetailer 
          ? `http://localhost:5005/api/customers/count/all` // Total customers for business retailer
          : `http://localhost:5005/api/customers/count/${branchShortId}`; // Branch-specific count

        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch total customers');
        const data = await response.json();
        setTotalCustomers(data.totalCustomers);
      } catch (error: any) {
        setErrorCustomers(error.message);
      } finally {
        setLoadingCustomers(false);
      }
    };

    const fetchProducts = async () => {
      try {
        // Determine API endpoint based on user role
        const url = isBusinessRetailer 
          ? `http://localhost:5003/api/product/count/all` // Total products for business retailer
          : `http://localhost:5003/api/product/count/${branchShortId}`; // Branch-specific count

        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch total products');
        const data = await response.json();
        setTotalProducts(data.totalProducts);
      } catch (error: any) {
        setErrorProducts(error.message);
      } finally {
        setLoadingProducts(false);
      }
    };

    const fetchOrders = async () => {
      try {
        // Determine API endpoint based on user role
        const url = isBusinessRetailer 
          ? `http://localhost:5004/api/orders/count/all` // Total orders for business retailer
          : `http://localhost:5004/api/orders/count/${branchShortId}`; // Branch-specific count

        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch total orders');
        const data = await response.json();
        setTotalOrders(data.totalOrders);
      } catch (error: any) {
        setErrorOrders(error.message);
      } finally {
        setLoadingOrders(false);
      }
    };

    // Ensure branchShortId exists for branch retailer
    if (isBusinessRetailer || branchShortId) {
      fetchCustomers();
      fetchProducts();
      fetchOrders();
    } else {
      // Set error if branchShortId is missing for branch retailers
      setErrorCustomers('Branch ID is not available for branch retailer');
      setErrorProducts('Branch ID is not available for branch retailer');
      setErrorOrders('Branch ID is not available for branch retailer');
      setLoadingCustomers(false);
      setLoadingProducts(false);
      setLoadingOrders(false);
    }
  }, [branchShortId, role]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
      {/* Total Customers */}
      <div className="rounded-lg shadow p-4 py-5" style={{background: 'linear-gradient(to right, #62ba3c, #34a853)'}}>
        <h3 className="text-xl font-bold ms-4">Total Customers</h3>
        {loadingCustomers ? (
          <p>Loading...</p>
        ) : errorCustomers ? (
          <p className="text-red-500">{errorCustomers}</p>
        ) : (
          <p className="text-3xl ms-4 mt-3">{totalCustomers}</p>
        )}
      </div>

      {/* Total Products */}
      <div className="bg-white rounded-lg shadow p-4 py-5" style={{background: 'linear-gradient(to right, #3c90f0, #1c4f91)'}}>
        <h3 className="text-xl font-bold ms-4">Total Products</h3>
        {loadingProducts ? (
          <p>Loading...</p>
        ) : errorProducts ? (
          <p className="text-red-500">{errorProducts}</p>
        ) : (
          <p className="text-3xl ms-4 mt-3">{totalProducts}</p>
        )}
      </div>

      {/* Total Orders */}
      <div className="bg-white rounded-lg shadow p-4 py-5" style={{background: 'linear-gradient(to right, #f0c03c, #f08a3c)'}}>
        <h3 className="text-xl font-bold ms-4">Total Orders</h3>
        {loadingOrders ? (
          <p>Loading...</p>
        ) : errorOrders ? (
          <p className="text-red-500">{errorOrders}</p>
        ) : (
          <p className="text-3xl ms-4 mt-3">{totalOrders}</p>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
