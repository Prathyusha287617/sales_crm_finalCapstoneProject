import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import DashboardLayout from '../../layouts/crm/DashboardLayout';

// Fetch brands by branch ID
const getBrandsByBranch = async (branchShortId: string) => {
  try {
    const response = await axios.get<string[]>(`http://localhost:5003/api/product/brands/branch/${branchShortId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching brands:', error);
    throw new Error('Could not fetch brands');
  }
};

const ProductList: React.FC = () => {
  const { branchShortId } = useParams<{ branchShortId: string }>(); // Retrieve branchShortId from the URL
  const [brands, setBrands] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (branchShortId) {
      getBrandsByBranch(branchShortId)
        .then(setBrands)
        .catch(() => setError('Failed to load brands'))
        .finally(() => setLoading(false));
    } else {
      setError('Branch ID not found in URL');
      setLoading(false);
    }
  }, [branchShortId]);

  if (loading) return <div className="text-center text-gray-600">Loading brands...</div>;
  if (error) return <div className="text-center text-red-600">{error}</div>;

  return (
    <DashboardLayout>
      <div className="bg-gray-50 min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <h2 className="text-4xl font-bold text-gray-900 sm:text-5xl mb-8 text-center">Brands for Branch {branchShortId}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {brands.map((brand) => (
              <Link
                key={brand}
                to={`/retail/brand/${brand}`} // Navigate to the brand's categories page
                className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center justify-center transform transition-all duration-500 hover:scale-105 hover:shadow-xl"
              >
                <div className="w-24 h-24 mb-6 overflow-hidden rounded-full border-4 border-blue-600">
                  <img
                    src={`https://via.placeholder.com/150?text=${brand}`}
                    alt={brand}
                    className="object-cover w-full h-full"
                    onError={(e) => {
                      e.currentTarget.src = 'https://via.placeholder.com/150?text=No+Image'; // Fallback image
                    }}
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{brand}</h3>
                <p className="text-gray-500 text-center text-base">Click to explore categories for this brand.</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ProductList;
