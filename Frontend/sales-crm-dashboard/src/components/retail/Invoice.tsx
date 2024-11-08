import React from 'react';
import { useLocation } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
 
const Invoice: React.FC = () => {
  const location = useLocation();
  const orderData = location.state?.orderData;
 
  const downloadInvoice = () => {
    const doc = new jsPDF();
 
    // Set up page dimensions and alignment
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    const centerX = pageWidth / 2;
 
    // Define colors
    const primaryColor = [63, 81, 181]; // Dark blue for header sections
    const secondaryColor = [240, 240, 240]; // Light gray for table headers
 
    // Company Name - Centered, in Primary Color
    doc.setFontSize(22);
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.setFont('helvetica', 'bold');
    doc.text('PAI Internationals', centerX, margin + 10, { align: 'center' });
 
    // Title - Centered
    doc.setFontSize(26);
    doc.setTextColor(0, 0, 0); // Black color for the title
    doc.text('INVOICE', centerX, margin + 30, { align: 'center' });
 
    // Invoice Date - Centered
    doc.setFontSize(12);
    doc.setFont('helvetica', 'italic');
    doc.text(`Invoice Date: ${new Date().toLocaleDateString()}`, centerX, margin + 50, { align: 'center' });
 
    // Bill To Section with Background Box
    doc.setTextColor(0, 0, 0);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('BILL TO:', margin + 5, margin + 75);
 
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text(`Customer Name: ${orderData.customer.customerName}`, margin + 5, margin + 85);
  doc.text(`Email: ${orderData.customer.customerEmail}`, margin + 5, margin + 95);
  doc.text(`Phone: ${orderData.customer.customerPhone}`, margin + 5, margin + 105);
 
    // Order Details Title - Centered
    const tableStartY = margin + 130;
    doc.setFontSize(16);
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text('ORDER DETAILS', centerX, tableStartY - 10, { align: 'center' });
 
    // Define table headers and data rows
    const headers = [['Product Description', 'Quantity', 'Total']];
    const data = [
      [orderData.product.productName, orderData.quantity.toString(), `${orderData.totalPrice.toFixed(2)}`]
    ];
 
    // Draw Table with autoTable, styling header and cell alignment
    doc.autoTable({
      head: headers,
      body: data,
      startY: tableStartY,
      margin: { left: margin, right: margin },
      headStyles: {
        fillColor: primaryColor,
        textColor: 255, // White text color
        fontSize: 12,
        halign: 'center'
      },
      bodyStyles: {
        textColor: 0,
        fontSize: 11,
        halign: 'center'
      },
      theme: 'grid',
    });
 
    // Display Total with a Colored Box and Centered Text
    const totalY = (doc as any).lastAutoTable.finalY + 20;
    doc.setFillColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
    doc.rect(margin, totalY - 10, pageWidth - 2 * margin, 15, 'F'); // Box for total
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.setFont('helvetica', 'bold');
    doc.text(`TOTAL: ${orderData.totalPrice.toFixed(2)}`, centerX, totalY, { align: 'center' });
 
    // Notes and Policies Section - Centered Header
    const notesStartY = totalY + 30;
    doc.setFontSize(14);
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text('NOTES AND POLICIES', centerX, notesStartY, { align: 'center' });
 
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    const policies = [
      'Thank you for your business! We appreciate your purchase.',
      'Terms & Conditions: All sales are final. No returns or exchanges on digital products.',
      'Return Policy: Products can be returned within 30 days for a full refund, except for digital items.',
      'Warranty: 1-year warranty on all products, excluding digital goods.'
    ];
 
    // Add policies as separate lines
    policies.forEach((policy, index) => {
      doc.text(policy, margin, notesStartY + 10 + index * 10);
    });
 
    // Download the PDF
    doc.save('invoice.pdf');
  };
 
 
  return (
    <div className='invoice-container' style={{ margin: '2rem auto', width: '80%', border: '1px solid #ddd', padding: '2rem' }}>
      <h2 style={{ textAlign: 'center', fontWeight: 'bold' }}>PAI Internationals</h2>
      <h3 style={{ textAlign: 'center', marginBottom: '1rem' }}>INVOICE</h3>
      <p style={{ textAlign: 'center', marginBottom: '2rem' }}>Invoice Date: {new Date().toLocaleDateString()}</p>
 
      <div>
        <h4>BILL TO:</h4>
        <p>Customer Name: {orderData.customer.customerName}</p>
        <p>Email: {orderData.customer.customerEmail}</p>
        <p>Phone: {orderData.customer.customerPhone}</p>
      </div>
 
      <h4 style={{ textAlign: 'center', marginTop: '2rem' }}>ORDER DETAILS</h4>
      <table style={{ width: '100%', marginTop: '1rem', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>Product Description</th>
            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>Quantity</th>
            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>{orderData.product.productName}</td>
            <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>{orderData.quantity}</td>
            <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>{orderData.totalPrice.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>
 
      <p style={{ textAlign: 'right', fontWeight: 'bold', marginTop: '1rem' }}>TOTAL: {orderData.totalPrice.toFixed(2)}</p>
 
      <div style={{ marginTop: '2rem' }}>
        <h4 style={{ textAlign: 'center' }}>NOTES AND POLICIES</h4>
        <ul>
          <li>Thank you for your business! We appreciate your purchase.</li>
          <li>Terms & Conditions: All sales are final. No returns or exchanges on digital products.</li>
          <li>Return Policy: Products can be returned within 30 days for a full refund, except for digital items.</li>
          <li>Warranty: 1-year warranty on all products, excluding digital goods.</li>
        </ul>
      </div>
 
      <button onClick={downloadInvoice} style={{ display: 'block', margin: '2rem auto', padding: '0.5rem 1rem' }}>
        Download Invoice
      </button>
    </div>
  );
};
 
export default Invoice;