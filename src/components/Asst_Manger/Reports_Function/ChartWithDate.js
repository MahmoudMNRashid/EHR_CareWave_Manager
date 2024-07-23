import React from 'react'
import { Bar } from 'react-chartjs-2';
import { CategoryScale } from 'chart.js';
import Chart from 'chart.js/auto';
Chart.register(CategoryScale);
export const ChartWithDate = ({ data }) => {
  const dates = data.map(item => {

    const dateObject = new Date(item.date.date);
    const extractedDate = dateObject.toISOString().split('T')[0];
    return extractedDate
  });
  const governorates = data.map(item => item.date.goverernorate);
  const counts = data.map(item => item.count);

  // Create a unique set of governorates
  const uniqueGovernorates = [...new Set(governorates)];

  // Create datasets for each governorate
  const datasets = uniqueGovernorates.map(governorate => {
    const dataByGovernorate = counts.map((count, index) => {
      if (governorates[index] === governorate) {
        return count;
      }
      return null;
    });

    return {
      label: governorate,
      data: dataByGovernorate,
      backgroundColor: getRandomColor(), // Helper function to generate random colors
    };
  });

  // Define chart data
  const chartData = {
    labels: dates,
    datasets: datasets,
  };

  // Define chart options
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
    scales: {
      x: {
        stacked: true,
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        stacked: true,
        title: {
          display: true,
          text: 'Count',
        },
      },
    },
  };

  return (
    <Bar data={chartData} options={chartOptions} />
  )
}
const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};