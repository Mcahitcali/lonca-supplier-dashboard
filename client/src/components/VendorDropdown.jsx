import { useState, useEffect } from 'react';
import axios from 'axios';
import { ENDPOINTS } from '../config/api';
import { useVendor } from '../context/VendorContext';

const VendorDropdown = () => {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { selectedVendorId, setSelectedVendorId } = useVendor();

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await axios.get(ENDPOINTS.VENDORS);
        setVendors(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch vendors');
        setLoading(false);
      }
    };

    fetchVendors();
  }, []);

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-10 bg-gray-200 rounded-md w-full"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-md bg-red-50 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">{error}</h3>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full relative">
      <select
        id="vendor"
        value={selectedVendorId}
        onChange={(e) => setSelectedVendorId(e.target.value)}
        className="block w-full appearance-none pl-3 pr-10 py-3 text-base border-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-lg shadow-sm bg-gray-50"
      >
        <option value="">Select a supplier</option>
        {vendors.map((vendor) => (
          <option key={vendor._id} value={vendor._id}>
            {vendor.name}
          </option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
        <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </div>
    </div>
  );
};

export default VendorDropdown; 