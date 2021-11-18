import './App.css';
import FlowChart from './component/FlowChart';
import Header from './component/Header';
// import Auth from './component/authentication/Login'
// import SignUp from './component/authentication/Registration'
import Login from './component/authentication/Login';
import Signup from './component/authentication/Registration'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";




function App() {
  return (
    <div className="App">
    {/* <Router>
      <Switch>
        <Route path="/signup" component={Signup} />
        <Route  path="/"  component={Login} ></Route>
      </Switch>
    </Router> */}
    <FlowChart/>

     </div>
  );
}

export default App;
