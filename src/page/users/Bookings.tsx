import React, { useState } from 'react';
import './style.css';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { BookingList } from '../../componant/user/BookingList';
import { BookingHistory } from '../../componant/user/BookingHistory';


const Bookings = () => {

  const [value, setValue] = useState(0);

  const handleChange = (event: any, newValue: any) => {
    console.log(" events", event)
    setValue(newValue);
  };




  const a11yProps = (index: any) => {
    return {
      id: `tab-${index}`,
      'aria-controls': `tabpanel-${index}`,
    };
  };

  const CustomTabPanel = ({ children, value, index, ...other }: any) => {
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`tabpanel-${index}`}
        aria-labelledby={`tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  };

  return (
    <>
      <div className='w-auto rounded-md border-2 border-gray-400 flex items-center p-3 shadow-md h-[4rem] m-6'>
        <h1 className='font-bold'>All Bookings</h1>
      </div>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', borderBottom: '0.5px solid', borderColor: 'divider' }}>
          <Tabs
            value={value}
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              '& .MuiTabs-indicator': { // Target the indicator
                transform: 'scaleX(0.5)', // Scale the indicator horizontally to half its size
                transformOrigin: 'center bottom', // Set the origin of the transformation
              },
              '& .MuiTab-root:hover': {
                backgroundColor: 'transparent', // Remove hover background color
              }
            }}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="History" sx={{ minWidth: '50%' }} disableRipple  {...a11yProps(0)} />
            <Tab label="Upcoming" sx={{ minWidth: '50%' }} disableRipple  {...a11yProps(1)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <BookingList />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
           <BookingHistory/>
        </CustomTabPanel>
      </Box>



    </>
  );
};

export default Bookings;