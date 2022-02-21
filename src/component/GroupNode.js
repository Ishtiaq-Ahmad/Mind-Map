import React, { useContext, useState} from "react";
import Typography from "@material-ui/core/Typography";
import MultiTabContext from "../Context/multiTab/MultiTabContext";
import Divider from "@mui/material/Divider";
import TextField from '@mui/material/TextField';
import Box from "@mui/material/Box";
import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';
import {createDocWithID,getDocById, updateDocWithId} from '../utils/helpers';
import { v4 as uuidv4 } from "uuid";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
//   height: 500,
  bgcolor: "#F8F8FF",
  border: "2px solid #ADD8E6",
  borderRadius: "13px",
  boxShadow: 24,
  p: 3,
//   overflow: 'auto',
};

const GroupNode = () => {
  const multiTabContext = useContext(MultiTabContext);
//   const [createGroup, setCreateGroup] = useState('')
  const {
    data: { multiNodeData , fetchData,docID, createGroup },fetchGroupStatusHandler, createGroupHandler, handleClose, showGroupList
  } = multiTabContext;

//   let array1= [...fetchData]
//   let dataLength = array1.splice(array1.length-multiNodeLength, multiNodeLength )


const saveGroupHandler = async () => {
    
    
  if (fetchData) {
    let arrrr123 = {
      nodeData: multiNodeData,
      groupName: createGroup,
       visible: true

      //   buttonCheck:true
    };

    let finalData = [...fetchData, arrrr123];
    updateDocWithId("groupNodes", docID, { finalData });
    // issue an event to context to clear the grouped nodes for group creation
  
    
  } else {
    const multiGroupData = {
      nodeData: multiNodeData,
      groupName: createGroup,
      visible: true
    };
    await createDocWithID("groupNodes", docID, { finalData: [multiGroupData] });
  }
  showGroupList();
  handleClose();
};
  
  return (
    <Box sx={style}>
     
      <div style={{display:'flex', justifyContent:"space-between", alignItems:'center'}}> 
      <Typography id="modal-modal-title" variant="body2" component="h2" style={{color:"green"}}>
        Please create group name: 
      </Typography>
    <TextField id="standard-basic"  size="small"  variant="outlined" onChange={(evt) => createGroupHandler(evt.target.value)} />
    </div>
    <div style={{display:"flex", justifyContent:"space-between"}}>
     <Typography id="modal-modal-title" variant="body1" component="h2">
       <strong> {createGroup}</strong>
      </Typography>
          </div>
      {multiNodeData.map((item, index) => (
        <fragment key={item.id}>
          <Typography variant="caption" gutterBottom component="div">
            {/* <strong>Node Number:</strong> {index + 1} */}
          </Typography>
          <Typography variant="caption" gutterBottom component="div">
            <strong>Node ID:</strong> {item.id}
          </Typography>

          <Typography variant="caption" gutterBottom component="div">
            {/* <strong>Node Name: </strong> {element.source === undefined && element.target === undefined ? element.data.label: ''} */}
            <strong>Node Name: </strong> {item.data.label}
          </Typography>
          <Divider />
        </fragment>
      ))}

      <Button variant="contained"  style={{marginTop:'10px', float:"right"}} onClick={saveGroupHandler} >Save Group</Button>
    </Box>
  );
};

export default GroupNode;
