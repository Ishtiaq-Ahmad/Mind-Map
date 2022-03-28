import React from "react";
import { Handle } from "react-flow-renderer";
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
        type="source"
        position="top"
        id="a"
        style={{ right: 60, left:"auto", background: '#FF0072' }}
        isConnectable={isConnectable}
      />
      <Handle
        type="target"
        position="top"
        id="b"
        style={{ left:70,  background: ' #009900' }}
        isConnectable={isConnectable}
      />
       <Handle
        type="source"
        position="left"
        id="c"
        style={{ top: 12, background: '#FF0072' }}
        isConnectable={isConnectable}
      />
      <Handle
        type="target"
        position="left"
        id="d"
        style={{ bottom: 5, top: 'auto', background: ' #009900' }}
        isConnectable={isConnectable}
      />
      <div >{data.label}</div>
      <Handle
        type="source"
        position="right"
        id="e"
        style={{ top: 12, background: '#FF0072' }}
        isConnectable={isConnectable}
      />
      <Handle
        type="target"
        position="right"
        id="f"
        style={{ bottom: 5, top: 'auto', background: '#009900' }}
        isConnectable={isConnectable}
      />
        <Handle
        type="source"
        position="bottom"
        id="g"
        style={{ right: 60, left:"auto", background: '#FF0072' }}
        isConnectable={isConnectable}
      />
      <Handle
        type="target"
        position="bottom"
        id="h"
        style={{ left:70,  background: '#009900' }}
        isConnectable={isConnectable}
      />

    </div>
  );
};

export default CustomNodeComponent;
