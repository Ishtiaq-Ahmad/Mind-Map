import './App.css';
import FlowChart from './component/FlowChart';
import Header from './component/Header';
import Auth from './component/authentication/Login'
import SignUp from './component/authentication/Registration'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";




function App() {
  return (
    <div className="App">
    <Router>
      <Switch>
        <Route  component={SignUp} />
        {/* <Route  path="/"  component={Auth} ></Route> */}
      </Switch>
    </Router>

     </div>
  );
}

export default App;
