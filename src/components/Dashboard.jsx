// src/pages/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const response = await fetch(
          'https://api.polygon.io/v2/aggs/ticker/AAPL/range/1/day/2023-01-09/2023-01-09?apiKey=SaqcnpFHhsaRRronsVjDQKGEKQvGxBqs'
        );
        const data = await response.json();
        setStocks(data.results);
      } catch (error) {
        console.error('Failed to fetch stock data', error);
      }
    };

    fetchStocks();
  }, []);

  const data = {
    labels: stocks.map(stock => new Date(stock.t).toLocaleDateString()),
    datasets: [
      {
        label: 'Volume',
        data: stocks.map(stock => stock.v),
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
      {
        label: 'Open',
        data: stocks.map(stock => stock.o),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
      {
        label: 'Close',
        data: stocks.map(stock => stock.c),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'High',
        data: stocks.map(stock => stock.h),
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
      {
        label: 'Low',
        data: stocks.map(stock => stock.l),
        backgroundColor: 'rgba(255, 206, 86, 0.6)',
        borderColor: 'rgba(255, 206, 86, 1)',
        borderWidth: 1,
      },
      {
        label: 'Transactions',
        data: stocks.map(stock => stock.n),
        backgroundColor: 'rgba(255, 159, 64, 0.6)',
        borderColor: 'rgba(255, 159, 64, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Stock Data',
      },
    },
  };

  return (
    <div className="p-4">
      <h1>Stock marcket data.</h1>
      <div className="overflow-x-auto mb-6">
        <table className="min-w-full bg-white border-collapse">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Volume</th>
              <th className="py-2 px-4 border-b">VWAP</th>
              <th className="py-2 px-4 border-b">Open</th>
              <th className="py-2 px-4 border-b">Close</th>
              <th className="py-2 px-4 border-b">High</th>
              <th className="py-2 px-4 border-b">Low</th>
              <th className="py-2 px-4 border-b">Timestamp</th>
              <th className="py-2 px-4 border-b">Transactions</th>
            </tr>
          </thead>
          <tbody>
            {stocks.map((stock, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border-b">{stock.v}</td>
                <td className="py-2 px-4 border-b">{stock.vw}</td>
                <td className="py-2 px-4 border-b">{stock.o}</td>
                <td className="py-2 px-4 border-b">{stock.c}</td>
                <td className="py-2 px-4 border-b">{stock.h}</td>
                <td className="py-2 px-4 border-b">{stock.l}</td>
                <td className="py-2 px-4 border-b">{new Date(stock.t).toLocaleDateString()}</td>
                <td className="py-2 px-4 border-b">{stock.n}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Bar data={data} options={options} />
    </div>
  );
};

export default Dashboard;
