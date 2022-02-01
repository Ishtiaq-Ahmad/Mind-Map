import React, { useContext, useState, useRef } from "react";
import TextField from "@mui/material/TextField";
import MultiTabContext from "../../Context/multiTab/MultiTabContext";
import { SketchPicker } from "react-color";
import Switch from '@mui/material/Switch';
import Button from "@mui/material/Button";
import FlowChartData, {
  transformFont,
  nodeTransparentData,
} from "../FlowChartData.js";
import {
  faBold,
  faItalic,
  faUnderline,
  faStrikethrough,
} from "@fortawesome/free-solid-svg-icons";
import solidLine from "../../assets/images/solid-line.jpg";
import dottedLine from "../../assets/images/dotted-line.jpg";
import dashedLine from "../../assets/images/dashed-line.png";
import doubleLine from "../../assets/images/double-line.png";
import normal from "../../assets/images/normal.png";
import Oval from "../../assets/images/oval-bold-shape.png";
import rectangleRound from "../../assets/images/rounded-rectangle.png";
import rectangle from "../../assets/images/rectangular-shape-outline.png";
import shape from "../../assets/images/shape.PNG";
import MenuItem from "@mui/material/MenuItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../../style/SideBar.css';
import '../../style/Header.css';
import { Input } from '@mui/material';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

