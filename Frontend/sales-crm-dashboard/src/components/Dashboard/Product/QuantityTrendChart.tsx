import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface QuantityHistory {
  date: string;
  quantity: number;
}

interface Product {
  productShortId: string;
  productName: string;
}

const QuantityTrendChart: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProductShortId, setSelectedProductShortId] = useState<string | null>(null);
  const [data, setData] = useState<QuantityHistory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all productShortIds and productNames for dropdown
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5003/api/product/all-product-ids');
        if (!response.ok) throw new Error('Failed to fetch products');
        
        const productData: Product[] = await response.json();
        setProducts(productData);
      } catch (error: any) {
        setError(error.message);
      }
    };

    fetchProducts();
  }, []);

  // Fetch quantity history based on selected productShortId
  useEffect(() => {
    if (!selectedProductShortId) return;

    const fetchQuantityHistory = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:5003/api/product/quantity-history/${selectedProductShortId}`);
        if (!response.ok) throw new Error('Failed to fetch quantity history');

        const historyData = await response.json();
        const formattedData = historyData.map((item: any) => ({
          date: new Date(item.date).toLocaleDateString(),
          quantity: item.quantity,
        }));
        setData(formattedData);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuantityHistory();
  }, [selectedProductShortId]);

  const handleProductChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedProductShortId(event.target.value);
  };

  return (
    <div>
      <h2>Select Product to View Quantity Trend</h2>

      {/* Dropdown to select product */}
      <select onChange={handleProductChange} value={selectedProductShortId || ''}>
        <option value="" disabled>Select a product</option>
        {products.map(product => (
          <option key={product.productShortId} value={product.productShortId}>
            {product.productName}
          </option>
        ))}
      </select>

      {loading && <p>Loading quantity trend...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <LineChart width={600} height={300} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="quantity" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      )}
    </div>
  );
};

export default QuantityTrendChart;
