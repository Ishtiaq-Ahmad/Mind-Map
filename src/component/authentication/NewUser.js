import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import AccountCircle from "@mui/icons-material/AccountCircle";
import FormControl from "@mui/material/FormControl";
import LockIcon from "@mui/icons-material/Lock";
import Button from "@mui/material/Button";
import EmailIcon from "@mui/icons-material/Email";
import { signup } from "../../utils/helpers";

const NewUser = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [full_name, setFull_Name] = useState("");
  const [confirmPassword, setConfirmPassowrd] = useState("");
  const [errorState, setErrorState] = useState(false);
  const [errorText, setErrorText] = useState("");

  const registerHandler = async (e) => {
    // e.prevent.default()
    if(password !== confirmPassword){
      // alert('Password do not match')
      setErrorState(true)
      setErrorText('Password do not match')
    }else if (email && password && full_name) {
      try {
        const isUserCreated = await signup(email, password, full_name);
        console.log({ isUserCreated });
        props.setOpen(false);
      } catch (error) {
        alert("oops error in user register", error);
      }
    }  else {
      alert("Please Provide valid user email and password");
    }
    // if(password !== confirmPassword){
    //     alert('Password do not match')
    //     return;
    // }
  };
 
 
  return (
    <div>
      <Typography style={{ textAlign: "center" }} variant="h5" component="div">
        {" "}
        Create New User
      </Typography>
      <FormControl fullWidth variant="standard">
        <TextField
          className="user_name_signup"
          id="input-with-icon-textfield"
          label="User Name"
          placeholder="Full name"
          onChange={(e) => setFull_Name(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            ),
          }}
          variant="standard"
          fullWidth
        />
        <TextField
          className="user_name_signup"
          id="input-with-icon-textfield"
          label="Email"
          placeholder="Email Address"
          onChange={(e) => setEmail(e.target.value)}
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
          className="user_name_signup"
          id="input-with-icon-textfield"
          label="Password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
        <TextField
          className="user_name_signup"
          id="input-with-icon-textfield"
          label="Confirm Password"
          type="password"
          error={errorState}
           helperText={errorText}
          value={confirmPassword}
          placeholder="Confirm Password"
          onChange={(e) => setConfirmPassowrd(e.target.value)}
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
        <Button type="submit" variant="contained" onClick={registerHandler}>
          Create
        </Button>
      </FormControl>
    </div>
  );
};

export default NewUser;
