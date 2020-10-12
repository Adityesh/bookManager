import React from 'react';
import './App.css';
import { useSelector, useDispatch } from 'react-redux'
import { logout } from './actions/LogIn';
import { DARK, LIGHT } from './actions/theme';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory

} from "react-router-dom";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications';
import Button from '@material-ui/core/Button';
import Login from './components/User/Login';
import Register from './components/User/Register'
import Home from './components/Profile/Home';
import Landing from './components/User/Landing';
import Profile from './components/Profile/Profile'
import Settings from './components/Profile/Settings'


const App = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => {return state.isLoggedIn});
  const history = useHistory();
  const isDark = useSelector(state =>  state.isDark);

  const changeTheme = () => {
    if(isDark) {
      dispatch(LIGHT())
    } else {
      dispatch(DARK())
    }
  }

  const handleLogOut = async () => {
      try {
        const response = await fetch('/user/logout');
        const result = await response.json();
        if(!result.error) {
          dispatch(logout());
          localStorage.clear();
        }

      } catch(err) {
        console.log(err);
      }
  
  }



  return (
    <div className={'App ' + (isDark ? 'bg-dark' : 'bg-light')} style={{ height: '100%'}}>
      <Router>

        <div>
            
            <Toolbar style={{ display: 'flex', alignItem: 'center', justifyContent: 'space-between' }}>
              <div>
              <img src="logo.png"/>
              </div>
              {isLoggedIn ?

                <>
                  <div style={{display : 'flex', alignItems : 'center', justifyContent : 'center'}}>
                    
                    <IconButton style={{ color: isDark ? "white" : "black", marginRight: 10 }}>
                      <Link to="/home" style={{color: isDark ? "white" : "black"}}><LibraryBooksIcon/></Link>
                    </IconButton>
                    <IconButton style={{ color: isDark ? "white" : "black", marginRight: 10 }} >
                      <Link to="/profile" style={{color: isDark ? "white" : "black"}}><AccountBoxIcon/></Link>
                    </IconButton>
                    <IconButton style={{ color: isDark ? "white" : "black", marginRight: 10 }} >
                      <Link to="/settings" style={{color: isDark ? "white" : "black"}}><SettingsApplicationsIcon/></Link>
                    </IconButton>
                    <IconButton style={{ color: isDark ? "white" : "black", marginRight: 10, paddingBottom : 10 }} component="span" onClick={handleLogOut}>
                      <ExitToAppIcon/>
                    </IconButton>
                  </div>


                </>
                :
                <>
                  <div >
                    <Button style={{ color: isDark ? "white" : "black", marginRight: 10 }} component="span">
                      <Link to="/login" style={{color: isDark ? "white" : "black"}}>Login</Link>
                    </Button>
                    <Button style={{ color: isDark ? "white" : "black", marginRight: 10 }} component="span">
                      <Link to="/register" style={{color: isDark ? "white" : "black"}}>Register</Link>
                    </Button>
                  </div>

                </>}

              <IconButton style={{ color: isDark ? "white" : "black", marginRight: 10 }} aria-label="upload picture" component="span" onClick={changeTheme}>
                {isDark ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>
            </Toolbar>
          
        </div>

        

          <Switch>
            <Route exact path="/">
              <Landing />
            </Route>
            <Route path="/profile">
              <Profile logged={isLoggedIn}/>
            </Route>
            <Route path="/settings">
              <Settings logged={isLoggedIn}/>
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/home">
              <Home logged={isLoggedIn}/>
            </Route>
            
          </Switch>




      </Router>
    </div>
  );
}

export default App;
