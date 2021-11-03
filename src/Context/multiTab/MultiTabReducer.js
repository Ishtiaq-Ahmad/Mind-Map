import * as actionTypes  from "../types";
import {nodesData} from "../../component/FlowChartData"


const authReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.ON_ELEMENT_CLICK_HANDLER:
    return{
      ...state,
      selectedNode: action.payload.element.id
    }
    case actionTypes.ADD_TAB:
      return {
        ...state,
        dataset:[...state.dataset,nodesData]
      };
    case actionTypes.UPDATE_DATA_SET:
      // check for index to be updated
      // receive addEge
      let {currentTab,generatedEdge}= action.payload
      console.log({generatedEdge})
        let clonedData=[...state.dataset];
      clonedData=  clonedData.map((element,index)=>{
          if(currentTab===index){
            console.log(true);
            return generatedEdge
          }
          return element
        })
      return {
        ...state,
        dataset:[...clonedData]
      };

      case actionTypes.UPDATE_NODE_COLOR:
      let {selectedTab,nodeColor}= action.payload
        let bgData=[...state.dataset];
      bgData=  bgData.map((element,index)=>{
          if(selectedTab===index){
            return nodeColor
          }
          return element
        })
      return{
          ...state,
          dataset:[...bgData]
      }
    

    default:
      return state;
  }
};

export default authReducer;
