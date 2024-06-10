import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import useGetUser from '../../hook/useGetUser';
import { fetchRevenue } from '../../api/organizer';

// Define the type for the backend data
type BackendData = {
  year: string;
  month: string;
  revenue: number;
};

// Default data for 12 months
const defaultData = [
  { name: 'January', revenue: 0 },
  { name: 'February', revenue: 0 },
  { name: 'March', revenue: 0 },
  { name: 'April', revenue: 0 },
  { name: 'May', revenue: 0 },
  { name: 'June', revenue: 0 },
  { name: 'July', revenue: 0 },
  { name: 'August', revenue: 0 },
  { name: 'September', revenue: 0 },
  { name: 'October', revenue: 0 },
  { name: 'November', revenue: 0 },
  { name: 'December', revenue: 0 },
];

// Define the possible months and their full names
const monthMap: { [key: string]: string } = {
  Jan: 'January',
  Feb: 'February',
  Mar: 'March',
  Apr: 'April',
  May: 'May',
  Jun: 'June',
  Jul: 'July',
  Aug: 'August',
  Sep: 'September',
  Oct: 'October',
  Nov: 'November',
  Dec: 'December'
};

// Function to merge backend data with default data
const mergeData = (defaultData: { name: string, revenue: number }[], backendData: BackendData[], year: string) => {
  // Reset the default data
  const resetData = defaultData.map(month => ({ ...month, revenue: 0 }));

  // Filter backend data by year
  const filteredData = backendData.filter(data => data.year === year);

  filteredData.forEach(({ month, revenue }) => {
    const monthName = monthMap[month as keyof typeof monthMap];
    const dataIndex = resetData.findIndex(data => data.name === monthName);
    if (dataIndex !== -1) {
      resetData[dataIndex].revenue += revenue; // Accumulate revenue if there are multiple events in a month
    }
  });

  return resetData;
};

const Revenue = () => {
  const currentUser = useGetUser();
  const currentYear = new Date().getFullYear();
  const [data, setData] = useState(defaultData);
  const [year, setYear] = useState(currentYear.toString());
  const [years, setYears] = useState<string[]>([currentYear.toString()]); // Initialize with the current year
  const [backendData, setBackendData] = useState<BackendData[]>([]);

  async function getRevenue() {
    const fetchedData: BackendData[] = await fetchRevenue(currentUser.id);
    const uniqueYears = Array.from(new Set(fetchedData.map(d => d.year))) as string[];
    setYears(uniqueYears);
    setBackendData(fetchedData);
    const mergedData = mergeData([...defaultData], fetchedData, year);
    setData(mergedData);
  }

  useEffect(() => {
    getRevenue();
  }, []);

  useEffect(() => {
    const mergedData = mergeData([...defaultData], backendData, year);
    setData(mergedData);
  }, [year, backendData]);

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setYear(e.target.value);
  };

  return (
    <>
      <div className="w-full flex flex-col">
        <div className="w-full h-auto flex justify-end p-5">
          <select 
            name="year" 
            className="w-[6rem] h-[2rem] rounded-md border-2 border-black" 
            id="year-select" 
            value={year} 
            onChange={handleYearChange}
          >
            {years.map(y => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>
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
      </div>
    </>
  );
};

export default Revenue;
