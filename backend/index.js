const express = require('express');
const cors = require('cors');
const fs = require('fs');
const csv = require('csv-parser');

const app = express();

// Enable CORS for all routes
app.use(cors()); 

const bookings = [];

const monthMap = {
  January: '01',
  February: '02',
  March: '03',
  April: '04',
  May: '05',
  June: '06',
  July: '07',
  August: '08',
  September: '09',
  October: '10',
  November: '11',
  December: '12'
};

// Load CSV data into memory
fs.createReadStream('hotel_bookings_1000.csv')
  .pipe(csv())
  .on('data', (row) => {
    const { arrival_date_year, arrival_date_month, arrival_date_day_of_month, adults, children, babies, country } = row;

    // Convert month name to a numeric value using the monthMap
    const monthNumber = monthMap[arrival_date_month];
    if (!monthNumber) {
      console.error(`Invalid month: ${arrival_date_month}`);
      return;
    }

    // Create the date object in the correct format
    const date = new Date(`${arrival_date_year}-${monthNumber}-${arrival_date_day_of_month}`);

    // Add the booking information to the bookings array
    bookings.push({
      date,
      adults: +adults,
      children: +children,
      babies: +babies,
      country
    });
  })
  .on('end', () => {
    console.log('CSV file successfully processed');
  })
  .on('error', (err) => {
    console.error('Error processing CSV file:', err);
  });

// API to filter data by date range
app.get('/api/data', (req, res) => {
  console.log('Received request with query parameters:', req.query);
  
  const { start, end } = req.query;

  // Check if start and end dates are provided
  if (!start || !end) {
    return res.status(400).json({ error: 'Start date and end date are required.' });
  }

  const startDate = new Date(start);
  const endDate = new Date(end);

  // Validate date formats
  if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
    return res.status(400).json({ error: 'Invalid date format. Please use YYYY-MM-DD.' });
  }

  // Filter bookings based on date range
  const filteredData = bookings.filter(booking => {
    const bookingDate = new Date(booking.date);
    bookingDate.setHours(0, 0, 0, 0);
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(23, 59, 59, 999); // End of the day for inclusive range
    return bookingDate >= startDate && bookingDate <= endDate;
  });

  // Aggregating data for charts
  const timeSeries = {};
  const countryData = {};
  let adultsTotal = 0;
  let childrenTotal = 0;

  filteredData.forEach(booking => {
    const dateStr = booking.date.toISOString().split('T')[0];
    timeSeries[dateStr] = (timeSeries[dateStr] || 0) + booking.adults + booking.children + booking.babies;
    countryData[booking.country] = (countryData[booking.country] || 0) + booking.adults + booking.children + booking.babies;
    adultsTotal += booking.adults;
    childrenTotal += booking.children;
  });

  const timeSeriesData = Object.entries(timeSeries).map(([date, count]) => ({ date, count }));
  
  const visitorsByCountry = Object.keys(countryData).map(country => ({
    country,
    count: countryData[country]
  }));

  // Send JSON response
  const jsonResponse = {
    timeSeries: timeSeriesData.slice(0, 10),
    visitorsByCountry,
    totalAdults: adultsTotal,
    totalChildren: childrenTotal
  };

  console.log(jsonResponse);  // Log to console
  res.json(jsonResponse);     // Send JSON response
});

// Handle 404 for invalid routes
app.use((req, res) => {
  res.status(404).json({ error: 'Resource not found' });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
