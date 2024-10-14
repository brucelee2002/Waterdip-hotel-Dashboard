import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import TimeSeriesChart from './TimeSeriesChart';
import ColumnChart from './ColumnChart';
import SparklineCharts from './SparklineChart';

interface ChartData {
  timeSeries: { date: string; count: number }[];
  visitorsByCountry: { country: string; count: number }[];
  totalAdults: number;
  totalChildren: number;
}

const Dashboard: React.FC = () => {
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    new Date('2015-07-01'), 
    new Date('2015-08-09') // Set initial end date based on your dataset
  ]);

  useEffect(() => {
    const [start, end] = dateRange;
    if (start && end) {
      fetchData(start, end);
    }
  }, [dateRange]);

  const fetchData = async (start: Date, end: Date) => {
    try {
      const response = await axios.get<ChartData>('http://localhost:5000/api/data', {
        params: {
          start: start.toISOString().split('T')[0],
          end: end.toISOString().split('T')[0]
        }
      });
      setChartData(response.data);
    } catch (error: any) {
      console.error('Error fetching data:', error.response?.data || error.message);
    }
  };

  return (
    <div>
      <h1>Hotel Booking Dashboard</h1>
      <DatePicker
        selectsRange={true}
        startDate={dateRange[0] || undefined}
        endDate={dateRange[1] || undefined}
        onChange={(update: [Date | null, Date | null]) => setDateRange(update)}
        isClearable={true}
      />
      {chartData && (
        <>
          <TimeSeriesChart data={chartData.timeSeries} />
          <ColumnChart data={chartData.visitorsByCountry} />
          <SparklineCharts 
            adultData={[chartData.totalAdults]}
            childrenData={[chartData.totalChildren]}
          />
        </>
      )}
    </div>
  );
};

export default Dashboard;
