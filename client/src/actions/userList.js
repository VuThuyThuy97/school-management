import {
  LOAD_USER_LIST,
  LOAD_USER_LIST_SUCCESS,
  LOAD_USER_LIST_FAIL,
  EDIT_USER,
  EDIT_USER_SUCCESS,
  EDIT_USER_FAIL,
  CREATE_NEW_USER_FAIL,
  DELETE_USER_FAIL,
  HIDE_ALL_USER_MODAL,
  OPEN_CREATE_USER_MODAL,
  OPEN_EDIT_USER_MODAL,
} from '../utils/constants';

export const getUserList = () => {
  return { type: LOAD_USER_LIST };
};

export const getUserListSuccess = (message) => {
  return { type: LOAD_USER_LIST_SUCCESS, data: message };
};

export const getUserListFailed = (error) => {
  return { type: LOAD_USER_LIST_FAIL, data: error };
};

export const editUser = () => {
  return { type: EDIT_USER };
};

export const editUserSuccess = (message) => {
  return { type: EDIT_USER_SUCCESS, data: message };
};

export const editUserFailed = (error) => {
  return { type: EDIT_USER_FAIL, data: error };
};

export const createNewUserFailed = (error) => {
  return { type: CREATE_NEW_USER_FAIL, data: error };
};

export const deleteUserFailed = (error) => {
  return { type: DELETE_USER_FAIL, data: error };
};

export const openCreateUserModal = () => {
  return { type: OPEN_CREATE_USER_MODAL };
};

export const openEditUserModal = () => {
  return { type: OPEN_EDIT_USER_MODAL };
};

export const hideAllUserModal = () => {
  return { type: HIDE_ALL_USER_MODAL };
};