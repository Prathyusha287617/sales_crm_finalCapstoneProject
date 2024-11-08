import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from '../../styles/createOrder.module.css';
import Invoice from './Invoice';
import DashboardLayout from '../../layouts/crm/DashboardLayout';
 
interface Customer {
  customerShortId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
}
 
interface Product {
  productShortId: string;
  productName: string;
  sellingPrice: number;
  stockQuantity:number;
}
 
interface Branch {
    branchShortId: string;
    branchName: string;
  }
 
const CreateOrder: React.FC = () => {
  const [showCustomerForm, setShowCustomerForm] = useState(false);
  const [customerEmail, setCustomerEmail] = useState('');
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [productShortId, setProductShortId] = useState('');
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const navigate = useNavigate();
  const [branchShortId, setBranchShortId] = useState<string>('');
  const [transactionStatus, setTransactionStatus] = useState<string>('Pending');
  const [allBranches, setAllBranches] = useState<Branch[]>([]);
  const [orderDate, setOrderDate] = useState<string>(new Date().toISOString().split('T')[0]); // Default to today's date
  const [showInvoice, setShowInvoice] = useState(false); // New state to control invoice visibility
  const [orderData, setOrderData] = useState<any>(null); // New state to store order data
 
   // Check user role on component mount
   useEffect(() => {
    const userRole = sessionStorage.getItem('role'); // Get role from session storage
    if (userRole !== 'sales_rep') {
      // If role is not 'sales_rep', redirect to another page
      navigate('/not-authorized'); // Redirect to a "Not Authorized" page or any other page
    }
  }, [navigate]);
 
   // Fetch all branches when the component mounts
   useEffect(() => {
    const fetchAllBranches = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/branches'); // Update with the correct endpoint
        setAllBranches(response.data); // Assuming response.data is an array of branches
      } catch (error) {
        console.error('Error fetching branches:', error);
        alert('An error occurred while fetching branches.');
      }
    };
 
    fetchAllBranches();
  }, []);
 
  // Search customer by email
  const searchCustomer = async () => {
    try {
      const response = await axios.get(`http://localhost:5005/api/customers/checkCustomer?customerEmail=${customerEmail}`);
      if (response.data) {
        setCustomer(response.data);
        alert(`User is already registered with customerShortId: ${response.data.customerShortId}`);
      } else {
        alert('Customer not found');
      }
    } catch (error) {
      console.error('Error fetching customer:', error);
      alert('An error occurred while fetching the customer.');
    }
  };
  const handleRegisterCustomerClick = () => {
    navigate('/retail/customerForm');
  };
 
  // Search product by short ID
  const searchProduct = async () => {
    try {
      const response = await axios.get(`http://localhost:5003/api/product/id?productShortId=${productShortId}`);
      if (response.data) {
        setProduct(response.data);
        setTotalPrice(response.data.sellingPrice * quantity);
      } else {
        alert('Product not found');
      }
    } catch (error) {
      console.error('Error fetching product:', error);
      alert('An error occurred while fetching the product.');
    }
  };
 
  // Handle order submission
  const handleSubmitOrder = async () => {
    if (!customer || !product || !branchShortId) {
      alert('Please ensure customer, product, and branch details are filled.');
      return;
    }
    const orderData = {
      customerShortId: customer.customerShortId,
      branchShortId,
      productShortId: product.productShortId,
      quantity,
      totalPrice,
      transactionStatus,
      orderDate: new Date().toISOString(),
    };
 
    try {
        // First, create the order
        const response = await axios.post('http://localhost:5004/api/orders', orderData); // Update with your orders endpoint
        alert('Order created successfully');
     
        // Call Product Service to update the stock level
        await axios.put(`http://localhost:5003/api/product/${product.productShortId}`, {
          quantity, // Send the quantity to reduce
        });
     
        alert('Product quantity updated successfully');
       
        // Navigate to Invoice page with order data
        navigate('/invoice', { state: { orderData: {
          customer,
          product,
          quantity,
          totalPrice,
          transactionStatus,
          orderDate: orderData.orderDate
        }}}); // Pass necessary data
      } catch (error) {
        console.error('Error creating order:', error);
        alert('An error occurred while creating the order.');
      }
    };
 
  return (
    <DashboardLayout>
    <div className={styles.container}>
      <h1>Create New Order</h1>
 
      {/* Customer Search Section */}
      <div className={styles.customerSearch}>
        <input
          type="text"
          placeholder="Enter customer email"
          value={customerEmail}
          onChange={(e) => setCustomerEmail(e.target.value)}
          className={styles.inputField}
        />
        <button onClick={searchCustomer} className={styles.searchButton}>Search Customer</button>
       
        <button onClick={handleRegisterCustomerClick} className={styles.registerButton}>
        Register Customer
      </button>
      </div>
      {/* Customer Info Autofill
      {customer && (
        <div className={styles.customerInfo}>
          <h2>Customer Details</h2>
          <p><strong>Customer Short ID:</strong> {customer.customerShortId}</p>
          <p><strong>Name:</strong> {customer.customerName}</p>
          <p><strong>Email:</strong> {customer.customerEmail}</p>
          <p><strong>Phone:</strong> {customer.customerPhone}</p>
        </div>
      )}*/}
 
     
 
      {/* Order Form */}
      <h2>Create Order</h2>
      <div className={styles.orderForm}>
        {/* Autofill customer fields */}
        <label>
          Customer Short ID:
          <input
            type="text"
            value={customer?.customerShortId || ''}
            readOnly
            className={styles.inputField}
          />
        </label>
        <label>
          Customer Name:
          <input
            type="text"
            value={customer?.customerName || ''}
            readOnly
            className={styles.inputField}
          />
        </label>
        <label>
          Customer Email:
          <input
            type="email"
            value={customer?.customerEmail || ''}
            readOnly
            className={styles.inputField}
          />
        </label>
        <label>
          Customer Phone:
          <input
            type="text"
            value={customer?.customerPhone || ''}
            readOnly
            className={styles.inputField}
          />
        </label>
       
   
 
        {/* Order Date Selection */}
        <label>
          Order Date:
          <input
            type="date"
            value={orderDate}
            onChange={(e) => setOrderDate(e.target.value)}
            className={styles.inputField}
          />
        </label>
 
         {/* Branch Selection */}
      <div className={styles.branchSelection}>
        <h2>Select Branch</h2>
        <select
          value={branchShortId}
          onChange={(e) => setBranchShortId(e.target.value)} // Update branchShortId on change
          className={styles.selectField}
        >
          <option value="">Select a branch</option>
          {allBranches.map((branch) => (
            <option key={branch.branchShortId} value={branch.branchShortId}>
              {branch.branchName} (ID: {branch.branchShortId})
            </option>
          ))}
        </select>
      </div>
      {/* Product Search Section */}
      <div className={styles.productSearch}>
          <input
            type="text"
            placeholder="Enter product Short ID"
            value={productShortId}
            onChange={(e) => setProductShortId(e.target.value)}
            className={styles.inputField}
          />
          <button onClick={searchProduct} className={styles.searchButton}>Search Product</button>
        </div>
 
        {/* Product Info Autofill */}
        {product && (
          <div className={styles.productInfo}>
            <h2>Product Details</h2>
            <label>
              Product Short ID:
              <input
                type="text"
                value={product.productShortId}
                readOnly
                className={styles.inputField}
              />
            </label>
            <label>
              Product Name:
              <input
                type="text"
                value={product.productName}
                readOnly
                className={styles.inputField}
              />
            </label>
            <label>
              Selling Price:
              <input
                type="number"
                value={product.sellingPrice}
                readOnly
                className={styles.inputField}
              />
            </label>
            <label>
              Quantity:
              <input
                type="number"
                value={quantity}
                onChange={(e) => {
                  const qty = Math.max(1, parseInt(e.target.value, 10)); // Ensure quantity is at least 1
                  setQuantity(qty);
                  setTotalPrice(qty * product.sellingPrice);
                }}
                className={styles.quantityInput}
              />
            </label>
            <p>Total Price: {totalPrice}</p>
          </div>
        )}
 
        {/* Transaction Status Dropdown */}
      <div className={styles.transactionStatus}>
        <h2>Transaction Status</h2>
        <select
          value={transactionStatus}
          onChange={(e) => setTransactionStatus(e.target.value)} // Update transaction status on change
          className={styles.selectField}
        >
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
 
        {/* Submit Order */}
        <button onClick={handleSubmitOrder} className={styles.submitButton}>Submit Order</button>
 
       
      </div>
    </div>
    </DashboardLayout>
  );
};
 
export default CreateOrder;