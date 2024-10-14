import React from 'react';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

interface SparklineChartProps {
  adultData: number[];
  childrenData: number[];
}

const SparklineChart: React.FC<SparklineChartProps> = ({ adultData, childrenData }) => {
  const commonOptions: ApexOptions = {
    chart: {
      type: 'line',
      sparkline: {
        enabled: true
      }
    },
    stroke: {
      curve: 'straight'
    },
    fill: {
      opacity: 0.3
    },
    yaxis: {
      min: 0
    }
  };

  const adultSeries = [{
    name: 'Adults',
    data: adultData
  }];

  const childrenSeries = [{
    name: 'Children',
    data: childrenData
  }];

  return (
    <div>
      <div>
        <h3>Total Adult Visitors: {adultData[0]}</h3>
        <Chart
          options={commonOptions}
          series={adultSeries}
          type="line"
          height={80}
          width={300}
        />
      </div>
      <div>
        <h3>Total Children Visitors: {childrenData[0]}</h3>
        <Chart
          options={commonOptions}
          series={childrenSeries}
          type="line"
          height={80}
          width={300}
        />
      </div>
    </div>
  );
};

export default SparklineChart;