import loggedReducer from './isLogged';
import darkModeReducer from './isDark';
import { combineReducers } from 'redux'


export default combineReducers({isLoggedIn : loggedReducer, isDark : darkModeReducer});