// ProductHeatmap.tsx
import React, { useEffect, useState } from 'react';
import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, ZAxis, Tooltip, Cell } from 'recharts';

interface ProductCount {
    branchShortId: string;
    totalProducts: number;
}

const ProductHeatmap: React.FC = () => {
    const [productCounts, setProductCounts] = useState<ProductCount[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProductCounts = async () => {
            try {
                const response = await fetch('http://localhost:5003/api/product/counts-by-branch');
                if (!response.ok) throw new Error('Failed to fetch product counts');
                
                const data: ProductCount[] = await response.json();
                setProductCounts(data);
            } catch (error: any) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProductCounts();
    }, []);

    if (loading) return <p>Loading heatmap...</p>;
    if (error) return <p className="text-red-500">Error: {error}</p>;

    // Prepare color scale function based on the max value of totalProducts
    const maxCount = Math.max(...productCounts.map(item => item.totalProducts));
    const getColor = (value: number) => {
        const intensity = value / maxCount;
        return `rgba(0, 128, 0, ${intensity})`; // Shades of green
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold text-center mb-4">Product Count Heatmap by Branch</h2>
            <ResponsiveContainer width="100%" height={400}>
                <ScatterChart
                    margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                >
                    <XAxis type="category" dataKey="branchShortId" name="Branch ID" />
                    <YAxis type="number" dataKey="totalProducts" name="Product Count" />
                    <ZAxis range={[50]} />
                    <Tooltip cursor={{ strokeDasharray: '3 3' }} />

                    <Scatter data={productCounts} fill="#8884d8">
                        {productCounts.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={getColor(entry.totalProducts)} />
                        ))}
                    </Scatter>
                </ScatterChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ProductHeatmap;
