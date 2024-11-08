// src/components/Dashboard/Product/BrandCountChart.tsx
import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface BrandData {
  brandName: string;
  productCount: number;
}

interface BrandCountChartProps {
  branchShortId: string;
}

const BrandCountChart: React.FC<BrandCountChartProps> = ({ branchShortId }) => {
  const [brandData, setBrandData] = useState<BrandData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBrandData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:5003/api/product/brands/branch/${branchShortId}`);
      if (!response.ok) throw new Error('Failed to fetch brand data');

      const brands = await response.json();

      // Fetch the count of products for each brand in the specified branch
      const brandCounts: BrandData[] = await Promise.all(
        brands.map(async (brandName: string) => {
          const countResponse = await fetch(`http://localhost:5003/api/product/count/${branchShortId}/${brandName}`);
          const count = await countResponse.json();
          return { brandName, productCount: count };
        })
      );

      setBrandData(brandCounts);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (branchShortId) {
      fetchBrandData();
    }
  }, [branchShortId]);

  if (loading) return <p>Loading brand data...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      
      <BarChart width={400} height={300} data={brandData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="brandName" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="productCount" fill="#82ca9d" />
      </BarChart>
    </div>
  );
};

export default BrandCountChart;
