
import React, { useState } from 'react';
import styles from '../../styles/ProductionCreationForm.module.css';
import DashboardLayout from '../../layouts/crm/DashboardLayout';
 
const ProductCreationForm: React.FC = () => {
  // State for form inputs
  const [productName, setProductName] = useState('');
  const [brandName, setBrandName] = useState('');
  const [productQuantity, setProductQuantity] = useState<number | ''>(0);
  const [threshold, setThreshold] = useState<number | ''>(10);
  const [restockQuantity, setRestockQuantity] = useState<number | ''>(20);
  const [needsRestock, setNeedsRestock] = useState(false);
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [actualPrice, setActualPrice] = useState<number | ''>(0);
  const [sellingPrice, setSellingPrice] = useState<number | ''>(0);
  const [profit, setProfit] = useState<number | ''>(0);
  const [branchShortId, setBranchShortId] = useState<string[]>([]);
  const [productShortId, setProductShortId] = useState('');
  const [error, setError] = useState('');
 
  const calculateProfit = (actual: number | '', selling: number | '') => {
    if (typeof actual === 'number' && typeof selling === 'number') {
      return selling - actual;
    }
    return 0; // Default profit if inputs are invalid
  };
 
  const handleActualPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setActualPrice(value);
    setProfit(calculateProfit(value, sellingPrice)); // Calculate profit when actual price changes
  };
 
  const handleSellingPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setSellingPrice(value);
    setProfit(calculateProfit(actualPrice, value)); // Calculate profit when selling price changes
  };
 
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
 
    // Create the product object
    const productData = {
      productName,
      brandName,
      productQuantity,
      threshold,
      restockQuantity,
      needsRestock,
      description,
      category,
      actualPrice,
      sellingPrice,
      profit,
      branchShortId
    };
 
    // Validate required fields
    if (!productName || !brandName || !description || !category) {
      setError('Please fill in all required fields.');
      return;
    }
 
    // Additional validation for numeric fields
    const quantityIsValid = typeof productQuantity === 'number' && productQuantity >= 0;
    const thresholdIsValid = typeof threshold === 'number' && threshold >= 10;
    const restockQuantityIsValid = typeof restockQuantity === 'number' && restockQuantity >= 20;
    const actualPriceIsValid = typeof actualPrice === 'number' && actualPrice > 0;
    const sellingPriceIsValid = typeof sellingPrice === 'number' && sellingPrice > 0;
 
    if (!quantityIsValid || !thresholdIsValid || !restockQuantityIsValid || !actualPriceIsValid || !sellingPriceIsValid) {
      setError('Please ensure all numeric fields are valid.');
      return;
    }
 
    try {
      const response = await fetch('http://localhost:5003/api/product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });
 
      if (!response.ok) {
        throw new Error('Failed to create product');
      }
 
      // Reset form after successful submission
      setProductName('');
      setBrandName('');
      setProductQuantity(0);
      setThreshold(10);
      setRestockQuantity(20);
      setNeedsRestock(false);
      setDescription('');
      setCategory('');
      setActualPrice(0);
      setSellingPrice(0);
      setProfit(0);
      setBranchShortId([]);
      setProductShortId('');
      setError(''); // Clear error on success
      alert('Product created successfully!'); // Notify user
    } catch (err:any) {
      setError('Error: ' + err.message);
    }
  };
 
  return (
    <DashboardLayout>
    <div className={styles.productForm}>
      <h2>Create Product</h2>
      {error && <div className={styles.error}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Product Name</label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Brand Name</label>
          <input
            type="text"
            value={brandName}
            onChange={(e) => setBrandName(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Product Quantity</label>
          <input
            type="number"
            value={productQuantity}
            onChange={(e) => setProductQuantity(Number(e.target.value))}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Threshold</label>
          <input
            type="number"
            value={threshold}
            onChange={(e) => setThreshold(Number(e.target.value))}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Restock Quantity</label>
          <input
            type="number"
            value={restockQuantity}
            onChange={(e) => setRestockQuantity(Number(e.target.value))}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Needs Restock</label>
          <input
            type="checkbox"
            checked={needsRestock}
            onChange={() => setNeedsRestock(!needsRestock)}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Category</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Actual Price</label>
          <input
            type="number"
            value={actualPrice}
            onChange={handleActualPriceChange} // Updated handler
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Selling Price</label>
          <input
            type="number"
            value={sellingPrice}
            onChange={handleSellingPriceChange} // Updated handler
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Profit</label>
          <input
            type="number"
            value={profit}
            readOnly // Make profit read-only since it's calculated
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Branch Short ID (comma-separated)</label>
          <input
            type="text"
            value={branchShortId.join(',')}
            onChange={(e) => setBranchShortId(e.target.value.split(','))}
            required
          />
        </div>
        <button type="submit" className={styles.submitButton}>Create Product</button>
      </form>
    </div>
    </DashboardLayout>
  );
};
 
export default ProductCreationForm;