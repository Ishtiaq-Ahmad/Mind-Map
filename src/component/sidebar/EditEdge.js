import React, { useContext, useState } from "react";
import TextField from '@mui/material/TextField';
import "../../style/SideBar.css";
import MultiTabContext from "../../Context/multiTab/MultiTabContext";
import line from "../../assets/images/straight_line2.png";
import doted from "../../assets/images/doted.png";
import { arrowLabelColor } from "../FlowChartData.js";
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
import "../../style/SideBar.css";
import "../../style/Header.css";
import { smartLineType, smartLessCorners, arrowWidthArray } from "../FlowChartData";
import Typography from "@mui/material/Typography";

const EditEdge = () => {

  const multitabContext = useContext(MultiTabContext);
  const {
    data: {
      edgeLabelName,
      edgeLabelFont,
      edgeLabelColor,
      arrowColor,
      arrowWidth,
      smartLine,
      smartCorner,
      showSmartCustom,
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
    smartPaddingHandler,
    smartGridHandler,
    smartLineTypHandler,
    lessCornerHandler,
    showSmartCustomization,
    showSmoothCustomization,
    arrowWidthHandler
  } = multitabContext;
  const [labelColorHide, setLabelColoHide] = useState(false);
  const [arrowColorHide, setArrowColorHide] = useState(false);

  return (
    <div style={{ padding: "5px" }}>
      <div>
        <Typography variant="body2" gutterBottom component="div">
          Select Arrow:
        </Typography>
        <span className="arrow">
          <img
            src={Curved}
            alt="curved arrow"
            className="curved"
            onClick={(e) => {
              changeArrowType(e);
              showSmoothCustomization();
            }}
            id="curved"
          />
          <img
            src={Smooth}
            alt="step arrow"
            className="curved"
            onClick={(e) => {
              changeArrowType(e);
              showSmoothCustomization();
            }}
            id="step"
          />
          <img
            src={smoothStep}
            alt="smooth arrow"
            className="curved"
            onClick={(e) => {
              changeArrowType(e);
              showSmoothCustomization();
            }}
            id="smoothstep"
          />
          <img
            src={Straight}
            alt="straight arrow"
            className="curved"
            onClick={(e) => {
              changeArrowType(e);
              showSmoothCustomization();
            }}
            id="straight"
          />
          <img
            src={smartRouting}
            alt="straight arrow"
            className="curved"
            onClick={(e) => {
              changeArrowType(e);
              showSmartCustomization();
            }}
            id="smart"
          />
        </span>
        {showSmartCustom ? (
          <div className="smartLineStyle">
            <div style={{ display: "flex" }}>
              <TextField
                id="standard-basic"
                variant="standard"
                type="number"
                size="small"
                label="Smart Padding"
                onChange={(evt) => smartPaddingHandler(evt.target.value)}
              />
              <TextField
                id="standard-basic"
                variant="standard"
                type="number"
                size="small"
                label="Grid Ratio"
                onChange={(evt) => smartGridHandler(evt.target.value)}
              />
            </div>
            <div style={{ display: "flex" }}>
              <TextField
                variant="standard"
                id="outlined-select-currency"
                select
                label="Line Type"
                fullWidth
                value={smartLine}
                onChange={(evt) => smartLineTypHandler(evt.target.value)}
              >
                {smartLineType.map((option) => (
                  <MenuItem key={option.label} value={option.label}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                id="outlined-select-currency"
                variant="standard"
                select
                label="Less Corner"
                fullWidth
                value={smartCorner}
                onChange={(evt) => lessCornerHandler(evt.target.value)}
                // helperText="Please lessConers"
              >
                {smartLessCorners.map((option) => (
                  <MenuItem key={option.label} value={option.label}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </div>
          </div>
        ) : null}

        <div>
          <Typography variant="body2" gutterBottom component="div">
            Select Animation:
          </Typography>
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
        <Typography variant="body2" gutterBottom component="div">
          Change Label Name:
        </Typography>
        <TextField
          className="node_label"
          value={edgeLabelName}
          name={edgeLabelName}
          onChange={(evt) => edgeLabelNameHandler(evt.target.value)}
          label="Label Name"
          size="small"
          variant="outlined"
          color="primary"
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
            // helperText="Select Font weight for Label"
            fullWidth
          >
            {arrowLabelColor.map((option) => (
              <MenuItem key={option.label} value={option.label}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <div style={{ marginBottom: "10px" }}>
            <Typography variant="body2" gutterBottom component="div">
              Change Label Color:
            </Typography>
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
        <Typography variant="body2" gutterBottom component="div">
          Change Arrow Color:
        </Typography>
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
        {/* <div className="border"> */}
          {/* <Typography variant="body2" gutterBottom component="div">
            Arrow Width:
          </Typography> */}
        <TextField
                variant="outlined"
                id="outlined-select-currency"
                select
                label="Arrow Width"
                fullWidth
                value={arrowWidth}
                onChange={(evt) => arrowWidthHandler(evt.target.value)}
              >
                {arrowWidthArray.map((option) => (
                  <MenuItem key={option.label} value={option.label}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
          {/* <span className="borderWidth">
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
          </span> */}
        {/* </div> */}
      </div>
    </div>
  );
};

export default EditEdge;
