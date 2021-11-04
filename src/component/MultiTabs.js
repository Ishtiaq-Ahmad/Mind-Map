import React, { useContext, useState, useEffect } from "react";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import "./Header.css";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import multipletabContext from "../Context/multipleTab/multipletabContext";

const MultiTabs = (props) => {
  const nodeContext = useContext(multipletabContext);
  const {
    data: { tabs: Tabs, counter },
    tabsHandler,
    parentGenerator,
    tabHandler,
    onConnectHandler,
    parentRemover,
  } = nodeContext;

  // console.log({data})
  const [color, setColor] = useState("primary");
  const [iconColor, setIconColor] = useState("primary");

  return (
    <div className="multiTabs">
      <Stack
        direction="row"
        spacing={1}
        divider={<Divider orientation="vertical" flexItem />}
        justifyContent="center"
      >
        <IconButton
          color={color}
          component="span"
          onClick={
         () =>  parentGenerator( )
          }
        >
        <CreateNewFolderIcon fontSize="medium" className="create_button" />
        </IconButton>
        <IconButton
          color={iconColor}
          component="span"
          onClick={() => parentRemover()}
        >
          <DeleteForeverIcon fontSize="medium" className="delete_button" />
        </IconButton>
      </Stack>
      <Box sx={{ width: "100%" }}>{tabsHandler()}</Box>
    </div>
  );
};

export default MultiTabs;
