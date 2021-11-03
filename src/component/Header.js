import React,{useState,useContext} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import {faPalette} from '@fortawesome/free-solid-svg-icons'
import NodeContext from "../Context/auth/authContext"


const Header = () => {

  const nodeContext=useContext(NodeContext)
  const {editNode, formatNode}=nodeContext
  

    return (
       <div >
      <AppBar position="static"  >
        <Toolbar>

          <Typography variant="h6" className="ming_map">
            Mind Map
          </Typography>
          <div className="right_icons">
          <FontAwesomeIcon icon={faEdit} onClick={editNode} className="edit_icon" />
          
          </div> 
          <FontAwesomeIcon icon={faPalette} onClick={formatNode} className="edit_icon" />
        </Toolbar>
      </AppBar>
    </div>
    )
}

export default Header
