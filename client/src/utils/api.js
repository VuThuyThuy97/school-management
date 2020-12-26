import qs from 'qs';
import { BASE_URL, SIGNIN_ENDPOINT, USER_INFO_ENDPOINT, DASHBOARD_ENDPOINT, USERS_ENDPOINT, ROOMS_ENDPOINT,CLASSES_ENDPOINT } from './constants';
import { authHeader } from './authedHeader'

const login = (username, password) => {
  const options = {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
      "username": username,
      "password": password
    })
  };
  return fetch(BASE_URL + SIGNIN_ENDPOINT, options)
    .then(res => res.json());
};

const logout = () => {
  localStorage.removeItem('user');
  return Promise.resolve()
};

const getUserInfo = () => {
  const options = {
    method: 'get',
    headers: authHeader()
  };
  return fetch(BASE_URL + USER_INFO_ENDPOINT, options)
    .then(res => res.json());
};

//user
const getUserList = () => {
  const options = {
    method: 'get',
    headers: authHeader()
  };
  return fetch(BASE_URL + USERS_ENDPOINT, options)
    .then(res => res.json());
};

const editUser = (userId, user) => {
  const options = {
    method: 'put',
    headers: authHeader(),
    body: JSON.stringify(user)
  };
  return fetch(BASE_URL + USERS_ENDPOINT + `/${userId}`, options)
    .then(res => res.json());
};

const createNewUser = (user) => {
  const options = {
    method: 'post',
    headers: authHeader(),
    body: JSON.stringify(user)
  };
  return fetch(BASE_URL + USERS_ENDPOINT , options)
    .then(res => res.json());
};

const deleteUser = (userId) => {
  const options = {
    method: 'delete',
    headers: authHeader()
  };
  return fetch(BASE_URL + USERS_ENDPOINT  + `/${userId}`, options)
    .then(res => res);
};

//room
const getRoomList = () => {
  const options = {
    method: 'get',
    headers: authHeader()
  };
  return fetch(BASE_URL + ROOMS_ENDPOINT, options)
    .then(res => res.json());
};

const editRoom = (roomId, room) => {
  const options = {
    method: 'put',
    headers: authHeader(),
    body: JSON.stringify(room)
  };
  return fetch(BASE_URL + ROOMS_ENDPOINT + `/${roomId}`, options)
    .then(res => res.json());
};

const createNewRoom = (room) => {
  const options = {
    method: 'post',
    headers: authHeader(),
    body: JSON.stringify(room)
  };
  return fetch(BASE_URL + ROOMS_ENDPOINT , options)
    .then(res => res.json());
};

const deleteRoom = (roomId) => {
  const options = {
    method: 'delete',
    headers: authHeader()
  };
  return fetch(BASE_URL + ROOMS_ENDPOINT  + `/${roomId}`, options)
    .then(res => res);
};

//class
const getClassList = () => {
  const options = {
    method: 'get',
    headers: authHeader()
  };
  return fetch(BASE_URL + CLASSES_ENDPOINT, options)
    .then(res => res.json());
};

const editClass = (classId, c) => {
  const options = {
    method: 'put',
    headers: authHeader(),
    body: JSON.stringify(c)
  };
  return fetch(BASE_URL + CLASSES_ENDPOINT + `/${classId}`, options)
    .then(res => res.json());
};

const createNewClass = (c) => {
  const options = {
    method: 'post',
    headers: authHeader(),
    body: JSON.stringify(c)
  };
  return fetch(BASE_URL + CLASSES_ENDPOINT , options)
    .then(res => res.json());
};

const deleteClass = (classId) => {
  const options = {
    method: 'delete',
    headers: authHeader()
  };
  return fetch(BASE_URL + CLASSES_ENDPOINT  + `/${classId}`, options)
    .then(res => res);
};

const getAllClassByUser = () => {
  const options = {
    method: 'get',
    headers: authHeader()
  };
  return fetch(BASE_URL + CLASSES_ENDPOINT + 'byUser', options)
    .then(res => res.json());
};

const changeProfilePicture = (userId, file) => {
  const authedHeader = authHeader();
  const header = { 
    'Authorization': authedHeader['Authorization'],
    // 'Accept': 'application/json',
    // 'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  }
  const options = {
    method: 'post',
    headers: header,
    body: file
  };
  return fetch(BASE_URL + USERS_ENDPOINT + `/${userId}/uploadProfilePicture`, options)
    .then(res => res);
};

export default {
  login, getUserInfo, logout,
  getUserList, editUser, createNewUser, deleteUser, changeProfilePicture,
  getRoomList, editRoom, createNewRoom, deleteRoom,
  getClassList, editClass, createNewClass, deleteClass, getAllClassByUser
};
