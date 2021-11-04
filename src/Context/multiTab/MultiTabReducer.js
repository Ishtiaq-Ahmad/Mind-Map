import * as actionTypes from "../types";
import { nodesData } from "../../component/FlowChartData";

const authReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.ON_ELEMENT_CLICK_HANDLER:
      return {
        ...state,
        selectedNode: action.payload.element.id,
        selectedNodeName: action.payload.multiLabel,
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
    
    default:
      return state;
  }
};

export default authReducer;
