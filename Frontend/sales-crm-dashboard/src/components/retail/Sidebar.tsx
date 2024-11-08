import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../../styles/crm/sidebar.module.css';

const Sidebar: React.FC = () => {
  const role = sessionStorage.getItem('role'); // Assuming you stored the role as 'userRole'

  return (
    <div className={styles.sidebar}>
      <nav>
        <ul>
          <li>
            <Link to="/retail/main">Home</Link>
          </li>
          <li>
            <Link to="/retail/branches">Branches</Link>
          </li>
          <li>
            <Link to="/retail/product">Product</Link>
          </li>
          {role === 'business_retailer'  && ( // Check if the role is branchRetailer
            <>
              <li>
                <Link to="/retail/branchForm">Add Branch</Link>
              </li>
              
            <li>
              <Link to="/retail/register">Regsiter User</Link>
            </li>
            
          </>
          )}
          {role === 'branch_retailer'  && ( // Check if the role is branchRetailer
            <>
              <li>
                <Link to="/retail/restock">Restock</Link>
              </li>
              
            </>
          )}
          {role === 'sales_rep' && ( // Check if the role is branchRetailer
            <>
              
              <li>
                <Link to="/retail/createOrder">Order</Link>
              </li>
            </>
          )}
          <li>
            <Link to="/retail/order">OrderTable</Link>
          </li>
          {/* <li>
            <Link to="/crm/projects">Projects</Link>
          </li> */}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;