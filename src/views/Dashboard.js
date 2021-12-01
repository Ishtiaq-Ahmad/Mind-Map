import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { getAllData } from "../utils/helpers";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Button from "@mui/material/Button";
import NewUser from "../component/NewUser";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import DeleteIcon from "@mui/icons-material/Delete";
import { signup } from "../utils/helpers";
import { _delete, _deleteUser } from "../utils/helpers";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #ADD8E6",
  borderradios: "3px",
  boxShadow: 24,
  p: 5,
};
function createData(name, email, role) {
  return { name, email, role };
}
const rows = [];
console.log({ NewUser });
const Dashboard = (props) => {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    //  createData('Gingerbread', 356, 16.0, 49, 3.9),
    const users = await getAllData("users");
    setUsers(users);

    console.log({ users });
  };
  const deleteHandler = async (uid) => {
    await _deleteUser("users", uid);
    // await _delete(uid)
    //   try {
    //     const isDleted = await _delete(uid);
    //     // console.log({ isLoggedIn });
    //     alert('user deleted')
    //   } catch (error) {
    //     alert("oops some thing wrong", error);
    //   }
  };
  return (
    <div style={{ padding: "20px" }}>
      <Button
        variant="contained"
        onClick={() => props.history.push("/home")}
        style={{ float: "left" }}
        startIcon={<ArrowBackIosNewIcon />}
      >
        Back to Home Page
      </Button>
      <Button
        variant="contained"
        onClick={handleOpen}
        style={{ float: "right" }}
        endIcon={<AddCircleOutlineIcon />}
      >
        Create User
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <NewUser setOpen={setOpen} />
        </Box>
      </Modal>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                {" "}
                <strong>Name</strong>{" "}
              </TableCell>
              <TableCell align="right">
                <strong>Email</strong>
              </TableCell>
              <TableCell align="right">
                <strong>Role</strong>{" "}
              </TableCell>
              <TableCell align="right">
                <strong>Update Role</strong>
              </TableCell>
              <TableCell align="right">
                <strong>Delete</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((row, index) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.full_name}
                </TableCell>
                <TableCell align="right">{row.email}</TableCell>
                <TableCell align="right">
                  {row.role === 1 ? "Admin" : "User"}
                </TableCell>
                <TableCell align="right">
                  {
                    <FormControlLabel
                      control={
                        <Switch
                          // checked={
                          //   row.role === 1 ? "defaultChecked " : "disabled"
                          // }
                          onChange={(e) => {
                            // update user role locally

                            let __users = [...users];
                            __users = __users.map((_user, _index) => {
                              if (_index === index) {
                                let role = _user["role"];
                                if (_user["role"] === 1) {
                                  role = 2;
                                } else {
                                  role = 1;
                                }
                                _user["role"] = role;
                              }
                              return _user;
                            });
                            setUsers(__users);
                            //   call method to update user role in db
                          }}
                        />
                      }
                      label={row.role === 1 ? "Admin" : " User "}
                    />
                  }
                </TableCell>
                <TableCell align="right">
                  {
                    <Button
                      onClick={() => {
                        deleteHandler(row.uid);
                      }}
                      variant="outlined"
                      color="error"
                      startIcon={<DeleteIcon />}
                    >
                      Delete
                    </Button>
                  }
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Dashboard;
