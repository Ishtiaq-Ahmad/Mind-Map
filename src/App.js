import React ,{useContext} from 'react';
import './App.css';
import FlowChart from './component/FlowChart';
import Header from './component/Header';
// import Auth from './component/authentication/Login'
// import SignUp from './component/authentication/Registration'
import Login from './component/authentication/Login';
import Signup from './component/authentication/Registration'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from './views/Dashboard'
import ProtectedRoute from './component/ProtectedRoute'
import NodeContext from './Context/auth/authContext'



function App() {
  const authContext = useContext(NodeContext);
  const {data:{userId}}= authContext;
  console.log('hi userid', userId);
  return (
    <div className="App">
    <Router>
      <Switch>
        <Route exact path="/"  component={Login} ></Route>
        {/* <Route path = "/admin-dashboard" component = {Dashboard}/> */}
        {/* <Route path='/home' component={FlowChart}/> */}
        <ProtectedRoute path = "/home" component={FlowChart} isAuth={userId? true: false} /> 
        <ProtectedRoute path = "/admin-dashboard" component={Dashboard} isAuth={userId ? true: false}/>
        
      </Switch>
    </Router>
    {/* <FlowChart/> */}

     </div>
  );
}

export default App;
