import { useState } from 'react';
import { Line } from 'react-chartjs-2';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
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
import { useVendorSalesChart } from '../hooks/useVendorSales';

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
        text: 'Total Sales'
      }
    }
  }
};

export default function VendorSalesChart() {
  const { selectedVendorId } = useVendor();
  const [startDate, setStartDate] = useState(new Date(2021, 0, 1));
  const [endDate, setEndDate] = useState(new Date(2024, 11, 31));
  
  const { salesData, isLoading, error } = useVendorSalesChart(selectedVendorId, startDate, endDate);

  const chartData = {
    labels: salesData.map(item => `${item.year}-${String(item.month).padStart(2, '0')}`),
    datasets: [
      {
        label: 'Total Products Sold',
        data: salesData.map(item => item.total_sales_count),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
      {
        label: 'Total Orders',
        data: salesData.map(item => item.order_count),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  if (!selectedVendorId) {
    return <div className="p-4 text-gray-500">Please select a vendor</div>;
  }

  if (isLoading) {
    return <div className="p-4 text-gray-500">Loading...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-4 bg-white rounded-lg">
      {salesData.length > 0 ? (
        <div>
          <div className="mb-4 flex gap-4 items-center">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Start Date:</span>
              <DatePicker
                selected={startDate}
                onChange={date => setStartDate(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                className="p-2 border rounded"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">End Date:</span>
              <DatePicker
                selected={endDate}
                onChange={date => setEndDate(date)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                className="p-2 border rounded"
              />
            </div>
          </div>
          <Line options={options} data={chartData} />
        </div>
      ) : (
        <div className="text-center text-gray-500">No data available</div>
      )}
    </div>
  );
} 