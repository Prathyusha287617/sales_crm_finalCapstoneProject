// dashboard.tsx
import React, { useEffect, useState } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from 'recharts';

interface Product {
  productShortId: string;
  productName: string;
  profit: number; // Ensure profit is included in your Product interface
  branchShortId: string; // Include branchShortId for filtering
}

const ProductDashboard: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // Retrieve user role from sessionStorage
  const userRole = sessionStorage.getItem('role'); // Assumes role is stored under 'userRole'
  const branchShortId = sessionStorage.getItem('branchShortId') || ''; // Get branchShortId if applicable

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let url = 'http://localhost:5003/api/product/all'; // Base endpoint

        // Adjust the fetch URL based on user role
        if (userRole === 'branch_retailer' && branchShortId) {
          url = `http://localhost:5003/api/product/branch/${branchShortId}`; // Assuming an endpoint for branch-specific products
        }

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: Product[] = await response.json();
        setProducts(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [userRole, branchShortId]);

  if (loading) {
    return <p className="text-center">Loading products...</p>;
  }

  if (error) {
    return <p className="text-red-500 text-center">Error fetching products: {error}</p>;
  }

  // Prepare data for the Pie Chart
  const data = products.map(product => ({
    name: product.productName,
    value: product.profit,
  }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF6384', '#36A2EB', '#FFCE56', '#FF9F40'];

  return (
    <div className="dashboard-container p-4">
      
      <PieChart width={250} height={300}> {/* Reduced width and height */}
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={120} // Adjusted outer radius
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </div>
  );
};

export default ProductDashboard;
