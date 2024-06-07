import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Monthly event data
const data = [
  { month: 'January', event: 5 },
  { month: 'February', event: 3 },
  { month: 'March', event: 6 },
  { month: 'April', event: 4 },
  { month: 'May', event: 7 },
  { month: 'June', event: 8 },
  { month: 'July', event: 9 },
  { month: 'August', event: 10 },
  { month: 'September', event: 11 },
  { month: 'October', event: 12 },
  { month: 'November', event: 13 },
  { month: 'December', event: 14 },
];

const EventChart = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="event" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default EventChart;
