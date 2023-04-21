import React from 'react';
import { Pie } from 'react-chartjs-2';

const PieChart = ({pieChartData}) => {
  const pieChartOptions = {
    maintainAspectRatio: false,
    responsive: true,
  };
  
  return <Pie data={pieChartData} options={pieChartOptions} />;
};

export default PieChart;
