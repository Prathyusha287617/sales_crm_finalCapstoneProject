import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import DashboardLayout from '../../layouts/crm/DashboardLayout';

const getCategoriesByBranchAndBrand = async (branchShortId: string, brandName: string) => {
  try {
    const response = await axios.get<string[]>(`http://localhost:5003/api/product/categories/branch/${branchShortId}/brand/${brandName}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw new Error('Could not fetch categories');
  }
};

const BrandCategories: React.FC = () => {
  const { brandName } = useParams<{ brandName: string }>();
  const [categories, setCategories] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const branchShortId = sessionStorage.getItem('branchShortId');
    if (branchShortId && brandName) {
      getCategoriesByBranchAndBrand(branchShortId, brandName)
        .then(setCategories)
        .catch(() => setError('Failed to load categories'));
    }
  }, [brandName]);

  if (error) return <div>{error}</div>;

  return (
    <DashboardLayout>
      <div className="bg-gradient-to-r from-gray-50 via-gray-100 to-gray-200 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl mb-6">
            Categories for {brandName}
          </h2>
          <p className="text-lg text-gray-600 mb-12">Explore all categories under this brand.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {categories.length > 0 ? (
              categories.map((category) => (
                <div key={category} className="bg-white p-6 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:border-blue-500 hover:border-4 hover:bg-blue-50 hover:text-blue-700">
                  <h4 className="text-lg font-semibold text-gray-800">{category}</h4>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No categories found for this brand.</p>
            )}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/products/:branchShortId"
              className="inline-block text-indigo-600 hover:underline text-xl font-medium"
            >
              Back to Brands
            </Link>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default BrandCategories;
