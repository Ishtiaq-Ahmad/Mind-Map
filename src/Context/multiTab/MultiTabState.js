import React, { useReducer, useRef } from "react";
import * as actionTypes from "../types";
import MultiTabContext from "./MultiTabContext";
import MultiTabReducer from "./MultiTabReducer";
import { nodesData } from "../../component/FlowChartData";


const NodeState = (props) => {
   const imageRef = useRef(null)
  const initialState = {
    // dataset for each container
    dataset: [nodesData],
    selectedNode:0,
    selectedTab:0,
    bgColor:"",
    nodeName:'Node Name',
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
    arrowType:false,
    edgeLabelName:'',
    imagePng:null,
    arrowHead:'',
    pngImage:'',
    previousState:'',
    multiSelectNode: [],
    _nodeType:'',
    sourcePosition:'',
    showSourcePosition: false,
    nodeSize: 150
    
    
  };

  const [state, dispatch] = useReducer(MultiTabReducer, initialState);
  const {arrowWidth,arrowType,borderRadios,borderWidth,nodeFont,nodeSize, previousState,nodeName, multiSelectNode} = state;

  const onElementClickHandler = (element,treeDataUpdate) => {
    
    console.log('my,,,,,,,,,,,,',element);
    console.log('chohaaaaaaaaaaaan',element.style )
  // element.style = { width };  
    let _previousState = ''
    let _nodeName = ''
    // let _nodeSize = ''
    if(previousState === null || previousState === ''){
        _previousState = (element.id)
    }else if( previousState !== element.id){
      _previousState = (element.id)
      _nodeName = ''
      // _nodeSize = nodeSize
      // nodeState(element.id)
    }
      // let imagePicture=''
    // if( element.data && element.data.label && element.data.label.props && element.data.props.children){
    //  let imgSrc = element.data.label.props.children[1];
    //   const {props:{src}}= imgSrc;
    //   src = URL.createObjectURL(src)
    //   imagePicture = {src}
    // }
// console.log({src})
// let imagePicture = {src}



    let multiLabel = "";

    // if (element.source === undefined && element.target === undefined) {
    //   if(element.data.label.props.children === undefined)
    //   {
    //    multiLabel = element.data.label;
    //   }
    //   else {
    //     let imgLabel = element.data.label.props.children[2]
    //     const {props:{}}
    //     multiLabel = element.data.label.props.
    //   }
     
    // }
     if (element.source === undefined && element.target === undefined) {
        let _multiLabel = element.data.label;
        if(_multiLabel.length <= 20 ){
          multiLabel = _multiLabel
        } else if( _multiLabel.length >= 20){
          multiLabel = ` ${_multiLabel.slice(0, 20)}...`
        }
      
      // if(element.data.label)
      // {
      //   multiLabel = element.data.label;
      // }
      //    else if(  element.data.label && element.data.label.props && element.data.label.props.children){
      //     const imageUr = element.data.label.props.children[1];
      //     const {props:{children}} = imageUr
      //     multiLabel = children
      //  }
      
      }
    const nodeType = element.type
    // console.log('i am node label', multiLabel);
    // console.log({multiLabel});
    dispatch({
      type: actionTypes.ON_ELEMENT_CLICK_HANDLER,
      payload:{element, multiLabel,treeDataUpdate, nodeType ,_previousState,_nodeName}
    })
  }
  
  const onEdgeHandler = (edge) => {
    let _edge = edge.id;
    dispatch({
      type:actionTypes.ON_EDGE_DOUBLE_CLICK,
      payload:{_edge}
    })
  }
  const removeElementHandler = (selectedTab,deleteElement)=>{
    dispatch({
      type:actionTypes.DELETE_ELEMENT,
      payload:{selectedTab,deleteElement}
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
  const tabRemover = (selectedTab) => {
    dispatch({ 
      type: actionTypes.REMOVE_TAB, 
      payload:{selectedTab}})
  }
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
     if(borderRadios > 0){
      radiosDec = borderRadios - 1
     }else{
       radiosDec = borderRadios
     }
   
    dispatch({
      type: actionTypes.BORDER_RADIOS_DECREASE,
      payload: {selectedTab, radiosDec} 
    });
  }
  console.log('heelo log', borderRadios);
   const borderRadiosIncreaseHandler = (selectedTab) => {
     let radiosInc = 0
     if(borderRadios === '15px 0px 15px 0px'){
       alert(`pre-defined shape's radios is not customieabele`)
     } else{
       radiosInc = borderRadios + 1;
     }
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
     console.log('----->>>>>>>>', e.target.id);
    dispatch({ type: actionTypes.NODE_SHAPE, payload: {selectedTab, nodeShape } });
  };
    const nodeTextTransform = (e,selectedTab) => {
    dispatch({
      type: actionTypes.NODE_TEXT_TRANSFORM,
      payload: { e, selectedTab },
    })}
    const hideAllNodesHandler = (e, selectedTab) => {
    dispatch({
      type: actionTypes.HIDE_ALL_NODES,
      payload: { e, selectedTab },
    });
  };
  const hideNodeHandler = (e, selectedTab) => {
      dispatch({ type: actionTypes.HIDE_NODE, payload: { e, selectedTab } });
  }
    const hideTreeHandler = (e, selectedTab) => {
    dispatch({
      type: actionTypes.HIDE_ALL_TREE,
      payload: { e, selectedTab },
    });
  };
    const changeArrowType = (e,selectedTab) => {
    let arrowTypeId = e.target.id
    dispatch({ type: actionTypes.ARROW_TYPE, payload: { arrowTypeId, selectedTab } });
  };
   const changeLineHandler = (selectedTab) => {
     let arrow = !arrowType
    dispatch({ type: actionTypes.CHANGE_ARROW_LINE, payload: {arrow, selectedTab } });
  };
   const edgeLabelNameHandler = (evt, selectedTab) => {
    dispatch({
      type: actionTypes.EDGE_LABEL_NAME,
      payload: { evt, selectedTab },
    });
  };
  const labelFontWeightHandler = (evt,selectedTab) => {

    dispatch({
      type: actionTypes.EDGE_LABEL_FONT,
      payload: { evt, selectedTab },
    });
  };
  const edgeLabelColorHandler= (bgColor,selectedTab)=>{
 dispatch({
      type: actionTypes.EDGE_LABEL_COLOR,
      payload:{bgColor,selectedTab}
    })
}
 const arrowColorHandler= (bgColor,selectedTab)=>{
 dispatch({
      type: actionTypes.EDGE_ARROW_COLOR,
      payload:{bgColor,selectedTab}
    })
}
 const arrowHeadHandler= (e,selectedTab)=>{
let head = e.target.id;
 dispatch({
      type: actionTypes.ARROW_HEAD_STYLE,
      payload:{head,selectedTab}
    })
}
 const arrowWidthIncreaseHandler = (selectedTab) => {
    let arrowInc = arrowWidth + 1;
    dispatch({
      type: actionTypes.ARROW_WIDTH_INCREASE,
      payload: { arrowInc, selectedTab },
    });
  };
  const arrowWidthDecreaseHandler = (selectedTab) => {
    let arrowDec = 0
      if(arrowWidth > 1){
        arrowDec = arrowWidth - 1
      }
      else{
        arrowDec = arrowWidth
      }
    dispatch({
      type: actionTypes.ARROW_WIDTH_DECREASE,
      payload: { arrowDec, selectedTab },
      
    });
  };
const imageHandler = (e,imageLoad, selectedTab) => {
// const selectImage = e.target.files[0];
// const allowed_types = ['image/png'];
// let imageLoad=''
// if(selectImage && allowed_types.includes(selectImage.type)){
// imageLoad =  URL.createObjectURL(selectImage)
// }
// else{
//     alert('Only PNG file supported')
// }
dispatch({
  type: actionTypes.ADD_PNG_IMAGE,
  payload: {imageLoad, selectedTab}
})
  }
const multipleSelectNode = (multi) => {
 
dispatch({
  type:actionTypes.MULTI_NODE_ELEMENTS,
  payload:{multi}
})
}
const nodeSourcePositionHandler = (evt, selectedTab) => {
  dispatch({
    type:actionTypes.NODE_SOURCE_POSITION,
    payload:{evt, selectedTab}
  })
}
const paneClickHandler = (event) =>{
  dispatch({
    type:actionTypes.PANE_CLICK,
    payload:{event}
  })
}
const nodeSizeIncreaseHandler = (selectedTab) => {
  let nodeSizeInc = nodeSize + 1;
  dispatch({
    type:actionTypes.NODE_SIZE_INCREASE,
    payload:{selectedTab,nodeSizeInc}
  })
}
const nodeSizeDecreaseHandler = (selectedTab) => {
  let nodeSizeDec = 0
      if(nodeSize > 1){
        nodeSizeDec = nodeSize - 1
      }
      else{
        nodeSizeDec = nodeSize
      }
  dispatch({
    type:actionTypes.NODE_SIZE_DECREASE,
    payload:{selectedTab, nodeSizeDec}
  })  
}
  return (
    <MultiTabContext.Provider
      value={{
        data: state,
        addTabHandler,
        tabRemover,
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
        hideTreeHandler,
        onEdgeHandler,
        changeArrowType,
        changeLineHandler,
        edgeLabelNameHandler,
        labelFontWeightHandler,
        edgeLabelColorHandler,
        arrowColorHandler,
        arrowHeadHandler,
        arrowWidthDecreaseHandler,
        arrowWidthIncreaseHandler,
        removeElementHandler,
        imageHandler,
        multipleSelectNode,
        nodeSourcePositionHandler,
        paneClickHandler,
         nodeSizeDecreaseHandler,
          nodeSizeIncreaseHandler
      }}
    >
      {props.children}
    </MultiTabContext.Provider>
  );
};

export default NodeState;
