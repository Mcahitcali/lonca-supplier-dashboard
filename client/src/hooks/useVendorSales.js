import { useState, useEffect } from 'react';
import { ENDPOINTS, API_BASE_URL } from '../config/api';

export const useVendorSalesChart = (selectedVendorId, startDate, endDate) => {
  const [salesData, setSalesData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSalesData = async () => {
      if (!selectedVendorId) return;

      setIsLoading(true);
      setError(null);
      try {
        const formattedStartDate = startDate.toISOString().split('T')[0];
        const formattedEndDate = endDate.toISOString().split('T')[0];
        const response = await fetch(
          `${ENDPOINTS.VENDORS}/${selectedVendorId}/monthly-sales?startDate=${formattedStartDate}&endDate=${formattedEndDate}`
        );
        if (!response.ok) throw new Error('Failed to fetch sales data');
        const data = await response.json();
        setSalesData(data);
      } catch (error) {
        setError(error.message);
        console.error('Error fetching sales data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSalesData();
  }, [selectedVendorId, startDate, endDate]);

  return { salesData, isLoading, error };
};

export const useVendorSalesSummary = (selectedVendorId, currentPage, itemsPerPage) => {
  const [salesData, setSalesData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const fetchSalesSummary = async () => {
      if (!selectedVendorId) return;
      
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `${API_BASE_URL}/vendors/${selectedVendorId}/sales-summary?page=${currentPage}&limit=${itemsPerPage}`
        );
        if (!response.ok) throw new Error('Failed to fetch sales summary');
        const result = await response.json();

        setSalesData(result.data);
        setTotalPages(result.pagination.totalPages);
        setTotalItems(result.pagination.total);
      } catch (error) {
        setError(error.message);
        console.error('Error fetching sales summary:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSalesSummary();
  }, [selectedVendorId, currentPage, itemsPerPage]);

  return { salesData, isLoading, error, totalPages, totalItems };
}; 