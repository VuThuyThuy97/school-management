import {
  LOAD_ROOM_LIST,
  LOAD_ROOM_LIST_SUCCESS,
  LOAD_ROOM_LIST_FAIL,
  HIDE_ALL_ROOM_MODAL,
  CREATE_NEW_ROOM_FAIL,
  EDIT_ROOM_FAIL,
  OPEN_EDIT_ROOM_MODAL,
  OPEN_CREATE_ROOM_MODAL
} from '../utils/constants';

export default (state = Object.assign({}), action) => {
  switch (action.type) {
    case (LOAD_ROOM_LIST):
      return Object.assign({}, state, {
        message: null,
        error: null
      });
    case (LOAD_ROOM_LIST_SUCCESS):
      return Object.assign({}, state, {
        message: null,
        roomList: action.data,
        error: null
      });
    case (LOAD_ROOM_LIST_FAIL):
      return Object.assign({}, state, {
        message: null,
        error: action.data
      });
      case (EDIT_ROOM_FAIL):
        return Object.assign({}, state, {
          message: null,
          error: action.data
        });
      case (CREATE_NEW_ROOM_FAIL):
        return Object.assign({}, state, {
          message: null,
          error: action.data
        });
      case (HIDE_ALL_ROOM_MODAL):
        return Object.assign({}, state, {
          message: null,
          error: null,
          showCreateRoomModal: false,
          showEditRoomModal: false,
        });
      case (OPEN_EDIT_ROOM_MODAL):
        return Object.assign({}, state, {
          message: null,
          error: null,
          showCreateRoomModal: false,
          showEditRoomModal: true,
        });
      case (OPEN_CREATE_ROOM_MODAL):
        return Object.assign({}, state, {
          message: null,
          error: null,
          showCreateRoomModal: true,
          showEditRoomModal: false,
        });
    default:
      return state;
  }
};
