import {
  LOAD_CLASS_LIST,
  LOAD_CLASS_LIST_SUCCESS,
  LOAD_CLASS_LIST_FAIL,
  EDIT_CLASS,
  EDIT_CLASS_SUCCESS,
  EDIT_CLASS_FAIL,
  CREATE_NEW_CLASS_FAIL,
  DELETE_CLASS_FAIL,
  HIDE_ALL_CLASS_MODAL,
  OPEN_EDIT_CLASS_MODAL,
  OPEN_CREATE_CLASS_MODAL
} from '../utils/constants';

export const getClassList = () => {
  return { type: LOAD_CLASS_LIST };
};

export const getClassListSuccess = (message) => {
  return { type: LOAD_CLASS_LIST_SUCCESS, data: message };
};

export const getClassListFailed = (error) => {
  return { type: LOAD_CLASS_LIST_FAIL, data: error };
};

export const editClass = () => {
  return { type: EDIT_CLASS };
};

export const editClassSuccess = (message) => {
  return { type: EDIT_CLASS_SUCCESS, data: message };
};

export const editClassFailed = (error) => {
  return { type: EDIT_CLASS_FAIL, data: error };
};

export const createNewClassFailed = (error) => {
  return { type: CREATE_NEW_CLASS_FAIL, data: error };
};

export const deleteClassFailed = (error) => {
  return { type: DELETE_CLASS_FAIL, data: error };
};

export const openCreateClassModal = () => {
  return { type: OPEN_CREATE_CLASS_MODAL };
};

export const openEditClassModal = () => {
  return { type: OPEN_EDIT_CLASS_MODAL };
};

export const hideAllClassModal = () => {
  return { type: HIDE_ALL_CLASS_MODAL };
};