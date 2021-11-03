import React, { useContext } from "react";
import TextField from "@material-ui/core/TextField";
import "./SideBar.css";
import DragAbleNodes from "./DragAbleNodes";
import Curved from "../assets/images/curved_arrow.PNG";
import Smooth from "../assets/images/smooth_arrow.PNG";
import Straight from "../assets/images/straight_arrow.PNG";
import NodeContext from "../Context/auth/authContext";
import line from "../assets/images/straight_line2.png";
import doted from "../assets/images/doted.png";
import Switch from "@material-ui/core/Switch";
import InputAdornment from "@material-ui/core/InputAdornment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBold,
  faItalic,
  faUnderline,
  faStrikethrough,
  faFont,
} from "@fortawesome/free-solid-svg-icons";
import Button from "@material-ui/core/Button";
import capital from "../assets/images/capital.png";
import upper from "../assets/images/upper.png";
import check from "../assets/images/check.png";
import click from "../assets/images/click.jpg";

const MindMapSideBar = (props) => {
  const nodeContext = useContext(NodeContext);
  const { showEdit, showFormat } = nodeContext.data;

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
    if(props.borderSize > 0){
    props.setBorderSize(props.borderSize - 1);
    }
    else
    {
      props.setBorderSize(0)
    }
  };
  const borderRadiosIncrease = () => {
    props.setBorderRadios(props.borderRadios + 1);
  }
  const borderRadiosDecrease = () => {
    if(props.borderRadios > 0)
    {
      props.setBorderRadios(props.borderRadios - 1)
    }
    else
    {
      props.borderRadios(0)
    }
  } 
  // className="sidebar_bg"
  return (
    <div >
      {showFormat ? (
        <div className="text_bg">
          <label>Node Name</label>
          <TextField
            className="node_label"
            value={props.nodeName}
            name={props.nodeName}
            onChange={(evt) => props.setNodeName(evt.target.value)}
            label={props.nodeName}
            size="small"
            variant="outlined"
          />
          <input type="file" onChange={imageHandler} name="image" id="input" />

          <label>Background Color</label>
          <input
            type="color"
            className="bg_color"
            value={props.nodeBg}
            name="color"
            onChange={(evt) => props.setNodeBg(evt.target.value)}
          />
          <label>Border Color</label>
          <input
            type="color"
            className="bg_color"
            value={props.borderColor}
            name="color"
            onChange={(evt) => props.setBorderColor(evt.target.value)}
          />
          <label>Border size</label>
          {/* <TextField
            className="node_label"
            value={props.borderSize}
            onChange={(evt) => props.setBorderSize(evt.target.value)}
            // onClick={(evt) => props.setBorderSize(props.borderSize + 1) }
            label="Border Thickness"
            size="small"
            variant="outlined"
            type="number"
          /> */}

          <label>font Color</label>
          <input
            type="color"
            className="bg_color"
            value={props.textColor}
            name="color"
            onChange={(evt) => props.setTextColor(evt.target.value)}
          />
          <div>
          <button onClick={borderSizeIncrease}> + </button>
          <h3>{props.borderSize}px</h3>
          <button onClick={borderSizeDecrease}> - </button>
          </div>
          <div>
          <button onClick={borderRadiosIncrease}> + </button>
          <h3>{props.borderRadios}px</h3>
          <button onClick={borderRadiosDecrease}> - </button>
          </div>
          <div className="font_style">
          <FontAwesomeIcon icon={faBold} lassName="edit_text_style" onClick={fontBold} size="lg"/>
            <FontAwesomeIcon
              icon={faItalic}
              className="edit_text_style"
              onClick={fontItalic}
              size="lg"
            />
            <FontAwesomeIcon
              icon={faUnderline}
              className="edit_text_style"
              onClick={fontUnderLine}
              size="lg"
            />
            <FontAwesomeIcon
              icon={faStrikethrough}
              className="edit_text_style"
              onClick={fontStrikeThrough}
              size="lg"
            />
          </div>
          <div className="font_size">
            <FontAwesomeIcon
              icon={faFont}
              className="edit_text_size"
              onClick={smallFont}
              size="xs"
            />
            <FontAwesomeIcon
              icon={faFont}
              className="edit_text_size"
              onClick={mediumFont}
              size="lg"
            />
            <FontAwesomeIcon
              icon={faFont}
              className="edit_text_size"
              onClick={largeFont}
              size="2x"
            />
          </div>
          <div className="upper_lower">
            <img
              src={upper}
              alt="captial A"
              className="capital"
              onClick={upperFont}
            />
            <img
              src={capital}
              alt="capital a"
              className="capital"
              onClick={lowerFont}
            />
          </div>
          <div className="hideElements">
            <label>Hide all elements:</label>
            <Switch
              checked={props.isHidden}
              onChange={(evt) => props.setIsHidden(evt.target.checked)}
              color="primary"
              name="checkedB"
              className="switchHide"
              inputProps={{ "aria-label": "primary checkbox" }}
            />
          </div>
          <div className="hideElements">
            <label>Hide one element:</label>
            <Switch
              checked={props.nodeHidden}
              onChange={(evt) => props.setNodeHidden(evt.target.checked)}
              color="primary"
              name="checkedB"
              className="switchHide"
              inputProps={{ "aria-label": "primary checkbox" }}
            />
          </div>
          <div>
            <img
              src={click}
              alt="curved arrow"
              className="curved"
              onClick={selectImage}
            />
          </div>
        </div>
      ) : null}

      {showEdit ? <DragAbleNodes /> : null}
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
    </div>
  );
};

export default MindMapSideBar;
