import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import { useParams } from 'react-router-dom';
import './CourseDetailPage.css';
import Stream from '../../components/Stream/Stream';
import People from '../../components/People/People';

export default function CourseDetailPage() {
  const [value, setValue] = React.useState('stream');
  const { id } = useParams();
  console.log(id);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box className="tabs" sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange}>
            <Tab className="tab" label="Stream" value="stream" />
            <Tab className="tab" label="People" value="people" />
          </TabList>
        </Box>
        {value === 'stream' ? <Stream /> : <People />}
      </TabContext>
    </Box>
  );
}
