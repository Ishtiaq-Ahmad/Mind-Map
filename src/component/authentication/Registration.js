// import React,{useState} from 'react'
// import "./auth.css";
// import Grid from "@mui/material/Grid";
// import Box from "@mui/material/Box";
// import Typography from "@mui/material/Typography";
// import TextField from "@mui/material/TextField";
// import InputAdornment from "@mui/material/InputAdornment";
// import AccountCircle from "@mui/icons-material/AccountCircle";
// import FormControl from "@mui/material/FormControl";
// import LockIcon from "@mui/icons-material/Lock";
// import Button from "@mui/material/Button";
// import NodePic1 from '../../assets/images/node (2).png'
// import EmailIcon from '@mui/icons-material/Email';
// import {signup} from "../../utils/helpers"
// import { useHistory } from 'react-router';
// import {
//   Link
// } from "react-router-dom";

// const Registration = (props) => {
//   const [email,setEmail]=useState("")
//   const [password,setPassword]=useState("");

//   const registerHandler = async(e)=>{
// // e.prevent.default()
//     if(email && password ){


// try {
//   const isUserCreated=await signup(email,password);
// console.log({isUserCreated});
// } catch (error) {
//   console.log("oops error in user register",error);
// }


//     }else {
//       alert("Plase Provide valid user email and password")
//     }
//   }
//     return (
//        <div className="background_image">
//       {/* <Box sx={{ flexGrow: 1 }}> */}
//       <Grid container spacing={2}>
//         <Grid item md={6} xs={6}> 
//         <div className="left_column_signup">
// <img className="node_image" src={NodePic1} alt="Node Png Images"/>
//         </div>
        
//         </Grid>
//         <Grid item xs={6} md={6}>
//           <div className="right_column_signup">
//             <div className="login_text">
//               <Typography variant="h2"> Sign Up</Typography>
//             </div>

//             <FormControl sx={{ m: 3 }} fullWidth variant="standard">
//                <TextField
//                 className="user_name_signup"
//                 id="input-with-icon-textfield"
//                 label="User Name"
//                 placeholder="User Name"
              
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <AccountCircle />
//                     </InputAdornment>
//                   ),
//                 }}
//                 variant="standard"
//                 fullWidth
//               />
//               <TextField
//                 className="user_name_signup"
//                 id="input-with-icon-textfield"
//                 label="Email"
//                 placeholder="Email Address"
//                 onChange={e=>setEmail(e.target.value)}
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <EmailIcon />
//                     </InputAdornment>
//                   ),
//                 }}
//                 variant="standard"
//                 fullWidth
//               />
//               <TextField
//               className="user_name_signup"
//                 id="input-with-icon-textfield"
//                 label="Password"
//                 type="password"
//                 placeholder="Password"
//                 onChange={e=>setPassword(e.target.value)}

//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <LockIcon />
//                     </InputAdornment>
//                   ),
//                 }}
//                 variant="standard"
//                 fullWidth
//               />
//                 <TextField
//               className="user_name_signup"
//                 id="input-with-icon-textfield"
//                 label="Confirm Password"
//                 type="password"
//                 placeholder="Confirm Password"
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <LockIcon />
//                     </InputAdornment>
//                   ),
//                 }}
//                 variant="standard"
//                 fullWidth
//               />
//               <Button type="submit" variant="contained" onClick={registerHandler}>Sign Up</Button> 
//             </FormControl>
//           </div>
//         </Grid>
//       </Grid>
//       {/* </Box> */}
//     </div>
//     )
// }

// export default Registration
