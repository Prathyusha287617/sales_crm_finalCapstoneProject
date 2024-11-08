export interface MetricCardProps {
    title: string;
    value: string | number;
    subtitle: string;
    icon: React.ReactNode;
    color: string;
  }
   
  export interface SalesData {
    month: string;
    amount: number;
  }
   
  export interface RegionalData {
    region: string;
    value: number;
  }
   
  export interface Product {
    id: string;
    name: string;
    category: string;
    brand: string;
    price: number;
    stock: number;
    rating: number;
    reviews: number;
    orders: number;
    sales: number;
  }
   
   
  