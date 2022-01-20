import React, { useContext } from "react";
import "../../style/SideBar.css";
import NodeContext from "../../Context/auth/authContext";
import Button from "@mui/material/Button";
import { v4 as uuidv4 } from "uuid";
import Tabs from './MTabs';



const MindMapSideBar = (props) => {
  const nodeContext = useContext(NodeContext);
  const { showFormat } = nodeContext.data;

  // const{selectedTab} = props;

  //   const imageHandler = (e) => {

  //   const selectImage = e.target.files[0];
  // const ALLOWED_TYPES = ['image/png'];
  // if(selectImage && ALLOWED_TYPES.includes(selectImage.type)){
  // let hello =''
  // setImage(
  //  hello =  URL.createObjectURL(selectImage)
  // )
  // }
  // else{
  //     alert('Only PNG file supported')
  // }
  // };
  // let nodeId = uuidv4();

  // const fileHandler = () =>{
  // const csvNode = {
  //     id: uuidv4(),
  //     type: 'default',
  //     position: {x: xNumber, y: yNumber},
  //     data: { label: 'new csv data' },
  //     // style:{ width: '150px'},
  //   };
  //   let newCsvData = [...dataset[props.selectedTab], csvNode];
  //   myCsvFileHandler(props.selectedTab, newCsvData )
  // }

 
  return (
    <div>
      <Tabs/>
      {/* {showFormat ? <EditNode /> : null} */}
      {/* {showEdit ? <DragAbleNodes /> : null} */}
      {/* {props.showArrow ? <EditEdge /> : null} */}
      <img className="captureImage" src={props.screenCapture} />
      {props.screenCapture && (
        <Button onClick={props.handleSave} fullWidth variant="contained">
          Download
        </Button>
      )}
    </div>
  );
};

export default MindMapSideBar;
