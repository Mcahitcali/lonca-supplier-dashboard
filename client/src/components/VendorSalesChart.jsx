import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { useVendor } from '../context/VendorContext';
import { ENDPOINTS } from '../config/api';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Monthly Sales Chart',
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      title: {
        display: true,
        text: 'Total Revenue (₺)'
      }
    }
  }
};

export default function VendorSalesChart() {
  const [salesData, setSalesData] = useState([]);
  const { selectedVendorId } = useVendor();

  useEffect(() => {
    const fetchSalesData = async () => {
      if (!selectedVendorId) return;

      try {
        const response = await fetch(`${ENDPOINTS.VENDORS}/${selectedVendorId}/monthly-sales?startDate=2021-01-01&endDate=2024-12-31`);
        const data = await response.json();
        setSalesData(data);
      } catch (error) {
        console.error('Error fetching sales data:', error);
      }
    };

    fetchSalesData();
  }, [selectedVendorId]);

  const chartData = {
    labels: salesData.map(item => `${item.year}-${String(item.month).padStart(2, '0')}`),
    datasets: [
      {
        label: 'Total Revenue',
        data: salesData.map(item => item.total_revenue),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
    ],
  };

  if (!selectedVendorId) {
    return <div className="p-4 text-gray-500">Please select a vendor</div>;
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      {salesData.length > 0 ? (
        <Line options={options} data={chartData} />
      ) : (
        <div className="text-center text-gray-500">Loading...</div>
      )}
    </div>
  );
} 