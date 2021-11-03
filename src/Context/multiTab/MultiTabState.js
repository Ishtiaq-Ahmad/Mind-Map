import React, { useReducer } from "react";
import * as actionTypes from "../types";
import MultiTabContext from "./MultiTabContext";
import MultiTabReducer from "./MultiTabReducer";
import { nodesData } from "../../component/FlowChartData";


const NodeState = (props) => {
  const initialState = {
    // dataset for each container
    dataset: [nodesData],
    selectedNode:''
  };

  const [state, dispatch] = useReducer(MultiTabReducer, initialState);
  const {selectedNode} = state;
  
 console.log('are you',selectedNode);
  const onElementClickHandler = (element) => {
    dispatch({
      type: actionTypes.ON_ELEMENT_CLICK_HANDLER,
      payload:{element}
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
  const nodeBgColorHandler = (selectedTab, nodeColor) => {
    dispatch({
      type: actionTypes.UPDATE_NODE_COLOR,
      payload:{selectedTab, nodeColor}
    })
  }

  return (
    <MultiTabContext.Provider
      value={{
        data: state,
        addTabHandler,
        updateDataSetHandler,
        nodeBgColorHandler,
        onElementClickHandler
      }}
    >
      {props.children}
    </MultiTabContext.Provider>
  );
};

export default NodeState;
