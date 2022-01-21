import React,{useState} from "react";
import ReactFlow, { Handle } from "react-flow-renderer";
import '../style/CustomNodeComponent.css'
// import '../../node_modules/react-flow-renderer/dist/theme-default.css'

const customNodeStyles = {
//  padding: '10px',
  // borderRadius: '3px',
  // width: '150px',
  // fontSize: '12px',
  // color: '#222',
  // textAlign: 'center',
  // borderWidth: '1px',
  // borderStyle: 'solid',
  // borderColor:'blue',
  // borderRadius:'3px'
};

const CustomNodeComponent = ({ data, isConnectable}) => {
  
  return (
    <div >
      <Handle
        type="target"
        position="left"
        isConnectable={isConnectable}
        id='a'
      />
      <div >{data.label}</div>
      <Handle
        type="source"
        position="right"
        id="b"
        isConnectable={isConnectable}
      />
      <Handle
        type="target"
        position="top"
        id="c"
        isConnectable={isConnectable}
      />
       <Handle
        type="source"
        position="bottom"
        id="d"
        isConnectable={isConnectable}
      />
    </div>
  );
};

export default CustomNodeComponent;
