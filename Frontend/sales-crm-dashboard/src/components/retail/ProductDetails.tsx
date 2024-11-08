import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from '../../styles/Retail/productDetails.module.css'; // Import your CSS module
import DashboardLayout from '../../layouts/crm/DashboardLayout';

interface Product {
    productShortId: string;
    productName: string;
    brandName: string;
    productQuantity: number;
    threshold: number;
    restockQuantity: number;
    needsRestock: boolean;
    description: string;
    category: string;
    actualPrice: number;
    sellingPrice: number;
    profit: number;
    branchShortId: string[];
}

const ProductDetails: React.FC = () => {
    const { productShortId } = useParams<{ productShortId: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await fetch(`http://localhost:5003/api/product/shortId/${productShortId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch product details');
                }
                const data: Product = await response.json();
                setProduct(data);
            } catch (error: any) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProductDetails();
    }, [productShortId]);

    if (loading) {
        return <p>Loading product details...</p>;
    }

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    if (!product) {
        return <p>Product not found.</p>;
    }

    return (
        <DashboardLayout>
        <div className={styles.container}>
            <button onClick={() => navigate(-1)} className={styles.backButton}>
                Back to Product List
            </button>
            <div className={styles.detailsCard}>
                <h2 className={styles.title}>Product Details</h2>
                <div className={styles.detailsGrid}>
                    <div className={styles.detailItem}><strong>Product Short ID:</strong> {product.productShortId}</div>
                    <div className={styles.detailItem}><strong>Product Name:</strong> {product.productName}</div>
                    <div className={styles.detailItem}><strong>Brand Name:</strong> {product.brandName}</div>
                    <div className={styles.detailItem}><strong>Quantity:</strong> {product.productQuantity}</div>
                    <div className={styles.detailItem}><strong>Threshold:</strong> {product.threshold}</div>
                    <div className={styles.detailItem}><strong>Restock Quantity:</strong> {product.restockQuantity}</div>
                    <div className={styles.detailItem}><strong>Needs Restock:</strong> {product.needsRestock ? 'Yes' : 'No'}</div>
                    <div className={styles.detailItem}><strong>Description:</strong> {product.description}</div>
                    <div className={styles.detailItem}><strong>Category:</strong> {product.category}</div>
                    <div className={styles.detailItem}><strong>Actual Price:</strong> ${product.actualPrice.toFixed(2)}</div>
                    <div className={styles.detailItem}><strong>Selling Price:</strong> ${product.sellingPrice.toFixed(2)}</div>
                    <div className={styles.detailItem}><strong>Profit:</strong> ${product.profit.toFixed(2)}</div>
                    <div className={styles.detailItem}><strong>Branch IDs:</strong> {product.branchShortId.join(', ')}</div>
                </div>
            </div>
        </div>
        </DashboardLayout>
    );
};

export default ProductDetails;
