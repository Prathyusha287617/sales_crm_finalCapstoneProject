import React, { useState } from 'react';
import styles from '../../styles/customerRegistrationForm.module.css';

interface CustomerFormData {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  branchShortId: string;
}

const CustomerRegistrationForm: React.FC = () => {
  const [formData, setFormData] = useState<CustomerFormData>({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    branchShortId: '',
  });

  const [submissionStatus, setSubmissionStatus] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5005/api/customers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmissionStatus('Customer registered successfully!');
        setFormData({ customerName: '', customerEmail: '', customerPhone: '', branchShortId: '' });
      } else {
        setSubmissionStatus('Error registering customer. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setSubmissionStatus('Error registering customer. Please try again.');
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.formContainer}>
        <h2>Register Customer</h2>
        {submissionStatus && <p className={styles.statusMessage}>{submissionStatus}</p>}
        <form onSubmit={handleSubmit}>
          <label>
            Customer Name:
            <input
              type="text"
              name="customerName"
              value={formData.customerName}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Customer Email:
            <input
              type="email"
              name="customerEmail"
              value={formData.customerEmail}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Customer Phone:
            <input
              type="tel"
              name="customerPhone"
              value={formData.customerPhone}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Branch Short ID:
            <input
              type="text"
              name="branchShortId"
              value={formData.branchShortId}
              onChange={handleInputChange}
              required
            />
          </label>
          <button type="submit">Register Customer</button>
        </form>
      </div>
    </div>
  );
};

export default CustomerRegistrationForm;
