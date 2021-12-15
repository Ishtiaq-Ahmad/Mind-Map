import React, { useState, useContext } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import "./Header.css";
import NodeContext from "../Context/auth/authContext";
import MultiTabContext from "../Context/multiTab/MultiTabContext";
import Button from "@mui/material/Button";
import TabIcon from "@mui/icons-material/Tab";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import PaletteIcon from "@mui/icons-material/Palette";
import PrintIcon from "@mui/icons-material/Print";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { TextField } from "@material-ui/core";
import LogoutIcon from "@mui/icons-material/Logout";
import SpeakerNotesIcon from "@mui/icons-material/SpeakerNotes";
import { _signOut } from "../utils/helpers";
import FlowChartData, {
  nodeSourcePosition,
  defaultNodeSource,
} from "./FlowChartData";
import CsvPeriodsData from './CsvPeriodsData';
// import { useHistory } from "react-router";
import { Link, useHistory } from "react-router-dom";
import {
  getAllData,
  createDocWithID,
  getDocById,
  updateDocWithId,
  snapShot,
} from "../utils/helpers";
import { v4 as uuidv4 } from "uuid";
import { signOut, getAuth } from "firebase/auth";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#F8F8FF",
  border: "2px solid #ADD8E6",
  borderRadios: "3px",
  boxShadow: 24,
  p: 4,
};

const Header = (props) => {
  let history = useHistory();
  const nodeContext = useContext(NodeContext);
  const nodeMultiContext = useContext(MultiTabContext);
  const {
    data: { role, userId, email, full_name },formatNode,multiTabHandler} = nodeContext;
  const {data: {dataset,docID,
      isEmpty,
      sourcePosition,
      _nodeType,
      showSourcePosition,
      specificData,
      periodsData
    },
    nodeSourcePositionHandler,
    isEmptyHandler,
    specificDataHandler
  } = nodeMultiContext;
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const arr8 = [...periodsData]
  const act = arr8.map((item) => {
  return { label: item}
})

  // const _nodesData = [...dataset]
  //   console.log({_nodesData});
  // const auth = getAuth();
  const saveHandler = async () => {
    let finalData = dataset;
    // alert(isEmpty)
    // console.log({isEmpty});
    // isEmpty  => true in case when no collection found in fb
    if (!isEmpty) {
      alert("empty");
      // finalData = [...dataset[props.selectedTab]];
      finalData = [...dataset];
      // const { data } = await getDocById("nodesData", docID);
      // console.log({ data });
      const serializedData = JSON.stringify({
        docId: docID,
        data: finalData,
      });
      updateDocWithId("nodesData", docID, { dumpData: serializedData });
    } else {
      const myDocId = uuidv4();
      const serializedData = JSON.stringify({
        docId: myDocId,
        data: finalData,
      });

      // save our data set id in user collection 
    isEmptyHandler();
     await  updateDocWithId("users", userId, { nodeID:myDocId,role,email,full_name,uid:userId });

      await createDocWithID("nodesData", myDocId, {
        dumpData: serializedData,
      });
      // handler
    }
  };
  // const signOutHandler =  () => {
  //   _signOut( history.push("/"))
   
    // await signOut(auth)
    // console.log('signout')
    // await _signOut();
    // props.history.push('/login')
    // try {
    //    _signOut(
    //      props.history.push('/login')
    //    );

    // } catch (error) {
    //   alert("oops error in user login", error);
    // }
  
  // };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Stack
            direction="row"
            spacing={2}
            className="ming_map"
            divider={<Divider orientation="vertical" flexItem />}
          >
            <Link to="/home" style={{ textDecoration: "none", color: "black" }}>
              <Typography variant="h6">Mind Map</Typography>
            </Link>

            <Button
              startIcon={<TabIcon />}
              onClick={multiTabHandler}
              size="small"
              variant="outlined"
            >
              Multi Tabs
            </Button>

            {/* {showSourcePosition ?  */}
            {showSourcePosition ? (
              <>
                {_nodeType === "input" || _nodeType === "output" ? (
                  <TextField
                    select
                    value={sourcePosition}
                    name={sourcePosition}
                    onChange={(evt) => {
                      nodeSourcePositionHandler(
                        evt.target.value,
                        props.selectedTab
                      );
                    }}
                    label="Source Position"
                    size="small"
                    variant="outlined"
                    style={{ width: "160px" }}
                    // width="20px"
                    // fullWidth
                  >
                    {nodeSourcePosition.map((option) => (
                      <MenuItem key={option.label} value={option.label}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                ) : (
                  <TextField
                    select
                    value={sourcePosition}
                    name={sourcePosition}
                    onChange={(evt) => {
                      nodeSourcePositionHandler(
                        evt.target.value,
                        props.selectedTab
                      );
                    }}
                    label="Source Position"
                    size="small"
                    variant="outlined"
                    style={{ width: "160px" }}
                  >
                    {defaultNodeSource.map((option) => (
                      <MenuItem key={option.label} value={option.label}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                )}{" "}
              </>
            ) : null}
            {role === 1 ? (
              <Link to="/admin-dashboard" style={{ textDecoration: "none" }}>
                {" "}
                <Button
                  // onClick={() => props.history.push('/admin-dashboard')}
                  size="small"
                  variant="outlined"
                >
                  Admin dashboard
                </Button>
              </Link>
            ) : null}
           <TextField
                    select
                    value={specificData}
                    name={specificData}
                    onChange={
                        (evt) => {
                      specificDataHandler(
                        evt.target.value,
                        props.selectedTab
                      );
                    }}
                    label="Periods Data"
                    size="small"
                    variant="outlined"
                    style={{ width: "160px" }}
                    // width="20px"
                    // fullWidth
                  >
                    {act.map((option) => (
                      <MenuItem key={option.label} value={option.label}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                  {/* <CsvPeriodsData/> */}
            <Button
              variant="contained"
              style={{ display: `${dataset.length < 1 ? `none` : `block`}` }}
              onClick={saveHandler}
            >
              Save
            </Button>
          </Stack>
          <label htmlFor="icon-button-file">
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
              onClick={props.onStartCapture}
            >
              <PhotoCamera color="#616161" />
            </IconButton>

            <IconButton color="primary" component="span" onClick={formatNode}>
              <PaletteIcon />
            </IconButton>

            <IconButton
              color="primary"
              onClick={props.handlePrint}
              component="span"
            >
              <PrintIcon />
            </IconButton>

            <IconButton color="primary" component="span" onClick={handleOpen}>
              <SpeakerNotesIcon />
            </IconButton>
            <IconButton
              color="primary"
              component="span"
              // onClick={signOutHandler}
            >
              <LogoutIcon />
            </IconButton>
            
          </label>
          <Modal
            open={open}
            onClose={handleClose}
            // aria-labelledby="modal-modal-title"
            // aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Short Cuts
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
              </Typography>
            </Box>
          </Modal>
          {/* <div className="right_icons">
          <FontAwesomeIcon icon={faEdit} onClick={editNode} className="edit_icon" />
          
          </div> 
          <FontAwesomeIcon icon={faPalette} onClick={formatNode} className="edit_icon" /> */}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
