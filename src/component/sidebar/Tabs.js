import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import ListAltIcon from '@mui/icons-material/ListAlt';
import DragAbleNodes from '../DragAbleNodes'
import AddBoxIcon from '@mui/icons-material/AddBox';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import FormatPaintIcon from '@mui/icons-material/FormatPaint';
import EditNode from './EditNode';
import EditEdge from './EditEdge';

const Tabs = () => {
     const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };  

  return <div>
      {/* <Box sx={{ width: '100%', typography: 'body1' }}> */}
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
          AddBoxIcon
          {/* <div style={{Background:"red"}}> */}
            <Tab icon={<AddBoxIcon />} value="1" />
            <Tab icon={<ListAltIcon />} value="2" /> 
            <Tab icon={<ColorLensIcon />}  value="3" />
            <Tab icon={<FormatPaintIcon />}  value="4" />
          {/* </div> */}
          </TabList>
        </Box>
        <TabPanel value="1">{<DragAbleNodes/> }</TabPanel>
        <TabPanel value="2">Two</TabPanel>
        <TabPanel value="3">{<EditNode/>}</TabPanel>
        <TabPanel value="4">{<EditEdge/>}</TabPanel>

      </TabContext>
    {/* </Box> */}
  </div>;
};

export default Tabs;
