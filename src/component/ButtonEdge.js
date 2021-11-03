import React,{useState} from "react";
import {
  getBezierPath,
  getEdgeCenter,
  getMarkerEnd,
} from "react-flow-renderer";
import "./ButtonEdge.css";
import SettingsIcon from "@material-ui/icons/Settings";
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
// import Curved from '../assets/images/curved.PNG';
// import Smooth from '../assets/images/smooth.PNG'
import ReactFlow , { 
  removeElements, 
  ReactFlowProvider,
  addEdge,
  Controls,
  Background} from 'react-flow-renderer';

function rand() {
    return Math.round(Math.random() * 20) - 10;
  }
  function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }
  const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '1px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      textAlign:'center'
    },
  }));  

const foreignObjectSize = 40;


const ButtonEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  data,
  arrowHeadType,
  markerEndId,
}) => {
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);

  const edgePath = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });
  const markerEnd = getMarkerEnd(arrowHeadType, markerEndId);
  const [edgeCenterX, edgeCenterY] = getEdgeCenter({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  const [open, setOpen] = useState(false)
  const onHandleOpen = (event, edge) => {
    // setOpen(true)
    console.log("this is new edge" , edge)
  };
  const onHandleClose = () => {
    // setOpen(false)
  }
  const modalBody = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Select an arrow</h2>
      <div className="arrow_type">
      {/* <img src={Curved} className="arrow"/> */}
      {/* <img src={Smooth} className= "arrow"/> */}
      </div>
    </div>
  );

  return (
    <>
      <path
        id={id}
        style={style}
        className="react-flow__edge-path"
        d={edgePath}
        markerEnd={markerEnd}
      />
      <foreignObject
        width={foreignObjectSize}
        height={foreignObjectSize}
        x={edgeCenterX - foreignObjectSize / 2}
        y={edgeCenterY - foreignObjectSize / 2}
        className="edgebutton-foreignobject"
        requiredExtensions="http://www.w3.org/1999/xhtml"
      >
        <body>
          <button className="edgebutton" onClick={onHandleOpen}  >
            <SettingsIcon />
          </button>
          <Modal
        open={open}
        onClose={onHandleClose}
      >{modalBody}</Modal>
        </body>
      </foreignObject>
    </>
  );
};

export default ButtonEdge;
