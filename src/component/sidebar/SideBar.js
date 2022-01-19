import React, { useContext } from "react";
import "../../style/SideBar.css";
import DragAbleNodes from "../DragAbleNodes";
import NodeContext from "../../Context/auth/authContext";
import MultiTabContext from "../../Context/multiTab/MultiTabContext";
import Button from "@mui/material/Button";
import { v4 as uuidv4 } from "uuid";
import EditNode from "./EditNode";
import EditEdge from "./EditEdge";
import Tabs from './Tabs'


const MindMapSideBar = (props) => {
  const nodeContext = useContext(NodeContext);
  const multitabContext = useContext(MultiTabContext);

  const {
    data: { dataset, periodsNodesData, selectedTab },
    loaderFile,
    periodsDataHandler,
  } = multitabContext;
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
  var i = 1;
  const _csvFileHandler = (e) => {
    let myResult;
    const file = e.target.files[0];
    var reader = new FileReader();
    reader.onload = function (event) {
      myResult = event.target.result;
      //  const myJSON = JSON.stringify(myResult);
      const data = csvToArray(myResult);
    };
    reader.readAsText(file);

    let _newCsvData;
    const csvToArray = (str, delimiter = ",") => {
      const headers = str.slice(0, str.length - 1).split("\n");

      const arr1 = headers[0];
      let arr2 = [];
      arr2 = arr1.split(",");
      // let arr3 = arr2.slice(0,2)
      const arr4 = arr2.slice(2);
      const arr5 = arr4.map((element) => {
        return element;
      });
      periodsDataHandler(arr5);

      let arr = [];
      let arr10 = [];
      let valuesData = [];
      let _indexNumber = [];
      for (i = 1; i <= headers.length - 1; i++) {
        const xNumber = Math.floor(Math.random() * 100 + 1);
        const yNumber = Math.floor(Math.random() * 100 + 1);
        const arr6 = headers[i];
        const arr7 = arr6.split(",");
        const indexNumber = arr7.find((element) => element > 0);
        _indexNumber.push(indexNumber);
        const arr8 = arr7.slice(1, 2);
        arr10.push(arr8);
        const arr9 = arr7.slice(2);
        valuesData.push(arr9);
        let _csvNode = {
          id: uuidv4(),
          type: "default",
          position: { x: xNumber, y: yNumber },
          // data: { label: headers[i].replace(/,/g, ' ')},
          data: {
            label: (
              <>
                <strong>{`${indexNumber}  `}</strong>
                {arr8}
                <strong> {periodsNodesData}</strong>
              </>
            ),
          },
        };
        arr.push(_csvNode);
        //  _newCsvData = [...dataset[props.selectedTab], ...arr];

        let _newCsvData;
        if (dataset && dataset.length > 0) {
          _newCsvData = [...dataset[selectedTab], ...arr];
        } else {
          _newCsvData = [...arr];
        }
        loaderFile(_newCsvData, _indexNumber, valuesData, arr4, arr10);
      }
    };
  };
  return (
    <div>
      <Tabs/>
      {/* {showFormat ? <EditNode /> : null} */}
      {/* {showEdit ? <DragAbleNodes /> : null} */}
      {/* {props.showArrow ? <EditEdge /> : null} */}
      {/* <DragAbleNodes /> */}
      {/* <FileUploader/> */}
      <input type="file" onChange={_csvFileHandler} />
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
