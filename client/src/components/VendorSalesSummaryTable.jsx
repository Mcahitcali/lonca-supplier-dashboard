import { useState, useEffect } from 'react';
import { useVendor } from '../context/VendorContext';
import { API_BASE_URL } from '../config/api';

const VendorSalesSummaryTable = () => {
  const [salesData, setSalesData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { selectedVendorId } = useVendor();

  useEffect(() => {
    const fetchSalesSummary = async () => {
      if (!selectedVendorId) return;
      
      setLoading(true);
      try {
        const response = await fetch(`${API_BASE_URL}/vendors/${selectedVendorId}/sales-summary`);
        if (!response.ok) throw new Error('Failed to fetch sales summary');
        const data = await response.json();
        setSalesData(data);
      } catch (error) {
        console.error('Error fetching sales summary:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSalesSummary();
  }, [selectedVendorId]);

  if (loading) {
    return (
      <div className="w-full p-4">
        <div className="animate-pulse flex space-x-4">
          <div className="flex-1 space-y-4 py-1">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!selectedVendorId) {
    return (
      <div className="w-full p-4 text-center text-gray-500">
        Please select a vendor to view sales summary
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">Product Name</th>
            <th scope="col" className="px-6 py-3">Total Sales Count</th>
            <th scope="col" className="px-6 py-3">Total Revenue</th>
            <th scope="col" className="px-6 py-3">Total Cost</th>
            <th scope="col" className="px-6 py-3">Total Margin</th>
          </tr>
        </thead>
        <tbody>
          {salesData.map((item) => (
            <tr key={item.product_id} className="bg-white border-b hover:bg-gray-50">
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                {item.product_name}
              </td>
              <td className="px-6 py-4">{item.total_sales_count}</td>
              <td className="px-6 py-4">₺{item.total_revenue.toLocaleString()}</td>
              <td className="px-6 py-4">₺{item.total_cost.toLocaleString()}</td>
              <td className="px-6 py-4">₺{item.total_margin.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VendorSalesSummaryTable; 