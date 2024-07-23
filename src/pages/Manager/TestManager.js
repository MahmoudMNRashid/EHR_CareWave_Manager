import React, { useState } from 'react'
import { Bar } from 'react-chartjs-2';
    import {CategoryScale} from 'chart.js'; 
    import Chart from 'chart.js/auto';
    Chart.register(CategoryScale);
export const TestManager = () => {
    // const data = {
    //     "data": {
    //         "person": [
    //             {
    //                 "governerate": "Damascus",
    //                 "countall": 10,
    //                 "counthunt": 3
    //             },
    //             {
    //                 "governerate": "Rural Damascus",
    //                 "countall": 10,
    //                 "counthunt": 1
    //             },
    //             {
    //                 "governerate": "Daraa",
    //                 "countall": 10,
    //                 "counthunt": 2
    //             },
    //             {
    //                 "governerate": "Hama",
    //                 "countall": 10,
    //                 "counthunt": 1
    //             },
    //             {
    //                 "governerate": "Idlib",
    //                 "countall": 10,
    //                 "counthunt": 1
    //             },
    //             {
    //                 "governerate": "Raqqa",
    //                 "countall": 10,
    //                 "counthunt": 2
    //             },
    //             {
    //                 "governerate": "Quneitra",
    //                 "countall": 10,
    //                 "counthunt": 1
    //             },
    //             {
    //                 "governerate": "Deir ez-Zor",
    //                 "countall": 10,
    //                 "counthunt": 1
    //             },
    //             {
    //                 "governerate": "Tartus",
    //                 "countall": 10,
    //                 "counthunt": 1
    //             },
    //             {
    //                 "governerate": "Aleppo",
    //                 "countall": 10,
    //                 "counthunt": 1
    //             }
    //         ]
    //     }
    // }
    // const labels = data.data.person.map(item => item.governerate);
    // const countAllData = data.data.person.map(item => item.countall);
    // const countHuntData = data.data.person.map(item => item.counthunt);

    // const chartData = {
    //     labels: labels,
    //     datasets: [
    //       {
    //         label: 'Count All',
    //         backgroundColor: 'rgba(75, 192, 192, 0.6)',
    //         data: countAllData,
    //       },
    //       {
    //         label: 'Count Hunt',
    //         backgroundColor: 'rgba(255, 99, 132, 0.6)',
    //         data: countHuntData,
    //       },
    //     ],
    //   };

    // const chartOptions = {
    //     responsive: true,
    //     scales: {
    //       x: {
    //         stacked: true,
    //       },
    //       y: {
    //         stacked: true,
    //       },
    //     },
    //   };

    // __________________
    // const data={
    //         "person": [
    //             {
    //                 "date": {
    //                     "goverernorate": "Daraa",
    //                     "date": "2012-03-04T00:00:00"
    //                 },
    //                 "count": 1
    //             },
    //             {
    //                 "date": {
    //                     "goverernorate": "Raqqa",
    //                     "date": "2017-06-05T00:00:00"
    //                 },
    //                 "count": 2
    //             },
    //             {
    //                 "date": {
    //                     "goverernorate": "Raqqa",
    //                     "date": "2012-06-20T00:00:00"
    //                 },
    //                 "count": 2
    //             },
    //             {
    //                 "date": {
    //                     "goverernorate": "Quneitra",
    //                     "date": "2010-07-10T00:00:00"
    //                 },
    //                 "count": 1
    //             },
    //             {
    //                 "date": {
    //                     "goverernorate": "Tartus",
    //                     "date": "2012-05-26T00:00:00"
    //                 },
    //                 "count": 1
    //             }
    //         ]
    //     }
    //     const dates = data.person.map(item => item.date.date);
    //     const governorates = data.person.map(item => item.date.goverernorate);
    //     const counts = data.person.map(item => item.count);
      
    //     // Create a unique set of governorates
    //     const uniqueGovernorates = [...new Set(governorates)];
      
    //     // Create datasets for each governorate
    //     const datasets = uniqueGovernorates.map(governorate => {
    //       const dataByGovernorate = counts.map((count, index) => {
    //         if (governorates[index] === governorate) {
    //           return count;
    //         }
    //         return null;
    //       });
      
    //       return {
    //         label: governorate,
    //         data: dataByGovernorate,
    //         backgroundColor: getRandomColor(), // Helper function to generate random colors
    //       };
    //     });
      
    //     // Define chart data
    //     const chartData = {
    //       labels: dates,
    //       datasets: datasets,
    //     };
      
    //     // Define chart options
    //     const chartOptions = {
    //       responsive: true,
    //       plugins: {
    //         legend: {
    //           display: true,
    //           position: 'top',
    //         },
    //       },
    //       scales: {
    //         x: {
    //           stacked: true,
    //           title: {
    //             display: true,
    //             text: 'Date',
    //           },
    //         },
    //         y: {
    //           stacked: true,
    //           title: {
    //             display: true,
    //             text: 'Count',
    //           },
    //         },
    //       },
    //     };
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = () => {
      setIsChecked(!isChecked);
    };
    return (

        // <Bar data={chartData} options={chartOptions} />
        // <Bar data={chartData} options={chartOptions} />
        <div className="App">
        <label>
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
          Disable Div
        </label>
        <div className={`content ${isChecked ? 'disabled' : ''}`}>
        <input
            type="text"
           
          />
        </div>
      </div>
    )
}
// const getRandomColor = () => {
//     const letters = '0123456789ABCDEF';
//     let color = '#';
//     for (let i = 0; i < 6; i++) {
//       color += letters[Math.floor(Math.random() * 16)];
//     }
//     return color;
//   };