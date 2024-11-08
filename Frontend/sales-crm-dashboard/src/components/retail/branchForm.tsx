import React, { useState } from 'react';
import DashboardLayout from '../../layouts/crm/DashboardLayout';

const BranchForm: React.FC = () => {
  const [formData, setFormData] = useState({
    branchLocation: '',
    branchRegion: '',
    branchMobileNumber: '',
    branchEmail: '',
  });

  const [message, setMessage] = useState<string>('');  // New state for the message

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');  // Reset message on form submission

    try {
      const response = await fetch('http://localhost:5001/api/branches', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage('Branch created successfully');  // Success message
        setFormData({ branchLocation: '', branchRegion: '', branchMobileNumber: '', branchEmail: '' });
      } else {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.message}`);  // Error message
      }
    } catch (error) {
      console.error('Error creating branch:', error);
      setMessage('An unexpected error occurred. Please try again later.');
    }
  };

  return (
    <DashboardLayout>
      <div className="w-full max-w-5xl mx-auto bg-white p-6 shadow-lg rounded-lg">
        <form onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Create New Branch</h2>

          {message && (
            <div className="mb-4 p-4 text-center text-sm font-semibold rounded-md">
              {/* Show success or error message */}
              <p className={`text-white ${message.startsWith('Error') ? 'bg-red-500' : 'bg-green-500'}`}>
                {message}
              </p>
            </div>
          )}

          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700">Branch Location:</label>
            <input
              type="text"
              name="branchLocation"
              value={formData.branchLocation}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700">Branch Region:</label>
            <input
              type="text"
              name="branchRegion"
              value={formData.branchRegion}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700">Branch Mobile Number:</label>
            <input
              type="tel"
              name="branchMobileNumber"
              value={formData.branchMobileNumber}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700">Branch Email:</label>
            <input
              type="email"
              name="branchEmail"
              value={formData.branchEmail}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-md font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Create Branch
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default BranchForm;
