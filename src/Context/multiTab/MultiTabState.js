import React, { useReducer } from "react";
import * as actionTypes from "../types";
import MultiTabContext from "./MultiTabContext";
import MultiTabReducer from "./MultiTabReducer";
import { nodesData } from "../../component/FlowChartData";


const NodeState = (props) => {
  const initialState = {
    // dataset for each container
    dataset: [nodesData],
    selectedNode:0,
    selectedTab:0,
    bgColor:"",
    nodeName:'',
    selectedNodeName:'',
    borderColor:'',
    nodeFontColor:'',
    nodeTransparent:1
  };

  const [state, dispatch] = useReducer(MultiTabReducer, initialState);
  // const {selectedNode, selectedNodeName} = state;
  const onElementClickHandler = (element) => {
    let multiLabel = "";
    if (element.source === undefined && element.target === undefined) {
      multiLabel = element.data.label;
  
    }
    dispatch({
      type: actionTypes.ON_ELEMENT_CLICK_HANDLER,
      payload:{element, multiLabel}
    })
  }
  const onDragHandler = (selectedTab,updatedNodeData) => {
    dispatch({
      type:actionTypes.ON_DRAG_NODE,
      payload:{selectedTab, updatedNodeData}
    })
  }
  const addTabHandler = () => {
    dispatch({ type: actionTypes.ADD_TAB });
  };
  const updateDataSetHandler = (currentTab, generatedEdge) => {
    dispatch({
      type: actionTypes.UPDATE_DATA_SET,
      payload: { currentTab, generatedEdge },
    });
  };
  // const nodeBgColorHandler = (selectedTab, nodeColor) => {
  //   dispatch({
  //     type: actionTypes.UPDATE_NODE_COLOR,
  //     payload:{selectedTab, nodeColor}
  //   })
  // }
  const activeTabHandler = (activeTab)=>{
     dispatch({
      type: actionTypes.SELECTED_TAB,
      payload:{activeTab}
    })
  }

const bgColorHandler= (bgColor,selectedTab)=>{
 dispatch({
      type: actionTypes.BG_COLOR,
      payload:{bgColor,selectedTab}
    })
}
const nodeNameHandler = (nodeName, selectedTab) => {
    dispatch({
      type: actionTypes.CHANGE_NODE_NAME,
      payload:{nodeName, selectedTab}
      })
  }
  const borderColorHandler = (updatedColor, selectedTab) => {
    dispatch({
      type: actionTypes.CHANGE_NODE_BORDER_COLOR,
      payload:{updatedColor, selectedTab}
      })
  }
  const textColorHandler = (updatedColor, selectedTab) => {
      dispatch({
      type: actionTypes.CHANGE_NODE_FONT_COLOR,
      payload:{updatedColor, selectedTab}
      })
  }
  const nodeTransparentHandler = (updatedColor, selectedTab) => {
      dispatch({
      type: actionTypes.TRANSPARENT_NODE,
      payload:{updatedColor, selectedTab}
      })
  }

  return (
    <MultiTabContext.Provider
      value={{
        data: state,
        addTabHandler,
        updateDataSetHandler,
        // nodeBgColorHandler,
        onElementClickHandler,
        onDragHandler,
        activeTabHandler,
        bgColorHandler,
        nodeNameHandler,
        borderColorHandler,
        textColorHandler,
        nodeTransparentHandler
      }}
    >
      {props.children}
    </MultiTabContext.Provider>
  );
};

export default NodeState;
