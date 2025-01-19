import { createContext, useContext, useState } from 'react';

const VendorContext = createContext();

export const VendorProvider = ({ children }) => {
  const [selectedVendorId, setSelectedVendorId] = useState('');

  return (
    <VendorContext.Provider value={{ selectedVendorId, setSelectedVendorId }}>
      {children}
    </VendorContext.Provider>
  );
};

export const useVendor = () => {
  const context = useContext(VendorContext);
  if (!context) {
    throw new Error('useVendor must be used within a VendorProvider');
  }
  return context;
}; 