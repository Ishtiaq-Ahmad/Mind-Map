import React, { useContext, useState} from "react";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import "./SideBar.css";
import Box from "@mui/material/Box";
import ContainerData from "../Context/multiTab/MultiTabContext";

const MultiTab = (props) => {
  const [color, setColor] = useState("primary");
  const [iconColor, setIconColor] = useState("primary");
  const containerContext = useContext(ContainerData);
  // const [counter, setCounter] = useState([0]);
const {data: { dataset },addTabHandler, tabRemover} = containerContext;


// 


// 
 const tabGenerator = () => {
    return props.counter.map((element, index) => {
      return (
        
        <div className="tab" key={index} onClick={() => props.setSelectedTab(index)}>
        <strong>Screen: {index}</strong>  
        </div>
      );
    });
  };
//  const deleteItem = () => {
//    return setCounter(
//      counter.splice(props.selectedTab, 1)
//    )
//  }
  console.log('are you select', props.selectedTab)
  return (
    <div>
    
      <Stack
        direction="row"
        spacing={1}
        divider={<Divider orientation="vertical" flexItem />}
        justifyContent="center"
      >
        <IconButton
          color={color}
          component="span"
          onClick={() =>{
           props.setCounter([...props.counter,8])
            addTabHandler()}
          }
        >
          <CreateNewFolderIcon fontSize="medium" className="create_button" />
        </IconButton>
        
        <IconButton
          color={iconColor}
          component="span"
          
          onClick={() =>{
            if(props.selectedTab!== 0){
  let __counter=[...props.counter];
          console.log('ima coutner', __counter)
          let __selectedTab= props.selectedTab;
  __counter.splice(props.selectedTab,1)
             props.setCounter(__counter)
            tabRemover(props.selectedTab)

            } else{
              alert('default screen is not deletable')
            }
        
          
           }}
        >
          <DeleteForeverIcon fontSize="medium" className="delete_button" />
        </IconButton>
      </Stack>
      <Box sx={{ width: "100%" }}>{tabGenerator()}</Box>
     
    </div>
  );
};

export default MultiTab;
