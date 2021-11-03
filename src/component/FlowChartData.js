import React, { useContext } from "react";
import CheckBox from "./CheckBox";
import Doted from '../assets/images/doted.png'
import click from '../assets/images/check.png'
export const nodesData = [
  {
    id: "1",
    type: "input",
    data: {
      label: (
        
        <>
        <span>
          <img style={{width:'22px'}} src={"https://www.google.com/chrome/static/images/download-browser/big_pixel_phone.png"}/>
          Welcome to <strong>React Flow!</strong>
          </span>
         <div> <strong>1</strong></div>
        </>
      ),
    },
    position: { x: 250, y: 25 },
  },

  {
    id: "2",
    img:{ src: 'https://www.iconpacks.net/icons/1/free-pin-icon-48-thumb.png'},
    data: { label: <div>node 2</div> },
    position: { x: 100, y: 125 },
  },
  {
    id: "3",
    type: "output",
    data: { label: "node 3" },
    position: { x: 250, y: 250 },
  },
  {
    id: "4",
    data: { label:  <>   
      Input Node
     <div> <strong>2</strong></div>
    </>},
    position: { x: 350, y: 50 },
  },
  {
    id: "5",
    type: "output",
    data: { label: "output node" },
    position: { x: 100, y: 220 },
  },
  {
    id: "6",
    type: "input",
    data: { label: "another node" },
    position: { x: 350, y: 220 },
  },
  {
    id: "7",
    type: "output",
    data: { label: "another node" },
    position: { x: 23, y: 20 },
  },
  {
    id: "8",
    data: {
      label: (
        <>
          An <strong>output node 8</strong>
          
        </>
      ),
    },
    position: { x: 100, y: 480 },
  },
  {
    id: "9",
    // type:'output',
    data: { label: "another node 9" },
    position: { x: 250, y: 325 },
    color: "yellow",
  },
  // animated edge
  { id: "e1-2", source: "1", target: "2", type: "straight", label: "hello" },
  {
    id: "e2-3",
    source: "1",
    target: "3",
    label: "button edge",
    type: "smooth",
  },
  // { id: 'e1-3', source: '1', target: '3', animated: true, type:'buttonedge', label:'button edge'},
  {
    id: "e4-5",
    source: "4",
    target: "5",
    label: "smoothstep",
    type: "smoothstep",
    style: { stroke: "green" },
    arrowHeadType: "arrowclosed",
  },
  {
    id: "e8-9",
    source: "8",
    target: "9",
    label: "custom node",
    type: "smooth",
    labelStyle: { fill: "#f6ab6c", fontWeight: 700 },
  },
];
const FlowChartData = (props) => {
  return <div></div>;
};

export default FlowChartData;
