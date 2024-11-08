import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../../styles/restockUpdatePage.module.css';
import DashboardLayout from '../../layouts/crm/DashboardLayout';
 
interface Product {
    productShortId: string;
    productName: string;
    brandName: string;
    category: string;
    productQuantity: number;
}
 
const RestockUpdatePage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [products, setProducts] = useState<Product[]>([]);
    const [restockQuantities, setRestockQuantities] = useState<{ [key: string]: number }>({});
 
    // Fetch products from the backend
    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:5003/api/product');
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };
 
    useEffect(() => {
        fetchProducts();
    }, []);
 
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };
 
    const handleRestockQuantityChange = (productId: string, quantity: number) => {
        if (quantity >= 0) { // Prevent negative values
            setRestockQuantities(prevQuantities => ({
                ...prevQuantities,
                [productId]: quantity,
            }));
        }
    };
 
    const handleRestock = async (product: Product) => {
        const quantityToAdd = restockQuantities[product.productShortId] || 0;
        const newQuantity = product.productQuantity + quantityToAdd;
 
        try {
            // Send update request to backend
            const response = await axios.put(
                `http://localhost:5003/api/product/shortId/${product.productShortId}`,
                { quantity: quantityToAdd }
            );
 
            if (response.status === 200) {
                // Re-fetch all products to get the latest data and update the state
                await fetchProducts();
                console.log('Product quantity updated:', response.data);
            } else {
                console.error('Failed to update product quantity');
            }
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };
 
    const filteredProducts = products.filter(
        product =>
            product.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.productShortId.toLowerCase().includes(searchTerm.toLowerCase())
    );
 
    return (
        <DashboardLayout>
            <div className={styles.container}>
                <input
                    type="text"
                    className={styles.searchBar}
                    placeholder="Search product by name or ID..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                <div className={styles.productGrid}>
                    {filteredProducts.map(product => (
                        <div key={product.productShortId} className={styles.productCard}>
                            <h3 className={styles.productName}>{product.productName}</h3>
                            <p className={styles.productShortId}>ID: {product.productShortId}</p>
                            <div className={styles.productDetails}>
                                <p>Category: {product.category}</p>
                                <p>Brand: {product.brandName}</p>
                                <p>Quantity: {product.productQuantity}</p>
                            </div>
                            <div className={styles.restockSection}>
                                <input
                                    type="number"
                                    min="0" // Prevents typing negative values
                                    placeholder="Restock quantity"
                                    className={styles.restockInput}
                                    value={restockQuantities[product.productShortId] || ''}
                                    onChange={(e) =>
                                        handleRestockQuantityChange(
                                            product.productShortId,
                                            Number(e.target.value)
                                        )
                                    }
                                />
                                <button
                                    className={styles.restockButton}
                                    onClick={() => handleRestock(product)}
                                >
                                    Restock
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </DashboardLayout>
    );
};
 
export default RestockUpdatePage;