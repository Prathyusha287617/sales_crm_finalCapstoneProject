import React from 'react';

// Define the IBranch interface to represent branch data
interface IBranch {
  branchLocation: string;
  branchRegion: string;
  branchMobileNumber: number;
  branchEmail: string;
  shortId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Sample data for the component
const branches: IBranch[] = [
  {
    branchLocation: 'New York City',
    branchRegion: 'North East',
    branchMobileNumber: 1234567890,
    branchEmail: 'nycbranch@example.com',
    shortId: 'NYC123',
    createdAt: new Date(),
  },
  {
    branchLocation: 'Los Angeles',
    branchRegion: 'West Coast',
    branchMobileNumber: 9876543210,
    branchEmail: 'labranch@example.com',
    shortId: 'LA456',
    createdAt: new Date(),
  },
  {
    branchLocation: 'Chicago',
    branchRegion: 'Mid West',
    branchMobileNumber: 2345678901,
    branchEmail: 'chibranch@example.com',
    shortId: 'CHI789',
    createdAt: new Date(),
  },
  {
    branchLocation: 'Houston',
    branchRegion: 'South',
    branchMobileNumber: 3456789012,
    branchEmail: 'houstonbranch@example.com',
    shortId: 'HOU101',
    createdAt: new Date(),
  },
  {
    branchLocation: 'Phoenix',
    branchRegion: 'South West',
    branchMobileNumber: 4567890123,
    branchEmail: 'phxbranch@example.com',
    shortId: 'PHX202',
    createdAt: new Date(),
  },
  {
    branchLocation: 'Philadelphia',
    branchRegion: 'North East',
    branchMobileNumber: 5678901234,
    branchEmail: 'phillybranch@example.com',
    shortId: 'PHI303',
    createdAt: new Date(),
  },
];

const RetailBranch: React.FC = () => {
  return (
    <div className="bg-gray-100 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">Branch Details</h2>
          <p className="mt-2 text-lg text-gray-600">Explore the locations .</p>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3 border-t border-gray-200 pt-10">
          {branches.map((branch) => (
            <article key={branch.shortId} className="flex flex-col items-start justify-between bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-blue-50 p-4 rounded-md border border-blue-200 w-full mb-4">
                <h3 className="text-lg font-semibold text-gray-900">{branch.branchLocation}</h3>
                <p className="mt-1 text-sm text-gray-500">Region: {branch.branchRegion}</p>
                <p className="text-sm text-gray-500">Short ID: {branch.shortId}</p>
              </div>
              <div className="flex flex-col">
                <p className="text-sm text-gray-500">Mobile: {branch.branchMobileNumber}</p>
                <p className="text-sm text-gray-500">Email: {branch.branchEmail}</p>
                <p className="text-xs text-gray-400 mt-2">
                  Created At: {branch.createdAt ? branch.createdAt.toLocaleDateString() : 'N/A'}
                </p>
                {branch.updatedAt && (
                  <p className="text-xs text-gray-400">Updated At: {branch.updatedAt.toLocaleDateString()}</p>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RetailBranch;
