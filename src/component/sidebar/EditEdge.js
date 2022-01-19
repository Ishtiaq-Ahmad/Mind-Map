import React, { useContext, useState } from "react";
import TextField from "@mui/material/TextField";
import "../../style/SideBar.css";
import NodeContext from "../../Context/auth/authContext";
import MultiTabContext from "../../Context/multiTab/MultiTabContext";
import line from "../../assets/images/straight_line2.png";
import doted from "../../assets/images/doted.png";
import FlowChartData, { arrowLabelColor } from "../FlowChartData.js";
import Button from "@mui/material/Button";
import { SketchPicker } from "react-color";
import MenuItem from "@mui/material/MenuItem";
import smartRouting from "../../assets/images/smart-routing.PNG";
import Curved from "../../assets/images/curved_arrow.PNG";
import Smooth from "../../assets/images/smooth_arrow.PNG";
import Straight from "../../assets/images/straight_arrow.PNG";
import smoothStep from "../../assets/images/smoothStep.png";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { v4 as uuidv4 } from "uuid";
import EditNode from "./EditNode";

const EditEdge = () => {
  const nodeContext = useContext(NodeContext);
  const multitabContext = useContext(MultiTabContext);
  const {
    data: {
      edgeLabelName,
      edgeLabelFont,
      edgeLabelColor,
      arrowColor,
      arrowWidth,
    },
    changeArrowType,
    changeLineHandler,
    edgeLabelNameHandler,
    labelFontWeightHandler,
    edgeLabelColorHandler,
    arrowColorHandler,
    arrowHeadHandler,
    arrowWidthDecreaseHandler,
    arrowWidthIncreaseHandler,
  } = multitabContext;
  const [labelColorHide, setLabelColoHide] = useState(false);
  const [arrowColorHide, setArrowColorHide] = useState(false);
  return (
    <div>
      <div>
        <h4>Select Arrow</h4>
        <span className="arrow">
          <img
            src={Curved}
            alt="curved arrow"
            className="curved"
            onClick={(e) => changeArrowType(e)}
            id="curved"
          />
          <img
            src={Smooth}
            alt="step arrow"
            className="curved"
            onClick={(e) => changeArrowType(e)}
            id="step"
          />
          <img
            src={smoothStep}
            alt="smooth arrow"
            className="curved"
            onClick={(e) => changeArrowType(e)}
            id="smoothstep"
          />
          <img
            src={Straight}
            alt="straight arrow"
            className="curved"
            onClick={(e) => changeArrowType(e)}
            id="straight"
          />
          <img
            src={smartRouting}
            alt="straight arrow"
            className="curved"
            onClick={(e) => changeArrowType(e)}
            id="smart"
          />
        </span>
        <div>
          <h4>Select Animation</h4>
          <span className="animation">
            <img
              src={line}
              alt="straight line"
              className="line"
              onClick={() => changeLineHandler()}
            />
            <img
              src={doted}
              alt="Doted line"
              className="line"
              onClick={() => changeLineHandler()}
            />
          </span>
        </div>
        <h4>Change Label Name</h4>
        <TextField
          className="node_label"
          value={edgeLabelName}
          name={edgeLabelName}
          onChange={(evt) => edgeLabelNameHandler(evt.target.value)}
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
            onChange={(evt) => labelFontWeightHandler(evt.target.value)}
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
                  edgeLabelColorHandler(updatedColor.hex)
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
            onChange={(updatedColor) => arrowColorHandler(updatedColor.hex)}
          />
        )}
        <div className="font_style">
          <KeyboardArrowRightIcon
            className="arrow_head"
            onClick={(e) => arrowHeadHandler(e)}
            id="arrow"
          />
          <ArrowRightIcon
            onClick={(e) => arrowHeadHandler(e)}
            className="arrow_head"
            id="arrowclosed"
          />
        </div>
        <div className="border">
          <label>Arrow width</label>
          <span className="borderWidth">
            <button
              onClick={() => arrowWidthDecreaseHandler()}
              className="borderWidthButton"
            >
              <strong>-</strong>
            </button>
            <h4 className="borderFont">{arrowWidth}px</h4>
            <button
              onClick={() => arrowWidthIncreaseHandler()}
              className="borderWidthButton"
            >
              <strong>+</strong>
            </button>
          </span>
        </div>
      </div>
    </div>
  );
};

export default EditEdge;
