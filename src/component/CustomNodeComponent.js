import React from "react";
import ReactFlow, { Handle } from "react-flow-renderer";
import './CustomNodeComponent.css'
// import '../../node_modules/react-flow-renderer/dist/theme-default.css'

// const customNodeStyles = {
//  padding: '10px',
//   borderRadius: '3px',
//   width: '150px',
//   fontSize: '12px',
//   color: '#222',
//   textAlign: 'center',
//   borderWidth: '1px',
//   borderStyle: 'solid',
// };

const CustomNodeComponent = ({ data, isConnectable}) => {
  return (
    <div className="customNodeStyles" >
      <Handle
        type="target"
        position="left"
        // style={{ borderRadius: 0 }}
        isConnectable={isConnectable}
      />
      <div >{data.label}</div>
      
      {/* <div>{style:{}}</div> */}
      <Handle
        type="source"
        position="right"
        id="a"
        // style={{  background: 'yellow' }}
        isConnectable={isConnectable}
      />
      <Handle
        type="target"
        position="top"
        id="b"
        // style={{ top: "70%", borderRadius: 0 }}
        isConnectable={isConnectable}
      />
       <Handle
        type="source"
        position="bottom"
        id="b"
        // style={{ top: "70%", borderRadius: 0 }}
        isConnectable={isConnectable}
      />
    </div>
  );
};

export default CustomNodeComponent;
