import React,{useState,useContext} from "react";
import "./auth.css";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import AccountCircle from "@mui/icons-material/AccountCircle";
import FormControl from "@mui/material/FormControl";
import LockIcon from "@mui/icons-material/Lock";
import Button from "@mui/material/Button";
import NodePic from '../../assets/images/node (1).png'
import NodePic1 from '../../assets/images/node (2).png'
import picGif from '../../assets/images/loginGif.gif'
import picGif1 from '../../assets/images/loginGif1.gif'
import EmailIcon from '@mui/icons-material/Email';
import AnimatePic from '../../assets/images/Mobile-login.gif'
import {login} from "../../utils/helpers"
import { useHistory } from 'react-router';
import { Link } from "react-router-dom";
import NodeContext from '../../Context/auth/authContext'
import {getDocById} from "../../utils/helpers"



const Login = (props) => {
  const nodeContext = useContext(NodeContext);
 const { setProfileHandler } = nodeContext;

  // let history = useHistory();
   const [email,setEmail]=useState("")
  const [password,setPassword]=useState("");
  const [errorState, setErrorState] = useState('');
  const [errorText, setErrorText] = useState('');
  const [errorPassState, setErrorPassState] = useState(false);
	const [errorPassText, setErrorPassText] = useState('');


  const loginHandler = async (e) => {
    // e.prevent.default()
    if(!email){
      setErrorState(true);
      setErrorText('Please enter user name')
    }
    
    if(!password){
      setErrorPassState(true);
      setErrorPassText("Please enter the password")
    }
    
    
    if (email && password) {
      // const isLoggedIn=''
      try {
        let isLoggedIn = await login(email, password);
        if (isLoggedIn) {
       
    
          setProfileHandler({ isLoggedIn });
    
          // console.log('hello ', isLoggedIn);
          props.history.push("/home");
        } else {
          alert("error");
        }
      } catch (error) {
        console.log("oops error in user login", error);
     
       
      }
    }
    //  else {
    //    setErrorText("Please Provide email and password")
    //   console.log("Please Provide email and password");
    //   alert("Please Provide email and password")
    // }
  };
  const emailHandler = (e) =>{
    setEmail(e.target.value)
    if(errorState ){  
      setErrorState(false)
      setErrorText('')
    }
  }
  const passwordHandler = (e) => {
    setPassword(e.target.value)
    if(errorPassState ){  
      setErrorPassState(false)
      setErrorPassText('')
    }
  }

  return (
    <div className="background_image">
      {/* <Box sx={{ flexGrow: 1 }}> */}
      <Grid container spacing={2}>
        <Grid item md={6} xs={6}> 
        <div className="left_column">
<img className="node_image" src={picGif} alt="Node Png Images"/>
        </div>
        
        </Grid>
        <Grid item xs={6} md={6}>
          <div className="right_column">
            <div className="login_text">
              <Typography variant="h2"> Login</Typography>
            </div>

            <FormControl sx={{ m: 3 }} fullWidth variant="standard">
              <TextField
                className="user_name"
                id="input-with-icon-textfield"
                label="Email"
                placeholder="Email Address"
                error={errorState}
                helperText={errorText}
                onChange={emailHandler}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon />
                    </InputAdornment>
                  ),
                }}
                variant="standard"
                fullWidth
              />
              <TextField
              className="user_name"
                id="input-with-icon-textfield"
                label="Password"
                type="password"
                placeholder="Password"
                error={errorPassState}
							helperText={errorPassText}
                onChange={passwordHandler}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon />
                    </InputAdornment>
                  ),
                }}
                variant="standard"
                fullWidth
              />
              <Button type="submit" variant="contained" onClick={loginHandler}>Sign In</Button>
              {/* <Typography variant="subtitle" style={{marginTop:'10px'}}>
                Don't have an Accout?{" "}
                <strong>
                <Link to='/signup'>Sign Up</Link>
                
                </strong>
              </Typography> */}
              {/* <Link to="/">Sign Up</Link> */}
              {/* <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
        <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
        <TextField id="input-with-sx" label="With sx" variant="standard" />
      </Box> */}
            </FormControl>
          </div>
        </Grid>
      </Grid>
      {/* </Box> */}
    </div>
  );
};

export default Login;
