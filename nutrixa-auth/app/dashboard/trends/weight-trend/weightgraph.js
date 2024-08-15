'use client'
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TimeScale } from 'chart.js';
import 'chartjs-adapter-date-fns'; 


ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TimeScale);

const WeightGraph = () => {
  const [weightData, setWeightData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Weight',
        data: [],
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
        tension: 0.1,
      },
    ],
  });

  //fetch from get
  useEffect(() => {
    const fetchWeightData = async () => {
      const response = await fetch('/api/weightget');
      const result = await response.json();
      if (result.success) {
        const labels = result.data.map(item => new Date(item.date)); 
        const data = result.data.map(item => item.weight);

        setWeightData({
          labels: labels,
          datasets: [
            {
              label: 'Weight',
              data: data,
              borderColor: 'rgba(75,192,192,1)',
              backgroundColor: 'rgba(75,192,192,0.2)',
              tension: 0.1,
            },
          ],
        });
      }
    };

    fetchWeightData();
  }, []);

  //graph scale
  const options = {
    scales: {
      x: {
        type: 'time', 
        time: {
          unit: 'day', 
        },
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        ticks: {
          stepSize: 20,
        },
        title: {
          display: true,
          text: 'Weight (lbs)',
        },
      },
    },
  };

  return (
    <div style={{ width: '100%', height: '400px' }}>
      <Line data={weightData} options={options} />
    </div>
  );
};

export default WeightGraph;