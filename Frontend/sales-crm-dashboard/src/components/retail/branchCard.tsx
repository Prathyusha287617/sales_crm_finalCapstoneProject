import React, { useEffect, useState } from 'react';
import Styles from './branchCard.module.css'; // Import the CSS file for styling
import DashboardLayout from '../../layouts/crm/DashboardLayout';
import { Link } from 'react-router-dom'; // Import Link for navigation

// Interface for the branch object
interface Branch {
  branchShortId: string;
  branchLocation: string;
  branchRegion: string;
  branchMobileNumber: number;
  branchEmail: string;
}

const BranchCards: React.FC = () => {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [filteredBranches, setFilteredBranches] = useState<Branch[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Function to get a simple image for each branch
  const getBranchImage = (): string => {
    return '/img5.jpg'; // Use the image from the public folder
  };

  // Fetch branches from the API
  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/branches');
        if (!response.ok) {
          throw new Error('Failed to fetch branches');
        }
        const data = await response.json();
        setBranches(data);
        setFilteredBranches(data); // Initially show all branches
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBranches();
  }, []);

  // Handle search input change
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchQuery = event.target.value.toLowerCase();
    setSearchTerm(searchQuery);

    // Filter branches based on search term
    const filtered = branches.filter(
      (branch) =>
        branch.branchLocation.toLowerCase().includes(searchQuery) ||
        branch.branchShortId.toLowerCase().includes(searchQuery) // Include other fields if necessary
    );
    setFilteredBranches(filtered);
  };

  if (loading) return <p>Loading branches...</p>;
  if (error) return <p className={Styles.error}>{error}</p>;

  return (
    <DashboardLayout>
      <h1 style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '2rem', marginBottom: '20px' }}>
        Branches of Pai International
      </h1>

      {/* Search input */}
      <div className={Styles.searchContainer}>
        <input
          type="text"
          placeholder="Search branches by location or ID..."
          value={searchTerm}
          onChange={handleSearchChange}
          className={Styles.searchInput}
        />
      </div>

      <div className={Styles.branchCardsContainer}>
        {/* If no branches found, show a message */}
        {filteredBranches.length === 0 ? (
          <p>No branches found</p>
        ) : (
          // Render each branch's card
          filteredBranches.map((branch) => (
            <Link
              key={branch.branchShortId}
              to={`/products/${branch.branchShortId}`} // Pass branchShortId as a part of the URL
              className={Styles.branchCard}
            >
              <h3 className={Styles.branchId}>Branch ID: {branch.branchShortId}</h3>
              <div className={Styles.iconContainer}>
                {/* Use the same image for all branches */}
                <img
                  src={getBranchImage()}
                  alt={`Building Icon for ${branch.branchShortId}`}
                  className={Styles.branchImage}
                />
              </div>
              <p><strong>Location:</strong> {branch.branchLocation}</p>
              <p><strong>Region:</strong> {branch.branchRegion}</p>
              <p><strong>Mobile Number:</strong> {branch.branchMobileNumber}</p>
              <p><strong>Email:</strong> {branch.branchEmail}</p>
            </Link>
          ))
        )}
      </div>
    </DashboardLayout>
  );
};

export default BranchCards;
