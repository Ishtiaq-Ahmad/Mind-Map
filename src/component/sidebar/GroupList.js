import React, {useContext} from 'react';
import Box from "@mui/material/Box";
import Typography from "@material-ui/core/Typography";
import MultiTabContext from '../../Context/multiTab/MultiTabContext';
import Divider from "@mui/material/Divider";
import Switch from '@mui/material/Switch';

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  height: 500,
  bgcolor: "#F8F8FF",
  border: "2px solid #ADD8E6",
  borderRadius: "13px",
  boxShadow: 24,
  p: 3,
  overflow: 'auto',
};
const GroupList = () => {
    const multiTabContext  = useContext(MultiTabContext);
    const {data: {groupName, fetchData,nodeHide},hideNodeHandler} = multiTabContext;
    let arr = [...fetchData]
  return (
    <div>
        <Box sx={style}>
         <Typography id="modal-modal-title" variant="h6" component="h2" style={{display:'flex', justifyContent:"center" }}>
        Group List
      </Typography>
      <div style={{display:"flex", justifyContent:"space-between"}}>
        <Typography id="modal-modal-title" variant="body1" component="h2">
       <strong> {groupName}</strong>
      </Typography>
      
       <Switch
            checked={nodeHide}
            onChange={(evt) => hideNodeHandler(evt.target.checked)}
            color="primary"
            // name="checkedB"
            className="switchHide"
            inputProps={{ "aria-label": "primary checkbox" }}
          />
      </div>
              {arr.map((item, index) => (
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
        </Box>
    </div>
  )
}

export default GroupList