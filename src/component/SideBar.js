import React, { useContext, useState, useEffect } from "react";
import { TextField, Switch } from "@material-ui/core";
import "./SideBar.css";
import DragAbleNodes from "./DragAbleNodes";
import NodeContext from "../Context/auth/authContext";
import MultiTabContext from "../Context/multiTab/MultiTabContext";
import line from "../assets/images/straight_line2.png";
import doted from "../assets/images/doted.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FlowChartData, {
  arrowLabelColor,
  transformFont,
  nodeTransparentData,
} from "./FlowChartData";
import {
  faBold,
  faItalic,
  faUnderline,
  faStrikethrough,
} from "@fortawesome/free-solid-svg-icons";
import Button from "@mui/material/Button";
import click from "../assets/images/click.jpg";
import { SketchPicker } from "react-color";
import MenuItem from "@mui/material/MenuItem";
import solidLine from "../assets/images/solid-line.jpg";
import dottedLine from "../assets/images/dotted-line.jpg";
import dashedLine from "../assets/images/dashed-line.png";
import doubleLine from "../assets/images/double-line.png";
import normal from "../assets/images/normal.png";
import Oval from "../assets/images/oval-bold-shape.png";
import rectangleRound from "../assets/images/rounded-rectangle.png";
import rectangle from "../assets/images/rectangular-shape-outline.png";
import smartRouting from '../assets/images/smart-routing.PNG';
import shape from "../assets/images/shape.PNG";
import EdgeCustomization from './EdgeCustomization';
import Curved from "../assets/images/curved_arrow.PNG";
import Smooth from "../assets/images/smooth_arrow.PNG";
import Straight from "../assets/images/straight_arrow.PNG";
import smoothStep from "../assets/images/smoothStep.png";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import FileUploader from './CsvFile'
import { v4 as uuidv4 } from "uuid";
const MindMapSideBar = (props) => {
  const nodeContext = useContext(NodeContext);
  const multitabContext = useContext(MultiTabContext);
  const [hidden, setHidden] = useState(false);
  const [selectedColor, setSelectedColor] = useState("#ccc");
  const [hiddenText, setHiddenText] = useState(false);

  const {
    data: {
      dataset,
      nodeName,
      selectedNodeName,
      borderColor,
      hideTree,
      _hideAllNodes,
      nodeHide,
      nodeFontColor,
      nodeText,
      nodeTransparent,
      borderRadios,
      borderWidth,
      nodeFont,
      edgeLabelName,
      edgeLabelFont,
      edgeLabelColor,
      arrowColor,
      arrowWidth,
      nodeSize,
      periodsNodesData
    },
    bgColorHandler,
    nodeNameHandler,
    borderColorHandler,
    textColorHandler,
    nodeTransparentHandler,
    borderRadiosDecreaseHandler,
    borderRadiosIncreaseHandler,
    borderWidthDecreaseHandler,
    borderWidthIncreaseHandler,
    fontSizeDecreaseHandler,
    fontSizeIncreaseHandler,
    borderStyleHandler,
    fontStyleHandler,
    nodeShapeHandler,
    nodeTextTransform,
    hideAllNodesHandler,
    hideNodeHandler,
    hideTreeHandler,
    changeArrowType,
    changeLineHandler,
    edgeLabelNameHandler,
    labelFontWeightHandler,
    edgeLabelColorHandler,
    arrowColorHandler,
    arrowHeadHandler,
    arrowWidthDecreaseHandler,
    arrowWidthIncreaseHandler,
    imageHandler,
    nodeSizeDecreaseHandler,
    nodeSizeIncreaseHandler,
    csvFileHandler,
    myCsvFileHandler,
    loaderFile,
    periodsDataHandler
  } = multitabContext;
  const {showFormat } = nodeContext.data;
  const [color, setColor] = useState("primary");
  const [hiddenBorder, setHiddenBorder] = useState(false);
  const [labelColorHide, setLabelColoHide] = useState(false);
  const [arrowColorHide, setArrowColorHide] = useState(false);
  const [image, setImage] = useState(null)
 
 
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
  const xNumber = Math.floor(Math.random() * 100 + 1);
  const yNumber = Math.floor(Math.random() * 100 + 1);
  const fileHandler = () =>{
  const csvNode = {
      id: uuidv4(),
      type: 'default',
      position: {x: xNumber, y: yNumber},
      data: { label: 'new csv data' },
      // style:{ width: '150px'},
    };
    let newCsvData = [...dataset[props.selectedTab], csvNode];
    myCsvFileHandler(props.selectedTab, newCsvData )
  }
var i = 1;
const _csvFileHandler = (e)=>{
let myResult;
  const file = (e.target.files[0])
    var reader = new FileReader();
    reader.onload = function(event) {
     myResult = event.target.result;
    //  const myJSON = JSON.stringify(myResult);
     const data = csvToArray(myResult);
  };
    reader.readAsText(file);
    
     let _newCsvData
  const csvToArray = (str, delimiter = ",") => { 
    
  const headers = str.slice(0, str.length-1).split("\n");
  
  const arr1 = headers[0]
  let arr2 = []
  arr2 = arr1.split(',')
  // let arr3 = arr2.slice(0,2)
  const arr4 = arr2.slice(2)
  const arr5 = arr4.map((element) =>{
    return (element)
  })
  periodsDataHandler(arr5)
  
  let arr = []
  let arr10 = []
  for( i = 1; i <= headers.length-1; i++){
   
    const arr6  = headers[i]
    const arr7 = arr6.split(',')
    const arr10 = arr7.slice(0, 2)
    // console.log('arr8',arr8);
    //  arr10.push(arr8)
     
    const arr9 = arr7.slice(2)
 
    let _csvNode = {
      id: uuidv4(),
      type: 'default',
      position: {x: xNumber, y: yNumber},
      // data: { label: headers[i].replace(/,/g, ' ')},   
      data: {label : (<>{arr10}<strong> {periodsNodesData}</strong></>) } 
    };  
      arr.push(_csvNode)
     _newCsvData = [...dataset[props.selectedTab], ...arr];
     
     loaderFile(props.selectedTab, _newCsvData , arr9, arr4,arr10)
      
   }    

 }
}
  return (
    <div>
      {showFormat ? (
        <div className="text_bg">
          <TextField
            className="node_label"
            value={nodeName}
            onChange={(evt) => {
              nodeNameHandler(evt.target.value, props.selectedTab);
            }}
            label={selectedNodeName}
            // placeholder={selectedNodeName}
            size="small"
            variant="outlined"
          />
           <label> Upload an Image </label>
            <input type="file" onChange={(e) =>{
              const selectImage = e.target.files[0];
                const allowed_types = ['image/png'];
                if(selectImage && allowed_types.includes(selectImage.type)){
              let imageLoad =  URL.createObjectURL(selectImage)
                imageHandler(e,imageLoad , props.selectedTab)
                  //  let reader = new FileReader()
                  //  let bsdk = '';
                  //   reader.onloadend = () => {
                    
                  //     bsdk = reader.result
                      
                  //         imageHandler(e,bsdk , props.selectedTab)
                  //       // setImage(reader.result)
                  //   }
                  //   reader.readAsDataURL(selectImage)
                    // console.log('o bskd', bsdk)
                   
                }
                
                else{
                    alert('Only PNG file supported')
                }
              
            } } name="image" id="input" accept="image/*" />
          <label> Background color </label>
          {hidden && (
            <SketchPicker
              color={selectedColor}
              // title={nodeBackground}
              onChange={(updatedColor) => {
                setSelectedColor(updatedColor.hex);
                bgColorHandler(updatedColor.hex, props.selectedTab);
              }}
            />
          )}
          <Button
            color={color}
            variant="outlined"
            size="small"
            onClick={() => setHidden(!hidden)}
          >
            {hidden ? `Close Background Color` : "Background Color"}{" "}
          </Button>

          <label>Border color</label>
          {hiddenBorder && (
            <SketchPicker
              color={borderColor}
              onChange={(updatedColor) => {
                borderColorHandler(updatedColor.hex, props.selectedTab);
              }}
            />
          )}
          <Button
            variant="outlined"
            size="small"
            onClick={() => setHiddenBorder(!hiddenBorder)}
          >
            {hiddenBorder ? `Close Border Color` : "border Color"}{" "}
          </Button>
          <label>Font color</label>
          {hiddenText && (
            <SketchPicker
              color={nodeFontColor}
              onChange={(updatedColor) =>
                textColorHandler(updatedColor.hex, props.selectedTab)
              }
            />
          )}
          <Button
            variant="outlined"
            size="small"
            onClick={() => setHiddenText(!hiddenText)}
          >
            {hiddenText ? `Close Text Color` : "Text Color"}{" "}
          </Button>
          <div className="upper_lower">
            <TextField
              className="node_label"
              select
              value={nodeTransparent}
              name={nodeTransparent}
              onChange={(evt) => {
                nodeTransparentHandler(evt.target.value, props.selectedTab);
              }}
              label="Transparent Node"
              size="small"
              variant="outlined"
              fullWidth
            >
              {nodeTransparentData.map((option) => (
                <MenuItem key={option.label} value={option.label}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </div>
          <div className="border">
            <label>Node Size</label>
            <span className="borderWidth">
              <button
                onClick={() => nodeSizeDecreaseHandler(props.selectedTab)}
                className="borderWidthButton"
              >
                <strong>-</strong>
              </button>
              <h4 className="borderFont">{nodeSize}px</h4>
              <button
                onClick={() => nodeSizeIncreaseHandler(props.selectedTab)}
                className="borderWidthButton"
              >
                <strong>+</strong>
              </button>
            </span>
          </div>
          <div className="border">
            <label>Border Radius</label>
            <span className="borderWidth">
              <button
                onClick={() => borderRadiosDecreaseHandler(props.selectedTab)}
                className="borderWidthButton"
              >
                <strong>-</strong>
              </button>
              <h4 className="borderFont">{borderRadios}px</h4>
              <button
                onClick={() => borderRadiosIncreaseHandler(props.selectedTab)}
                className="borderWidthButton"
              >
                <strong>+</strong>
              </button>
            </span>
          </div>
          <div className="border">
            <label>Border Thickness</label>
            <br />
            <span className="borderWidth">
              <button
                onClick={() => borderWidthDecreaseHandler(props.selectedTab)}
                className="borderWidthButton"
              >
                <strong>-</strong>
              </button>
              <h4 className="borderFont">{borderWidth}px</h4>
              <button
                onClick={() => borderWidthIncreaseHandler(props.selectedTab)}
                className="borderWidthButton"
              >
                {" "}
                <strong>+</strong>{" "}
              </button>
            </span>
          </div>
          <div className="border">
            <label>Font Size</label>
            <br />
            <span className="borderWidth">
              <button
                onClick={() => fontSizeDecreaseHandler(props.selectedTab)}
                className="borderWidthButton"
              >
                <strong>-</strong>
              </button>
              <h4 className="borderFont">{nodeFont}px</h4>
              <button
                onClick={() => fontSizeIncreaseHandler(props.selectedTab)}
                className="borderWidthButton"
              >
                {" "}
                <strong>+</strong>{" "}
              </button>
            </span>
          </div>
          <label>Border Style</label>
          <div className="font_style">
            <img
              src={dottedLine}
              alt="dottedLine "
              className="lineStyle"
              onClick={(e) => borderStyleHandler(e, props.selectedTab)}
              id="dotted"
              // value={props.borderStyle}
            />
            <img
              src={dashedLine}
              alt="dottedLine "
              className="lineStyle"
              onClick={(e) => borderStyleHandler(e, props.selectedTab)}
              id="dashed"
            />
            <img
              src={doubleLine}
              alt="dottedLine "
              className="lineStyle"
              onClick={(e) => borderStyleHandler(e, props.selectedTab)}
              id="double"
            />
            <img
              src={solidLine}
              alt="dottedLine "
              className="lineStyle"
              onClick={(e) => borderStyleHandler(e, props.selectedTab)}
              id="solid"
            />
          </div>

          <label>Font Style</label>
          <div className="font_style">
            <img
              src={normal}
              alt="captial A "
              className="normal"
              onClick={(e) => fontStyleHandler(e, props.selectedTab)}
              id="normal"
            />
            <FontAwesomeIcon
              icon={faBold}
              className="edit_text_style"
              onClick={(e) => fontStyleHandler(e, props.selectedTab)}
              size="lg"
              id="bold"
            />
            <FontAwesomeIcon
              icon={faItalic}
              className="edit_text_style"
              onClick={(e) => fontStyleHandler(e, props.selectedTab)}
              size="lg"
              id="italic"
            />
            <FontAwesomeIcon
              icon={faUnderline}
              className="edit_text_style"
              onClick={(e) => fontStyleHandler(e, props.selectedTab)}
              size="lg"
              id="underLine"
            />
            <FontAwesomeIcon
              icon={faStrikethrough}
              className="edit_text_style"
              onClick={(e) => fontStyleHandler(e, props.selectedTab)}
              size="lg"
              id="line-through"
            />
          </div>
          <div className="upper_lower">
            <TextField
              className="node_label"
              select
              value={nodeText}
              name={nodeText}
              onChange={(evt) =>
                nodeTextTransform(evt.target.value, props.selectedTab)
              }
              label="Select Text Transfrom"
              size="small"
              variant="outlined"
              fullWidth
            >
              {transformFont.map((option) => (
                <MenuItem key={option.label} value={option.label}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </div>
          <label>Node Shape</label>
          <div className="font_style">
            <img
              src={shape}
              alt="dottedLine "
              className="lineStyle1"
              onClick={(e) => nodeShapeHandler(e, props.selectedTab)}
              id="15px 0px 15px 0px"
            />
            <img
              src={Oval}
              alt="dottedLine "
              className="lineStyle"
              onClick={(e) => nodeShapeHandler(e, props.selectedTab)}
              id="116px / 24px"
            />
            <img
              src={rectangleRound}
              alt="dottedLine "
              className="lineStyle"
              onClick={(e) => nodeShapeHandler(e, props.selectedTab)}
              id="25px"
            />
            <img
              src={rectangle}
              alt="dottedLine "
              className="lineStyle"
              onClick={(e) => nodeShapeHandler(e, props.selectedTab)}
              id="0px"
            />
          </div>
          <div className="hideElements">
            <label>Hide all Nodes:</label>
            <Switch
              checked={_hideAllNodes}
              onChange={(evt) =>
                hideAllNodesHandler(evt.target.checked, props.selectedTab)
              }
              color="primary"
              name="checkedB"
              className="switchHide"
              inputProps={{ "aria-label": "primary checkbox" }}
            />
          </div>
          <div className="hideElements">
            <label>Hide Node:</label>
            <Switch
              checked={nodeHide}
              onChange={(evt) =>
                hideNodeHandler(evt.target.checked, props.selectedTab)
              }
              color="primary"
              name="checkedB"
              className="switchHide"
              inputProps={{ "aria-label": "primary checkbox" }}
            />
          </div>
          <div className="hideElements">
            <label>Hide a Tree:</label>
            <Switch
              checked={hideTree}
              onChange={(evt) =>
                hideTreeHandler(evt.target.checked, props.selectedTab)
              }
              color="primary"
              name="checkedB"
              className="switchHide"
              inputProps={{ "aria-label": "primary checkbox" }}
            />
          </div>
        </div>
      ) : null}

      {/* {showEdit ? <DragAbleNodes /> : null} */}

      {props.showArrow ? (
        <>
        {/* <EdgeCustomization/> */}
          <div>
              <h4>Select Arrow</h4>
            <span className="arrow">
              <img
                src={Curved}
                alt="curved arrow"
                className="curved"
                onClick={(e) => changeArrowType(e,props.selectedTab)}
                id='curved'
              />
              <img
                src={Smooth}
                alt="step arrow"
                className="curved"
                onClick={(e) => changeArrowType(e,props.selectedTab)}
                 id='step'
              />
              <img
                src={smoothStep}
                alt="smooth arrow"
                className="curved"
                onClick={(e) => changeArrowType(e,props.selectedTab)}
                  id='smoothstep'
              />
              <img
                src={Straight}
                alt="straight arrow"
                className="curved"
                onClick={(e) => changeArrowType(e,props.selectedTab)}
                id='straight'
              />
               <img
                src={smartRouting}
                alt="straight arrow"
                className="curved"
                onClick={(e) => changeArrowType(e,props.selectedTab)}
                id='smart'
              />
            </span>
              <div>
            <h4>Select Animation</h4>
            <span className="animation">
              <img
                src={line}
                alt="straight line"
                className="line"
                onClick={() => changeLineHandler(props.selectedTab)}
              />
              <img
                src={doted}
                alt="Doted line"
                className="line"
                onClick={() => changeLineHandler(props.selectedTab)}
              />
            </span>
          </div>
          <h4>Change Label Name</h4>
          <TextField
            className="node_label"
            value={edgeLabelName}
            name={edgeLabelName}
            onChange={(evt) => edgeLabelNameHandler(evt.target.value,props.selectedTab)}
            label="Label Name"
            size="small"
            variant="outlined"
          />
          <div>
            <TextField
              className="node_label"
              select
              value={edgeLabelFont}
              name={edgeLabelFont}
              onChange={(evt) => labelFontWeightHandler(evt.target.value, props.selectedTab)}
              label="Font Weight"
              size="small"
              variant="outlined"
              helperText="Select Font weight for Label"
              fullWidth
            >
              {arrowLabelColor.map((option) => (
                <MenuItem key={option.label} value={option.label}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <div style={{ marginBottom: "10px" }}>
            <label>Change Label Color</label>
            <Button
              variant="outlined"
              fullWidth
              size="small"
              onClick={() => setLabelColoHide(!labelColorHide)}
            >
              {labelColorHide ? `Close label color` : "Open label color"}{" "}
            </Button>
            {labelColorHide && (
              <SketchPicker
                color={edgeLabelColor}
                title={edgeLabelColor}
                onChange={(updatedColor) =>
                  edgeLabelColorHandler(updatedColor.hex,props.selectedTab)
                
                }
              />
            )}
          </div>

          </div>
          <label>Change Arrow Color</label>
          <Button
            variant="outlined"
            fullWidth
            size="small"
            onClick={() => setArrowColorHide(!arrowColorHide)}
          >
            {arrowColorHide ? `Close Arrow Color` : "Open Arrow Color"}{" "}
          </Button>
          {arrowColorHide && (
            <SketchPicker
              color={arrowColor}
              title={arrowColor}
              onChange={(updatedColor) => arrowColorHandler(updatedColor.hex,props.selectedTab)}
            />
          )}
           <div className="font_style">
            <KeyboardArrowRightIcon 
            className="arrow_head"
             onClick={(e) => arrowHeadHandler(e,props.selectedTab)}
             id ='arrow' />
            <ArrowRightIcon 
            
            onClick={(e) => arrowHeadHandler(e,props.selectedTab)}
            className="arrow_head"
             id='arrowclosed' />
          </div>
           <div className="border">
            <label>Arrow width</label>
            <span className="borderWidth">
              <button onClick={() => arrowWidthDecreaseHandler(props.selectedTab)} className="borderWidthButton">
                <strong>-</strong>
              </button>
              <h4 className="borderFont">{arrowWidth}px</h4>
              <button
                onClick={() => arrowWidthIncreaseHandler(props.selectedTab)}
                className="borderWidthButton"
              >
                <strong>+</strong>
              </button>
            </span>
          </div>
           </div>
        </>
      ) : null}
      <DragAbleNodes />
      {/* <FileUploader/> */}
       <input type = 'file' onChange={_csvFileHandler} />
       <button onClick={fileHandler}>hello </button>
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
