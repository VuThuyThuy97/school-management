import {
  LOAD_ROOM_LIST,
  LOAD_ROOM_LIST_SUCCESS,
  LOAD_ROOM_LIST_FAIL,
  EDIT_ROOM,
  EDIT_ROOM_SUCCESS,
  EDIT_ROOM_FAIL,
  CREATE_NEW_ROOM_FAIL,
  DELETE_ROOM_FAIL,
  HIDE_ALL_ROOM_MODAL,
  OPEN_EDIT_ROOM_MODAL,
  OPEN_CREATE_ROOM_MODAL
} from '../utils/constants';

export const getRoomList = () => {
  return { type: LOAD_ROOM_LIST };
};

export const getRoomListSuccess = (message) => {
  return { type: LOAD_ROOM_LIST_SUCCESS, data: message };
};

export const getRoomListFailed = (error) => {
  return { type: LOAD_ROOM_LIST_FAIL, data: error };
};

export const editRoom = () => {
  return { type: EDIT_ROOM };
};

export const editRoomSuccess = (message) => {
  return { type: EDIT_ROOM_SUCCESS, data: message };
};

export const editRoomFailed = (error) => {
  return { type: EDIT_ROOM_FAIL, data: error };
};

export const createNewRoomFailed = (error) => {
  return { type: CREATE_NEW_ROOM_FAIL, data: error };
};

export const deleteRoomFailed = (error) => {
  return { type: DELETE_ROOM_FAIL, data: error };
};

export const openCreateRoomModal = () => {
  return { type: OPEN_CREATE_ROOM_MODAL };
};

export const openEditRoomModal = () => {
  return { type: OPEN_EDIT_ROOM_MODAL };
};

export const hideAllRoomModal = () => {
  return { type: HIDE_ALL_ROOM_MODAL };
};