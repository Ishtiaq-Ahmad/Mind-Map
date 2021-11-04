import {
  EDIT_THE_NODE,
  CHANGE_DOTED_LINE_ANIMATED,
  CHANGE_LINE_ANIMATED,
  FORMAT_NODE,
  MULTI_TAB
} from "../types";

const authReducer = (state, action) => {
  switch (action.type) {
    case EDIT_THE_NODE:
      return {
        ...state,
        showEdit: !state.showEdit,
      };
    case FORMAT_NODE:
      return {
        ...state,
        showFormat: !state.showFormat,
      };
    case CHANGE_DOTED_LINE_ANIMATED:
      return {
        ...state,
        dotedLine: !state.dotedLine,
      };
    case CHANGE_LINE_ANIMATED:
      return {
        ...state,
        smoothArrow: !state.smoothArrow,
      };
    case MULTI_TAB:
    return{
      ...state,
      tabs: !state.tabs
    }

    default:
      return state;
  }
};

export default authReducer;
