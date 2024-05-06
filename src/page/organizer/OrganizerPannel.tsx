import * as React from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import Nav from '../../componant/common/Nav';
import { Avatar } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import useGetUser from '../../hook/useGetUser';
import EventPannel from '../../componant/organizer/EventPannel';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export default function OrganizerPannel() {
  const location = useLocation();
  const navigate = useNavigate();
  const currentUser = useGetUser();
  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    const tab = getTabIndex(location.pathname);
    if (tab !== -1) setValue(tab);
  }, [location]);

  const getTabIndex = (path: string) => {
    if (path.startsWith(`/organizer/dashboard`)) {
      return 0;
    }
    if (path.startsWith(`/organizer/events`)) {
      return 1;
    }
    if (path.startsWith(`/organizer/requests`)) {
      return 2;
    }
    if (path.startsWith(`/organizer/message`)) {
      return 3;
    }
    return -1; // If no matching prefix, return a default or error index
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    switch (newValue) {
      case 0:
        navigate(`/organizer/dashboard/${currentUser.id}`);
        break;
      case 1:
        navigate(`/organizer/events/${currentUser.id}`);
        break;
      case 2:
        navigate(`/organizer/requests/${currentUser.id}`);
        break;
      case 3:
        navigate(`/organizer/message/${currentUser.id}`);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <Nav />
      <Box sx={{ width: '100%', paddingTop: '5rem' }}>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: 'divider',
            backgroundColor: 'white',
            display: 'flex',
            borderRadius: '10px',
            margin: '1rem',
            padding: '0.7rem',
            alignItems: 'center',
            border: '0.1px solid #999999 ',
          }}
        >
          <div className="w-2/12 ps-8">
            <Avatar />
          </div>
          <div className="w-full flex items-center justify-between">
            <Tabs
              value={value}
              onChange={handleChange}
              sx={{ backgroundColor: '', width: '100%', display: 'flex', gap: '' }}
              aria-label="basic tabs example"
            >
              <Tab sx={{ marginLeft: '7rem' }} label="Dashboard" />
              <Tab sx={{ marginLeft: '9rem' }} label="Events" />
              <Tab sx={{ marginLeft: '9rem' }} label="Requests" />
              <Tab sx={{ marginLeft: '9rem' }} label="Message" />
            </Tabs>
          </div>
        </Box>
        <CustomTabPanel value={value} index={0}>
            Dashboard Content
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
             <EventPannel />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
             Requests Content
        </CustomTabPanel>
        <CustomTabPanel value={value} index={3}>
               Message Content
        </CustomTabPanel>
      </Box>
    </>
  );
}