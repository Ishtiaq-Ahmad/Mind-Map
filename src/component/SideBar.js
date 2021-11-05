import React, { useContext, useState } from "react";
import { TextField, Switch } from "@material-ui/core";
import "./SideBar.css";
import DragAbleNodes from "./DragAbleNodes";
import Curved from "../assets/images/curved_arrow.PNG";
import Smooth from "../assets/images/smooth_arrow.PNG";
import Straight from "../assets/images/straight_arrow.PNG";
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
  faFont,
} from "@fortawesome/free-solid-svg-icons";
import Button from "@mui/material/Button";
import capital from "../assets/images/capital.png";
import upper from "../assets/images/upper.png";
import check from "../assets/images/check.png";
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
// import smoothStep from "../assets/images/smoothStep.png";
import shape from "../assets/images/shape.PNG";

const MindMapSideBar = (props) => {
  console.log("hiiiii", props.selectedTab);
  const nodeContext = useContext(NodeContext);
  const multitabContext = useContext(MultiTabContext);
  const [hidden, setHidden] = useState(false);
  const [selectedColor, setSelectedColor] = useState("#ccc");
  const [hiddenText, setHiddenText] = useState(false);

  const {
    data: {
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
  } = multitabContext;
  const { showEdit, showFormat } = nodeContext.data;
  const [color, setColor] = useState("primary");
  const [hiddenBorder, setHiddenBorder] = useState(false);
  const changeSmoothArray = () => {
    props.setArrowTypeName("smoothstep");
  };

  const changeCurvedArray = () => {
    props.setArrowTypeName("default");
  };
  const changStraightArray = () => {
    props.setArrowTypeName("straight");
  };
  const changeStraightLine = () => {
    props.setSelectAnimation(false);
  };
  const changeDotedLine = () => {
    props.setSelectAnimation(true);
  };
  const fontItalic = () => {
    props.setFontStyle("italic");
  };
  const fontBold = () => {
    props.setFontStyle("bold");
  };
  const fontUnderLine = () => {
    props.setFontStyle("underLine");
  };
  const fontStrikeThrough = () => {
    props.setFontStyle("line-through");
  };
  const smallFont = () => {
    props.setTextSize("small");
  };
  const mediumFont = () => {
    props.setTextSize("medium");
  };
  const largeFont = () => {
    props.setTextSize("large");
  };
  const upperFont = () => {
    props.setTextTransform("uppercase");
  };
  const lowerFont = () => {
    props.setTextTransform("lowercase");
  };
  const selectImage = () => {
    props.setUploadImage({ click });
  };
  const imageHandler = (e) => {
    console.log();
    props.setUploadImage(
      <img
        style={{ width: "22px" }}
        src={
          "https://www.google.com/chrome/static/images/download-browser/big_pixel_phone.png"
        }
        alt="nodeIcon"
      />
    );
  };

  const borderSizeIncrease = () => {
    props.setBorderSize(props.borderSize + 1);
  };
  const borderSizeDecrease = () => {
    if (props.borderSize > 0) {
      props.setBorderSize(props.borderSize - 1);
    } else {
      props.setBorderSize(0);
    }
  };
  const borderRadiosIncrease = () => {
    props.setBorderRadios(props.borderRadios + 1);
  };
  const borderRadiosDecrease = () => {
    if (props.borderRadios > 0) {
      props.setBorderRadios(props.borderRadios - 1);
    } else {
      props.borderRadios(0);
    }
  };

  // className="sidebar_bg"
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
            size="small"
            variant="outlined"
          />
          <input type="file" onChange={imageHandler} name="image" id="input" />
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
              // onChange={(evt) => props.setTransparentNode(evt.target.value)}
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
              id="13px"
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
            <label>Hide Node or Edge:</label>
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
          <div>
            <h4>Select Arrow</h4>
            <span className="arrow">
              <img
                src={Curved}
                alt="curved arrow"
                className="curved"
                onClick={changeCurvedArray}
              />
              <img
                src={Smooth}
                alt="smooth arrow"
                className="curved"
                onClick={changeSmoothArray}
              />
              <img
                src={Straight}
                alt="straight arrow"
                className="curved"
                onClick={changStraightArray}
              />
            </span>
          </div>
          <div>
            <h4>Select Animation</h4>
            <span className="animation">
              <img
                src={line}
                alt="straight line"
                className="line"
                onClick={changeStraightLine}
              />
              <img
                src={doted}
                alt="Doted line"
                className="line"
                onClick={changeDotedLine}
              />
            </span>
          </div>
          <div>
            <h4>Change Label Name</h4>
            <TextField
              className="node_label"
              value={props.edgeLabel}
              name={props.edgeLabel}
              onChange={(evt) => props.setEdgeLabel(evt.target.value)}
              label={props.edgeLabel}
              size="small"
              variant="outlined"
            />
            {/* <label>Node Color</label>  */}
            {/* <input type="color" className="bg_color" value={props.labelColor} name ='color' onChange={(evt) => props.setLabelColor(evt.target.value)}/> */}
          </div>
        </>
      ) : null}
      <DragAbleNodes />
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
