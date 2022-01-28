import React, { useContext, useState } from "react";
import MultiTabContext from "../../Context/multiTab/MultiTabContext";
import Typography from "@mui/material/Typography";
import Divider from '@mui/material/Divider';

const NodesInfo = () => {
  const multitabContext = useContext(MultiTabContext);
  const [dataInfo, setDataInfo] = useState('Pane is empty')
  const { dataset, selectedTab, selectedNode } = multitabContext.data;
  let myData = [ ];
  let noData = ''

try{
     myData = [...dataset[selectedTab]];   
} catch(error){
    // setDataInfo('Pane is empty')
    console.log('pane is empty');
}

  return (

    <div>
      {myData.map((element, index) => (
        <div  key={element.id}>
          
          <Typography variant="caption" gutterBottom component="div">
            <strong>Node Number:</strong> {index + 1}
          </Typography>
          <Typography variant="caption" gutterBottom component="div">
            <strong>Node ID:</strong> {element.id}
          </Typography>
  
          <Typography variant="caption" gutterBottom component="div">
            <strong>Node Name: </strong> {element.data.label}
          </Typography>
          <Divider />
        </div>
      ))}
     
    </div>
  );
};

export default NodesInfo;
