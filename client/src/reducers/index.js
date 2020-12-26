import { combineReducers } from 'redux';
import auth from './auth';
import userList from './userList';
import classList from './classList';
import roomList from './roomList';
import teacherClassList from './teacherClassList';
import userDetail from './userDetail';
// import userDetail from './userDetail';

export default combineReducers({
  auth,
  userList,
  roomList,
  classList,
  teacherClassList,
  userDetail
});
