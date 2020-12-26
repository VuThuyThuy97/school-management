import api from '../utils/api';
import * as roomList from '../actions/roomList';

export const getRoomList = () => {
  return (dispatch) => {
    dispatch(roomList.getRoomList());
    api.getRoomList()
      .then((response) => {
        if (response.error) {
          dispatch(roomList.getRoomListFailed(response.error));
        } else {
          dispatch(roomList.getRoomListSuccess(response));
        }
      });
  };
};

export const editRoom = (roomId, info) => {
  return (dispatch) => {
    api.editRoom(roomId, info)
      .then((response) => {
        if (response.error) {
          dispatch(roomList.editRoomFailed(response.error));
        } else {
          dispatch(roomList.hideAllRoomModal());
          getRoomList()(dispatch);
        }
      });
  };
};

export const createNewRoom = (info) => {
  return (dispatch) => {
    api.createNewRoom(info)
      .then((response) => {
        if (response.error) {
          dispatch(roomList.createNewRoomFailed(response.error));
        } else {
          dispatch(roomList.hideAllRoomModal());
          getRoomList()(dispatch);
        }
      });
  };
};

export const deleteRoom = (roomId) => {
  return (dispatch) => {
    api.deleteRoom(roomId)
      .then((response) => {
        if (response.error) {
          dispatch(roomList.deleteRoomFailed(response.error));
        } else {
          getRoomList()(dispatch);
        }
      });
  };
};

export const openCreateRoomModal = () => {
  return (dispatch) => {
    dispatch(roomList.openCreateRoomModal());
  };
};

export const openEditRoomModal = () => {
  return (dispatch) => {
    dispatch(roomList.openEditRoomModal());
  };
};

export const hideAllRoomModal = () => {
  return (dispatch) => {
    dispatch(roomList.hideAllRoomModal());
  };
};

export default { getRoomList, editRoom, createNewRoom, openCreateRoomModal, openEditRoomModal, hideAllRoomModal};