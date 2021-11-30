import * as actionTypes from "../types";
import { nodesData } from "../../component/FlowChartData";

const authReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.ON_ELEMENT_CLICK_HANDLER:
    let __previousData = ''
    let previousLabel =''
    // const ammm = action.payload.element.data.label.props.children[1].props.
    // console.log('???????',action.payload.element.data.label.props.children[1]);
    if(state.previousState === null || state.previousState === ''){
     __previousData= action.payload.element.id
    } else if ( state.previousState !== action.payload.element.id ){
      __previousData = action.payload.element.id;
      previousLabel = action.payload.treeDataUpdate;
    }
      return {
        ...state,
        selectedNode: action.payload.element.id,
        selectedNodeName: action.payload.multiLabel,
        multiTree:previousLabel,
        pngImage: action.payload.imagePicture,
        _nodeType: action.payload.nodeType,
        showSourcePosition: true,
        previousState: action.payload._previousState,
        nodeName: action.payload._nodeName,
        nodeSize: state.nodeSize
      };

      case actionTypes.MULTI_NODE_ELEMENTS:
      return{
        ...state,
        multiSelectNode: action.payload.multi,
      }
      case actionTypes.LOAD_DATA_FROM_DB:
    // console.log("action.payload.data",action.payload.data);
      return{
        ...state,
        dataset:[action.payload.data],
        docID: action.payload.docid,
        state:action.payload.status

      }
      case actionTypes.ON_EDGE_DOUBLE_CLICK:
      return{
        ...state,
        showSourcePosition: false,
        selectArrow: action.payload._edge
      }
      case actionTypes.PANE_CLICK:
      return{
        ...state,
        selectedNodeName: state.selectedNodeName == '',
        // nodeName: state.nodeName == '',
      }
    case actionTypes.ADD_TAB:
      return {
        ...state,
        dataset: [...state.dataset, nodesData],
      };
      case actionTypes.REMOVE_TAB:
      let { selectedTab: removeSelectedTab} = action.payload;
      let tabToBeRemoved = [...state.dataset]
      tabToBeRemoved.splice(removeSelectedTab, 1)
      return {
        ...state,
        dataset: [...tabToBeRemoved]
      };
      
    
    case actionTypes.SELECTED_TAB:
      return {
        ...state,
        activeTab: action.payload.activeTab,
      };
    case actionTypes.ON_DRAG_NODE:
    // console.log({updatedNodeData});
    // console.log({selectedTab1});
      let { selectedTab: selectedTab1, updatedNodeData,_docid } = action.payload;
      let drag = [...state.dataset];

      console.log({drag});
      if(drag.length>0){
        // newly initialized dataset array

        drag = drag.map((element, index) => {
        if (selectedTab1 === index) {
          return updatedNodeData;
        }
        return element;
      });

      }else{

drag=[updatedNodeData]
      }
      
      return {
        ...state,
        dataset: [...drag],
        docID:state.docID?state.docID:_docid
      };
    case actionTypes.UPDATE_DATA_SET:
      let { currentTab, generatedEdge } = action.payload;
      let clonedData = [...state.dataset];
      clonedData = clonedData.map((element, index) => {
        if (currentTab === index) {
          return generatedEdge;
        }
        return element;
      });

      return {
        ...state,
        dataset: [...clonedData],
      };
