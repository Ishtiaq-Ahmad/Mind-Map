import React, { useState, useContext } from "react";
import "./auth.css";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import LockIcon from "@mui/icons-material/Lock";
import Button from "@mui/material/Button";
import picGif from "../../assets/images/loginGif.gif";
import EmailIcon from "@mui/icons-material/Email";
import { login } from "../../utils/helpers";
import NodeContext from "../../Context/auth/authContext";

const Login = (props) => {
  const nodeContext = useContext(NodeContext);
  const { setProfileHandler } = nodeContext;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorState, setErrorState] = useState("");
  const [errorText, setErrorText] = useState("");
  const [errorPassState, setErrorPassState] = useState(false);
  const [errorPassText, setErrorPassText] = useState("");

  const loginHandler = async (e) => {
    // e.prevent.default()
    if (!email) {
      setErrorState(true);
      setErrorText("Please enter user name");
    }

    if (!password) {
      setErrorPassState(true);
      setErrorPassText("Please enter the password");
    }

    if (email && password) {
      // const isLoggedIn=''
      try {
        let isLoggedIn = await login(email, password);
        if (isLoggedIn) {
          setProfileHandler({ isLoggedIn });
          props.history.push("/home");
        } else {
          alert("error");
        }
      } catch (error) {
        // console.log("oops error in user login", error);
        alert("incorrect username and password");
      }
    }
  };
  const emailHandler = (e) => {
    setEmail(e.target.value);
    if (errorState) {
      setErrorState(false);
      setErrorText("");
    }
  };
  const passwordHandler = (e) => {
    setPassword(e.target.value);
    if (errorPassState) {
      setErrorPassState(false);
      setErrorPassText("");
    }
  };

  return (
    <div className="background_image">
      <Grid container spacing={2}>
        <Grid item xs={12} md ={6}>
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
              <Button type="submit" variant="contained"  onClick={loginHandler}>
                Sign In
              </Button>
            </FormControl>
          </div>
        </Grid>
        <Grid item xs={0} md={6} >
          <div className="left_column">
            <img className="node_image" src={picGif} alt="Node Png Images" />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Login;
