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
    const {data: {groupName, fetchData,nodeHide,level},hideNodeHandler} = multiTabContext;
    let arr = [...fetchData]
    let arr1 = [...fetchData]
    let identifierData 
    arr1.map((_data) => {
        identifierData = _data._groupIdentiy
    })
    
    const _hideNodeHandler = (evt) => {
// console.log('evt', evt);
  console.log('yaa',evt.target);
    //   if (level === identifierData) {
        // hideNodeHandler(evt.target.checked);
    //   } else {
    //     console.log("name data not matched");
    //   }
    };
   
  return (
    <div>
      <Box sx={style}>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          style={{ display: "flex", justifyContent: "center" }}
        >
          Group List
        </Typography>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Typography id="modal-modal-title" variant="body1" component="h2">
            <strong> {groupName}</strong>
          </Typography>
        </div>
        {arr.map((item, index) => (
          <fragment key={index + 1}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "-8px",
              }}
            >
              <Typography variant="caption" gutterBottom component="div">
                <strong>Group Name:</strong>{" "}
                <strong>{item.groupName.toUpperCase()}</strong>
              </Typography>
              <Switch
                checked={item["visible"]}
                // name={item._groupIdentiy}
               
                onChange={(evt) => 
                { console.log({item}, {index})

                    hideNodeHandler(evt.target.checked,index)
                    }}
                  
                //   item.visible = !item.visible;
                //   let newArr = [...fetchData];
                //   newArr.map((ele) => {
                //     newArr[index].visible = !newArr[index].visible;
                //   });
                //   console.log({ newArr });
                // }}
                color="primary"
                className="switchHide"
                inputProps={{ "aria-label": "primary checkbox" }}
              />
            </div>
            {/* <strong>Node Name: </strong> {element.source === undefined && element.target === undefined ? element.data.label: ''} */}
            {item.nodeData.map((element, index) => (
              <div key={index}>
                <Typography variant="caption" gutterBottom component="div">
                  <strong>Node ID:</strong> {element.id}
                </Typography>
                <Typography variant="caption" gutterBottom component="div">
                  <strong>Node Name:</strong> {element.data.label}
                </Typography>
              </div>
            ))}
            <Divider style={{ marginBottom: "10px" }} />
          </fragment>
        ))}
      </Box>
    </div>
  );
}

export default GroupList