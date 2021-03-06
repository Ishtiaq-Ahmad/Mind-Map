import React, { useContext, useState } from "react";
import MultiTabContext from "../../Context/multiTab/MultiTabContext";
import Typography from "@mui/material/Typography";
import Divider from '@mui/material/Divider';
import "../../style/SideBar.css";

const NodesInfo = () => {
  const multitabContext = useContext(MultiTabContext);
  const { dataset, selectedTab } = multitabContext.data;
  let myData = [ ];
 

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
       { 
       element.type === 'input' || element.type === 'output' || element.type === 'default' || element.type === 'special'? (
         <>
         <Typography variant="caption" gutterBottom >
            <strong>{ index + 1}</strong> 
          </Typography><br/>
     
          <Typography variant="caption" gutterBottom >
            {/* <strong>Node Name: </strong> {element.source === undefined && element.target === undefined ? element.data.label: ''} */}
           <strong>{ element.data.label} </strong> 
          
          </Typography>
          <Divider />
          </>
       ): null
       }
          
        </div>
      ))}
     
    </div>
  );
};

export default NodesInfo;
