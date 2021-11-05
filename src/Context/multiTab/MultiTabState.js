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
    nodeTransparent:1,
     borderRadios: 3,
     borderWidth: 1,
     nodeFont:13,
    nodeText: "",
    _hideAllNodes: false,
    nodeHide: false,
    hideTree: false,
    multiTree: [],
    edgeLabelColor: "",
    arrowColor: "",
    arrowWidth: 1,
    reactFlowInstance: null,
    multipleSelect: [],
    selectArrow: "",
  };

  const [state, dispatch] = useReducer(MultiTabReducer, initialState);
  const {selectedNode, selectedNodeName ,dataset,borderRadios, borderWidth,nodeFont} = state;

  const onElementClickHandler = (element,treeDataUpdate) => {
    let multiLabel = "";
    if (element.source === undefined && element.target === undefined) {
      multiLabel = element.data.label;
    }

    dispatch({
      type: actionTypes.ON_ELEMENT_CLICK_HANDLER,
      payload:{element, multiLabel,treeDataUpdate}
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
  //  const nodeBorder = () => {
  //   return dataset.map((el) => {
  //     if (el.id === selectedNode) {
  //       el.style = { ...el.style, borderRadius: borderRadios };
  //     }
  //     return el;
      
  //   });
    
  // };
 
  const borderRadiosDecreaseHandler = (selectedTab) =>{
    let radiosDec= 0
     if(state.borderRadios > 0){
      radiosDec = state.borderRadios - 1
     }else{
       radiosDec = state.borderRadios = 0
     }
   
    dispatch({
      type: actionTypes.BORDER_RADIOS_DECREASE,
      payload: {selectedTab, radiosDec} 
    });
  }
  
   const borderRadiosIncreaseHandler = (selectedTab) => {
     let radiosInc = borderRadios + 1;
    dispatch({
      type: actionTypes.BORDER_RADIOS_INCREASE,
      payload:  {selectedTab, radiosInc}
    });
  };
   const borderWidthIncreaseHandler = (selectedTab) => {
    
    let  width = borderWidth+1;
    dispatch({
      type: actionTypes.BORDER_WIDTH_INCREASE,
      payload: { selectedTab, width  },
    });
  };
  const borderWidthDecreaseHandler = (selectedTab) => {
     let width2= 0
     if(state.borderWidth > 0){
      width2 = state.borderWidth - 1
     }else{
       width2 = state.borderWidth = 0
     }
    dispatch({
      type: actionTypes.BORDER_WIDTH_DECREASE,
      payload: { selectedTab, width2 },
    });
  };
  const fontSizeIncreaseHandler = (selectedTab) => {
    let nodeTextInc = nodeFont + 1
    dispatch({
      type: actionTypes.FONT_SIZE_INCREASE,
      payload: { selectedTab, nodeTextInc },
    });
  };
  const fontSizeDecreaseHandler = (selectedTab) => {
    let nodeTextDec= 0
     if(state.nodeFont > 0){
      nodeTextDec = state.nodeFont - 1
     }else{
       nodeTextDec = state.nodeFont = 0
     }
    dispatch({
      type: actionTypes.FONT_SIZE_DECREASE,
      payload: {selectedTab, nodeTextDec },
    });
  };
  const borderStyleHandler = (e,selectedTab) => {
     const nodeBorderStyle = e.target.id;
     
    dispatch({
      type: actionTypes.NODE_BORDER_STYLE,
      payload: { selectedTab,nodeBorderStyle },
    });
  };
   const fontStyleHandler = (e, selectedTab) => {
    console.log(e.target.id);
    const fontStyle = e.target.id  
    dispatch({ 
      type: actionTypes.NODE_FONT_STYLE, 
      payload: { selectedTab, fontStyle } });
  };
   const nodeShapeHandler = (e, selectedTab) => {
     const nodeShape = e.target.id
    dispatch({ type: actionTypes.NODE_SHAPE, payload: {selectedTab, nodeShape } });
  };
    const nodeTextTransform = (e,selectedTab) => {
    dispatch({
      type: actionTypes.NODE_TEXT_TRANSFORM,
      payload: { e, selectedTab },
    })}
    const hideAllNodesHandler = (e, selectedTab) => {
    console.log(("hello", e));
    // const hideAllNodes = elements.map((el) => {
    //   el.isHidden = e;
    //   return e;
    // });
    dispatch({
      type: actionTypes.HIDE_ALL_NODES,
      payload: { e, selectedTab },
    });
  };
  const hideNodeHandler = (e, selectedTab) => {
      dispatch({ type: actionTypes.HIDE_NODE, payload: { e, selectedTab } });
  }
    const hideTreeHandler = (e, selectedTab) => {
    // let clonedElements = [...elements];
    // clonedElements.map((multiple) => {
    //   if (multiTree.includes(multiple.id)) {
    //     multiple.isHidden = e;
    //   }
    //   return multiple;
    // });
    // setElements([...clonedElements]);
    dispatch({
      type: actionTypes.HIDE_ALL_TREE,
      payload: { e, selectedTab },
    });
  };

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
        nodeTransparentHandler,
        borderRadiosDecreaseHandler,
        borderRadiosIncreaseHandler,
        borderWidthDecreaseHandler,
        borderWidthIncreaseHandler,
        fontSizeDecreaseHandler,
     fontSizeIncreaseHandler,
     borderStyleHandler,
     fontStyleHandler,
     nodeShapeHandler,
     nodeTextTransform,
     hideAllNodesHandler,
     hideNodeHandler,
     hideTreeHandler
      }}
    >
      {props.children}
    </MultiTabContext.Provider>
  );
};

export default NodeState;
