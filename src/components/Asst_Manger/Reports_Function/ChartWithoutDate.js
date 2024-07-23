import React from 'react'
import { Bar } from 'react-chartjs-2';
    import {CategoryScale} from 'chart.js'; 
    import Chart from 'chart.js/auto';
    Chart.register(CategoryScale);
export const ChartWithoutDate = ({data}) => {
    const labels = data.map(item => item.governerate);
    const countAllData = data.map(item => item.countall);
    const countHuntData = data.map(item => item.counthunt);

    console.log(labels,countAllData,countHuntData)
    const chartData = {
        labels: labels,
        datasets: [
          {
            label: 'عدد الكل ',
            backgroundColor: getRandomColor(),
            data: countAllData,
          },
          {
            label: ' عدد المصابين',
            backgroundColor: getRandomColor(),
            data: countHuntData,
          },
        ],
      };

    const chartOptions = {
        responsive: true,
        scales: {
          x: {
            stacked: true,
          },
          y: {
            stacked: true,
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