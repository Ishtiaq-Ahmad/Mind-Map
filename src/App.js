import React ,{useContext} from 'react';
import './App.css';
import FlowChart from './view/FlowChart';
import Header from './component/Header';
// import Auth from './component/authentication/Login'
// import SignUp from './component/authentication/Registration'
import Login from './component/authentication/Login';
import Signup from './component/authentication/Registration'
// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from './view/Dashboard'
import ProtectedRoute from './utils/ProtectedRoute'
import NodeContext from './Context/auth/authContext'
import { Routes, Route, Link } from "react-router-dom";



function App() {
  const authContext = useContext(NodeContext);
  const {data:{userId}}= authContext;
   
  return (
    <div className="App">
    <Routes>
    <Route element={<ProtectedRoute/>}>
     <Route  exact path="/" element={<Login/>} /> 
      <Route   path="/home" element={<FlowChart/>} />
      <Route   path="/admin-dashboard" element={<Dashboard/>} />
    </Route>
      {/* <Route  exact path="/" element={<Login/>} />
      <Route   path="/home" element={<FlowChart/>} />
      <Route   path="/admin-dashboard" element={<Dashboard/>} /> */}
    </Routes>
    {/* <Route element={<ProtectedRoute/>}>
        <Route path="/home" element={<Home/>}/>
        <Route path= "/menu"  element={<Menu/>} />
        <Route path="/menu/categories" element={<Menu/>}/>
        <Route path="/menu/list" element={<MenuList/>}/>
        <Route path= "/customers"  element={<Customers/>} />
        <Route path= "/order"  element={<Order/>} />
        <Route path= "/info"  element={<Info/>} />
      </Route> */}
    {/* <Router>
      <Switch>
        <Route exact path="/"  component={Login} ></Route>
        <ProtectedRoute path = "/home" component={FlowChart} isAuth={userId? true: false} /> 
        <ProtectedRoute path = "/admin-dashboard" component={Dashboard} isAuth={userId ? true: false}/>   
      </Switch>
    </Router> */}
     </div>
  );
}

export default App;
