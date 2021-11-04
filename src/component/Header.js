import React,{useState,useContext} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import {faPalette} from '@fortawesome/free-solid-svg-icons'
import NodeContext from "../Context/auth/authContext"
import Button from "@mui/material/Button";
import TabIcon from "@mui/icons-material/Tab";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
// import { Link } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import PaletteIcon from "@mui/icons-material/Palette";
import ShortcutIcon from "@mui/icons-material/Shortcut";
import PrintIcon from '@mui/icons-material/Print';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#F8F8FF',
  border: '2px solid #ADD8E6',
  borderradios: '3px',
  boxShadow: 24,
  p: 4,
};


const Header = (props) => {

  const nodeContext=useContext(NodeContext)
  const {editNode, formatNode,multiTabHandler}=nodeContext;
  const [open, setOpen] =  useState(false);
   const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
 
    return (
       <div >
      <AppBar position="static"  >
        <Toolbar>
  <Stack
            direction="row"
            spacing={2}
            className="ming_map"
            divider={<Divider orientation="vertical" flexItem />}
          >
            {/* <Link to="/" style={{ textDecoration: "none", color: "black" }}> */}
              <Typography variant="h6">Mind Map</Typography>
            {/* </Link> */}
            <Button
              startIcon={<TabIcon />}
              onClick={multiTabHandler}
              size="small"
              variant="outlined"
            >
              Multi Tabs
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

            <IconButton color="primary" onClick ={props.handlePrint} component="span">
            <PrintIcon/>
            </IconButton>

            <IconButton color="primary" component="span" onClick ={handleOpen}>
              <ShortcutIcon />
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
    )
}

export default Header
