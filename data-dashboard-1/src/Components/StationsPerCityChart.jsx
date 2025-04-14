import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const StationsPerCityChart = ({ data }) => {
  if (!data) return null;

  // Group stations by city
  const cityCounts = data.reduce((acc, station) => {
    acc[station.city] = (acc[station.city] || 0) + 1;
    return acc;
  }, {});

  // Convert to chart-friendly format
  const chartData = Object.entries(cityCounts).map(([city, count]) => ({
    city,
    count,
  }));

  return (
    <BarChart width={600} height={300} data={chartData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="city" />
      <YAxis />
      <Tooltip
        contentStyle={{ backgroundColor: '#333', color: '#fff', borderRadius: '5px' }} // Dark background with white text
        itemStyle={{ color: '#fff' }} // White text for items
        formatter={(value) => [`${value} stations`, 'City']}
      />
      <Bar dataKey="count" fill="#8884d8" />
    </BarChart>
  );
};

export default StationsPerCityChart;