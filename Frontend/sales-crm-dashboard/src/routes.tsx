import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/retail/Dashboard';
import RetailSignin from './pages/retail/retailSignIn';
import RetailBranch from './pages/retail/branch/retailBranch';
import BrandCategories from './components/retail/brandCategories';
import CustomerPage from './components/retail/CustomerPage';
import OrderPage from './components/retail/OrderPage'; 
import ProductPage from './pages/ProductPage';
import Registration from './pages/forms/RegistrationPage';
import ProductDetails from './components/retail/ProductDetails';
import CreateOrder from './components/retail/createOrder';
import RestockUpdatePage from './pages/retail/restockUpdatePage';
import Invoice from './components/retail/Invoice';
import ProductCreationForm from './pages/forms/ProductionCreationForm';
import DashboardLayout from './layouts/crm/DashboardLayout';
import CustomerRegistrationForm from './pages/forms/CustomerRegistrationForm';
import BranchForm from './components/retail/branchForm';
import BranchCards from './components/retail/branchCard';
import ProductList from './components/retail/productList';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/retail/signin" element={<RetailSignin />} />
      <Route path="/retail/branch" element={<RetailBranch/> } />
      <Route path="/retail/main" element={< Dashboard/>} />
      <Route path="/products/:branchShortId" element={<ProductList />} />
      <Route path="/retail/brand/:brandName" element={<BrandCategories />} />
      <Route path="/retail/product" element={<DashboardLayout><ProductPage /></DashboardLayout>} />
      <Route path="/retail/customer" element={<DashboardLayout><CustomerPage /></DashboardLayout>} /> {/* New Customer Page route */}
      <Route path="/retail/order" element={<DashboardLayout><OrderPage /></DashboardLayout>} /> {/* New Order Page route */}
      <Route path="/retail/register" element={<Registration />} />
      <Route path="/products/pro/:productShortId" element={<ProductDetails />} />
      <Route path="/retail/createOrder" element={<CreateOrder />} />
      <Route path="/retail/restock" element={<RestockUpdatePage />} />
      <Route path="/invoice" element={<Invoice />} />
      <Route path="/retail/productForm" element={<ProductCreationForm/>} />
      <Route path="/retail/customerForm" element={<CustomerRegistrationForm />}/>
      <Route path="/retail/branches" element={<BranchCards />}/>
      <Route path="/retail/branchForm" element={<BranchForm />}/>
      
   
      <Route path="/crm/dashboard" element={<Dashboard />} />
      

    </Routes>
  );
};

export default AppRoutes;