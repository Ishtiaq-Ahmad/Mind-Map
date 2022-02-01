import * as actionTypes from "../types";
import { nodesData } from "../../component/FlowChartData";
import { v4 as uuidv4 } from "uuid";

const authReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.ON_ELEMENT_CLICK_HANDLER:
      let __previousData = "";
      let previousLabel = "";
      if (state.previousState === null || state.previousState === "") {
        __previousData = action.payload.element.id;
      } else if (state.previousState !== action.payload.element.id) {
        __previousData = action.payload.element.id;
        previousLabel = action.payload.treeDataUpdate;
      }
      return {
        ...state,
        elementData: action.payload.element,
        selectedNode: action.payload.element.id,
        selectedNodeName: action.payload.multiLabel,
        multiTree: previousLabel,
        pngImage: action.payload.imagePicture,
        _nodeType: action.payload.nodeType,
        showSourcePosition: true,
        previousState: action.payload._previousState,
        nodeName: action.payload._nodeName,
        nodeSize: state.nodeSize,
        periodFinalData: action.payload.currentFinalValue,
        _periodsValue: action.payload._nodeName
      };

    case actionTypes.MULTI_NODE_ELEMENTS:
      return {
        ...state,
        
        multiSelectNode: action.payload.multi,
        multiNodeName : action.payload.multiData,
      };
    case actionTypes.LOAD_DATA_FROM_DB:
      return {
        ...state,
        dataset: action.payload.data,
        docID: action.payload.docid,
        isEmpty: action.payload.status,
      };
    case actionTypes.ON_EDGE_DOUBLE_CLICK:
      return {
        ...state,
        showSourcePosition: false,
        selectArrow: action.payload._edge,
      };
    case actionTypes.PANE_CLICK:
      return {
        ...state,
        selectedNodeName: state.selectedNodeName == "",
        // nodeName: state.nodeName == '',
      };
    case actionTypes.ADD_TAB:
      return {
        ...state,
        dataset: [...state.dataset, nodesData],
      };
    case actionTypes.REMOVE_TAB:

      let tabToBeRemoved = [...state.dataset];
      tabToBeRemoved.splice(state.selectedTab, 1);
      return {
        ...state,
        dataset: [...tabToBeRemoved],
      };

    case actionTypes.SELECTED_TAB:
      return {
        ...state,
        activeTab: action.payload.activeTab,
      };
    case actionTypes.IS_EMPTY:
      return {
        ...state,
        isEmpty: false,
      };
    case actionTypes.ON_DRAG_NODE:
      let {  updatedNodeData, _docid } = action.payload;
      let drag = [...state.dataset];
      if (drag.length > 0) {
        // newly initialized dataset array
     drag = drag.map((element, index) => {
          if (state.selectedTab === index) {
            return updatedNodeData;
          }
          return element;
        });
      } else {
        drag = [updatedNodeData];
      }

      return {
        ...state,
        dataset: [...drag],
        showNodeCustomization: true,
        docID: state.docID ? state.docID : _docid,
      };
    case actionTypes.UPDATE_DATA_SET:
      let { generatedEdge } = action.payload;
      let clonedData = [...state.dataset];
      clonedData = clonedData.map((element, index) => {
        if (state.selectedTab === index) {
          return generatedEdge;
        }
        return element;
      });

      return {
        ...state,
        dataset: [...clonedData],
      };
    case actionTypes.DELETE_ELEMENT:
      let {  deleteElement } = action.payload;
      let cloneDelete = [...state.dataset];
      cloneDelete = cloneDelete.map((element, index) => {
        if (state.selectedTab === index) {
          return deleteElement;
        }
        return element;
      });

      return {
        ...state,
        dataset: [...cloneDelete],
      };
    case actionTypes.CHANGE_NODE_NAME:
      let { evt: nodeName } = action.payload;
      let targetName = [...state.dataset[state.selectedTab]];
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
        if (state.selectedTab === index) {
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
      let { bgColor } = action.payload;
      let _edge = "";
      if (bgColor !== "" && state.multiSelectNode.length > 0) {
        let clonedElements = [...state.dataset[state.selectedTab]];
        clonedElements.map((multiple) => {
          if (state.multiSelectNode.includes(multiple.id)) {
            multiple["style"] = { ...multiple["style"] };
            multiple["style"]["background"] = bgColor;
          }
          return multiple;
        });
        _edge = [...clonedElements];
      } else if (state.multiSelectNode !== "" && bgColor !== "") {
        let targetEdgeLabelColor = [...state.dataset[state.selectedTab]];
        _edge = targetEdgeLabelColor.map((el) => {
          console.log('ehis is ', el);
          if (el.id === state.selectedNode) {
            el.style = { ...el.style, backgroundColor: bgColor };
          }
          return el;
        });
      }
      let _clonedData = [...state.dataset];
      _clonedData = _clonedData.map((tab, index) => {
        if (state.selectedTab === index) {
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
      let { updatedColor } = action.payload;
      let borderChange = "";
      if (updatedColor !== "" && state.multiSelectNode.length > 0) {
        let clonedElements = [...state.dataset[state.selectedTab]];
        clonedElements.map((multiple) => {
          if (state.multiSelectNode.includes(multiple.id)) {
            multiple["style"] = { ...multiple["style"] };
            multiple["style"]["borderColor"] = updatedColor;
          }
          return multiple;
        });
        borderChange = [...clonedElements];
      } else if (state.multiSelectNode !== "" && updatedColor !== "") {
        let targetBorder = [...state.dataset[state.selectedTab]];
        borderChange = targetBorder.map((el) => {
          if (el.id === state.selectedNode) {
            el.style = { ...el.style, borderStyle: 'solid',  borderColor: updatedColor };
          }
          return el;
        });
      }
      let _clonedBorderData = [...state.dataset];
      _clonedBorderData = _clonedBorderData.map((tab, index) => {
        if (state.selectedTab === index) {
          return borderChange;
        } else {
          return tab;
        }
      });

      return {
        ...state,
        dataset: [..._clonedBorderData],
        borderColor: updatedColor,
      };
    case actionTypes.CHANGE_NODE_FONT_COLOR:
      let { updatedColor: updateFontColor } =
        action.payload;
      let textColorChange = "";
      if (updateFontColor !== "" && state.multiSelectNode.length > 0) {
        let clonedElements = [...state.dataset[state.selectedTab]];
        clonedElements.map((multiple) => {
          if (state.multiSelectNode.includes(multiple.id)) {
            multiple["style"] = { ...multiple["style"] };
            multiple["style"]["color"] = updateFontColor;
          }
          return multiple;
        });
        textColorChange = [...clonedElements];
      } else if (state.multiSelectNode !== "" && updateFontColor !== "") {
        let targetTextColor = [...state.dataset[state.selectedTab]];
        textColorChange = targetTextColor.map((el) => {
          if (el.id === state.selectedNode) {
            el.style = { ...el.style, color: updateFontColor };
          }
          return el;
        });
      }
      let clonedNodeTextData = [...state.dataset];
      clonedNodeTextData = clonedNodeTextData.map((tab, index) => {
        if (state.selectedTab === index) {
          return textColorChange;
        } else {
          return tab;
        }
      });
      return {
        ...state,
        dataset: [...clonedNodeTextData],
        nodeFontColor: updateFontColor,
      };
    case actionTypes.TRANSPARENT_NODE:
      let { updatedColor: updateTransparentNode } =
        action.payload;
      let nodeTransparentChange = "";
      if (updateTransparentNode !== "" && state.multiSelectNode.length > 0) {
        let clonedElements = [...state.dataset[state.selectedTab]];
        clonedElements.map((multiple) => {
          if (state.multiSelectNode.includes(multiple.id)) {
            multiple["style"] = { ...multiple["style"] };
            multiple["style"]["opacity"] = updateTransparentNode;
          }
          return multiple;
        });
        nodeTransparentChange = [...clonedElements];
      } else if (state.multiSelectNode !== "" && updateTransparentNode !== "") {
        let targetNodeTransparent = [...state.dataset[state.selectedTab]];
        nodeTransparentChange = targetNodeTransparent.map((el) => {
          if (el.id === state.selectedNode) {
            el.style = { ...el.style, opacity: updateTransparentNode };
          }
          return el;
        });
      }
      let clonedNodeTransparent = [...state.dataset];
      clonedNodeTransparent = clonedNodeTransparent.map((tab, index) => {
        if (state.selectedTab === index) {
          return nodeTransparentChange;
        } else {
          return tab;
        }
      });
      return {
        ...state,
        dataset: [...clonedNodeTransparent],
        nodeTransparent: updateTransparentNode,
      };

    case actionTypes.BORDER_RADIOS_INCREASE:
      let {  radiosInc } = action.payload;
      let nodeBorderRadios = "";
      if (radiosInc !== "" && state.multiSelectNode.length > 0) {
        let clonedElements = [...state.dataset[state.selectedTab]];
        clonedElements.map((multiple) => {
          if (state.multiSelectNode.includes(multiple.id)) {
            multiple["style"] = { ...multiple["style"] };
            multiple["style"]["borderRadius"] = radiosInc;
          }
          return multiple;
        });
        nodeBorderRadios = [...clonedElements];
      } else if (state.multiSelectNode !== "" && radiosInc !== "") {
        let targetNodeBorderRadios = [...state.dataset[state.selectedTab]];
        nodeBorderRadios = targetNodeBorderRadios.map((el) => {
          if (el.id === state.selectedNode) {
            el.style = { ...el.style, borderRadius: radiosInc };
          }
          return el;
        });
      }
      let clonedNodeDataRadios = [...state.dataset];
      clonedNodeDataRadios = clonedNodeDataRadios.map((tab, index) => {
        if (state.selectedTab === index) {
          return nodeBorderRadios;
        } else {
          return tab;
        }
      });
      return {
        ...state,
        borderRadios: radiosInc,
        dataset: [...clonedNodeDataRadios],
      };
    case actionTypes.BORDER_RADIOS_DECREASE:
      let { radiosDec } = action.payload;
      let nodeBorderRadiosDecrease = "";
      if (radiosDec !== "" && state.multiSelectNode.length > 0) {
        let clonedElements = [...state.dataset[state.selectedTab]];
        clonedElements.map((multiple) => {
          if (state.multiSelectNode.includes(multiple.id)) {
            multiple["style"] = { ...multiple["style"] };
            multiple["style"]["borderRadius"] = radiosDec;
          }
          return multiple;
        });
        nodeBorderRadiosDecrease = [...clonedElements];
      } else if (state.multiSelectNode !== "" && radiosDec !== "") {
        let targetNodeBorderRadiosDecrease = [...state.dataset[state.selectedTab]];
        nodeBorderRadiosDecrease = targetNodeBorderRadiosDecrease.map((el) => {
          if (el.id === state.selectedNode) {
            el.style = { ...el.style, borderRadius: radiosDec };
          }
          return el;
        });
      }

      let clonedNodeDataRadiosDecrease = [...state.dataset];
      clonedNodeDataRadiosDecrease = clonedNodeDataRadiosDecrease.map(
        (tab, index) => {
          if (state.selectedTab === index) {
            return nodeBorderRadiosDecrease;
          } else {
            return tab;
          }
        }
      );

      return {
        ...state,
        borderRadios: radiosDec,
        dataset: [...clonedNodeDataRadiosDecrease],
      };
    case actionTypes.BORDER_WIDTH_INCREASE:
      let {  width: width1 } = action.payload;
      let targetBorderWidth = [...state.dataset[state.selectedTab]];
      const nodeBorderWidth = targetBorderWidth.map((el) => {
        if (el.id === state.selectedNode) {
          el.style = { ...el.style, borderStyle: "solid", borderWidth: width1 };
        }
        return el;
      });
      let cloneNodeWidth = [...state.dataset];
      cloneNodeWidth = cloneNodeWidth.map((tab, index) => {
        if (state.selectedTab === index) {
          return nodeBorderWidth;
        } else {
          return tab;
        }
      });
      return {
        ...state,
        borderWidth: width1,
        dataset: [...cloneNodeWidth],
      };
    case actionTypes.BORDER_WIDTH_DECREASE:
      let { width2 } = action.payload;
      let targetBorderWidthDecrease = [...state.dataset[state.selectedTab]];
      const nodeBorderWidthDecrease = targetBorderWidthDecrease.map((el) => {
        if (el.id === state.selectedNode) {
          el.style = { ...el.style, borderStyle: "solid", borderWidth: width2 };
        }
        return el;
      });
      let cloneNodeWidthDecrease = [...state.dataset];
      cloneNodeWidthDecrease = cloneNodeWidthDecrease.map((tab, index) => {
        if (state.selectedTab === index) {
          return nodeBorderWidthDecrease;
        } else {
          return tab;
        }
      });
      return {
        ...state,
        borderWidth: width2,
        dataset: [...cloneNodeWidthDecrease],
      };
    case actionTypes.FONT_SIZE_INCREASE:
      let {  nodeTextInc } = action.payload;
      let targetFontSize = [...state.dataset[state.selectedTab]];
      const nodeFontSize = targetFontSize.map((el) => {
        if (el.id === state.selectedNode) {
          el.style = { ...el.style, fontSize: nodeTextInc };
        }
        return el;
      });
      let clonedFontSize = [...state.dataset];
      clonedFontSize = clonedFontSize.map((tab, index) => {
        if (state.selectedTab === index) {
          return nodeFontSize;
        } else {
          return tab;
        }
      });
      return {
        ...state,
        nodeFont: nodeTextInc,
        dataset: [...clonedFontSize],
      };
    case actionTypes.FONT_SIZE_DECREASE:
      let { nodeTextDec } = action.payload;
      let targetNodeFont = [...state.dataset[state.selectedTab]];
      const nodeTextSize = targetNodeFont.map((el) => {
        if (el.id === state.selectedNode) {
          el.style = { ...el.style, fontSize: nodeTextDec };
        }
        return el;
      });
      let clonedNodeFontSize = [...state.dataset];
      clonedNodeFontSize = clonedNodeFontSize.map((tab, index) => {
        if (state.selectedTab === index) {
          return nodeTextSize;
        } else {
          return tab;
        }
      });
      return {
        ...state,
        nodeFont: nodeTextDec,
        dataset: [...clonedNodeFontSize],
      };
    case actionTypes.NODE_BORDER_STYLE:
      let {  nodeBorderStyle } = action.payload;
      let targetNodeBorderStyle = [...state.dataset[state.selectedTab]];
      const _nodeBorderStyle = targetNodeBorderStyle.map((el) => {
        if (el.id === state.selectedNode) {
          el.style = { ...el.style, borderStyle: nodeBorderStyle };
        }
        return el;
      });
      let cloneNodeBorderStyle = [...state.dataset];
      cloneNodeBorderStyle = cloneNodeBorderStyle.map((tab, index) => {
        if (state.selectedTab === index) {
          return _nodeBorderStyle;
        } else {
          return tab;
        }
      });
      return {
        ...state,
        dataset: [...cloneNodeBorderStyle],
      };
    case actionTypes.NODE_FONT_STYLE:
      let {  fontStyle } = action.payload;
      let targetNodeFontStyle = [...state.dataset[state.selectedTab]];
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
        if (state.selectedTab === index) {
          return nodeFontStyle;
        } else {
          return tab;
        }
      });
      return {
        ...state,
        dataset: [...cloneNodeFontStyle],
      };

    case actionTypes.NODE_SHAPE:
      let { nodeShape } = action.payload;
      let targetNodeShape = [...state.dataset[state.selectedTab]];
      const nodeShapeStyle = targetNodeShape.map((el) => {
        if (el.id === state.selectedNode) {
          el.style = { ...el.style, borderRadius: nodeShape };
        }

        return el;
      });
      let cloneNodeShape = [...state.dataset];
      cloneNodeShape = cloneNodeShape.map((tab, index) => {
        if (state.selectedTab === index) {
          return nodeShapeStyle;
        } else {
          return tab;
        }
      });

      return {
        ...state,
        dataset: [...cloneNodeShape],
      };
    case actionTypes.NODE_TEXT_TRANSFORM:
      let { e } = action.payload;
      let targetNodeTransform = [...state.dataset[state.selectedTab]];
      const nodeTextTransform = targetNodeTransform.map((el) => {
        if (el.id === state.selectedNode) {
          el.style = { ...el.style, textTransform: e };
        }

        return el;
      });
      let cloneNodeTextTransform = [...state.dataset];
      cloneNodeTextTransform = cloneNodeTextTransform.map((tab, index) => {
        if (state.selectedTab === index) {
          return nodeTextTransform;
        } else {
          return tab;
        }
      });

      return {
        ...state,
        nodeText: e,
        dataset: [...cloneNodeTextTransform],
      };
    case actionTypes.HIDE_ALL_NODES:
      let { e: evt } = action.payload;
      let targetHideAllNodes = [...state.dataset[state.selectedTab]];
      const hideAllNode = targetHideAllNodes.map((el) => {
        el.isHidden = evt;
        return el;
      });
      let cloneHideAllNode = [...state.dataset];
      cloneHideAllNode = cloneHideAllNode.map((tab, index) => {
        if (state.selectedTab === index) {
          return hideAllNode;
        } else {
          return tab;
        }
      });

      return {
        ...state,
        _hideAllNodes: evt,
        dataset: [...cloneHideAllNode],
      };
    case actionTypes.HIDE_NODE:
      let { e: hideElement } = action.payload;
    let nodeHideElement = "";
      if (hideElement !== "" && state.multiSelectNode.length > 0) {
        let clonedElements = [...state.dataset[state.selectedTab]];
        clonedElements.map((multiple) => {
          if (state.multiSelectNode.includes(multiple.id)) {
            multiple["isHidden"] = { ...multiple["isHidden"] };
            multiple["isHidden"] = hideElement;
          }
          return multiple;
        });
        nodeHideElement = [...clonedElements];
      } else if (state.multiSelectNode !== "" && hideElement !== "") {
        let targetHideElement = [...state.dataset[state.selectedTab]];
        if (state.selectArrow) {
        nodeHideElement = targetHideElement.map((el) => {
          if (el.id === state.selectedArrow) {
            el.isHidden = hideElement;
          }
          return el;
        });
        }else{
           nodeHideElement = targetHideElement.map((el) => {
          if (el.id === state.selectedNode) {
            el.isHidden = hideElement;
          }
          return el;
        })
        }

      // let targetHideElement = [...state.dataset[state.selectedTab]];
      // let nodeHideElement = "";
      // if (state.selectArrow) {
      //   nodeHideElement = targetHideElement.map((el) => {
      //     if (el.id === state.selectedArrow) {
      //       el.isHidden = hideElement;
      //     }
      //     return el;
      //   });
      // } else {
      //   nodeHideElement = targetHideElement.map((el) => {
      //     if (el.id === state.selectedNode) {
      //       el.isHidden = hideElement;
      //     }
      //     return el;
      //   });
      }

      let cloneHideElement = [...state.dataset];
      cloneHideElement = cloneHideElement.map((tab, index) => {
        if (state.selectedTab === index) {
          return nodeHideElement;
        } else {
          return tab;
        }
      });

      return {
        ...state,
        nodeHide: hideElement,
        dataset: [...cloneHideElement],
      };

    case actionTypes.HIDE_ALL_TREE:
      let { e: selectTree } = action.payload;
      let targetSelectTree = [...state.dataset[state.selectedTab]];
      const nodeHideTree = targetSelectTree.map((multiple) => {
        if (state.multiTree.includes(multiple.id)) {
          multiple.isHidden = selectTree;
        }
        return multiple;
      });
      let cloneHideTreeHandle = [...state.dataset];
      cloneHideTreeHandle = cloneHideTreeHandle.map((tab, index) => {
        if (state.selectedTab === index) {
          return nodeHideTree;
        } else {
          return tab;
        }
      });
      return {
        ...state,
        hideTree: selectTree,
        dataset: [...cloneHideTreeHandle],
      };

    //  ************Arrow Customization*********************
    case actionTypes.ARROW_TYPE:
      let { arrowTypeId } = action.payload;
      console.log('hello tab', state.selectedTab);
      console.log('chimpensi', state.dataset);
      let targetArrowType = [...state.dataset[state.selectedTab]];
      if (state.selectArrow) {
        const index = targetArrowType.findIndex(
          (item) => item.id === state.selectArrow
        );
        targetArrowType[index].type = arrowTypeId;
      }
      let cloneArrowType = [...state.dataset];
      cloneArrowType = cloneArrowType.map((tab, index) => {
        if (state.selectedTab === index) {
          return targetArrowType;
        } else {
          return tab;
        }
      });
      return {
        ...state,
        dataset: [...cloneArrowType],
      };
    case actionTypes.CHANGE_ARROW_LINE:
      let { arrow } = action.payload;
      let targetArrowAnimation = [...state.dataset[state.selectedTab]];
      if (state.selectArrow) {
        const index = targetArrowAnimation.findIndex(
          (item) => item.id === state.selectArrow
        );
        targetArrowAnimation[index].animated = arrow;
      }
      let cloneArrowAnimation = [...state.dataset];
      cloneArrowAnimation = cloneArrowAnimation.map((tab, index) => {
        if (state.selectedTab === index) {
          return targetArrowAnimation;
        } else {
          return tab;
        }
      });
      return {
        ...state,
        arrowType: !state.arrowType,
        dataset: [...cloneArrowAnimation],
      };

    case actionTypes.EDGE_LABEL_NAME:
      let { evt: name } = action.payload;
      let targetArrowLabelName = [...state.dataset[state.selectedTab]];
      if (state.selectArrow) {
        const index = targetArrowLabelName.findIndex(
          (item) => item.id === state.selectArrow
        );
        targetArrowLabelName[index]["label"] = name;
      }
      let cloneArrowLabelName = [...state.dataset];
      cloneArrowLabelName = cloneArrowLabelName.map((tab, index) => {
        if (state.selectedTab === index) {
          return targetArrowLabelName;
        } else {
          return tab;
        }
      });
      return {
        ...state,
        edgeLabelName: name,
        dataset: [...cloneArrowLabelName],
      };
    case actionTypes.EDGE_LABEL_FONT:
      let { evt: labelFont } = action.payload;
      let targetArrowLabelFont = [...state.dataset[state.selectedTab]];
      if (state.selectArrow) {
        const index = targetArrowLabelFont.findIndex(
          (item) => item.id === state.selectArrow
        );
        targetArrowLabelFont[index].labelStyle = {
          fontWeight: labelFont,
          fill: state.edgeLabelColor,
        };
      }
      let cloneArrowLabelFont = [...state.dataset];
      cloneArrowLabelFont = cloneArrowLabelFont.map((tab, index) => {
        if (state.selectedTab === index) {
          return targetArrowLabelFont;
        } else {
          return tab;
        }
      });
      return {
        ...state,
        edgeLabelFont: labelFont,
        dataset: [...cloneArrowLabelFont],
      };

    case actionTypes.EDGE_LABEL_COLOR:
      let { bgColor: edgeColor } = action.payload;
      let targetTab = [...state.dataset[state.selectedTab]];
      if (state.selectArrow) {
        const index = targetTab.findIndex(
          (item) => item.id === state.selectArrow
        );
        targetTab[index].labelStyle = {
          fill: edgeColor,
          fontWeight: state.edgeLabelFont,
        };
      }
      let cloneEdgeLabelColor = [...state.dataset];
      cloneEdgeLabelColor = cloneEdgeLabelColor.map((tab, index) => {
        if (state.selectedTab === index) {
          return targetTab;
        } else {
          return tab;
        }
      });
      return {
        ...state,
        edgeLabelColor: edgeColor,
        dataset: [...cloneEdgeLabelColor],
      };
    case actionTypes.EDGE_ARROW_COLOR:
      let { bgColor: arrowColor} = action.payload;
      let targetArrowColor = [...state.dataset[state.selectedTab]];
      if (state.selectArrow) {
        const index = targetArrowColor.findIndex(
          (item) => item.id === state.selectArrow
        );
        targetArrowColor[index].style = {
          stroke: arrowColor,
          arrowHeadType: state.arrowHead,
          strokeWidth: state.arrowWidth,
        };
      }
      let cloneArrowColor = [...state.dataset];
      cloneArrowColor = cloneArrowColor.map((tab, index) => {
        if (state.selectedTab === index) {
          return targetArrowColor;
        } else {
          return tab;
        }
      });
      return {
        ...state,
        edgeLabelColor: arrowColor,
        dataset: [...cloneArrowColor],
      };
    case actionTypes.ARROW_HEAD_STYLE:
      let { head } = action.payload;
      let targetArrowHeadStyle = [...state.dataset[state.selectedTab]];
      if (state.selectArrow) {
        const index = targetArrowHeadStyle.findIndex(
          (item) => item.id === state.selectArrow
        );
        targetArrowHeadStyle[index].arrowHeadType = head;
      }
      let cloneArrowHead = [...state.dataset];
      cloneArrowHead = cloneArrowHead.map((tab, index) => {
        if (state.selectedTab === index) {
          return targetArrowHeadStyle;
        } else {
          return tab;
        }
      });
      return {
        ...state,
        arrowHead: head,
        dataset: [...cloneArrowHead],
      };
    // case actionTypes.ARROW_WIDTH_INCREASE:
    //   let { arrowInc } = action.payload;
    //   let targetArrowIncrease = [...state.dataset[state.selectedTab]];
    //   if (state.selectArrow) {
    //     const index = targetArrowIncrease.findIndex(
    //       (item) => item.id === state.selectArrow
    //     );
    //     targetArrowIncrease[index].style = {
    //       strokeWidth: arrowInc,
    //       stroke: state.edgeLabelColor,
    //       arrowHeadType: state.arrowHead,
    //     };
    //     //  {strokeWidth: arrowInc};
    //   }
    //   let cloneArrowSizeInc = [...state.dataset];
    //   cloneArrowSizeInc = cloneArrowSizeInc.map((tab, index) => {
    //     if (state.selectedTab === index) {
    //       return targetArrowIncrease;
    //     } else {
    //       return tab;
    //     }
    //   });
    //   return {
    //     ...state,
    //     arrowWidth: arrowInc,
    //     dataset: [...cloneArrowSizeInc],
    //   };
    // case actionTypes.ARROW_WIDTH_DECREASE:
    //   let { arrowDec } = action.payload;
    //   let targetArrowDecrease = [...state.dataset[state.selectedTab]];
    //   if (state.selectArrow) {
    //     const index = targetArrowDecrease.findIndex(
    //       (item) => item.id === state.selectArrow
    //     );
    //     targetArrowDecrease[index].style = {
    //       strokeWidth: arrowDec,
    //       stroke: state.edgeLabelColor,
    //       arrowHeadType: state.arrowHead,
    //     };
    //   }
    //   let cloneArrowSizeDecrease = [...state.dataset];
    //   cloneArrowSizeDecrease = cloneArrowSizeDecrease.map((tab, index) => {
    //     if (state.selectedTab === index) {
    //       return targetArrowDecrease;
    //     } else {
    //       return tab;
    //     }
    //   });

    //   return {
    //     ...state,
    //     arrowWidth: arrowDec,
    //     dataset: [...cloneArrowSizeDecrease],
    //   };
      case actionTypes.ARROW_WIDTH_HANDLER:
    const {evt: _arrowWidth } = action.payload;
     let targetArrowDecrease = [...state.dataset[state.selectedTab]];
      if (state.selectArrow) {
        const index = targetArrowDecrease.findIndex(
          (item) => item.id === state.selectArrow
        );
        targetArrowDecrease[index].style = {
          strokeWidth: _arrowWidth,
          stroke: state.edgeLabelColor,
          arrowHeadType: state.arrowHead,
        };
      }
      let cloneArrowSizeDecrease = [...state.dataset];
      cloneArrowSizeDecrease = cloneArrowSizeDecrease.map((tab, index) => {
        if (state.selectedTab === index) {
          return targetArrowDecrease;
        } else {
          return tab;
        }
      });

      return {
        ...state,
        arrowWidth: _arrowWidth,
        dataset: [...cloneArrowSizeDecrease],
      }
    case actionTypes.ADD_PNG_IMAGE:
      let { imageLoad } = action.payload;
      let targetNodeImage = [...state.dataset[state.selectedTab]];
      const imagePng = targetNodeImage.map((el) => {
        if (el.id === state.selectedNode) {
          // let ImageView= <img style={{width:"100%", zIndex:'-5', position:'relatively'}} src={imageLoad} alt="nodeImage"/>
          // el.data = { ...el.data, label: <span> <img style={{width:"100%", zIndex:'-5', position:'relatively'}} src={imageLoad} alt="nodeImage"/>{state.selectedNodeName} </span>  };
          el.data = {
            ...el.data,
            label: (
              <div style={{ position: "relative", textAlign: "center" }}>
                <img
                  style={{ width: "100%" }}
                  src={imageLoad}
                  alt="nodeImage"
                />
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  {state.selectedNodeName}
                </div>{" "}
              </div>
            ),
          };
          el.style = {
            ...el.style,
            borderRadius: "6px",
            width: 100,
            padding: "0px",
            border: "0px",
          };
        }
        return el;
      });
      let cloneNodeImage = [...state.dataset];
      cloneNodeImage = cloneNodeImage.map((tab, index) => {
        if (state.selectedTab === index) {
          return imagePng;
        } else {
          return tab;
        }
      });
      return {
        ...state,
        dataset: [...cloneNodeImage],
      };
    case actionTypes.NODE_SOURCE_POSITION:
      let { evt: nodeSourceEvt } = action.payload;
      let targetSourceNode = [...state.dataset[state.selectedTab]];
      const nodeSourceTarget = targetSourceNode.map((el) => {
        if (el.id === state.selectedNode) {
          if (state._nodeType === "input") {
            el.sourcePosition = nodeSourceEvt;
            } else if (state._nodeType === "output") {
            el.targetPosition = nodeSourceEvt;
            } else if (state._nodeType === "default") {
            if (nodeSourceEvt === "Right & Left") {
              el.sourcePosition = "right";
              el.targetPosition = "left";
            }
            else if (nodeSourceEvt === "Top & Bottom") {
              el.targetPosition = "top";
              el.sourcePosition = "bottom";
            }
          }   
        }
        return el;
      });
      let cloneNodePosition = [...state.dataset];
      cloneNodePosition = cloneNodePosition.map((tab, index) => {
        if (state.selectedTab === index) {
          return nodeSourceTarget;
        } else {
          return tab;
        }
      });
      return {
        ...state,
        sourcePosition: nodeSourceEvt,
        dataset: [...cloneNodePosition],
      };
    case actionTypes.NODE_SIZE_INCREASE:
      let {  nodeSizeInc } = action.payload;
      let targetNodeSizeInc = [...state.dataset[state.selectedTab]];
      const nodeWidthSize = targetNodeSizeInc.map((el) => {
        if (el.id === state.selectedNode) {
          el.style = { ...el.style, width: nodeSizeInc };
        }
        return el;
      });
      let cloneNodeSizeInc = [...state.dataset];
      cloneNodeSizeInc = cloneNodeSizeInc.map((tab, index) => {
        if (state.selectedTab === index) {
          return nodeWidthSize;
        } else {
          return tab;
        }
      });
      return {
        ...state,
        nodeSize: nodeSizeInc,
        dataset: [...cloneNodeSizeInc],
      };
    case actionTypes.NODE_SIZE_DECREASE:
      let { nodeSizeDec } = action.payload;
      let targetNodeSizeDec = [...state.dataset[state.selectedTab]];
      const nodeWidthSizeDec = targetNodeSizeDec.map((el) => {
        if (el.id === state.selectedNode) {
          el.style = { ...el.style, width: nodeSizeDec };
        }
        return el;
      });
      let cloneNodeSizeDec = [...state.dataset];
      cloneNodeSizeDec = cloneNodeSizeDec.map((tab, index) => {
        if (state.selectedTab === index) {
          return nodeWidthSizeDec;
        } else {
          return tab;
        }
      });
      return {
        ...state,
        nodeSize: nodeSizeDec,
        dataset: [...cloneNodeSizeDec],
      };

      case actionTypes.NODE_SIZE_HANDLER:
      const {evt: _nodeSize} = action.payload;
      
      let _targetNodeSize = [...state.dataset[state.selectedTab]];
      const _nodeWidthSize = _targetNodeSize.map((el) => {
        if (el.id === state.selectedNode) {
          el.style = { ...el.style, width:  _nodeSize};
        }
        return el;
      });
      let cloneNodeSize = [...state.dataset];
      cloneNodeSize = cloneNodeSize.map((tab, index) => {
        if (state.selectedTab === index) {
          return _nodeWidthSize;
        } else {
          return tab;
        }
      });
      return {
        ...state,
        nodeSize: _nodeSize,
        dataset: [...cloneNodeSize],
      };

    case actionTypes.NODE_DRAG_ID_HANDLER:
    return{
      ...state,
      nodeDragId: action.payload.nodeId
    }
     case actionTypes.NODE_DRAG_HANDLER:
      let { nodePositionX, nodePositionY} = action.payload;
      let targetNodePosition = [...state.dataset[state.selectedTab]];
      let snode = state.nodeDragId;
    
let cloneNodePositionUpdate 
        let nodePositionChange = targetNodePosition.map((el) => {
        if (el.id === snode) {
          el.position = { ...el.position, x: nodePositionX, y:nodePositionY};
        }
       return el; 
      });

      cloneNodePositionUpdate = [...state.dataset];
      cloneNodePositionUpdate = cloneNodePositionUpdate.map((tab, index) => {
        if (state.selectedTab === index) {
          return nodePositionChange;
        } else {
          return tab;
        }
      });
      return {
        ...state,
        dataset: cloneNodePositionUpdate,
      };
 
    case actionTypes._CSV_FILE_LOADER:
    let {  _newCsvData,_indexNumber, valuesData, arr4,arr10} = action.payload;
      let _csvUpload = [...state.dataset[state.selectedTab]];
      
      if (_csvUpload.length > 0) {
        // newly initialized dataset array
     
     _csvUpload = _csvUpload.map((element, index) => {
          if (state.selectedTab === index) {
       
            return _newCsvData;
          }
          return element;
        });
      } else {
        
        _csvUpload = [_newCsvData];
      }

      return {
        ...state,
        _csvData :_newCsvData,
        dataset: [..._csvUpload],
        periodIndexNumber : _indexNumber,
        periodsDataArray: valuesData,
        periodsHeadData: arr4,
        periodsFirstColum: arr10,
        

        }

      case actionTypes.CSV_FILE_UPLOADER:
      let { newCsvData} = action.payload;
      let csvUpload = [...state.dataset];
      if (csvUpload.length > 0) {
        // newly initialized dataset array
     csvUpload = csvUpload.map((element, index) => {
          if (state.selectedTab === index) {
            return newCsvData;
          }
          return element;
        });
      } else {
        csvUpload = [newCsvData];
      }

      return {
        ...state,
        dataset: [...csvUpload],
        
      };
      case actionTypes.ACTION_PERIODS_DATA:
      
      return {
        ...state,
        periodsData: action.payload.arr5
      }

      case actionTypes.SPECIFIC_DATA_HANDLER:
      const{evt: specificDataEvent} = action.payload
      
      let periodsValueData = state.periodsDataArray;
      let targetCsvDataSet
      // if(state.elementData.data.label.props ){
        let finalValue =[]
      periodsValueData.forEach(element => {  
      let _value =state.periodsHeadData.findIndex(index => index === specificDataEvent);
      let secondValue = element[_value]
      finalValue.push(secondValue)     
       });
       targetCsvDataSet = [...state.dataset[state.selectedTab]]
      let periodsFirstName =[...state.periodsFirstColum];
      let _periodIndexNumber = [...state.periodIndexNumber]
      for(let i = 0; i <= targetCsvDataSet.length-1; i++){
          targetCsvDataSet[i].data = {...targetCsvDataSet[i].data, label:(<><strong>{ _periodIndexNumber[i-1]}</strong>{periodsFirstName[i-1]}<strong> {finalValue[i-1]}</strong></>)}
         } 
      // }
      // else{
      //   console.log('i am other data');
      // }
      
      return{
        ...state,
        specificData: specificDataEvent,
        dataset: [targetCsvDataSet]
      }
      case actionTypes.PERIODS_VALUE_HANDLER:
      const {evt: periodsValue}= action.payload;
      let allCsvData = [...state._csvData]
      let periodsNameData
      // console.log('state.hideAllNodeNumber', state.hideAllNodeNumber);
      allCsvData.map((elem) =>{
        if(elem.id === state.selectedNode){
           periodsNameData =  elem.data.label.props.children[1];   
        }
      })
      let periodsIndexFinal
      allCsvData.map((elem) =>{
        if(elem.id === state.selectedNode){
          let periodsIndex =  elem.data.label.props.children[0];  
           const{children: indexData} = periodsIndex.props;
           periodsIndexFinal = indexData
        }
      })
      

       let targetPeriodsValue = [...state.dataset[state.selectedTab]]
       const nodePeriodsData = targetPeriodsValue.map((element) => {
            if (element.id === state.selectedNode) {
          element.data ={...element.data, 
          label :(<><strong>{state.hideAllNodeNumber? periodsIndexFinal: null}</strong>{periodsNameData}<strong> {periodsValue}</strong></>)}
        }
        return element;
       })
       let clonePeriodData = [...state.dataset];
       clonePeriodData = clonePeriodData.map((tab, index) => {
        if (state.selectedTab === index) {
          return nodePeriodsData;
        } else {
          return tab;
        }
      });
      return{
        ...state,
        _periodsValue: periodsValue,
        dataset:[...clonePeriodData]
      }
      case actionTypes.SELECTED_TAB_HANDLER:
       return {
        ...state,
        selectedTab: action.payload.index
      }
      case actionTypes.SHOW_CSV_DATA:
      return{
        ...state,
        showCsv: !state.showCsv
      }
      case actionTypes.SMART_PADDING_HANDLER:
      const {evt: paddingValue} = action.payload;
      console.log('yes', state.options);
      let smartOption = [state.options];
       let targetSmartPadding = [...state.dataset[state.selectedTab]];
      const nodeSmartPadding = targetSmartPadding.map((el) => {
       if (el.id === state.selectArrow) {
          smartOption.map((opt) => {
          console.log('hey log', opt);
          //  opt.options={...opt.options, nodePadding: paddingValue }
          //  el.style = { ...el.style, borderStyle: "solid", borderWidth: width2 };
          return opt
         })
            
          }
        return el;
      });
  
    
      let cloneSmartPadding = [...state.dataset];

      cloneSmartPadding = cloneSmartPadding.map((tab, index) => {
        if(state.selectedTab === index){
          return nodeSmartPadding
        }
        else {
          return tab
        }

      })

      return {
        ...state,
        smartPadding: paddingValue,
        dataset: [...cloneSmartPadding],

      }
      case actionTypes.SMART_GRID_HANDLER:
      const {evt: _smartGrid} = action.payload
      return {
        ...state,
        smartGrid : _smartGrid
      }
      case actionTypes.SMART_LINE_TYPE_HANDLER:
      const {evt: _smartLineType} = action.payload
      return {
        ...state,
        smartLine: _smartLineType
        
      }
      case actionTypes.SMART_LESS_CORNER:
      const {evt: _smartLessCorner} = action.payload;
      return {
        ...state,
        smartCorner: !state.smartCorner
      }
      case actionTypes.SHOW_SMART_CUSTOMIZATION:
    
      return {
        ...state,
        showSmartCustom: true
      }
      case actionTypes.SHOW_SMOOTH_CUSTOMIZATION:
      return{
        ...state,
        showSmartCustom: false
      }
      case actionTypes.HIDE_NODE_NUMBER:
      const {eve: _nodeNumber} = action.payload
let nodeNumberData = state.periodsDataArray;  
       let _finalValue =[]
      nodeNumberData.forEach(element => {  
      let _value =state.periodsHeadData.findIndex(index => index === state.specificData);
      let secondValue = element[_value]
      _finalValue.push(secondValue)     
       });
      let targetNodeNumber = [...state.dataset[state.selectedTab]]
      
      let periodsNodeName =[...state.periodsFirstColum];
      let _periodsNodeNumber = [...state.periodIndexNumber]
      for(let i = 0; i <= targetNodeNumber.length-1; i++){
          targetNodeNumber[i].data = {...targetNodeNumber[i].data, label:(<><strong>{state.hideAllNodeNumber ? _periodsNodeNumber[i-1]: null}</strong>{periodsNodeName[i-1]}<strong> {_finalValue[i-1]}</strong></>)}
         } 
      
      return{
        ...state,
        hideAllNodeNumber: !state.hideAllNodeNumber,
        dataset: [targetNodeNumber]
      }

     

    default:
      return state;
  }
};

export default authReducer;
