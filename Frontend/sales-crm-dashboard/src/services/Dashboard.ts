import { SalesData, RegionalData, Product } from '../components/retail/Dashboard';
   
  export const getDashboardData = async () => {
    // Simulate API call - replace with actual API calls
    const salesData: SalesData[] = [
      { month: 'Jan', amount: 3200 },
      { month: 'Feb', amount: 3578.90 },
      { month: 'Mar', amount: 3787.68 }
    ];
   
    const regionalData: RegionalData[] = [
      { region: '2013', value: 25.9 },
      { region: '2014', value: 30.3 },
      { region: '2015', value: 17.1 },
      { region: '2016', value: 26.7 }
    ];
   
    const products: Product[] = [
      {
        id: "#1",
        name: "Tops and skirt set",
        category: "womans",
        brand: "richman",
        price: 21.00,
        stock: 380,
        rating: 4.9,
        reviews: 16,
        orders: 380,
        sales: 38000
      }
    ];
   
    return {
      salesData,
      regionalData,
      products,
      metrics: {
        totalUsers: 277,
        totalOrders: 277,
        totalSales: 3787681,
        averageRating: 4.9
      }
    };
  };