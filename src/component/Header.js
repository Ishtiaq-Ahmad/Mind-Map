import React, { useState, useContext } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import "../style/Header.css";
import NodeContext from "../Context/auth/authContext";
import MultiTabContext from "../Context/multiTab/MultiTabContext";
import Button from "@mui/material/Button";
import TabIcon from "@mui/icons-material/Tab";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import PrintIcon from "@mui/icons-material/Print";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { TextField } from "@material-ui/core";
import LogoutIcon from "@mui/icons-material/Logout";
import SpeakerNotesIcon from "@mui/icons-material/SpeakerNotes";
import { _signOut } from "../utils/helpers";
import {nodeSourcePosition,defaultNodeSource} from "./FlowChartData";
import { useNavigate, Link } from "react-router-dom";
import {
  getAllData,
  createDocWithID,
  getDocById,
  updateDocWithId,
  snapShot,
} from "../utils/helpers";
import { v4 as uuidv4 } from "uuid";
import { signOut, getAuth } from "firebase/auth";
import Switch from "@mui/material/Switch";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#F8F8FF",
  border: "2px solid #ADD8E6",
  borderRadius: "13px",
  boxShadow: 24,
  p: 3,
};

const Header = (props) => {
  // let history = useHistory();
  const navigate = useNavigate();
  const nodeContext = useContext(NodeContext);
  const nodeMultiContext = useContext(MultiTabContext);
  const {
    data: { role, userId, email, full_name },
    multiTabHandler,
  } = nodeContext;
  const {
    data: {
      dataset,
      docID,
      isEmpty,
      sourcePosition,
      _nodeType,
      showSourcePosition,
      specificData,
      periodsData,
      multiNodeData,
      showModalName,
      showTabName,
      showDate,
      showPeriod,
      showUser,
      showSoftwareOwner,
      showSoftwareDeveloper,
    },
    nodeSourcePositionHandler,
    isEmptyHandler,
    specificDataHandler,
    showModalNameHandler,
    showTabNameHandler,
    showDateHandler,
    showPeriodHandler,
    showUserHandler,
    showSoftwareOwnerHandler,
    showSoftwareDevHandler,
  } = nodeMultiContext;
  const [open, setOpen] = useState(false);
  const [openPrint, setOpenPrint] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const printHandleOpen = () => setOpenPrint(true);
  const printHandleClose = () => setOpenPrint(false);
  const handlePrintInfo = () => {
    props.handlePrint();
    setOpenPrint(false);
  };

  const arr8 = [...periodsData];
  const act = arr8.map((item) => {
    return { label: item };
  });

  // const _nodesData = [...dataset]
  //   console.log({_nodesData});
  // const auth = getAuth();
  const saveHandler = async () => {
    let finalData = dataset;
    // alert(isEmpty)
    // console.log({isEmpty});
    // isEmpty  => true in case when no collection found in fb
    if (!isEmpty) {
      // alert("empty");
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
      isEmptyHandler();
      await updateDocWithId("users", userId, {
        nodeID: myDocId,
        role,
        email,
        full_name,
        uid: userId,
      });

      await createDocWithID("nodesData", myDocId, {
        dumpData: serializedData,
      });
      // handler
    }
  };
  const signOutHandler = () => {
    _signOut(navigate("/"));
  };
  let multiUser = {
    transform: "scale(.9)",
  };

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
              startIcon={<TabIcon style={multiUser} />}
              onClick={multiTabHandler}
              size="small"
              variant="outlined"
            >
              Multi Tabs
            </Button>
            {showSourcePosition ? (
              <>
                {_nodeType === "input" || _nodeType === "output" ? (
                  <TextField
                    select
                    value={sourcePosition}
                    name={sourcePosition}
                    onChange={(evt) => {
                      nodeSourcePositionHandler(evt.target.value);
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
                      nodeSourcePositionHandler(evt.target.value);
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
                )}
              </>
            ) : null}
            {role === 1 ? (
              <Link to="/admin-dashboard" style={{ textDecoration: "none" }}>
                <Button
                  // onClick={() => props.history.push('/admin-dashboard')}
                  size="medium"
                  variant="outlined"
                >
                  Admin dashboard
                </Button>
              </Link>
            ) : null}
            {/* { */}
            {/* showCsv ? ( */}
            <TextField
              select
              value={specificData}
              name={specificData}
              onChange={(evt) => specificDataHandler(evt.target.value)}
              label="Periods Data"
              size="small"
              variant="outlined"
              style={{ width: "160px" }}
              color="primary"
              // width="20px"
              // fullWidth
            >
              {act.map((option) => (
                <MenuItem key={option.label} value={option.label}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            {/* ) : null */}
            {/* } */}

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
            <IconButton
              color="primary"
              // onClick={props.handlePrint}
              onClick={printHandleOpen}
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
              onClick={signOutHandler}
            >
              <LogoutIcon />
            </IconButton>
          </label>
          <Modal open={open} onClose={handleClose}>
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Group Nodes:
              </Typography>

              {multiNodeData.map((item, index) => (
                <fragment key={item.map}>
                  <Typography variant="caption" gutterBottom component="div">
                    <strong>Node Number:</strong> {index + 1}
                  </Typography>
                  <Typography variant="caption" gutterBottom component="div">
                    <strong>Node ID:</strong> {item.id}
                  </Typography>

                  <Typography variant="caption" gutterBottom component="div">
                    {/* <strong>Node Name: </strong> {element.source === undefined && element.target === undefined ? element.data.label: ''} */}
                    <strong>Node Name: </strong> {item.data.label}
                  </Typography>
                  <Divider />
                </fragment>
              ))}
            </Box>
          </Modal>
          <Modal
            open={openPrint}
            onClose={printHandleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                style={{ textAlign: "center" }}
              >
                Select Legends
              </Typography>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  textAlign: "center",
                }}
              >
                <Typography
                  id="modal-modal-title"
                  variant="body1"
                  component="h2"
                >
                  Show Modal Name:
                </Typography>
                <Switch
                  size="small"
                  checked={showModalName}
                  onChange={(evt) => showModalNameHandler(evt.target.checked)}
                  color="primary"
                  name="checkedB"
                  inputProps={{ "aria-label": "primary checkbox" }}
                />
              </div>
              <Divider />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  textAlign: "center",
                }}
              >
                <Typography
                  id="modal-modal-title"
                  variant="body1"
                  component="h2"
                >
                  Tab Name:
                </Typography>
                <Switch
                  size="small"
                  checked={showTabName}
                  onChange={(evt) => showTabNameHandler(evt.target.checked)}
                  color="primary"
                  name="checkedB"
                  inputProps={{ "aria-label": "primary checkbox" }}
                />
              </div>
              <Divider />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  textAlign: "center",
                }}
              >
                <Typography
                  id="modal-modal-title"
                  variant="body1"
                  component="h2"
                >
                  Date:
                </Typography>
                <Switch
                  size="small"
                  checked={showDate}
                  onChange={(evt) => showDateHandler(evt.target.checked)}
                  color="primary"
                  name="checkedB"
                  inputProps={{ "aria-label": "primary checkbox" }}
                />
              </div>
              <Divider />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  textAlign: "center",
                }}
              >
                <Typography
                  id="modal-modal-title"
                  variant="body1"
                  component="h2"
                >
                  Period:
                </Typography>
                <Switch
                  size="small"
                  checked={showPeriod}
                  onChange={(evt) => showPeriodHandler(evt.target.checked)}
                  color="primary"
                  name="checkedB"
                  inputProps={{ "aria-label": "primary checkbox" }}
                />
              </div>
              <Divider />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  textAlign: "center",
                }}
              >
                <Typography
                  id="modal-modal-title"
                  variant="body1"
                  component="h2"
                >
                  User:
                </Typography>
                <Switch
                  size="small"
                  checked={showUser}
                  onChange={(evt) => showUserHandler(evt.target.checked)}
                  color="primary"
                  name="checkedB"
                  inputProps={{ "aria-label": "primary checkbox" }}
                />
              </div>
              <Divider />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  textAlign: "center",
                }}
              >
                <Typography
                  id="modal-modal-title"
                  variant="body1"
                  component="h2"
                >
                  Software Owner:
                </Typography>
                <Switch
                  size="small"
                  checked={showSoftwareOwner}
                  onChange={(evt) =>
                    showSoftwareOwnerHandler(evt.target.checked)
                  }
                  color="primary"
                  name="checkedB"
                  inputProps={{ "aria-label": "primary checkbox" }}
                />
              </div>
              <Divider />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  textAlign: "center",
                }}
              >
                <Typography
                  id="modal-modal-title"
                  variant="body1"
                  component="h2"
                >
                  Software Developer:
                </Typography>
                <Switch
                  size="small"
                  checked={showSoftwareDeveloper}
                  onChange={(evt) => showSoftwareDevHandler(evt.target.checked)}
                  color="primary"
                  name="checkedB"
                  inputProps={{ "aria-label": "primary checkbox" }}
                />
              </div>

              <Button
                variant="contained"
                size="small"
                onClick={handlePrintInfo}
                style={{ float: "right", marginTop: "20px" }}
              >
                Print
              </Button>
            </Box>
          </Modal>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
