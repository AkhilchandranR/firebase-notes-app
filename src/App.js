import { AuthProvider } from "./useContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from './PrivateRoute';
import Dashboard from './pages/Dashboard/Dashboard';
import SignUp from './pages/SignUp/SignUp';
import Login from './pages/Login/Login';
import UpdateProfile from './pages/UpdateProfile/UpdateProfile';
import Profile from './pages/Profile/Profile';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';

function App() {
  return (
    <div className="App">
      <Router>
      <AuthProvider>
  
        <Switch>
          <Route path="/signup" component={SignUp}/>
          <Route path="/login" component={Login}/>
          <PrivateRoute path="/update-profile" component={UpdateProfile}/>
          <PrivateRoute path="/user" component={Profile}/>
          <Route path="/forgot-password" component={ForgotPassword}/>
          <PrivateRoute exact path="/" component={Dashboard}/>
        </Switch>
      </AuthProvider>
    </Router>
    </div>
  );
}

export default App;
