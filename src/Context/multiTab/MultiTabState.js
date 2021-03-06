import React, { useReducer, useRef } from "react";
import * as actionTypes from "../types";
import MultiTabContext from "./MultiTabContext";
import MultiTabReducer from "./MultiTabReducer";
import {_options} from '../../component/FlowChartData'
// import type { SmartEdgeOptions } from './SmartEdge/context';

// import { nodesData } from "../../component/FlowChartData";


const NodeState = (props) => {
   const imageRef = useRef(null)
  const initialState = {
    smartOptions: _options,
    // dataset for each container
    dataset: [],
    elementData: '',
    selectedNode:0,
     nodeDragId:0,
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
    nodeSize: 150,
    docID:null,
    isEmpty:true,
    periodsData:'',
    specificData:'Not Imported',
    periodsDataArray:'',
    periodsNodesData:'',
    periodsHeadData:[],
    periodsFirstColum:[],
    periodIndexNumber:[],
    _csvData:[] ,
    periodFinalData:'',
    _periodsValue:'',
    showCsv: false,
    smartPadding: 10,
    smartGrid: 10,
    smartLine: 'curve',
    smartCorner: false,
    showSmartCustom: false,
    hideAllNodeNumber: false,
    showNodeCustomization: false,
    showModalName : true,
    showTabName: true,
     showDate: true,
      showPeriod: true,
      showUser:true,
      showSoftwareOwner: true,
      showSoftwareDeveloper: true,
      groupHandle:false,
      groupList:false,
      fetchData:'',
      groupName: '',
      groupData:'',
      createGroup:'',
      _showGroupList: false,
    multiNodeData: [],
    showCopyButton: false,
    copyNode:'',
    _nodesNumber:'',
    _nodesName:'',
    _periodsNodesData:'',
    showPasteButton:false,
    copyText:'copy',
    level: " ",
    fetchGroup: '',
    showSideBar: true


   

  };
 
  const [state, dispatch] = useReducer(MultiTabReducer, initialState);
  const {arrowType, borderRadios,borderWidth,nodeFont,nodeSize,previousState} = state;
   
   
  const onElementClickHandler = (element,treeDataUpdate) => {
  
    let currentFinalValue
    try {
       let currentPeriodsValue =  element.data.label.props.children[2];
    
      currentFinalValue =  currentPeriodsValue.props.children[1];
    } catch (error) {
      console.log(' this node has not children value');
    }
    
   
    let _previousState = ''
    let _nodeName = ''
    if(previousState === null || previousState === ''){
        _previousState = (element.id)
    }else if( previousState !== element.id){
      _previousState = (element.id)
      _nodeName = ''
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
    dispatch({
      type: actionTypes.ON_ELEMENT_CLICK_HANDLER,
      payload:{element, multiLabel,treeDataUpdate, nodeType ,_previousState,_nodeName,currentFinalValue}
    })
  }


const isEmptyHandler = ()=>{
  dispatch({
      type: actionTypes.IS_EMPTY,
    })
}

  const loadDataHandler= (data,docid,status)=>{
   
  dispatch({
      type: actionTypes.LOAD_DATA_FROM_DB,
      payload:{data,docid,status}
    })
  }
  
  const onEdgeHandler = (edge) => {
    let _edge = edge.id;
    dispatch({
      type:actionTypes.ON_EDGE_DOUBLE_CLICK,
      payload:{_edge}
    })
  }
  const removeElementHandler = (deleteElement)=>{
    dispatch({
      type:actionTypes.DELETE_ELEMENT,
      payload:{deleteElement}
    })
  }
  const onDragHandler = (updatedNodeData,_docid=null,empty) => {
   
    dispatch({
      type:actionTypes.ON_DRAG_NODE,
      payload: {updatedNodeData,_docid,empty}
    })
  }
  const addTabHandler = () => {
    dispatch({ type: actionTypes.ADD_TAB });
  };
  const tabRemover = () => {
    dispatch({ 
      type: actionTypes.REMOVE_TAB})
  }
  const updateDataSetHandler = ( generatedEdge) => {
    dispatch({
      type: actionTypes.UPDATE_DATA_SET,
      payload: { generatedEdge },
    });
  };

  const activeTabHandler = (activeTab)=>{
     dispatch({
      type: actionTypes.SELECTED_TAB,
      payload:{activeTab}
    })
  }

const bgColorHandler= (bgColor)=>{
 dispatch({
      type: actionTypes.BG_COLOR,
      payload:{bgColor}
    })
}
const nodeNameHandler = (evt) => {
  
    dispatch({
      type: actionTypes.CHANGE_NODE_NAME,
      payload:{evt}
      })
  }
  const borderColorHandler = (updatedColor) => {
    dispatch({
      type: actionTypes.CHANGE_NODE_BORDER_COLOR,
      payload:{updatedColor}
      })
  }
  const textColorHandler = (updatedColor) => {
      dispatch({
      type: actionTypes.CHANGE_NODE_FONT_COLOR,
      payload:{updatedColor}
      })
  }
  const nodeTransparentHandler = (updatedColor) => {
      dispatch({
      type: actionTypes.TRANSPARENT_NODE,
      payload:{updatedColor}
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
 
  const borderRadiosDecreaseHandler = () =>{
    let radiosDec= 0
     if(borderRadios > 0){
      radiosDec = borderRadios - 1
     }else{
       radiosDec = borderRadios
     }
   
    dispatch({
      type: actionTypes.BORDER_RADIOS_DECREASE,
      payload: { radiosDec} 
    });
  }
  
   const borderRadiosIncreaseHandler = () => {
     let radiosInc = 0
     if(borderRadios === '15px 0px 15px 0px'){
       alert(`pre-defined shape's radios is not customieabele`)
     } else{
       radiosInc = borderRadios + 1;
     }
    dispatch({
      type: actionTypes.BORDER_RADIOS_INCREASE,
      payload:  {radiosInc}
    });
  };
   const borderWidthIncreaseHandler = () => {
    
    let  width = borderWidth+1;
    dispatch({
      type: actionTypes.BORDER_WIDTH_INCREASE,
      payload: {  width  },
    });
  };
  const borderWidthDecreaseHandler = () => {
     let width2= 0
     if(state.borderWidth > 0){
      width2 = state.borderWidth - 1
     }else{
       width2 = state.borderWidth = 0
     }
    dispatch({
      type: actionTypes.BORDER_WIDTH_DECREASE,
      payload: { width2 },
    });
  };
  const fontSizeIncreaseHandler = () => {
    let nodeTextInc = nodeFont + 1
    dispatch({
      type: actionTypes.FONT_SIZE_INCREASE,
      payload: {  nodeTextInc },
    });
  };
  const fontSizeDecreaseHandler = () => {
    let nodeTextDec= 0
     if(state.nodeFont > 0){
      nodeTextDec = state.nodeFont - 1
     }else{
       nodeTextDec = state.nodeFont = 0
     }
    dispatch({
      type: actionTypes.FONT_SIZE_DECREASE,
      payload: { nodeTextDec },
    });
  };
  const borderStyleHandler = (e) => {
     const nodeBorderStyle = e.target.id;
     
    dispatch({
      type: actionTypes.NODE_BORDER_STYLE,
      payload: { nodeBorderStyle },
    });
  };
   const fontStyleHandler = (e) => {
    console.log(e.target.id);
    const fontStyle = e.target.id  
    dispatch({ 
      type: actionTypes.NODE_FONT_STYLE, 
      payload: {  fontStyle } });
  };
   const nodeShapeHandler = (e) => {
     const nodeShape = e.target.id
    dispatch({ type: actionTypes.NODE_SHAPE, payload: {nodeShape } });
  };
    const nodeTextTransform = (e) => {
    dispatch({
      type: actionTypes.NODE_TEXT_TRANSFORM,
      payload: { e },
    })}
    const hideAllNodesHandler = (e) => {
    dispatch({
      type: actionTypes.HIDE_ALL_NODES,
      payload: { e },
    });
  };
  const hideNodeHandler = (e,checkedGroup) => {
    dispatch({ type: actionTypes.HIDE_NODE, payload: { e,checkedGroup } });
  };
  const hideTreeHandler = (e) => {
    dispatch({
      type: actionTypes.HIDE_ALL_TREE,
      payload: { e },
    });
  };
    const changeArrowType = (e) => {
    let arrowTypeId = e.target.id
    dispatch({ type: actionTypes.ARROW_TYPE, payload: { arrowTypeId } });
  };
   const changeLineHandler = () => {
     let arrow = !arrowType
    dispatch({ type: actionTypes.CHANGE_ARROW_LINE, payload: {arrow } });
  };
   const edgeLabelNameHandler = (evt) => {
    dispatch({
      type: actionTypes.EDGE_LABEL_NAME,
      payload: { evt },
    });
  };
  const labelFontWeightHandler = (evt) => {

    dispatch({
      type: actionTypes.EDGE_LABEL_FONT,
      payload: { evt },
    });
  };
  const edgeLabelColorHandler= (bgColor)=>{
 dispatch({
      type: actionTypes.EDGE_LABEL_COLOR,
      payload:{bgColor}
    })
}
 const arrowColorHandler= (bgColor)=>{
 dispatch({
      type: actionTypes.EDGE_ARROW_COLOR,
      payload:{bgColor}
    })
}
 const arrowHeadHandler= (e)=>{
let head = e.target.id;
 dispatch({
      type: actionTypes.ARROW_HEAD_STYLE,
      payload:{head}
    })
}
//  const arrowWidthIncreaseHandler = () => {
//     let arrowInc = arrowWidth + 1;
//     dispatch({
//       type: actionTypes.ARROW_WIDTH_INCREASE,
//       payload: { arrowInc },
//     });
//   };
  // const arrowWidthDecreaseHandler = () => {
  //   let arrowDec = 0
  //     if(arrowWidth > 1){
  //       arrowDec = arrowWidth - 1
  //     }
  //     else{
  //       arrowDec = arrowWidth
  //     }
  //   dispatch({
  //     type: actionTypes.ARROW_WIDTH_DECREASE,
  //     payload: { arrowDec },
      
  //   });
  // };
  const arrowWidthHandler = (evt) => {
    dispatch ({
      type: actionTypes.ARROW_WIDTH_HANDLER,
      payload: {evt}
    })
  }
const imageHandler = (e,imageLoad) => {
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
  payload: {imageLoad}
})
  }
const multipleSelectNode = (multiId, seletedElements) => {

dispatch({
  type:actionTypes.MULTI_NODE_ELEMENTS,
  payload:{multiId, seletedElements}
})
}
const nodeSourcePositionHandler = (evt) => {
  dispatch({
    type:actionTypes.NODE_SOURCE_POSITION,
    payload:{evt}
  })
}
const paneClickHandler = (event) =>{
  dispatch({
    type:actionTypes.PANE_CLICK,
    payload:{event}
  })
}
const nodeSizeIncreaseHandler = () => {
  let nodeSizeInc = nodeSize + 1;
  dispatch({
    type:actionTypes.NODE_SIZE_INCREASE,
    payload:{nodeSizeInc}
  })
}
const nodeSizeDecreaseHandler = () => {
  let nodeSizeDec = 0
      if(nodeSize > 1){
        nodeSizeDec = nodeSize - 1
      }
      else{
        nodeSizeDec = nodeSize
      }
  dispatch({
    type:actionTypes.NODE_SIZE_DECREASE,
    payload:{ nodeSizeDec}
  })  
}
const nodeSizeHandler = (evt) => {
 dispatch({
type: actionTypes.NODE_SIZE_HANDLER,
payload: {evt}
 })
}
const loaderFile = ( _newCsvData,_indexNumber, valuesData, arr4,arr10, nodesNumber, nodesName,periodsNodesData) =>{
  dispatch({
    type: actionTypes._CSV_FILE_LOADER,
    payload :{ _newCsvData,_indexNumber, valuesData, arr4,arr10, nodesNumber, nodesName,periodsNodesData}
  })
}
const myCsvFileHandler = ( newCsvData) =>{
  dispatch({
    type: actionTypes.CSV_FILE_UPLOADER,
    payload :{ newCsvData}
  })
}
const periodsDataHandler = (arr5) =>{
  
  dispatch({
    type: actionTypes.ACTION_PERIODS_DATA,
    payload:{arr5}
  })
}

const specificDataHandler = (evt) => {
  
  dispatch({
    type: actionTypes.SPECIFIC_DATA_HANDLER,
    payload:{evt}
  })
}
const nodeDragIdHandler = (nodeId)=>{
dispatch({
type:actionTypes.NODE_DRAG_ID_HANDLER,
payload:{nodeId}
})

}
const nodeDragHandler = (node, nodePositionX, nodePositionY) =>{
  dispatch({
    type: actionTypes.NODE_DRAG_HANDLER,
    payload:{nodePositionX, nodePositionY}
  })
}
const periodsValueHandler = (evt) =>{
  dispatch({
    type: actionTypes.PERIODS_VALUE_HANDLER,
    payload:{evt}
  })
}
const selectedTabHandler = (index) => {
  dispatch({
    type: actionTypes.SELECTED_TAB_HANDLER,
    payload: {index}
  })
}
const showScvData = () => {
  dispatch ({
    type: actionTypes.SHOW_CSV_DATA
  })
}
const smartPaddingHandler = (evt) => {
  
  dispatch({
    type: actionTypes.SMART_PADDING_HANDLER,
    payload: {evt }
  })
}

const smartGridHandler = (evt) => {
  dispatch ({
    type: actionTypes.SMART_GRID_HANDLER,
    payload: {evt}
  })
}
const smartLineTypHandler = (evt) => {
  dispatch({
    type: actionTypes.SMART_LINE_TYPE_HANDLER,
    payload: {evt}
  })
}
const lessCornerHandler = (evt) =>{
  
  dispatch({
    type: actionTypes.SMART_LESS_CORNER,
    payload: {evt}
  })
}
const showSmartCustomization = () => {
  dispatch ({ type: actionTypes.SHOW_SMART_CUSTOMIZATION})
}
const showSmoothCustomization = () => {
  dispatch ({ type: actionTypes.SHOW_SMOOTH_CUSTOMIZATION})
}
const hideNodeNumber = (eve) =>{
  dispatch({
    type: actionTypes.HIDE_NODE_NUMBER,
    payload: {eve}
  })
}
const showModalNameHandler = (eve) => {
  dispatch({
    type: actionTypes.SHOW_MODAL_NAME_HANDLER,
    payload: {eve}
  })
}
const showTabNameHandler = (eve) => {
  dispatch({
    type: actionTypes.SHOW_TAB_NAME_HANDLER,
    payload: {eve}
  })
}
const showDateHandler = (eve) => {
  dispatch({
    type: actionTypes.SHOW_DATE_HANDLER,
    payload: {eve}
  })
}
const showPeriodHandler = (eve) => {
  dispatch({
    type: actionTypes.SHOW_PERIOD_HANDLER,
    payload: {eve}
  })
}
const showSoftwareOwnerHandler = (eve) => {
  dispatch({
    type: actionTypes.SHOW_SOFTWARE_OWNER_HANDLER,
    payload: {eve}
  })
}
const showSoftwareDevHandler = (eve) => {
  dispatch({
    type: actionTypes.SHOW_SOFTWARE_DEVELOPER_HANDLER,
    payload: {eve}
  })
}
const showUserHandler = (eve) => {
  dispatch({
    type: actionTypes.SHOW_USER_HANDLER,
    payload: {eve}
  })
}
const handleOpen = () => {
  dispatch({
    type: actionTypes.HANDLE_OPEN
  })
}
const handleClose = () => {
  dispatch({
    type: actionTypes.HANDLE_CLOSE
  })
}
const fetchedGroupData = (_finalData) => {
  let myData
   _finalData.map((ele) =>{
      myData = ele._groupIdentiy
   })

  dispatch({
    type: actionTypes.FETCH_GROUP_DATA,
    payload: {_finalData, myData}
  })
}
const createGroupHandler = (evt) =>{
  // let evtData = evt.target.value
dispatch({
  type: actionTypes.CREATE_GROUP_DATA,
  payload: {evt}
})
}
const showGroupList = () => {
  dispatch({type: actionTypes.SHOW_GROUP_LIST})
}
const copyNodeHandler = () => {
  dispatch({
    type:actionTypes.COPY_NODE_HANDLER
  })
}
const pasteNodeFileHandler = (pasteNodeData) => {
  dispatch({
    type: actionTypes.PASTE_NODE_FILE_HANDLER,
    payload:{pasteNodeData}
  })
}
const fetchGroupStatusHandler = (fetchGroupStatus) => {
  dispatch({
    type:actionTypes.FETCH_GROUP_STATUS_HANDLER,
    payload: {fetchGroupStatus}
  })
}
const showSideBarHandler = () => {
  dispatch({
    type:actionTypes.SHOW_SIDEBAR_HANDLER
  })
}
  return (
    <MultiTabContext.Provider
      value={{
        data: state,
        addTabHandler,
        tabRemover,
        updateDataSetHandler,
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
        // arrowWidthDecreaseHandler,
        // arrowWidthIncreaseHandler,
        removeElementHandler,
        imageHandler,
        multipleSelectNode,
        nodeSourcePositionHandler,
        paneClickHandler,
        nodeSizeDecreaseHandler,
          nodeSizeIncreaseHandler,
          loadDataHandler,
          isEmptyHandler,
          nodeDragIdHandler,
          // csvFileHandler,
          nodeDragHandler,
          myCsvFileHandler,
          loaderFile,
          periodsDataHandler,
          specificDataHandler,
          periodsValueHandler,
          selectedTabHandler,
          showScvData,
          smartPaddingHandler,
          smartGridHandler,
          smartLineTypHandler,
          lessCornerHandler,
          showSmartCustomization,
          showSmoothCustomization,
          arrowWidthHandler,
          nodeSizeHandler,
          hideNodeNumber,
          showModalNameHandler,
          showTabNameHandler,
          showDateHandler,
          showPeriodHandler,
          showUserHandler,
          showSoftwareOwnerHandler,
          showSoftwareDevHandler,
          handleOpen,
          handleClose,
          fetchedGroupData,
          createGroupHandler,
          showGroupList,
          copyNodeHandler,
          pasteNodeFileHandler,
          fetchGroupStatusHandler,
          showSideBarHandler
      }}
    >
      {props.children}
    </MultiTabContext.Provider>
  );
};

export default NodeState;
