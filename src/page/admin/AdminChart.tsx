import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import useGetUser from '../../hook/useGetUser';
import { fetchEventGraph } from '../../api/organizer';
import { fetchGraphData } from '../../api/admin';

type BackendData = {
  year: string;
  month: string;
  event: number;
};

const defaultData = [
  { name: 'January', events: 0 },
  { name: 'February', events: 0 },
  { name: 'March', events: 0 },
  { name: 'April', events: 0 },
  { name: 'May', events: 0 },
  { name: 'June', events: 0 },
  { name: 'July', events: 0 },
  { name: 'August', events: 0 },
  { name: 'September', events: 0 },
  { name: 'October', events: 0 },
  { name: 'November', events: 0 },
  { name: 'December', events: 0 },
];

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

const mergeData = (defaultData: { name: string, events: number }[], backendData: BackendData[], year: string) => {
  const resetData = defaultData.map(month => ({ ...month, events: 0 }));

  const filteredData = backendData.filter(data => data.year === year);

  filteredData.forEach(({ month, event }) => {
    const monthName = monthMap[month as keyof typeof monthMap];
    const dataIndex = resetData.findIndex(data => data.name === monthName);
    if (dataIndex !== -1) {
      resetData[dataIndex].events += event; 
    }
  });

  return resetData;
};

const AdminChart = () => {
  const currentUser = useGetUser();
  const currentYear = new Date().getFullYear();
  const [data, setData] = useState(defaultData);
  const [year, setYear] = useState(currentYear.toString());
  const [years, setYears] = useState<string[]>([currentYear.toString()]); // Initialize with the current year
  const [backendData, setBackendData] = useState<BackendData[]>([]);

  async function getEventGraph() {
    const fetchedData: BackendData[] = await fetchGraphData();
    console.log(" the fethced data",fetchedData)
    const uniqueYears = Array.from(new Set(fetchedData.map(d => d.year))) as string[];
    setYears(uniqueYears);
    setBackendData(fetchedData);
    const mergedData = mergeData([...defaultData], fetchedData, year);
    setData(mergedData);
  }

  useEffect(() => {
    getEventGraph();
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
            <Line type="monotone" dataKey="events" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default AdminChart;