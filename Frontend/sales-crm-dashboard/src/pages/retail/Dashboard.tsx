import React, { useEffect, useState } from 'react';
import { Grid, Box, Typography } from '@mui/material';
import DashboardLayout from '../../layouts/crm/DashboardLayout';
import ProductDashboard from '../../components/Dashboard/Product/ProductDashboard';
import BrandCountChart from '../../components/Dashboard/Product/BrandCountChart';
import DashboardPage from '../../components/Dashboard/DashboardPage';
import OrderStatsChart from '../../components/Dashboard/Orders/OrdersStatsChart';
import OrderStatusPieChart from '../../components/Dashboard/Orders/OrderStatusPieChart';
import ProductHeatmap from '../../components/Dashboard/Product/ProductHeatmap';
import CustomerChart from '../../components/Dashboard/Customer/CustomerChart'; // Import the CustomerChart component
import TotalSalesChart from '../../components/Dashboard/Orders/TotalSalesChart';

const Dashboard: React.FC = () => {
  const [role, setRole] = useState<string | null>(null);
  const [branchShortId, setBranchShortId] = useState<string | null>(null);

  useEffect(() => {
    // Retrieve role and branchShortId from sessionStorage
    const storedRole = sessionStorage.getItem('role');
    const storedBranchShortId = sessionStorage.getItem('branchShortId');
    setRole(storedRole);
    setBranchShortId(storedBranchShortId);
  }, []);

  return (
    <DashboardLayout>
      <DashboardPage />
      <Grid container spacing={4} sx={{ padding: 2, marginTop: 1 }}>
        {/* Row 1 */}
        <Grid container item xs={12} spacing={4}>
    {/* Product Heatmap for both branch and business retailers */}
    <Grid item xs={12} sm={6} md={6}>
      <Box
        sx={{
          p: 3,
          border: '1px solid #ccc',
          borderRadius: '8px',
          backgroundColor: '#fff',
          boxShadow: 2,
          width: '100%',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '100%', // Ensure full height usage
        }}
      >
        <Typography variant="h6" component="h2" gutterBottom>
          Product Heatmap
        </Typography>
        <Box sx={{ flexGrow: 1 }}>
          <ProductHeatmap />
        </Box>
      </Box>
    </Grid>

    {/* Customer Count Chart */}
    <Grid item xs={12} sm={6} md={6}>
      <Box
        sx={{
          p: 3,
          border: '1px solid #ccc',
          borderRadius: '8px',
          backgroundColor: '#fff',
          boxShadow: 2,
          width: '100%',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '100%', // Ensure full height usage
        }}
      >
        <Typography variant="h6" component="h2" gutterBottom>
          Customers per Branch
        </Typography>
        <Box sx={{ flexGrow: 1 }}>
          <CustomerChart />
        </Box>
      </Box>
    </Grid>
  </Grid>


        {/* Only show these to branch retailers */}
        {role === 'branch_retailer' && (
          <>
            {/* Profit Distribution Card */}
            <Grid item xs={12} sm={6} md={6}>
              <Box
                sx={{
                  p: 3,
                  border: '1px solid #ccc',
                  borderRadius: '8px',
                  backgroundColor: '#fff',
                  boxShadow: 2,
                  width: '100%',
                  margin: '0 auto',
                  
                }}
              >
                <Typography variant="h6" component="h2" gutterBottom>
                  Profit Distribution
                </Typography>
                <ProductDashboard />
              </Box>
            </Grid>

            {/* Product Count by Brand Card */}
            <Grid item xs={12} sm={6} md={6}>
              <Box
                sx={{
                  p: 3,
                  border: '1px solid #ccc',
                  borderRadius: '8px',
                  backgroundColor: '#fff',
                  boxShadow: 2,
                  width: '100%',
                  margin: '0 auto',
                }}
              >
                <Typography variant="h6" component="h2" gutterBottom>
                  Product Count by Brand
                </Typography>
                {branchShortId ? <BrandCountChart branchShortId={branchShortId} /> : null}
              </Box>
            </Grid>
          </>
        )}

        {/* Order Statistics and Status Charts */}
        <Grid item xs={12} sm={6} md={6}>
          <Box
            sx={{
              p: 3,
              border: '1px solid #ccc',
              borderRadius: '8px',
              backgroundColor: '#fff',
              boxShadow: 2,
              width: '100%',
              margin: '0 auto',
            }}
          >
            <Typography variant="h6" component="h2" gutterBottom>
              Order Statistics
            </Typography>
            <OrderStatsChart />
          </Box>
        </Grid>

        <Grid item xs={12} sm={12} md={12}>
            <Box
              sx={{
                p: 3,
                border: '1px solid #ccc',
                borderRadius: '8px',
                backgroundColor: '#fff',
                boxShadow: 2,
                width: '100%',
                margin: '0 auto',
              }}
            >
              <Typography variant="h6" component="h2" gutterBottom>
                Total Sales Overview
              </Typography>
              <TotalSalesChart />
            </Box>
          </Grid>
      </Grid>
    </DashboardLayout>
  );
};

export default Dashboard;
