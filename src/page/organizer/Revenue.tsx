
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'January',
    revenue: 4000,
    amt: 5000,
  },
  {
    name: 'February',
    revenue: 3000,
    amt: 10000,
  },
  {
    name: 'March',
    revenue: 2000,
    amt: 15000,
  },
  {
    name: 'April',
    revenue: 1890,
    amt: 25000,
  },
  {
    name: 'June',
    revenue: 2390,
    amt: 30000,
  },
  {
    name: 'July',
    revenue: 3490,
    amt: 35000,
  },
  {
    name: 'August',
    revenue: 2780,
    amt: 20000,
  },
  {
    name: 'September',
    revenue: 2780,
    amt: 20000,
  },
  {
    name: 'October',
    revenue: 2780,
    amt: 20000,
  },
  {
    name: 'November',
    revenue: 2780,
    amt: 20000,
  },
  {
    name: 'December',
    revenue: 2780,
    amt: 20000,
  },
];


const Revenue = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="revenue" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Revenue;