case actionTypes.DELETE_ELEMENT:
let { selectedTab: tabSelect, deleteElement } = action.payload;
      let cloneDelete = [...state.dataset];
      cloneDelete = cloneDelete.map((element, index) => {
        if (tabSelect === index) {
          return deleteElement;
        }
        return element;
      });

      return {
        ...state,
        dataset: [...cloneDelete]
      }
  case actionTypes.CHANGE_NODE_NAME:
      let { nodeName, selectedTab: _selectedTab2 } = action.payload;
      let targetName = [...state.dataset[_selectedTab2]];
      const nameChange = targetName.map((el) => {
        if (el.id === state.selectedNode) { 
          // alert(JSON.stringify(el.data))
          // console.log(el.data.label.props.children)

//   if(el.data && el.data.label && el.data.label.props && el.data.label.props.children &&  el.data.label.props.children.length!==2 ){

// let imgURI=null
// el.data.label.props.children.forEach((child,index)=>{
//   if(typeof child ==="object"){
//   imgURI = el.data.label.props.children[index];
//   }
// })

// let {props:{src}}= imgURI;
// // let src="https://www.goodcore.co.uk/blog/wp-content/uploads/2019/08/what-is-coding.png"
// // // src = URL.createObjectURL(src)
//  let ImageView= <img style={{width:"100%", zIndex:'-5', position:'relatively'}} src={src} alt="nodeImage"/>
//           el.data = {...el.data,label:<span>{ImageView}{nodeName}</span>};
//   }else{
 
   el.data = { ...el.data, label: nodeName };
  // }
        }
        return el;
      });
      let _nodeNameData = [...state.dataset];
      _nodeNameData = _nodeNameData.map((tab, index) => {
        if (_selectedTab2 === index) {
          return nameChange;
        } else {
          return tab;
        }
      });
      return {
        ...state,
        dataset: [..._nodeNameData],
        nodeName: nodeName,
      };
    case actionTypes.BG_COLOR:
      let { bgColor, selectedTab: _selectedTab } = action.payload;
      let _edge = ''
      if(bgColor !== "" && state.multiSelectNode.length > 0){
        let clonedElements = [...state.dataset[_selectedTab]];
        clonedElements.map((multiple) => {
          if(state.multiSelectNode.includes(multiple.id)){
            multiple["style"] ={...multiple["style"]};
            multiple["style"]["background"] = bgColor;
          }
          return multiple;
        })
        _edge = [...clonedElements]
      }else if(state.multiSelectNode !== "" && bgColor !== ""){
      let targetEdgeLabelColor = [...state.dataset[_selectedTab]];
       _edge = targetEdgeLabelColor.map((el) => {
        if (el.id === state.selectedNode) {
          el.style = { ...el.style, backgroundColor: bgColor };
        }
        return el;
      });
      }
      let _clonedData = [...state.dataset];
      _clonedData = _clonedData.map((tab, index) => {
        if (_selectedTab === index) {
          return _edge;
        } else {
          return tab;
        }
      });
      return {
        ...state,
        dataset: [..._clonedData],
      };

      case actionTypes.CHANGE_NODE_BORDER_COLOR:
       let { updatedColor, selectedTab: _selectedTab3 } = action.payload;
      let borderChange = ''
      if(updatedColor !== "" && state.multiSelectNode.length > 0){
        let clonedElements = [...state.dataset[_selectedTab3]];
        clonedElements.map((multiple) => {
          if(state.multiSelectNode.includes(multiple.id)){
            multiple["style"] ={...multiple["style"]};
            multiple["style"]["borderColor"] = updatedColor;
          }
          return multiple;
        })
        borderChange = [...clonedElements]
      }else if(state.multiSelectNode !== "" && updatedColor !== ""){
let targetBorder = [...state.dataset[_selectedTab3]];
       borderChange = targetBorder.map((el) => {
        if (el.id === state.selectedNode) {
          el.style = { ...el.style, borderColor: updatedColor };
        }
        return el;
      });
      }
      let _clonedBorderData = [...state.dataset];
      _clonedBorderData = _clonedBorderData.map((tab, index) => {
        if (_selectedTab3 === index) {
          return borderChange;
        } else {
          return tab;
        }
      });
      
      return {
        ...state,
        dataset: [..._clonedBorderData],
        borderColor: updatedColor
      };
      case actionTypes.CHANGE_NODE_FONT_COLOR:
      let { updatedColor: updateFontColor, selectedTab: _selectedTab4} = action.payload;
       let textColorChange = ''
      if(updateFontColor !== "" && state.multiSelectNode.length > 0){
        let clonedElements = [...state.dataset[_selectedTab4]];
        clonedElements.map((multiple) => {
          if(state.multiSelectNode.includes(multiple.id)){
            multiple["style"] ={...multiple["style"]};
            multiple["style"]["color"] = updateFontColor;
          }
          return multiple;
        })
        textColorChange = [...clonedElements]
      }else if(state.multiSelectNode !== "" && updateFontColor !== ""){
      let targetTextColor = [...state.dataset[_selectedTab4]];
       textColorChange = targetTextColor.map((el) => {
        if (el.id === state.selectedNode) {
          el.style = { ...el.style, color: updateFontColor};
        }
        return el;
      });
      } 
      let clonedNodeTextData = [...state.dataset];
      clonedNodeTextData = clonedNodeTextData.map((tab, index) => {
        if (_selectedTab4 === index) {
          return textColorChange;
        } else {
          return tab;
        }
      });
      return {
        ...state,
        dataset: [...clonedNodeTextData],
        nodeFontColor: updateFontColor
      };
      case actionTypes.TRANSPARENT_NODE:
      let { updatedColor: updateTransparentNode, selectedTab: _selectedTab5} = action.payload;
       let nodeTransparentChange = ''
      if(updateTransparentNode !== "" && state.multiSelectNode.length > 0){
        let clonedElements = [...state.dataset[_selectedTab5]];
        clonedElements.map((multiple) => {
          if(state.multiSelectNode.includes(multiple.id)){
            multiple["style"] ={...multiple["style"]};
            multiple["style"]["opacity"] = updateTransparentNode;
          }
          return multiple;
        })
        nodeTransparentChange = [...clonedElements]
      }else if(state.multiSelectNode !== "" && updateTransparentNode !== ""){
           let targetNodeTransparent = [...state.dataset[_selectedTab5]];
       nodeTransparentChange = targetNodeTransparent.map((el) => {
        if (el.id === state.selectedNode) {
          el.style = { ...el.style, opacity: updateTransparentNode };
          
        }
        return el;
      });
      }
      let clonedNodeTransparent = [...state.dataset];
      clonedNodeTransparent = clonedNodeTransparent.map((tab, index) => {
        if (_selectedTab5 === index) {
          return nodeTransparentChange;
        } else {
          return tab;
        }
      });
      return {
        ...state,
        dataset: [...clonedNodeTransparent],
        nodeTransparent: updateTransparentNode
      };

       case actionTypes.BORDER_RADIOS_INCREASE:
       let { selectedTab: _selectedTab6, radiosInc} = action.payload;
        let nodeBorderRadios = ''
      if(radiosInc !== "" && state.multiSelectNode.length > 0){
        let clonedElements = [...state.dataset[_selectedTab6]];
        clonedElements.map((multiple) => {
          if(state.multiSelectNode.includes(multiple.id)){
            multiple["style"] ={...multiple["style"]};
            multiple["style"]["borderRadius"] = radiosInc;
          }
          return multiple;
        })
        nodeBorderRadios = [...clonedElements]
      }else if(state.multiSelectNode !== "" && radiosInc !== ""){
 let targetNodeBorderRadios = [...state.dataset[_selectedTab6]];
       nodeBorderRadios = targetNodeBorderRadios.map((el) => {
        if (el.id === state.selectedNode) {
          el.style = { ...el.style, borderRadius: radiosInc };    
        }
        return el;
      });
      }
      let clonedNodeDataRadios = [...state.dataset];
      clonedNodeDataRadios = clonedNodeDataRadios.map((tab, index) => {
        if (_selectedTab6 === index) {
          return nodeBorderRadios;
        } else {
          return tab;
        }
      });
     return{
       ...state,
          borderRadios: radiosInc,
          dataset:[...clonedNodeDataRadios]

     }
      case actionTypes.BORDER_RADIOS_DECREASE:
       let { selectedTab: _selectedTab7, radiosDec} = action.payload;
        let nodeBorderRadiosDecrease = ''
      if(radiosDec !== "" && state.multiSelectNode.length > 0){
        let clonedElements = [...state.dataset[_selectedTab7]];
        clonedElements.map((multiple) => {
          if(state.multiSelectNode.includes(multiple.id)){
            multiple["style"] ={...multiple["style"]};
            multiple["style"]["borderRadius"] = radiosDec;
          }
          return multiple;
        })
        nodeBorderRadiosDecrease = [...clonedElements]
      }else if(state.multiSelectNode !== "" && radiosDec !== ""){
let targetNodeBorderRadiosDecrease = [...state.dataset[_selectedTab7]];
       nodeBorderRadiosDecrease = targetNodeBorderRadiosDecrease.map((el) => {
        if (el.id === state.selectedNode) {
          el.style = { ...el.style, borderRadius: radiosDec };    
        }
        return el;
      });
      }
       
      let clonedNodeDataRadiosDecrease = [...state.dataset];
      clonedNodeDataRadiosDecrease = clonedNodeDataRadiosDecrease.map((tab, index) => {
        if (_selectedTab7 === index) {
          return nodeBorderRadiosDecrease;
        } else {
          return tab;
        }
      });
     
     return{
       ...state,
       borderRadios: radiosDec,
       dataset:[...clonedNodeDataRadiosDecrease]

     }
     case actionTypes.BORDER_WIDTH_INCREASE:
      let { selectedTab: _selectedTab8, width: width1} = action.payload;
       let targetBorderWidth = [...state.dataset[_selectedTab8]];
      const nodeBorderWidth = targetBorderWidth.map((el) => {
        if (el.id === state.selectedNode) {
         el.style = { ...el.style, borderStyle: 'solid', borderWidth: width1};   
        }
        return el;
      });
      let cloneNodeWidth = [...state.dataset];
      cloneNodeWidth = cloneNodeWidth.map((tab, index) => {
        if (_selectedTab8 === index) {
          return nodeBorderWidth;
        } else {
          return tab;
        }
      });
      return{
       ...state,
       borderWidth: width1,
       dataset:[...cloneNodeWidth]

     }
     case actionTypes.BORDER_WIDTH_DECREASE:
    let { selectedTab: _selectedTab9, width2} = action.payload;
       let targetBorderWidthDecrease = [...state.dataset[_selectedTab9]];
      const nodeBorderWidthDecrease = targetBorderWidthDecrease.map((el) => {
        if (el.id === state.selectedNode) {
          el.style = { ...el.style, borderStyle: 'solid', borderWidth: width2};   
        }
        return el;
      });
      let cloneNodeWidthDecrease = [...state.dataset];
      cloneNodeWidthDecrease = cloneNodeWidthDecrease.map((tab, index) => {
        if (_selectedTab9 === index) {
          return nodeBorderWidthDecrease;
        } else {
          return tab;
        }
      });
     return{
       ...state,
       borderWidth: width2,
       dataset:[...cloneNodeWidthDecrease]

     }
    case actionTypes.FONT_SIZE_INCREASE:
      let { selectedTab: _selectedTab10, nodeTextInc} = action.payload;
       let targetFontSize = [...state.dataset[_selectedTab10]];
      const nodeFontSize = targetFontSize.map((el) => {
        if (el.id === state.selectedNode) {
         el.style = { ...el.style, fontSize: nodeTextInc };  
        }
        return el;
      });
      let clonedFontSize = [...state.dataset];
      clonedFontSize = clonedFontSize.map((tab, index) => {
        if (_selectedTab10 === index) {
          return nodeFontSize;
        } else {
          return tab;
        }
      });
      return{
       ...state,
       nodeFont: nodeTextInc,
       dataset:[...clonedFontSize]

     }
     case actionTypes.FONT_SIZE_DECREASE:
    let { selectedTab: _selectedTab11, nodeTextDec} = action.payload;
       let targetNodeFont = [...state.dataset[_selectedTab11]];
      const nodeTextSize = targetNodeFont.map((el) => {
        if (el.id === state.selectedNode) {
           el.style = { ...el.style, fontSize: nodeTextDec };   
        }
        return el;
      });
      let clonedNodeFontSize = [...state.dataset];
      clonedNodeFontSize = clonedNodeFontSize.map((tab, index) => {
        if (_selectedTab11 === index) {
          return nodeTextSize;
        } else {
          return tab;
        }
      });
     return{
       ...state,
       nodeFont: nodeTextDec,
       dataset:[...clonedNodeFontSize]

     }
      case actionTypes.NODE_BORDER_STYLE:
    let { selectedTab: _selectedTab12, nodeBorderStyle } = action.payload;
       let targetNodeBorderStyle = [...state.dataset[_selectedTab12]];
      const _nodeBorderStyle = targetNodeBorderStyle.map((el) => {
        if (el.id === state.selectedNode) {
           el.style = { ...el.style, borderStyle: nodeBorderStyle};  
        }
        return el;
      });
      let cloneNodeBorderStyle = [...state.dataset];
      cloneNodeBorderStyle = cloneNodeBorderStyle.map((tab, index) => {
        if (_selectedTab12 === index) {
          return _nodeBorderStyle;
        } else {
          return tab;
        }
      });
     return{
       ...state,
       dataset:[...cloneNodeBorderStyle]

     }
      case actionTypes.NODE_FONT_STYLE:
       let { selectedTab: _selectedTab13, fontStyle } = action.payload;
       let targetNodeFontStyle = [...state.dataset[_selectedTab13]];
      const nodeFontStyle = targetNodeFontStyle.map((el) => {
        if (el.id === state.selectedNode) {
           el.style = {
          ...el.style,
          fontStyle: fontStyle,
          textDecoration: fontStyle,
          fontWeight: fontStyle,
        };
        }
        return el;
      });
      let cloneNodeFontStyle = [...state.dataset];
      cloneNodeFontStyle = cloneNodeFontStyle.map((tab, index) => {
        if (_selectedTab13 === index) {
          return nodeFontStyle;
        } else {
          return tab;
        }
      });
     return{
       ...state,
       dataset:[...cloneNodeFontStyle]
     }

     case actionTypes.NODE_SHAPE:
     let { selectedTab: _selectedTab14, nodeShape } = action.payload;
       let targetNodeShape = [...state.dataset[_selectedTab14]];
      const nodeShapeStyle = targetNodeShape.map((el) => {
        if (el.id === state.selectedNode) {
         
         el.style = { ...el.style, borderRadius: nodeShape};
        }
        
        return el;
      });
      let cloneNodeShape = [...state.dataset];
      cloneNodeShape = cloneNodeShape.map((tab, index) => {
        if (_selectedTab14 === index) {
          return nodeShapeStyle;
        } else {
          return tab;
        }
      });

     return{
       ...state,
       dataset:[...cloneNodeShape]
     }
     case actionTypes.NODE_TEXT_TRANSFORM:
      let { e, selectedTab: _selectedTab15 } = action.payload;
       let targetNodeTransform = [...state.dataset[_selectedTab15]];
      const nodeTextTransform = targetNodeTransform.map((el) => {
        if (el.id === state.selectedNode) {
          el.style = { ...el.style, textTransform: e };
        }
        
        return el;
      });
      let cloneNodeTextTransform = [...state.dataset];
      cloneNodeTextTransform = cloneNodeTextTransform.map((tab, index) => {
        if (_selectedTab15 === index) {
          return nodeTextTransform;
        } else {
          return tab;
        }
      });

     return{
       ...state,
       nodeText:e,
       dataset:[...cloneNodeTextTransform]
     }
     case actionTypes.HIDE_ALL_NODES:
     let { e:evt, selectedTab: _selectedTab16 } = action.payload;
       let targetHideAllNodes = [...state.dataset[_selectedTab16]];
      const hideAllNode = targetHideAllNodes.map((el) => {
         el.isHidden = evt;        
        return el;
      });
      let cloneHideAllNode = [...state.dataset];
      cloneHideAllNode = cloneHideAllNode.map((tab, index) => {
        if (_selectedTab16 === index) {
          return hideAllNode;
        } else {
          return tab;
        }
      });

     return{
       ...state,
       _hideAllNodes:evt,
       dataset:[...cloneHideAllNode]
     }
    case actionTypes.HIDE_NODE:
    let { e:hideElement, selectedTab: _selectedTab17 } = action.payload;
       let targetHideElement = [...state.dataset[_selectedTab17]];
       let nodeHideElement=''
       if (state.selectArrow) {
     nodeHideElement = targetHideElement.map((el) => {
        if (el.id === state.selectedArrow) {
          el.isHidden = hideElement;
        }
        return el;
     })}
        else{
            nodeHideElement = targetHideElement.map((el) => {
        if (el.id === state.selectedNode) {
          el.isHidden = hideElement;
        }
        return el;
      })};


      let cloneHideElement = [...state.dataset];
      cloneHideElement = cloneHideElement.map((tab, index) => {
        if (_selectedTab17 === index) {
          return nodeHideElement;
        } else {
          return tab;
        }
      });

     return{
       ...state,
       nodeHide:hideElement,
       dataset:[...cloneHideElement]
     }

    case actionTypes.HIDE_ALL_TREE:
    let { e:selectTree, selectedTab: _selectedTab18 } = action.payload;
       let targetSelectTree = [...state.dataset[_selectedTab18]];
      const nodeHideTree = targetSelectTree.map((multiple) => {
       if (state.multiTree.includes(multiple.id)) {
        multiple.isHidden = selectTree;
      }
        return multiple;
      });
      let cloneHideTreeHandle = [...state.dataset];
      cloneHideTreeHandle = cloneHideTreeHandle.map((tab, index) => {
        if (_selectedTab18 === index) {
          return nodeHideTree;
        } else {
          return tab;
        }
      });
        return{
       ...state,
       hideTree:selectTree,
       dataset:[...cloneHideTreeHandle]
     }

    //  ************Arrow Customization*********************
    case actionTypes.ARROW_TYPE:
    let { arrowTypeId , selectedTab: _selectedTab20 } = action.payload;
       let targetArrowType = [...state.dataset[_selectedTab20]];
       if(state.selectArrow)
       {
         const index = targetArrowType.findIndex((item) => item.id === state.selectArrow);
         targetArrowType[index].type = arrowTypeId;
       }
      let cloneArrowType = [...state.dataset];
      cloneArrowType = cloneArrowType.map((tab, index) => {
        if (_selectedTab20 === index) {
          return targetArrowType;
        } else {
          return tab;
        }
      });
        return{
       ...state,
       dataset:[...cloneArrowType]
     }
     case actionTypes.CHANGE_ARROW_LINE:
    let { arrow, selectedTab: _selectedTab21 } = action.payload;
       let targetArrowAnimation = [...state.dataset[_selectedTab21]];
       if(state.selectArrow)
       {
         const index = targetArrowAnimation.findIndex((item) => item.id === state.selectArrow);
         targetArrowAnimation[index].animated = arrow;
       }
      let cloneArrowAnimation = [...state.dataset];
      cloneArrowAnimation = cloneArrowAnimation.map((tab, index) => {
        if (_selectedTab21 === index) {
          return targetArrowAnimation;
        } else {
          return tab;
        }
      });
        return{
       ...state,
       arrowType: !state.arrowType,
       dataset:[...cloneArrowAnimation]
     }

    case actionTypes.EDGE_LABEL_NAME:
    let { evt:name, selectedTab: _selectedTab22 } = action.payload;
       let targetArrowLabelName = [...state.dataset[_selectedTab22]];
       if(state.selectArrow)
       {
         const index = targetArrowLabelName.findIndex((item) => item.id === state.selectArrow);
         targetArrowLabelName[index]["label"] = name;
       }
      let cloneArrowLabelName = [...state.dataset];
      cloneArrowLabelName = cloneArrowLabelName.map((tab, index) => {
        if (_selectedTab22 === index) {
          return targetArrowLabelName;
        } else {
          return tab;
        }
      });
        return{
       ...state,
       edgeLabelName: name,
       dataset:[...cloneArrowLabelName]
     }
     case actionTypes.EDGE_LABEL_FONT:
      let { evt:labelFont, selectedTab: _selectedTab23 } = action.payload;
       let targetArrowLabelFont = [...state.dataset[_selectedTab23]];
       if(state.selectArrow)
       {
         const index = targetArrowLabelFont.findIndex((item) => item.id === state.selectArrow);
         targetArrowLabelFont[index].labelStyle = { fontWeight: labelFont, fill: state.edgeLabelColor };
       }
      let cloneArrowLabelFont = [...state.dataset];
      cloneArrowLabelFont = cloneArrowLabelFont.map((tab, index) => {
        if (_selectedTab23 === index) {
          return targetArrowLabelFont;
        } else {
          return tab;
        }
      });
        return{
       ...state,
       edgeLabelFont: labelFont,
       dataset:[...cloneArrowLabelFont]
     }

  case actionTypes.EDGE_LABEL_COLOR:
  let { bgColor: edgeColor, selectedTab: _selectedTab24 } = action.payload;
      let targetTab = [...state.dataset[_selectedTab24]];
       if(state.selectArrow)
       {
         const index = targetTab.findIndex((item) => item.id === state.selectArrow);
         targetTab[index].labelStyle = { fill: edgeColor,fontWeight: state.edgeLabelFont};

         
       }
      let cloneEdgeLabelColor = [...state.dataset];
      cloneEdgeLabelColor = cloneEdgeLabelColor.map((tab, index) => {
        if (_selectedTab24 === index) {
          return targetTab;
        } else {
          return tab;
        }
      });
      return {
        ...state,
        edgeLabelColor:edgeColor,
        dataset: [...cloneEdgeLabelColor],
      };
      case actionTypes.EDGE_ARROW_COLOR:
      let { bgColor: arrowColor, selectedTab: _selectedTab25 } = action.payload;
      let targetArrowColor = [...state.dataset[_selectedTab25]];
       if(state.selectArrow)
       {
         const index = targetArrowColor.findIndex((item) => item.id === state.selectArrow);
         targetArrowColor[index].style = { stroke: arrowColor, arrowHeadType:state.arrowHead, strokeWidth:state.arrowWidth};
       }
      let cloneArrowColor = [...state.dataset];
      cloneArrowColor = cloneArrowColor.map((tab, index) => {
        if (_selectedTab25 === index) {
          return targetArrowColor;
        } else {
          return tab;
        }
      });
      return {
        ...state,
        edgeLabelColor:arrowColor,
        dataset: [...cloneArrowColor],
      };
        case actionTypes.ARROW_HEAD_STYLE:
      let { head, selectedTab: _selectedTab26 } = action.payload;
      let targetArrowHeadStyle = [...state.dataset[_selectedTab26]];
       if(state.selectArrow)
       {
         const index = targetArrowHeadStyle.findIndex((item) => item.id === state.selectArrow);
         targetArrowHeadStyle[index].arrowHeadType = head;
       }
      let cloneArrowHead = [...state.dataset];
      cloneArrowHead = cloneArrowHead.map((tab, index) => {
        if (_selectedTab26 === index) {
          return targetArrowHeadStyle;
        } else {
          return tab;
        }
      });
       return {
        ...state,
        arrowHead:head,
        dataset: [...cloneArrowHead],
      };
      case actionTypes.ARROW_WIDTH_INCREASE:
      let { arrowInc, selectedTab: _selectedTab27 } = action.payload;
      let targetArrowIncrease = [...state.dataset[_selectedTab27]];
       if(state.selectArrow)
       {
         const index = targetArrowIncrease.findIndex((item) => item.id === state.selectArrow);
         targetArrowIncrease[index].style = {strokeWidth: arrowInc, stroke: state.edgeLabelColor, arrowHeadType:state.arrowHead} 
        //  {strokeWidth: arrowInc};
       }
      let cloneArrowSizeInc = [...state.dataset];
      cloneArrowSizeInc = cloneArrowSizeInc.map((tab, index) => {
        if (_selectedTab27 === index) {
          return targetArrowIncrease;
        } else {
          return tab;
        }
      });
       return {
        ...state,
        arrowWidth: arrowInc,
        dataset: [...cloneArrowSizeInc],
      };
      case actionTypes.ARROW_WIDTH_DECREASE:
      let { arrowDec, selectedTab: _selectedTab28 } = action.payload;
      let targetArrowDecrease = [...state.dataset[_selectedTab28]];
       if(state.selectArrow)
       {
         const index = targetArrowDecrease.findIndex((item) => item.id === state.selectArrow);
         targetArrowDecrease[index].style = {strokeWidth: arrowDec, stroke: state.edgeLabelColor, arrowHeadType:state.arrowHead};
       }
      let cloneArrowSizeDecrease = [...state.dataset];
      cloneArrowSizeDecrease = cloneArrowSizeDecrease.map((tab, index) => {
        if (_selectedTab28 === index) {
          return targetArrowDecrease;
        } else {
          return tab;
        }
      });

       return {
        ...state,
      arrowWidth: arrowDec,
        dataset: [...cloneArrowSizeDecrease]
      };
      case actionTypes.ADD_PNG_IMAGE:
      let{imageLoad, selectedTab:_selectedTab29 } = action.payload
      let targetNodeImage = [...state.dataset[_selectedTab29]];
        const imagePng = targetNodeImage.map((el) => {
        if (el.id === state.selectedNode) {
          // let ImageView= <img style={{width:"100%", zIndex:'-5', position:'relatively'}} src={imageLoad} alt="nodeImage"/>
          // el.data = { ...el.data, label: <span> <img style={{width:"100%", zIndex:'-5', position:'relatively'}} src={imageLoad} alt="nodeImage"/>{state.selectedNodeName} </span>  };
          el.data = { ...el.data, label:<div style={{position:'relative', textAlign:'center'}}><img style={{width:"100%"}} src={imageLoad} alt="nodeImage"/> 
          <div style={{ position: 'absolute',top: '50%',left: '50%', transform: 'translate(-50%, -50%)'}}>{state.selectedNodeName}</div> </div>};
          el.style = { ...el.style, borderRadius:'6px', width:100, padding:'0px', border:'0px'}}     
        return el;
      });  
      let cloneNodeImage = [...state.dataset];
      cloneNodeImage = cloneNodeImage.map((tab, index) => {
        if (_selectedTab29 === index) {
          return imagePng;
        } else {
          return tab;
        }
      });
      return{
        ...state,
         dataset: [...cloneNodeImage]

      }
      case actionTypes.NODE_SOURCE_POSITION:
      // const {evt: nodeSourceEvt, selectedTab: selectedTab30} = action.payload
      let{evt: nodeSourceEvt, selectedTab: selectedTab30} = action.payload
        let targetSourceNode = [...state.dataset[selectedTab30]];
        const nodeSourceTarget = targetSourceNode.map((el) => {
        if (el.id === state.selectedNode) {
          if(state._nodeType === 'input'){
            // console.log('inputttttttttttttttt')
            el.sourcePosition =  nodeSourceEvt
            // el.sourcePosition={...el.sourcePosition, sourcePosition: nodeSourceEvt}
          }
          else if(state._nodeType === 'output'){
            el.targetPosition =  nodeSourceEvt
            // el.targetPosition ={...el.targetPosition, targetPosition: nodeSourceEvt}
          }
          else if(state._nodeType === 'default'){
            if(nodeSourceEvt === 'Right & Left')
            {
              el.sourcePosition = 'right'
              // el.targetPosition = {nodeSourceEvt === left? nodeSourceEvt}
              el.targetPosition = 'left'
            }
            // else if(nodeSourceEvt === 'Right & Left'){
            //   el.sourcePosition = nodeSourceEvt
            //   el.targetPosition = 'right'
            // }
            else if(nodeSourceEvt === 'Top & Bottom'){
              // el.sourcePosition = nodeSourceEvt
              el.targetPosition = 'top'
              el.sourcePosition = 'bottom'
            }
            // else if(nodeSourceEvt === 'bottom'){
            //   el.sourcePosition = nodeSourceEvt
            //   el.targetPosition = 'top'
            // }
            // el.sourcePosition = nodeSourceEvt
            // el.nodeSourceTarget = 'righ
          }
          // el.sourcePosition={...el.sourcePosition, sourcePosition:nodeSourceEvt}
          // el.targetPosition={...el.targetPosition, targetPosition: nodeSourceEvt}
          }
        return el;
      });  
      let cloneNodePosition = [...state.dataset];
      cloneNodePosition = cloneNodePosition.map((tab, index) => {
        if (selectedTab30 === index) {
          return nodeSourceTarget;
        } else {
          return tab;
        }
      });
      return{
        ...state,
        sourcePosition:nodeSourceEvt,
        dataset:[...cloneNodePosition]
      }
      case actionTypes.NODE_SIZE_INCREASE:
    let { selectedTab: _selectedTab31, nodeSizeInc} = action.payload;
       let targetNodeSizeInc = [...state.dataset[_selectedTab31]];
      const nodeWidthSize = targetNodeSizeInc.map((el) => {
        if (el.id === state.selectedNode) {
         el.style = { ...el.style, width: nodeSizeInc };  
        }
        return el;
      });
      let cloneNodeSizeInc = [...state.dataset];
      cloneNodeSizeInc = cloneNodeSizeInc.map((tab, index) => {
        if (_selectedTab31 === index) {
          return nodeWidthSize;
        } else {
          return tab;
        }
      });
      return{
       ...state,
       nodeSize: nodeSizeInc,
       dataset:[...cloneNodeSizeInc]

     }
     case actionTypes.NODE_SIZE_DECREASE:
       let { selectedTab: _selectedTab32, nodeSizeDec} = action.payload;
       let targetNodeSizeDec = [...state.dataset[_selectedTab32]];
      const nodeWidthSizeDec = targetNodeSizeDec.map((el) => {
        if (el.id === state.selectedNode) {
         el.style = { ...el.style, width: nodeSizeDec };  
        }
        return el;
      });
      let cloneNodeSizeDec = [...state.dataset];
      cloneNodeSizeDec = cloneNodeSizeDec.map((tab, index) => {
        if (_selectedTab32 === index) {
          return nodeWidthSizeDec;
        } else {
          return tab;
        }
      });
      return{
       ...state,
       nodeSize: nodeSizeDec,
       dataset:[...cloneNodeSizeDec]

     }
    default:
      return state;
  }
};

export default authReducer;
