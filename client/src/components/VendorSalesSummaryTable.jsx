import { useState, useEffect } from 'react';
import { useVendor } from '../context/VendorContext';
import { useVendorSalesSummary } from '../hooks/useVendorSales';

const VendorSalesSummaryTable = () => {
  const { selectedVendorId } = useVendor();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedVendorId]);

  const { 
    salesData, 
    isLoading, 
    error, 
    totalPages, 
    totalItems 
  } = useVendorSalesSummary(selectedVendorId, currentPage, itemsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  if (!selectedVendorId) {
    return (
      <div className="w-full p-4 text-center text-gray-500">
        Please select a vendor to view sales summary
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full p-4 text-center text-red-500">
        Error: {error}
      </div>
    );
  }

  if (isLoading) {
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

  if (salesData.length === 0) {
    return (
      <div className="w-full p-4 text-center text-gray-500">
        No sales data available for this vendor
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="overflow-x-auto shadow-md sm:rounded-lg mb-4">
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
      <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200 sm:px-6">
        <div className="flex items-center">
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{((currentPage - 1) * itemsPerPage) + 1}</span> to{' '}
            <span className="font-medium">
              {Math.min(currentPage * itemsPerPage, totalItems)}
            </span>{' '}
            of <span className="font-medium">{totalItems}</span> results
          </p>
        </div>
        <div className="flex justify-end gap-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded-md ${
              currentPage === 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            Previous
          </button>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded-md ${
              currentPage === totalPages
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default VendorSalesSummaryTable; 