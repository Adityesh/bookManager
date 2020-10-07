import React, { useState } from 'react';
import './App.css';
import { useSelector, useDispatch } from 'react-redux'
import { login, logout } from './actions/LogIn';
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
import Button from '@material-ui/core/Button';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Login from './components/User/Login';
import Register from './components/User/Register'
import Home from './components/Profile/Home';
import Landing from './components/User/Landing';
import Profile from './components/Profile/Profile'


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

  return (
    <div className={isDark ? 'bg-dark' + ' App' : 'bg-light' + ' App'} style={{ height: '100%'}}>
      <Router>

        <div>
          <AppBar position="static" color={'primary'}>
            <Toolbar style={{ display: 'flex', alignItem: 'center', justifyContent: 'flex-end' }}>

              {isLoggedIn ?

                <>
                  <div style={{display : 'flex', alignItems : 'center', justifyContent : 'center'}}>
                    <IconButton style={{ color: "black", marginRight: 10 }} component="span">
                      <Link to="/home"><LibraryBooksIcon/></Link>
                    </IconButton>
                    <IconButton style={{ color: "black", marginRight: 10 }} component="span">
                      <Link to="/profile"><AccountBoxIcon/></Link>
                    </IconButton>
                    <IconButton style={{ color: "black", marginRight: 10 }} component="span" onClick={() => dispatch(logout())}>
                      <ExitToAppIcon/>
                    </IconButton>
                  </div>


                </>
                :
                <>
                  <div >
                    <Button style={{ color: "black", marginRight: 10 }} component="span">
                      <Link to="/login">Login</Link>
                    </Button>
                    <Button style={{ color: "black", marginRight: 10 }} component="span">
                      <Link to="/register">Register</Link>
                    </Button>
                  </div>

                </>}

              <IconButton style={{ color: "black", marginRight: 10 }} aria-label="upload picture" component="span" onClick={changeTheme}>
                {isDark ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>
            </Toolbar>
          </AppBar>
        </div>

        

          <Switch>
            <Route path="/profile">
              <Profile logged={isLoggedIn}/>
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