const EditNode = () => {
  const multitabContext = useContext(MultiTabContext);
  const [selectedColor, setSelectedColor] = useState("#ccc");
  const [hidden, setHidden] = useState(false);
  const [hiddenBorder, setHiddenBorder] = useState(false);
  const [color, setColor] = useState("primary");
    const [hiddenText, setHiddenText] = useState(false);
  const {
    data: {
      nodeName,
      selectedNodeName,
      borderColor,
      nodeFontColor,
      nodeTransparent,
       borderRadios,
      borderWidth,
      nodeHide,
      nodeFont,
      nodeText,
      hideTree,
      nodeSize,
      periodFinalData,
      _periodsValue,
      _hideAllNodes,
      selectedNode,
      hideAllNodeNumber,
      showNodeCustomization
    },
    nodeNameHandler,
    periodsValueHandler,
    imageHandler,
    bgColorHandler,
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
    nodeSizeDecreaseHandler,
    nodeSizeIncreaseHandler,
    nodeSizeHandler,
    hideNodeNumber
    } = multitabContext;
    
  const [copySuccess, setCopySuccess] = useState('');
  const textAreaRef = useRef(null);
  const copyToClipBoard = (e) =>{
   
    textAreaRef.current.select();
  document.execCommand('copy');
   e.target.focus();
    // setCopySuccess('Copied!');
    if(copySuccess === 'Copied!'){
      setCopySuccess('')
    }
    else{
      setCopySuccess('Copied!')
    }

  }
 

  return (
    <div>
    {
        showNodeCustomization ? (
           <div className="text_bg">
      
        <TextField
          className="node_label"
          value={nodeName}
          onChange={(evt) => {
            nodeNameHandler(evt.target.value);
          }}
          // label={selectedNodeName}
          placeholder={selectedNodeName}
          size="small"
          variant="outlined"
        />
        <TextField
          className="node_label"
          value={_periodsValue}
          onChange={(evt) => {
            periodsValueHandler(evt.target.value);
          }}
          label={periodFinalData}
          placeholder='Periods Value'
          size="small"
          variant="standard"
        />
        <TextareaAutosize
      aria-label="empty textarea"
      placeholder="Node ID"
      // style={{ width: 200 }}
      value={selectedNode}
      readOnly 
      ref={textAreaRef}
      // fullWidth
      // helperText={copySuccess}
      endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={copyToClipBoard}
                >
                  <ContentCopyIcon/>
                </IconButton>
              </InputAdornment>
            }
    />
        <Typography variant="overline" display="block" gutterBottom>
        {copySuccess}
      </Typography>
    <button onClick={copyToClipBoard}>Copy</button>
        <label> Upload an Image </label>
        <Input
          type="file"
          onChange={(e) => {
            const selectImage = e.target.files[0];
            const allowed_types = ["image/png"];
            if (selectImage && allowed_types.includes(selectImage.type)) {
              let imageLoad = URL.createObjectURL(selectImage);
              imageHandler(e, imageLoad);
              //  let reader = new FileReader()
              //  let bsdk = '';
              //   reader.onloadend = () => {

              //     bsdk = reader.result

              //         imageHandler(e,bsdk , props.selectedTab)
              //       // setImage(reader.result)
              //   }
              //   reader.readAsDataURL(selectImage)
              // console.log('o bskd', bsdk)
            } else {
              alert("Only PNG file supported");
            }
          }}
          name="image"
          id="input"
          accept="image/*"
        />
        <label> Background color </label>
        {hidden && (
          <SketchPicker
            color={selectedColor}
            // title={nodeBackground}
            onChange={(updatedColor) => {
              setSelectedColor(updatedColor.hex);
              bgColorHandler(updatedColor.hex);
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
              borderColorHandler(updatedColor.hex);
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
            onChange={(updatedColor) => textColorHandler(updatedColor.hex)}
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
            onChange={(evt) => nodeTransparentHandler(evt.target.value)}
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
        {/* <TextField
                id="standard-basic"
                variant="standard"
                type="number"
                size="small"
                label="Node Width"
                value ={nodeSize}
                onChange={(evt) => nodeSizeHandler(evt.target.value)}
              /> */}
          
        <div className="border">
          <label>Node Size</label>
          <span className="borderWidth">
            <button
              onClick={() => nodeSizeDecreaseHandler()}
              className="borderWidthButton"
            >
              <strong>-</strong>
            </button>
            <h4 className="borderFont">{nodeSize}px</h4>
            <button
              onClick={() => nodeSizeIncreaseHandler()}
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
              onClick={() => borderRadiosDecreaseHandler()}
              className="borderWidthButton"
            >
              <strong>-</strong>
            </button>
            <h4 className="borderFont">{borderRadios}px</h4>
            <button
              onClick={() => borderRadiosIncreaseHandler()}
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
              onClick={() => borderWidthDecreaseHandler()}
              className="borderWidthButton"
            >
              <strong>-</strong>
            </button>
            <h4 className="borderFont">{borderWidth}px</h4>
            <button
              onClick={() => borderWidthIncreaseHandler()}
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
              onClick={() => fontSizeDecreaseHandler()}
              className="borderWidthButton"
            >
              <strong>-</strong>
            </button>
            <h4 className="borderFont">{nodeFont}px</h4>
            <button
              onClick={() => fontSizeIncreaseHandler()}
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
            onClick={(e) => borderStyleHandler(e)}
            id="dotted"
            // value={props.borderStyle}
          />
          <img
            src={dashedLine}
            alt="dottedLine "
            className="lineStyle"
            onClick={(e) => borderStyleHandler(e)}
            id="dashed"
          />
          <img
            src={doubleLine}
            alt="dottedLine "
            className="lineStyle"
            onClick={(e) => borderStyleHandler(e)}
            id="double"
          />
          <img
            src={solidLine}
            alt="dottedLine "
            className="lineStyle"
            onClick={(e) => borderStyleHandler(e)}
            id="solid"
          />
        </div>

        <label>Font Style</label>
        <div className="font_style">
          <img
            src={normal}
            alt="captial A "
            className="normal"
            onClick={(e) => fontStyleHandler(e)}
            id="normal"
          />
          <FontAwesomeIcon
            icon={faBold}
            className="edit_text_style"
            onClick={(e) => fontStyleHandler(e)}
            size="lg"
            id="bold"
          />
          <FontAwesomeIcon
            icon={faItalic}
            className="edit_text_style"
            onClick={(e) => fontStyleHandler(e)}
            size="lg"
            id="italic"
          />
          <FontAwesomeIcon
            icon={faUnderline}
            className="edit_text_style"
            onClick={(e) => fontStyleHandler(e)}
            size="lg"
            id="underLine"
          />
          <FontAwesomeIcon
            icon={faStrikethrough}
            className="edit_text_style"
            onClick={(e) => fontStyleHandler(e)}
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
            onChange={(evt) => nodeTextTransform(evt.target.value)}
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
            onClick={(e) => nodeShapeHandler(e)}
            id="15px 0px 15px 0px"
          />
          <img
            src={Oval}
            alt="dottedLine "
            className="lineStyle"
            onClick={(e) => nodeShapeHandler(e)}
            id="116px / 24px"
          />
          <img
            src={rectangleRound}
            alt="dottedLine "
            className="lineStyle"
            onClick={(e) => nodeShapeHandler(e)}
            id="25px"
          />
          <img
            src={rectangle}
            alt="dottedLine "
            className="lineStyle"
            onClick={(e) => nodeShapeHandler(e)}
            id="0px"
          />
        </div>
        <div className="hideElements">
          <label>Hide all Nodes:</label>
          <Switch
            checked={_hideAllNodes}
            onChange={(evt) => hideAllNodesHandler(evt.target.checked)}
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
            onChange={(evt) => hideNodeHandler(evt.target.checked)}
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
            onChange={(evt) => hideTreeHandler(evt.target.checked)}
            color="primary"
            name="checkedB"
            className="switchHide"
            inputProps={{ "aria-label": "primary checkbox" }}
          />
        </div>
         <div className="hideElements">
          <label>Hide Node Number:</label>
          <Switch
            checked={hideAllNodeNumber}
            onChange={(evt) => hideNodeNumber(evt.target.checked)}
            color="primary"
            // name="checkedB"
            className="switchHide"
            inputProps={{ "aria-label": "primary checkbox" }}
          />
        </div>
      </div>
        ) : 'Drage Node to the page'
      }
     
    </div>
  );
};

export default EditNode;
