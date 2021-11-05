import * as actionTypes from "../types";
import { nodesData } from "../../component/FlowChartData";

const authReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.ON_ELEMENT_CLICK_HANDLER:
      return {
        ...state,
        selectedNode: action.payload.element.id,
        selectedNodeName: action.payload.multiLabel,
        multiTree:action.payload.treeDataUpdate
      };
    case actionTypes.ADD_TAB:
      return {
        ...state,
        dataset: [...state.dataset, nodesData],
      };
    case actionTypes.SELECTED_TAB:
      return {
        ...state,
        activeTab: action.payload.activeTab,
      };
    case actionTypes.ON_DRAG_NODE:
      let { selectedTab: selectedTab1, updatedNodeData } = action.payload;
      console.log("dataset", state.dataset);
      let drag = [...state.dataset];
      console.log({ selectedTab1 });
      drag = drag.map((element, index) => {
        if (selectedTab1 === index) {
          // alert(selectedTab1,index)
          // state.dataset.concat(newNode)
          return updatedNodeData;
        }
        return element;
      });
      return {
        ...state,
        dataset: [...drag],
      };
    case actionTypes.UPDATE_DATA_SET:
      // check for index to be updated
      // receive addEge
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

    // case actionTypes.UPDATE_NODE_COLOR:
    //   let { selectedTab, nodeColor } = action.payload;
    //   let bgData = [...state.dataset];
    //   bgData = bgData.map((element, index) => {
    //     if (selectedTab === index) {
    //       return nodeColor;
    //     }
    //     return element;
    //   });
    //   return {
    //     ...state,
    //     dataset: [...bgData],
    //   };
  case actionTypes.CHANGE_NODE_NAME:
      let { nodeName, selectedTab: _selectedTab2 } = action.payload;
      let targetName = [...state.dataset[_selectedTab2]];
      const nameChange = targetName.map((el) => {
        if (el.id === state.selectedNode) {
          el.data = { ...el.data, label: nodeName };
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
      // check for index to be updated
      // receive addEge
      let { bgColor, selectedTab: _selectedTab } = action.payload;
      let targetTab = [...state.dataset[_selectedTab]];
      const nodes = targetTab.map((el) => {
        if (el.id === state.selectedNode) {
          el.style = { ...el.style, backgroundColor: bgColor };
        }
        return el;
      });
      let _clonedData = [...state.dataset];
      _clonedData = _clonedData.map((tab, index) => {
        if (_selectedTab === index) {
          return nodes;
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
      let targetBorder = [...state.dataset[_selectedTab3]];
      const borderChange = targetBorder.map((el) => {
        if (el.id === state.selectedNode) {
          el.style = { ...el.style, borderColor: updatedColor };
        }
        return el;
      });
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
      let targetTextColor = [...state.dataset[_selectedTab4]];
      const textColorChange = targetTextColor.map((el) => {
        if (el.id === state.selectedNode) {
          el.style = { ...el.style, color: updateFontColor};
        }
        return el;
      });
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
      let targetNodeTransparent = [...state.dataset[_selectedTab5]];
      const nodeTransparentChange = targetNodeTransparent.map((el) => {
        if (el.id === state.selectedNode) {
          el.style = { ...el.style, opacity: updateTransparentNode };
          
        }
        return el;
      });
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
       let targetNodeBorderRadios = [...state.dataset[_selectedTab6]];
      const nodeBorderRadios = targetNodeBorderRadios.map((el) => {
        if (el.id === state.selectedNode) {
          el.style = { ...el.style, borderRadius: radiosInc };    
        }
        return el;
      });
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
       let targetNodeBorderRadiosDecrease = [...state.dataset[_selectedTab7]];
      const nodeBorderRadiosDecrease = targetNodeBorderRadiosDecrease.map((el) => {
        if (el.id === state.selectedNode) {
          el.style = { ...el.style, borderRadius: radiosDec };    
        }
        return el;
      });
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
    default:
      return state;
  }
};

export default authReducer;
