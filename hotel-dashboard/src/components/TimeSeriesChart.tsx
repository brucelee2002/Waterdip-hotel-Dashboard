import React from 'react';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

interface TimeSeriesChartProps {
  data: { date: string; count: number }[];
}

const TimeSeriesChart: React.FC<TimeSeriesChartProps> = ({ data }) => {
  const options: ApexOptions = {
    chart: {
      id: 'visitors-timeseries',
      type: 'line',
      zoom: {
        enabled: true
      }
    },
    xaxis: {
      type: 'datetime'
    },
    title: {
      text: 'Number of Visitors per Day'
    }
  };

  const series = [{
    name: 'Visitors',
    data: data.map(item => [new Date(item.date).getTime(), item.count])
  }];

  return (
    <Chart
      options={options}
      series={series}
      type="line"
      height={350}
    />
  );
};

export default TimeSeriesChart;