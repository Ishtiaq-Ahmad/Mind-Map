import * as React from 'react';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import ListAltIcon from '@mui/icons-material/ListAlt';
import DragAbleNodes from './DragAbleNodes'
import AddBoxIcon from '@mui/icons-material/AddBox';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import FormatPaintIcon from '@mui/icons-material/FormatPaint';
import EditNode from './EditNode';
import EditEdge from './EditEdge';
import NodesInfo from './NodesInfo'
import "../../style/SideBar.css";

const MTabs = () => {
     const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };  

  return <div>
      {/* <Box sx={{ width: '100%' }}> */}
      <TabContext value={value}>
      
        <div style={{borderBottom: '1px solid #bebfc0'}}>
          <TabList onChange={handleChange} aria-label="lab API tabs example" className='tab_data'  sx={{display:'flex',justifyContent:"space-between"}}>
            <Tab icon={<AddBoxIcon />} value="1" />
            <Tab icon={<ListAltIcon />} value="2" /> 
            <Tab icon={<ColorLensIcon />}  value="3" />
            <Tab icon={<FormatPaintIcon />}  value="4" />
         
          </TabList>
      
        </div>
        <TabPanel value="1">{<DragAbleNodes/> }</TabPanel>
        <TabPanel value="2">{<NodesInfo/>}</TabPanel>
        <TabPanel value="3">{<EditNode/>}</TabPanel>
        <TabPanel value="4">{<EditEdge/>}</TabPanel>

      </TabContext>
    {/* </Box> */}
  </div>;
};

export default MTabs;
