import React, { useReducer, useRef, useState, useEffect } from "react";
import { EDIT_THE_NODE,CHANGE_DOTED_LINE_ANIMATED,CHANGE_LINE_ANIMATED,FORMAT_NODE,MULTI_TAB } from "../types";
import AuthContext from "./authContext";
import AuthReducer from "./AuthReducer";

const NodeState = (props) => {
  const initialState = {
    showEdit: false,
    showFormat: false,
    straightLine: false,
    dotedLine:false,
    tabs:false
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const editNode = () => {
    dispatch({ type: EDIT_THE_NODE });
  };
  const changeDotedLine = () => {
    dispatch( { type: CHANGE_DOTED_LINE_ANIMATED});
  };
  const changeStraightLine = () => {
    dispatch( { type: CHANGE_LINE_ANIMATED});
  };
  const formatNode = () => {
    dispatch({type: FORMAT_NODE});
  }
  const multiTabHandler = () => {
    dispatch({type: MULTI_TAB});
  }

  return (
    <AuthContext.Provider
      value={{
        data: state,
        editNode,
        formatNode,
        changeDotedLine,
        changeStraightLine,
        multiTabHandler
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default NodeState;
