import React from 'react';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

interface ColumnChartProps {
  data: { country: string; count: number }[];
}

const ColumnChart: React.FC<ColumnChartProps> = ({ data }) => {
  const options: ApexOptions = {
    chart: {
      type: 'bar'
    },
    plotOptions: {
      bar: {
        dataLabels: {
          position: 'top'
        }
      }
    },
    dataLabels: {
      enabled: true,
      formatter: function (val: number) {
        return val.toString();
      },
      offsetY: -20,
      style: {
        fontSize: '12px',
        colors: ["#304758"]
      }
    },
    xaxis: {
      categories: data.map(item => item.country),
      position: 'top',
      labels: {
        offsetY: -18
      },
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      },
      crosshairs: {
        fill: {
          type: 'gradient',
          gradient: {
            colorFrom: '#D8E3F0',
            colorTo: '#BED1E6',
            stops: [0, 100],
            opacityFrom: 0.4,
            opacityTo: 0.5,
          }
        }
      },
      tooltip: {
        enabled: true,
        offsetY: -35,
      }
    },
    yaxis: {
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: false,
      }
    },
    title: {
      text: 'Number of Visitors per Country',
      floating: true,
      offsetY: 330,
      align: 'center',
      style: {
        color: '#444'
      }
    }
  };

  const series = [{
    name: 'Visitors',
    data: data.map(item => item.count)
  }];

  return (
    <Chart
      options={options}
      series={series}
      type="bar"
      height={350}
    />
  );
};

export default ColumnChart; 